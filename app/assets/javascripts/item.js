var KarmaForge = KarmaForge || {};

KarmaForge.Item = function (name) {
  this.name = name;
  KarmaForge.ebay.call(this.name, 10);
};

KarmaForge.Item.prototype.ebayPrice = function () {
  this.price = KarmaForge.ebay.result[0];
  this.bid= KarmaForge.ebay.result[1];
};
