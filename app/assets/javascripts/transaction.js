var KarmaForge = KarmaForge || {}

KarmaForge.Transaction = function(user_id) {
  this.user_id = KarmaForge.currentUser.id;
}

KarmaForge.Transaction.prototype.render = function(KarmaForge.currentItem, KarmaForge.currentLocation) {
  var this.item_id = KarmaForge.currentItem.id,
      this.location_id = KarmaForge.currentLocation.id,
      this.karma_point = KarmaForge.currentItem.bid * KarmaForge.currentItem.price * Math.random(),
      transactionDiv = document.getElementById('transaction-display');

  transactionDiv.innerhtml = "<p>You have forged" + this.karma_point + " karma points for " + this.location.city + ", " + this.location.state " !</p>";
}

