var KarmaForge = KarmaForge || {}

KarmaForge.Transaction = function(new_item_id, new_location_id) {
  this.item_id = new_item_id;
  this.location_id =  new_location_id;
  this.karma_point = parseInt(KarmaForge.currentItem.bid * KarmaForge.currentItem.price * Math.random());
}

KarmaForge.Transaction.prototype.render = function(currentItem, currentLocation) {
  this.item_id = KarmaForge.currentItem.id,
  this.location_id = KarmaForge.currentLocation.id,
  transactionDiv = document.getElementById('transaction-display');
  transactionDiv.innerHTML = "You forged " + this.karma_point + " points for " + KarmaForge.currentLocation.city + ", " + KarmaForge.currentLocation.state + "." + KarmaForge.currentLocation.city + ", " + KarmaForge.currentLocation.state + " has " + KarmaForge.currentLocation.total_points + " points." ;
}
