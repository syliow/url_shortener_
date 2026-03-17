require 'net/http'
require 'nokogiri'

class ShortUrlsController < ApplicationController
    # For analytics
    def index       
      # Why left join instead of inner join?
      # There might be short_url with 0 visits, using inner join will exclude those short_url in results
      # TODO: Consider future scaling with cache instead of manual count (https://guides.rubyonrails.org/association_basics.html#counter-cache)
      # https://guides.rubyonrails.org/active_record_querying.html#limit-and-offset
      # Default should be at page 1 with 10 row per page 
      page = params[:page].to_i || 1
      per_page = params[:per_page].to_i || 10
      
      urls = ShortUrl.left_joins(:visits)
                      .group("short_urls.id")
                      .select("short_urls.*, COUNT(visits.id) AS visits_count")
                      .order(created_at: :desc)
                      .limit(per_page)
                      .offset((page - 1) * per_page)
                      # quick logic check: 
                      # page 1  = (1-1) * 10 = 0 | page 2 = (2-1)*10 = 10
      total = ShortUrl.count
      render json: { urls: urls, total: total }, status: :ok
    end

    # For individual short url analytics
    # Need show geolocation, timestamp of each visit for the specific short url
    def show 
      # bugfix for test: need to ensure short_url is present before we call show 
      url = ShortUrl.find_by(short_url: params[:short_url])
      if url
        render json: {
          short_url: url.short_url,
          original_url: url.original_url,
          title: url.title,
          created_at: url.created_at,
          visits_count: url.visits.count,
          # Sort by dsc order for better ux
          visits: url.visits.order(created_at: :desc).map { |visit|
            {
              city: visit.city,    
              country: visit.country,
              timestamp: visit.created_at
            }
          }
        }
      else 
        render json: { error: "Short URL not found" }, status: :not_found
      end
    end

    
    def create
      # bugfix for test: we need to ensure long url is present before we create
      if params[:long_url].blank?
        render json: {error: "Long URL is required"}, status: :bad_request
        return
      end
      # We should always fetch the title first before we save to db
      # TODO: What if fetching title takes too long. Maybe can consider improving with background jobs
      # https://guides.rubyonrails.org/active_job_basics.html
      page_title = fetch_title(params[:long_url])

      url = ShortUrl.create(
        original_url: params[:long_url],
        title: page_title
        )
        
      render json: url, status: :created
    end

    def redirect
      url = ShortUrl.find_by(short_url: params[:short_url])

      if url
        # Track the visit using the real visitor IP
        url.visits.create(ip_address: request.remote_ip)
        # Tradeoff: Found (HTTP 302) vs Moved Permanently (HTTP 301)
        # Found: Useful for our scenario bcs we need to track the number of visits (analytics)
        redirect_to url.original_url, status: :found, allow_other_host: true
      else
        render json: { error: "Invalid short url" }, status: :not_found
      end
    end

    private
    # https://nokogiri.org/tutorials/parsing_an_html_xml_document.html
    def fetch_title(url_string)
      uri = URI.parse(url_string)
      response = Net::HTTP.get_response(uri)

      html = Nokogiri::HTML(response.body)
      title = html.css("title").text

      title.empty? ? "Untitled" : title
    # https://guides.rubyonrails.org/error_reporting.html
    # TODO: The rescue here is needed bcs user might enter invalid/ bad url. We need to handle those edge cases too
    rescue
      "Untitled"
    end
end

