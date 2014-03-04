class AddTotalPointsToLocation < ActiveRecord::Migration
  def change
    add_column :locations, :total_points, :integer, default: 0
  end
end
