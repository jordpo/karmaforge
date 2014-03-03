class CreateTransactions < ActiveRecord::Migration
  def change
    create_table :transactions do |t|
      t.references :item, index: true
      t.references :location, index: true
      t.references :user, index: true
      t.integer :karma_point
      t.timestamps
    end
  end
end
