class Item < ActiveRecord::Base
  has_many :transactions
  has_many :locations, through: :transactions
  has_many :users, through: :transactions
end
