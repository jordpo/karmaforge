# == Schema Information
#
# Table name: transactions
#
#  id          :integer          not null, primary key
#  item_id     :integer
#  location_id :integer
#  user_id     :integer
#  karma_point :integer
#  created_at  :datetime
#  updated_at  :datetime
#

class Transaction < ActiveRecord::Base
  belongs_to :item
  belongs_to :location
  belongs_to :user
end
