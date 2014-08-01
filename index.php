<!DOCTYPE html>
<html>
<head>
	<title> Server Interface </title>
	<link rel="stylesheet" type="text/css" href="map-style.css"/>
	<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
	<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCUCdihoRA6IcSVA9a1OA_OrzXa-sAETOk&libraries=visualization,geometry&sensor=false"></script>
	<script src="map.js"></script>
</head>

<body>
	<div id="map-canvas"></div>
	<div id="controls">
	Type:
		<label><input type="radio" name="type" value="traffic" checked="checked" />Traffic</label>
		<label><input type="radio" name="type" value="advertisement" />Advertisement</label> <br/>
	Name:
		<input id="name" /> <br/>
	Message:
		<input name="message" id="message" />
		<input name="submit" type="button" value="Submit Changes"/>
	</div>
</body>
</html>