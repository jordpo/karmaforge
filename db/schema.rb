ActiveRecord::Schema.define(version: 20140303161936) do

  enable_extension "plpgsql"

  create_table "items", force: true do |t|
    t.text     "name"
    t.float    "average_price"
    t.integer  "average_bid"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "locations", force: true do |t|
    t.string   "city"
    t.string   "state"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "transactions", force: true do |t|
    t.integer  "item_id"
    t.integer  "location_id"
    t.integer  "user_id"
    t.integer  "karma_point"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "transactions", ["item_id"], name: "index_transactions_on_item_id", using: :btree
  add_index "transactions", ["location_id"], name: "index_transactions_on_location_id", using: :btree
  add_index "transactions", ["user_id"], name: "index_transactions_on_user_id", using: :btree

end
