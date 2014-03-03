class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.text :name
      t.float :average_price
      t.integer :average_bid
      t.timestamps
    end
  end
end
