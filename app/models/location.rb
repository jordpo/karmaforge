class Location < ActiveRecord::Base
  has_many :transactions
  has_many :items, through: :transactions
  has_many :users, through: :transactions

  validates :city, presence: true
  validates :state, presence: true
end
