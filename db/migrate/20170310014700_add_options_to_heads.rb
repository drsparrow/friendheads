class AddOptionsToHeads < ActiveRecord::Migration[5.0]
  def change
    add_column :heads, :options, :json
  end
end
