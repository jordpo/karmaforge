class AddTotalPointsToLocation < ActiveRecord::Migration
  def change
    add_column :locations, :total_points, :integer
  end
end
