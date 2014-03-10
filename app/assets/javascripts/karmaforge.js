var KarmaForge = KarmaForge || {};


///// Begin: Location Event Handlers //////
// Set location of current visitor and save to database

KarmaForge.saveLocation = function (event) {
  var $city = $("#location_city"),
    $state = $("#location_state"),
    location;
  event.preventDefault();

  this.currentLocation = new this.Location($city.val().toUpperCase().trim(), $state.val().toUpperCase().trim());
  location = this.currentLocation;

  if($city.val() === "" || $state.val() === "") {
    $('#error-message').prepend("Please enter your city and state.")
    } else {

      $('#error-message').hide();

      $.ajax({
        type: "POST",
        url: "/locations",
        data: {location: {city: location.city, state: location.state}},
        dataType: 'json'
      }).done(function (data) {
        location.id = data.id;
        $('#location').hide();
        $('#item-search').show();
        $('#item_name').parent().show();
        $('#item_el').remove();
      });
    };
  }


///// Begin: Item Event Handlers //////
// Set item to currentItem and use eBay script to get price and bid
KarmaForge.createItem = function (event) {
    var $item = $('#item_name');

    // make sure there is no current error being displayed
    $('.notice-alert').empty();
    // blank field validation
    if ( $item.val() === '' ) {
      $('.notice-alert').append($('<p>',
          {
            html: 'Please describe your item.',
            class: 'alert well'
          }
        ));
      return false;
    }

  this.currentItem = new KarmaForge.Item($item.val().toUpperCase().trim());

  event.preventDefault();

  $('#user-instructions').hide();
  $('#item-search').prepend($('<p>', {html: $item.val().toUpperCase().trim(), id: 'item_el' }));
  $('#item_save_button').show();
  $('#ebay_el').remove();

  // Remove input val and hide form
  $item.val('');
  $(event.target).hide();
  $('#item_save').show();
}
// Save item in DB and add item.id to JS object
KarmaForge.saveItem = function (event) {
  var item = this.currentItem,
    msg = "Oops. Please try again.";
  event.preventDefault();

  // if error display message and revert back to form
  if ( KarmaForge.ebay.result[2] === "error" ) {
     $('.notice-alert').append($('<p>', { html: msg, class: "alert well" }))
    $('#item_name').parent().show();
    $('#item_el').remove();

    // reset error and return false
    KarmaForge.ebay.result[2] = undefined;
    return false;
  }

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
    $('#item_save_button').hide();
    $('#ebay-display').show();
    $('#ebay-display').prepend($('<p>', {html: "Price: $" + item.price + " - Interest Level: " + item.interestLevel(), id: 'ebay_el' }));
    $('#transaction-display p').remove();
  });
}

///// Begin: Transaction Event Handlers //////
KarmaForge.saveTransaction = function (event) {
  this.currentTransaction = new KarmaForge.Transaction(KarmaForge.currentItem.id, KarmaForge.currentLocation.id);

  $.ajax({
    type: 'POST',
    url: '/transactions',
    data: { transaction : {
      item_id: this.currentTransaction.item_id,
      location_id: this.currentTransaction.location_id,
      karma_point: this.currentTransaction.karma_point
      }
    }
  }).done(function (data){
      $('#ebay-display').hide();
      $('#transaction-display').show();
      $('#again').show()
      KarmaForge.currentLocation.total_points = data.location.total_points;
      if (data.user) {
        $('#user_pts').html(data.user.total_points);
      }
      KarmaForge.currentTransaction.render();
      $('#current-item').html(KarmaForge.currentItem.name);

      // Refresh location data for chart
      $('#global-stats').attr('data', data.location_data);
      KarmaForge.data3.getLocationData();
      KarmaForge.data3.sortByPoints.apply(KarmaForge.data3);
  });
}

//// Reset button for reforge and reset in middle of form fillout
KarmaForge.reset = function(event) {
  event.preventDefault();
  $('#transaction-display').hide();
  $('#again').hide();
  $('#item-search').hide();
  $('#ebay-display').hide();
  $('#location').show();
  $('#user-instructions').show();
  $('#item_save').hide();
};
///// End: Item Event Handlers //////


////////////////////////////////////////////////
// Bind all Event Handlers
KarmaForge.init = function () {
  // Set location data and draw bar chart
  KarmaForge.data3.init();

  $('#enter').click(function(){
    $('#location').show();
    $(this).hide();
    $('.notice-alert').html('');
  });

  $('#how-does-it-work').click(function(){
    $('#instructions').toggle();
  });

  $('#forge-again').click(KarmaForge.reset);
  $('.reset').click(KarmaForge.reset);

  $('#location form').on('submit', KarmaForge.saveLocation.bind(this));
  $('#item-search form').submit(KarmaForge.createItem.bind(this));
  $('#item_save').click(KarmaForge.saveItem.bind(this));
  $('#donate').click(KarmaForge.saveTransaction.bind(this));

  $('#sort_name').click(KarmaForge.data3.sortByName.bind(this.data3));
  $('#sort_points').click(KarmaForge.data3.sortByPoints.bind(this.data3));

};

// Make sure to have our CSRF token on all post requests
KarmaForge.ajaxSetup = function () {
  $.ajaxSetup({
    headers: {
      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    }
  });
};
