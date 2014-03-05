module ApplicationHelper
  # Helper for data display, needs to be in JSON format
  def stat_data(collection)
    result = '{"locations": ['
    collection.each_with_index do |e, i|
      result << '{"city": "' + e.city + '", "state": "' + e.state + '", "points": "' + e.total_points.to_s + '"}'
      if i != collection.size - 1
        result << ','
      end
    end
    return result << ']}'
  end
end
