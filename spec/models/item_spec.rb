require 'spec_helper'

describe Item do
  describe "validations" do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:average_price) }
    it { should validate_presence_of(:average_bid) }
  end

  describe "associations" do
    it { should have_many(:locations).through(:transactions) }
    it { should have_many(:users).through(:transactions) }
  end
end
