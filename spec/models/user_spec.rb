# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  email                  :string(255)      default(""), not null
#  encrypted_password     :string(255)      default(""), not null
#  reset_password_token   :string(255)
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :string(255)
#  last_sign_in_ip        :string(255)
#  provider               :string(255)
#  uid                    :string(255)
#  created_at             :datetime
#  updated_at             :datetime
#  location_id            :integer
#  total_points           :integer          default(0)
#

require 'spec_helper'

describe User do
  it 'has a valid factory' do
    user = FactoryGirl.create(:user)
    expect(user).to be_valid
  end

  describe "associations" do
    it { should have_many(:items).through(:transactions) }
    it { should belong_to(:location) }
  end

  describe '#add_points' do
    user = FactoryGirl.create(:user)
    transaction = FactoryGirl.create(:transaction, user: user)
    transaction2 = FactoryGirl.create(:transaction, user: user)
    sum = transaction.karma_point + transaction2.karma_point
    user.add_points(transaction)
    user.add_points(transaction2)
    it 'updates the total_points of user by adding transaction.karma_points' do
      expect(user.total_points).to eq(sum)
    end
  end
end
