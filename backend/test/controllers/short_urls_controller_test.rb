require "test_helper"

class ShortUrlsControllerTest < ActionDispatch::IntegrationTest
  # Return a list of generated urls
  test "return a list of urls" do
    
  end  

  #test for pagination (it should return filtered result)
  #return visit details for a specific short_url
  #return visit count for the specific short_url
  #create short_url before saving to db
  #fetching title should work
  #handle redirect for valid url
  #tracking is working properly when user access redirect url
  #handle redirect for invalid url
  
  #Some edge cases i can think of
  #missing param for ipaddress, city or country
  #user passed in int when create url (instead of string)
  #missing longurl param when trying to create url/ longurl is invalid format
  #user is trying to access a shorturl not found in db
  #what would happen if fetchtitle failed
  #what would happen if no response or super slow response from geocoder (3rd party)
end
