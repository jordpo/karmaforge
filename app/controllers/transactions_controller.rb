class TransactionsController < ApplicationController

  def index
    @transactions = Transaction.all
  end

  def create
    @transaction = Transaction.new(transaction_params)
    if user_signed_in?
      @transaction.assign_attributes(user: current_user)
    end

    if @transaction.save && !user_signed_in?
      session[:current_transaction] = @transaction.id
    end

    render json: @transaction
  end

  private

  def transaction_params
    params.require(:transaction).permit(:location_id, :item_id, :user_id, :karma_point)
  end

end
