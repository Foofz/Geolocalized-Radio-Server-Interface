var markers = [];
var infoWindows = [];

$(document).ready(function(){
	startup();
});

function startup(){
	//Map options:
	var mapOptions = {
		center: new google.maps.LatLng(37.844284, -122.27532),
		zoom: 14,
		mapTypeId: google.maps.MapTypeId.MAP
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
    			var type, image;
    			//If traffic incident:
    			if (results.hotspots[i].type == 0){
    				type = "Traffic";
    				image = "icons/traffic_marker.png";
    			}
    			else {
    				type = "Advertisement";
    				image = "icons/ad_marker.png";
    			}

    			var markerInfo = '<div class="markerInfo">'
    			+ '<b>Name: </b>' + results.hotspots[i].name + '<br/>'
    			+ '<b>Type: </b>' + type + '<br/>'
    			+ '<b>Message: </b>' + results.hotspots[i].message + '<br/>'
    			+ '<b>Lat/Long: </b>' + results.hotspots[i].lat + '/' + results.hotspots[i].long
    			+ '</div>';

    			markers[i] = new google.maps.Marker({
    				position: new google.maps.LatLng(results.hotspots[i].lat, results.hotspots[i].long),
    				icon: image,
    				map: map
    			});

    			markers[i].info = new google.maps.InfoWindow({
      				content: markerInfo
  				});

    			google.maps.event.addListener(markers[i], 'click', function() {
    				this.info.open(map,this);
  				});
    		}
    	}
    };

    ajax.open("get", "../kdtree/requestHotSpots.php", true);
    ajax.send(null);

}

//Add a new hotSpot:
function placeMarker(location) {
	var type, image;
	var radios = document.getElementsByName("type");

	if (radios[0].checked){
		type = 0;
		image = "icons/traffic_marker.png";
	}

	else {
		type = 1;
		image = "icons/ad_marker.png";
	}

	var marker = new google.maps.Marker({
		position: location,
		map: map,
		icon: image
	});

	//Add 'Syncing... and disable map click listener here'

	//Add hotspot to database:
	var ajax = new XMLHttpRequest();
	ajax.onreadystatechange = function() {
  		if (ajax.readyState == 4) {   // 4 means request is finished
    		if (this.responseText == "OK"){
    			//Addition successful! Remove 'Syncing...' and re-enable map click listener
    			//alert(document.getElementById("name").value);
    		}
    		else {
    			//Error syncing:
    		}
    	}
    };

    ajax.open("get", "../kdtree/addHotSpot.php?name=" + document.getElementById("name").value + "&type=" + type + "&message=" + document.getElementById("message").value + "&lat=" + location.lat() + "&long=" + location.lng(), true);
    ajax.send(null);


}