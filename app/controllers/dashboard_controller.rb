class DashboardController < ApplicationController

  def index
    id = session[:current_transaction]
    if id && user_signed_in?
      transaction = Transaction.find(id)
      transaction.assign_attributes(user: current_user)
      if transaction.save
        session[:current_transaction] = nil
        current_user.add_points(transaction)
      end
    end
    @location = Location.new
  end

end
