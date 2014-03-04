var KarmaForge = KarmaForge || {};

KarmaForge.Item = function (name) {
  this.name = name;
  KarmaForge.ebay.call(this.name, 10);
};

KarmaForge.Item.prototype.ebayPrice = function () {
  this.price = KarmaForge.ebay.result[0];
  this.bid= KarmaForge.ebay.result[1];
};

KarmaForge.Item.prototype.interestLevel = function () {
  if ( this.bid < 5 ) {
    return 'Low';
  } else if ( this.bid < 10 ) {
    return 'Medium';
  } else {
    return 'High';
  }
};
