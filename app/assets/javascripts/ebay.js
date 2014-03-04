var KarmaForge = KarmaForge || {};

KarmaForge.ebay = {};

KarmaForge.ebay.call = function (item, count) {
  var url, $scriptEl;
  url = "http://svcs.ebay.com/services/search/FindingService/v1";
  url += "?OPERATION-NAME=findCompletedItems";
  url += "&SERVICE-VERSION=1.0.0";
  url += "&SECURITY-APPNAME=GeneralA-da95-415b-99b1-b6fda0e1f62e";
  url += "&GLOBAL-ID=EBAY-US";
  url += "&RESPONSE-DATA-FORMAT=JSON";
  url += "&callback=KarmaForge.ebay.results";
  url += "&REST-PAYLOAD";
  url += "&keywords=" + item;
  url += "&paginationInput.entriesPerPage=" + count;
  url += this.buildURLArray();

  // Dynamical Loading of a 3rd Party Script
  $scriptEl = $('<script>', { id: 'ebay-script', src: url }); // create script element
  $('body').append($scriptEl);
};

KarmaForge.ebay.results = function(data) {
  var items = data.findCompletedItemsResponse[0].searchResult[0].item || [],
    bid_count = 0,
    selling_price = 0,
    length = items.length,
    i = 0,
    result = [];

  // Remove script tag
  $('#ebay-script').remove();

  // Iterate through items to get sums
  for (; i < length; i++ ) {
    if ( items[i].sellingStatus[0].bidCount ) {
      bid_count = Number(items[i].sellingStatus[0].bidCount[0]) + bid_count;
    } else {
      bid_count = bid_count + 0;
    }
    selling_price = Number(items[i].sellingStatus[0].currentPrice[0].__value__) + selling_price;
  }
  // Average sums
  result[0] = selling_price / length;
  result[1] = parseInt(bid_count / length);

  console.log(result);
}

KarmaForge.ebay.filterItems = [
  {"name":"HideDuplicateItems",
    "value":"true",
    "paramName":"",
    "paramValue":""},
   {"name":"Currency",
    "value": 'USD',
    "paramName":"",
    "paramValue":""},
    {"name":"SoldItemsOnly",
     "value": "true",
     "paramName":"",
     "paramValue":""}
  ];

KarmaForge.ebay.buildURLArray = function () {
  var length = this.filterItems.length,
    i = 0,
    itemFilter,
    j,
    result = "";

  for (; i < length; i++ ) {
    itemFilter = this.filterItems[i];
    // Iterate through each parameter in each item filter
    for ( j in itemFilter ) {
      // Check to see if the paramter has a value (some don't)
      if ( itemFilter[j] !== "" ) {
        result += "&itemFilter\(" + i + "\)." + j + "=" + itemFilter[j];
      }
    }
  }

  return result;
};

