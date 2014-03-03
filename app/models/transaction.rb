class Transaction < ActiveRecord::Base
  belongs_to :item
  belongs_to :location
  belongs_to :user
end
