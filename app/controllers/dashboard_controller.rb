class DashboardController < ApplicationController

  def index
    if id = session[:current_transaction] && user_signed_in?
      transaction = Transaction.find(id)
      transaction.assign_attributes(user: current_user)
      transaction.save
      session[:current_transaction] = nil
    end
    @location = Location.new
  end

end
