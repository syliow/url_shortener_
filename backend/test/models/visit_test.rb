require "test_helper"

class VisitTest < ActiveSupport::TestCase
  
  # check if data is loaded correctly
  test "visit has both country and city data" do
    visit = visits(:user_visit_one)
    assert_equal "Malaysia", visit.country
    assert_equal "Kuala Lumpur", visit.city
  end
  
  test "can access url" do
    visit = visits(:user_visit_one)
    assert_equal short_urls(:a_very_very_long_name), visit.short_url
  end
  
  # possible edge cases: geocoder fail to return any country or city data
  # if it fails we still want to be able to save the visit w/o location data
  test "can have empty location" do
    visit = visits(:empty_location)
    assert_nil visit.country
    assert_nil visit.city
  end
  
end