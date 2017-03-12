class AddOgDataUrlToHeads < ActiveRecord::Migration[5.0]
  def change
    add_column :heads, :og_data_url, :string
  end
end
