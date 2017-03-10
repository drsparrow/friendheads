class AddBackgoundImageToHeads < ActiveRecord::Migration[5.0]
  def change
    add_column :heads, :background_data_url, :string
  end
end
