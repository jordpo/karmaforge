require 'spec_helper'

feature 'Forge Karma' do
  background do
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

    fill_in 'Enter item description', with: 'Nintendo 3ds'
    click_button 'eBay'
    expect(page).to have_content "NINTENDO 3DS"
    click_button 'Show results'
    expect(page).to have_content "Here's the average price of the last 10 items sold on ebay that match your keywords."

    click_button 'Donate and Forge'
    expect(page).to have_content "You forged"
    click_button "Forge again"
    find_field('City name').value.should eq 'Cambridge'
    find_field('State abbreviation').value.should eq 'MA'

    sign_in_as(@user)
    expect(page).to have_content " karma points saved!"
  end
end
