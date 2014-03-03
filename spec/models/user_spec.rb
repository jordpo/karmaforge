require 'spec_helper'

describe User do
  it 'has a valid factory' do
    user = create(:user)
    expect(user).to be_valid
  end

  describe "associations" do
    it { should have_many(:items).through(:transactions) }
    it { should belong_to(:location) }
  end
end
