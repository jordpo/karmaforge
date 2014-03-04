class TransactionsController < ApplicationController

  def index
    @transactions = Transaction.all
  end

  def create
    @transaction = Transaction.create!(transaction_params)
    render json: @transaction
  end

  private

  def transaction_params
    params.require(:transaction).permit(:location_id, :item_id, :user_id, :karma_point)
  end

end
