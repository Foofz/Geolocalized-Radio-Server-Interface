var add = [];
var remove = [];
var modify = [];

$(document).ready(function(){
	startup();
});

function startup(){
	var mapOptions = {
		center: new google.maps.LatLng(42.726883, -84.48964),
		zoom: 19,
		mapTypeId: google.maps.MapTypeId.SATELLITE
	};

	map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

	google.maps.event.addListener(map, 'click', function(event) {
    placeMarker(event.latLng);
  });
}

//Add a new hotSpot:
function placeMarker(location) {
  var marker = new google.maps.Marker({
      position: location,
      map: map
  });

  var type;
  var radios = document.getElementsByName("type");

  if (radios[0].checked){
  	type = "traffic";
  }

  else {
  	type = "advertisement";
  }

  var hotSpot = {
  	name: document.getElementById("name").value,
  	message: document.getElementById("message").value,
  	type: type,
  	status: "add",
  	lat: location.lat(),
  	long: location.lng()
  };

  add.push(hotSpot);

  /*alert(hotSpot.type);
  alert(hotSpot.lat);
  alert(hotSpot.long);*/
}