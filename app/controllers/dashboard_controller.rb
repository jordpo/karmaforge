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
        flash.now[:notice] = "#{transaction.karma_point} karma points saved!"
      end
    end

    if location_id
      @location = Location.find(location_id)
    else
      @location = Location.new
    end

    @locations = Location.order(total_points: :desc)
      .where("total_points > 0")
      .limit(5)
  end

end
