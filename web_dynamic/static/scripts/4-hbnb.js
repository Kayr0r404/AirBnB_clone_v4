/* script to listen for  changes in checkbox tag*/
$('document').ready(function () {
   const amenitiesId = {};
   $('INPUT[type="checkbox"]').click(function () {
     if ($(this).prop('checked')) {
       amenitiesId[$(this).attr('data-id')] = $(this).attr('data-name');
     } else {
       delete amenitiesId[$(this).attr('data-id')];
     }
     $('.amenities h4').text(Object.values(amenitiesId).join(', '));
   });
 });
/* script to request api status*/
$(document).ready(function () {
  // Function to update API status
  function updateApiStatus() {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/status/',
      type: 'GET',
      success: function (data) {
        if (data.status === 'OK') {
          $('#api_status').addClass('available');
        } else {
          $('#api_status').removeClass('available');
        }
      },
      error: function () {
        $('#api_status').removeClass('available');
      }
    });
  }
/* gets places*/

$(document).ready(function () {
  /* Function to update the list of places*/
  function updatePlaces() {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({}),
      success: function (data) {
        /* Clears existing places on the page*/
        $('.places').empty();

        /* Looping through the places and dynamically create HTML elements*/
        for (const place of data) {
          const article = $('<article>').append(
            $('<div>').append(
              $('<h2>').text(place.name),
              $('<div>').text(`$${place.price_by_night} per night`),
              $('<div>').text(place.description)
            )
          );


          $('.places').append(article);
        }
      },
      error: function () {
        console.error('Error fetching places from the API');
      }
    });
  }

  /* Updates places on page load*/
  updatePlaces();

  setInterval(updatePlaces, 30000);
});
/* filter places by amenity*/

$(document).ready(function () {
  /*Function to update the list of places based on selected amenities*/
  function updatePlacesByAmenity() {
    /* Gets the list of selected amenities*/
    const selectedAmenities = [];
    $('input[type="checkbox"]:checked').each(function () {
      selectedAmenities.push($(this).attr('data-id'));
    });

    /* Sends a POST request to update places based on selected amenities*/
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: selectedAmenities }),
      success: function (data) {
        /* Clear existing places on the page*/
        $('.places').empty();

        /* Loops through the places and dynamically creates HTML elements*/
        for (const place of data) {
          const article = $('<article>').append(
            $('<div>').append(
              $('<h2>').text(place.name),
              $('<div>').text(`$${place.price_by_night} per night`),
              $('<div>').text(place.description)
            )
          );

          /* Appends the created article to the places section*/
          $('.places').append(article);
        }
      },
      error: function () {
        console.error('Error fetching places from the API');
      }
    });
  }

  /* Updates places when the button is clicked*/
  $('button').click(function () {
    updatePlacesByAmenity();
  });
});
