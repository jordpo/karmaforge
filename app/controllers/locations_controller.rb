class LocationsController < ApplicationController

  def create
    @location = Location.new(location_params)
    @location.save

    render json: @location
  end

  private

  def location_params
    params.require(:location).permit(:city, :state)
  end
end
