class Item < ActiveRecord::Base
  has_many :transactions
  has_many :locations, through: :transactions
  has_many :users, through: :transactions

  validates :name, presence: true
  validates :average_price, presence: true
  validates :average_bid, presence: true
end
