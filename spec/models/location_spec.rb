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

