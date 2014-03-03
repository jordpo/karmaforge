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
end

