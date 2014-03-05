module ApplicationHelper
  # Helper for data display
  def stat_data(collection)
    result = []
    collection.each do |e|
      location = {}
      location[:city] = e.city
      location[:state] = e.state
      location[:points] = e.total_points
      result.push(location)
    end
    return result
  end
end
