class ShortUrl < ApplicationRecord
    validates:long_url, presence: true
end
