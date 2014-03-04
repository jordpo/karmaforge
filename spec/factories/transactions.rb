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

FactoryGirl.define do
  factory :transaction do |f|
    f.item_id { Faker::Number.digit.to_i }
    f.location_id { Faker::Number.digit.to_i }
    f.karma_point { Faker::Number.digit.to_i * 82 }
  end
end
