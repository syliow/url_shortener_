class ShortUrl < ApplicationRecord
    validates :original_url, presence: true
    has_many :visits

    after_create :generate_short_url

    # Base62 instead of random string
    CHARACTERS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".chars
    BASE62 = 62
    ID_OFFSET = 1000000000

    private
    def generate_short_url
        # We start at 1 billion to ensure a 6-digit look 
        number = self.id + ID_OFFSET
        code = ""

        # Divide ID by 62 and remainders to CHARACTERS until number is 0
        while number > 0
            remainder = number % BASE62
            code = CHARACTERS[remainder] + code
            number /= BASE62
        end

        self.update(short_url: code)
    end    
end
