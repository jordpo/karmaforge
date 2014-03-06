require 'spec_helper'

feature 'Forge Karma' do
  context 'create user', :js do
    @user = FactoryGirl.create(:user)
  end
  scenario 'visitor gets more info', :js do
    visit root_path
    click_button 'How does it work?'
    expect(page).to have_content "Your city + your old stuff + your decision to donate = Good Karma for you and your community. You ready to forge some karma?"
  end

  scenario 'visitor forges karma', :js do
    visit root_path
    click_button 'Enter the Forge'
    fill_in 'City name', with: 'Cambridge'
    fill_in 'State abbreviation', with: 'MA'
    click_button 'Next'
    expect(page).to have_content "What do you need to get rid of?"

  end
end
