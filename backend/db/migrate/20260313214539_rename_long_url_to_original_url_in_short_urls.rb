class RenameLongUrlToOriginalUrlInShortUrls < ActiveRecord::Migration[8.1]
  def change
    rename_column :short_urls, :long_url, :original_url
  end
end
