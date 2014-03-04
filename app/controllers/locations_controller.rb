class LocationsController < ApplicationController
  def index
  end

  def create
    @location = Location.new(location_params)
    @location.save

  end
end

private

def location_params
  params.require(:location).permit(:city, :state)
end