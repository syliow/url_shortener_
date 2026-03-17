require "test_helper"

class ShortUrlsControllerTest < ActionDispatch::IntegrationTest
# Return a list of generated urls
  test "return a list of urls" do
    get urls_path
    assert_response :success

    json = JSON.parse(response.body)
    assert_not_nil json["urls"]
    assert_not_nil json["total"]
  end  

# Pagination
  test "check for pagination" do
    get urls_path, params: {page: 1, per_page: 50}
    assert_response :success
  end

# Returns visit details for short url + count
  test "return details for short_url visit" do
    url = short_urls(:github)
    get "/urls/#{url.short_url}"
    assert_response :success
  end

# Test if short_url doesn't exist
  test "returns error for invalid short_url" do
    get "/urls/invalid123"
    assert_response :error 
  end

# Creates short_url successfully (includes fetch_title working)
  test "able to create short_url" do
    post shorten_path, params: {long_url: "https://github.com"}
    assert_response :created
  end

# Missing long_url, short_url param when creating
  test "empty long_url param" do
    post shorten_path, params: {}
    assert_response :error 
  end

# Redirects valid url
  test "redirect valid short_url" do
    url = short_urls(:github)
    get "/#{url.short_url}"
    assert_response :found
  end

end
