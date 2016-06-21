// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, "load", init);

function init() {

    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions

    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var isDraggable = w > 480 ? true : false;

    var mapOptions = {
        zoom: 8,
        scrollwheel: false,
        mapTypeControl: false,
        streetViewControl: false,
        draggable: isDraggable,
        zoomControl: false,
        center: new google.maps.LatLng(35.1607546, -111.6383224)
    };

    var mapElement = document.getElementById("map");
    var map = new google.maps.Map(mapElement, mapOptions);


    // Add map pin
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(34.94021, -111.6899626),
        map: map,
        title: "Sedona",
        icon: "img/icon-map-marker.svg"
    });


    // Enable scroll zoom after click on map
    map.addListener("click", function() {
       map.setOptions({
           scrollwheel: true
       });
    });


    // Enable scroll zoom after drag on map
    map.addListener("drag", function() {
       map.setOptions({
           scrollwheel: true
       });
    });


    // Disable scroll zoom when mouse leave map
    map.addListener("mouseout", function() {
       map.setOptions({
           scrollwheel: false
       });
    });


    // Show map center on resize
    var getCen = map.getCenter();

    google.maps.event.addDomListener(window, "resize", function() {
        map.setCenter(getCen);
    });
}
