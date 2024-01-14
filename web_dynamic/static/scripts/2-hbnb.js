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
