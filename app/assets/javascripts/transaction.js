var KarmaForge = KarmaForge || {}

KarmaForge.Transaction = function(item_id, location_id) {
  this.item_id = KarmaForge.currentItem.id;
  this.location_id = KarmaForge.currentLocation.id;
}

KarmaForge.Transaction.prototype.render = function(currentItem, currentLocation) {
  this.item_id = KarmaForge.currentItem.id,
  this.location_id = KarmaForge.currentLocation.id,
  transactionDiv = document.getElementById('transaction-display');
  transactionDiv.innerHTML = "You forged " + this.karma_point + " points for " + KarmaForge.currentLocation.city + ", " + KarmaForge.currentLocation.state;
}

KarmaForge.Transaction.prototype.forge = function(){
  this.karma_point = KarmaForge.currentItem.bid * KarmaForge.currentItem.price * Math.random();
}
