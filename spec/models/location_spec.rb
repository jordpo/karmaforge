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

require 'spec_helper'

describe Location do
  describe "validations" do
    it { should validate_presence_of(:city) }
    it { should validate_presence_of(:state) }
  end

  describe "associations" do
    it { should have_many(:items).through(:transactions) }
    it { should have_many(:users).through(:transactions) }
  end

  describe '#add_points' do
    location = FactoryGirl.create(:location)
    transaction = FactoryGirl.create(:transaction, location: location)
    transaction2 = FactoryGirl.create(:transaction, location: location)
    sum = transaction.karma_point + transaction2.karma_point
    location.add_points(transaction)
    location.add_points(transaction2)
    it 'updates the total_points of location by adding transaction.karma_points' do
      expect(location.total_points).to eq(sum)
    end
  end
end

