class DashboardController < ApplicationController

  def index
    transaction_id = session[:current_transaction]
    location_id = session[:current_location]
    if transaction_id && user_signed_in?
      transaction = Transaction.find(transaction_id)
      transaction.assign_attributes(user: current_user)
      if transaction.save
        session[:current_transaction] = nil
        current_user.add_points(transaction)
      end
    end

    if location_id
      @location = Location.find(location_id)
    else
      @location = Location.new
    end
  end

end
