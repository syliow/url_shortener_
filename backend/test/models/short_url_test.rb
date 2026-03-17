require "test_helper"

class ShortUrlTest < ActiveSupport::TestCase
  # https://guides.rubyonrails.org/testing.html
  # An assertion is a line of code that evaluates an object (or expression) for expected results.
  
  # should not save if original_url is missing
  test "requires original_url" do
    url = ShortUrl.new
    assert_not url.save
  end

  # only accept valid original_url
  test "should save with valid original_url" do
    url = ShortUrl.new(original_url: "https://www.coingecko.com/")
    assert url.save
  end
    
  # short_url should be nil before saving 
  test "short_url is nil before save" do
    url = ShortUrl.new(original_url: "https://www.coingecko.com/")
    assert_nil url.short_url  
  end
  
  # auto-generate short_url when url is created
  test "generate short_url after create" do
    url = ShortUrl.create(original_url: "https://www.coingecko.com/")
    assert_not_nil url.short_url
  end  

  # check for short_url length, it should be at least 6 characters
  test "generated code is at least 6 chars long" do
    url = ShortUrl.create(original_url: "https://www.coingecko.com/")
    assert url.short_url.length >= 6
  end

  # short_url should only contain letters and numbers (base62 = no symbols that will break url)
  test "short_url is alphanumeric" do
    url = ShortUrl.create(original_url: "https://www.coingecko.com/")
    assert url.short_url =~ /^[a-zA-Z0-9]+$/
  end

end