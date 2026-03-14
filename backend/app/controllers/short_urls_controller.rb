require 'net/http'
require 'nokogiri'

class ShortUrlsController < ApplicationController
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
      url = ShortUrl.find_by!(short_url: params[:short_url])
      
      # return the long url and then redirect user to the origina url
      render json: { longUrl: url.original_url }, status: :found, location: url.original_url
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

