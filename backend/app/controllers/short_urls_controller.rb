require 'net/http'
require 'nokogiri'

class ShortUrlsController < ApplicationController
    # For analytics
    def index
      urls = ShortUrl.all
      render json: urls, status: :ok
    end

    def show 
      url = ShortUrl.find_by(short_url: params[:short_url])
      render json: url, status: :ok
    end

    
    def create
      # We should always fetch the title first before we save to db
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
        render json: { longUrl: url.original_url }, status: :found, location: url.original_url
      else
        render json: { error: "Invalid short url" }, status: :not_found
      end
    end

    private

    def fetch_title(url_string)
      uri = URI.parse(url_string)
      response = Net::HTTP.get_response(uri)

      if response.is_a?(Net::HTTPSuccess)
        document = Nokogiri::HTML(response.body)
        document.at_css("title")&.text 
      elsif response.is_a?(Net::HTTPRedirection)
        fetch_title(response['location'])
      else
        "Untitled"
      end
    rescue
      "Untitled"
    end
end

