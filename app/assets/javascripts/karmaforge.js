var KarmaForge = KarmaForge || {};




///// Begin: Item Event Handlers //////
// Set item to currentItem and use eBay script to get price and bid
KarmaForge.createItem = function (event) {
    var $item = $('#item_name');
    this.currentItem = new KarmaForge.Item($item.val());

  event.preventDefault();

  $item.val('');
}
// Save item in DB and add item.id to JS object
KarmaForge.saveItem = function (event) {
  var item = this.currentItem;
  event.preventDefault();

  // Get the avg price and avg bid
  item.ebayPrice();

  $.ajax({
    type: 'POST',
    url: '/items',
    data: { item : {
      name: item.name,
      average_price: item.price,
      average_bid: item.bid
      }
    }
  }).done(function (data) {
    item.id = data.id;
    $('#item-search').hide();
  });
}
///// End: Item Event Handlers //////


////////////////////////////////////////////////
// Bind all Event Handlers
KarmaForge.init = function () {
  $('#enter').click(function(){
    $('#location').toggle();
  });

  $('#item-search form').submit(KarmaForge.saveItem.bind(this));
  $('#item_ebay').click(KarmaForge.createItem.bind(this));
};

// Make sure to have our CSRF token on all post requests
KarmaForge.ajaxSetup = function () {
  $.ajaxSetup({
    headers: {
      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    }
  });
};
