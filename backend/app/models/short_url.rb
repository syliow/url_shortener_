class ShortUrl < ApplicationRecord
    validates :original_url, presence: true
    has_many :visits

    after_create :generate_short_url

    # Base62 instead of random string
    CHARACTERS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".chars

    private
    def generate_short_url
        # We start at 1 billion to ensure a 6-digit look 
        number = self.id + 1_000_000_000
        code = ""

        # Divide ID by 62 and remainders to CHARACTERS until number is 0
        while number > 0
            remainder = number % 62
            code = CHARACTERS[remainder] + code
            number /= 62
        end

        self.update(short_url: code)
    end

    # TODO: Add counting visits
    
end
