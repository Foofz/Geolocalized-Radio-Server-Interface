$(document).ready(function(){
	startup();
});

function startup(){
	//Map options:
	var mapOptions = {
		center: new google.maps.LatLng(37.844284, -122.27532),
		zoom: 14,
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
    			var image;
    			//If traffic incident:
    			if (results.hotspots[i].type == 0){
    				image = "icons/traffic_marker.png";
    			}
    			else {
    				image = "icons/ad_marker.png";
    			}
    			var marker = new google.maps.Marker({
    				position: new google.maps.LatLng(results.hotspots[i].lat, results.hotspots[i].long),
    				icon: image,
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