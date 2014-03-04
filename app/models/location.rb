# == Schema Information
#
# Table name: locations
#
#  id         :integer          not null, primary key
#  city       :string(255)
#  state      :string(255)
#  created_at :datetime
#  updated_at :datetime
#

class Location < ActiveRecord::Base
  has_many :transactions
  has_many :items, through: :transactions
  has_many :users, through: :transactions

  validates :city, uniqueness: {scope: :state}, presence: true
  validates :state, presence: true


  def add_points(transaction)
    new_total = total_points + transaction.karma_point
    update_attributes(total_points: new_total)
  end

end
