class DashboardController < ApplicationController

  def index
    @location = Location.new
  end

end