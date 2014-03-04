class ItemsController < ApplicationController

  def create
    @item = Item.new(item_params)
    @item.save
    render json: @item
  end


  private
  def item_params
    params.require(:item).permit(:name, :average_price, :average_bid)
  end
end
