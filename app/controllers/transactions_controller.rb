class TransactionsController < ApplicationController

  def index
    @transactions = Transaction.all
  end

  def create
    @transaction = Transaction.new(transaction_params)
    if user_signed_in?
      @transaction.assign_attributes(user: current_user)
    end

    if @transaction.save
      if !user_signed_in?
        session[:current_transaction] = @transaction.id
      else
        current_user.add_points(@transaction)
      end
    end

    @location = Location.find(@transaction.location_id)
    @location.add_points(@transaction)

    @locations = Location.order(total_points: :desc)
      .where("total_points > 0")
      .limit(5)
    @locations = view_context.stat_data(@locations)
    render json: { location: @location, user: current_user, location_data: @locations }
  end

  private

  def transaction_params
    params.require(:transaction).permit(:location_id, :item_id, :user_id, :karma_point)
  end

end
