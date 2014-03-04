var KarmaForge = KarmaForge || {}

KarmaForge.Transaction = function(location_id, user_id) {
  this.user_id = user_id;
}

KarmaForge.Transaction.prototype.render = function(item, location) {
  var this.item_id = item.id,
      this.location_id = location.id,
      this.karma_point = item.bid * item.price * Math.random(),
      transactionDiv = document.getElementById('transaction-display');

  transactionDiv.innerhtml = "<p>You have forged" + this.karma_point + " karma points for " + this.location.city + ", " + this.location.state " !</p>";
}

