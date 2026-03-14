require 'geocoder'

class Visit < ApplicationRecord
  belongs_to :short_url
  before_save :ip_location

  private

  def ip_location
    result = Geocoder.search(ip_address).first
    if result
      self.country = result.country
      self.city    = result.city
    end
  end
end
