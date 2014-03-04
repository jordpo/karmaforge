var KarmaForge = KarmaForge || {};


    KarmaForge.Location = function(city, state) {
      this.city = city;
      this.state = state;
    }

    var $form =$(event.target),
    $city = $form.find("input[name='city']"),
    $state = $form.find("input[name='state']"),
    KarmaForge.action = $form.attr('action');

    event.preventDefault();

    $.ajax({
      type: "POST",
      url: "/locations"
      data: {location: {city: $city.val(), state: $state.val()}},
      dataType: 'json'
      }

    }); // end ajax