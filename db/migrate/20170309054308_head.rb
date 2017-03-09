class Head < ActiveRecord::Migration[5.0]
  def change
    create_table :heads do |t|
      t.string :data_url
      t.string :external_id
      t.timestamps
    end

    add_index :heads, :external_id
  end
end
