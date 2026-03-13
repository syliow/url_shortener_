class CreateShortUrls < ActiveRecord::Migration[8.1]
  def change
    create_table :short_urls do |t|
      t.text :long_url
      t.string :short_url
      t.string :title

      t.timestamps
    end
  end
end
