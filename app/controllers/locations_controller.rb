class LocationsController < ApplicationController

  def create
    @location = Location.where(location_params).first
    if @location
      session[:current_location] = @location.id
      render json: @location
    else
      @location = Location.new(location_params)
      if @location.save
        session[:current_location] = @location.id
      end
      render json: @location
    end
  end

  private

  def location_params
    params.require(:location).permit(:city, :state)
  end
end
