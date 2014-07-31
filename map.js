$(document).ready(function(){
	startup();
});

function startup(){
	//Map options:
	var mapOptions = {
		center: new google.maps.LatLng(42.726883, -84.48964),
		zoom: 19,
		mapTypeId: google.maps.MapTypeId.SATELLITE
	};

	//Initialize map:
	map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

	//Add listener to single clicks on map:
	google.maps.event.addListener(map, 'click', function(event) {
    placeMarker(event.latLng);
  });

	//Use AJAX to request existing markers from database:
	var ajax = new XMLHttpRequest();
	ajax.onreadystatechange = function() {
  		if (ajax.readyState == 4) {   // 4 means request is finished
    		//Handle JSON response:
    		var results = JSON.parse(this.responseText);
    		for (var i=0; i<results.hotspots.length; i++){
    			var marker = new google.maps.Marker({
    				position: new google.maps.LatLng(results.hotspots[i].lat, results.hotspots[i].long),
    				color: blue,
      				map: map
  				});
    		}
  		}
	};

	ajax.open("get", "../kdtree/requestHotSpots.php", true);
	ajax.send(null);

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

  /*alert(hotSpot.type);
  alert(hotSpot.lat);
  alert(hotSpot.long);*/
}