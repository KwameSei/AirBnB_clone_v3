
const selectedAmenities = {};

$(':checkbox').change(function () {
    if($(this).is(':selectedAmenities')) {
        const id = $(this).val();
        selectedAmenities[id] = $(this).data('name');
} 
else {
    const id = $(this).val();
    delete selectedAmenities[id];
}
updatedAmenities();
});

function updateAmenities() {
    const amenities = [];
    Object.keys(selectedAmenities).forEach(function (key) {
        amenities.push(selectedAmenities[key])
    });
    if (amenities.length === 0) {
        return ('&nbsp');
    }
    const amenitiesText = amenities.join(', ');
    $('div.amenities h4').text(amenitiesText);

    const apiStatus = $('DIV#api_status');
    $.ajax('http://0.0.0.0:5001/api/v1/status/').done(function (data) {
        if (data.status === 'OK') {
          apiStatus.addClass('available');
        } else {
          apiStatus.removeClass('available');
        }
      });
  }

  /*
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: '{}',
    success: function (data) {
	for (let currentPlace of data) {
	    $('.places').append('<article> <div class="title"> <h2>' + currentPlace.name + '</h2><div class="price_by_night">' + '$' + currentPlace.price_by_night + '</div></div> <div class="information"> <div class="max_guest"> <i class="fa fa -users fa-3x" aria-hidden="true"></i><br />' + currentPlace.max_guest + ' Guests</div><div class="number_rooms"> <i class="fa fa -users fa-3x" aria-hidden="true"></i><br />' + currentPlace.number_rooms + ' Bedrooms</div><div class="number_bathrooms"> <i class="fa fa -users fa-3x" aria-hidden="true"></i><br />' + currentPlace.number_bathrooms + ' Bathroom </div></div> <div class="user"></div><div class="description">' + '$' + currentPlace.description + '</div></article>');
	}
    }
});
*/  

$.ajax({
    url: api + ':5001/api/v1/places_search/',
    type: 'POST',
    data: '{}',
    contentType: 'application/json',
    dataType: 'json',
    success: function (data) {
      $('section.places').append(data.map(place => {
        return `<article>
                  <div class="title">
                    <h2>${place.name}</h2>
                    <div class="price_by_night">
                      ${place.price_by_night}
                    </div>
                  </div>
                  <div class="information">
                    <div class="max_guest">
                      <i class="fa fa-users fa-3x" aria-hidden="true"></i>
                      </br>
                      ${place.max_guest} Guests
                    </div>
                    <div class="number_rooms">
                      <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
                      </br>
                      ${place.number_rooms} Bedrooms
                    </div>
                    <div class="number_bathrooms">
                      <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
                      </br>
                      ${place.number_bathrooms} Bathrooms
                    </div>
                  </div>
                  <div class="description">
                    ${place.description}
                  </div>
                </article>`;
      }));
    }
  });