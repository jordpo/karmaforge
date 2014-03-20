var KarmaForge = KarmaForge || {}

KarmaForge.Transaction = function(new_item_id, new_location_id) {
  this.item_id = new_item_id;
  this.location_id =  new_location_id;
  this.karma_point = this.calculateKarmaPoints();
}

KarmaForge.Transaction.prototype.render = function(currentItem, currentLocation) {
  this.item_id = KarmaForge.currentItem.id,
  this.location_id = KarmaForge.currentLocation.id,
  transactionDiv = $('#transaction-display');
  transactionDiv.prepend($('<p>', {html: "You forged " + this.karma_point + " points for " + KarmaForge.currentLocation.city + ", " + KarmaForge.currentLocation.state + ". " + '<br>' + KarmaForge.currentLocation.city + ", " + KarmaForge.currentLocation.state + " has " + KarmaForge.currentLocation.total_points + " points."}));
}
//Refactored method name-- changed method name from calcKarma to calculateKarmaPoints to 'make method call simpler'

KarmaForge.Transaction.prototype.calculateKarmaPoints = function () {
  var interest = KarmaForge.currentItem.interestLevelNumber(),
    points;
  points = parseInt(KarmaForge.currentItem.price + ( Math.random() * interest ));
  return points;
};
