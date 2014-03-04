class LocationsController < ApplicationController

  def create
    @location = Location.where(location_params).first
    if @location
      render json: @location
    else
      @location = Location.new(location_params)
      @location.save
      render json: @location
    end
  end

  private

  def location_params
    params.require(:location).permit(:city, :state)
  end
end
