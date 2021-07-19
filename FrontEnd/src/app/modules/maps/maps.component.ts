import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-maps',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

    //http://embed.plnkr.co/AVNum8/
    ngOnInit() {
        var myLatlng = new google.maps.LatLng(42.510578, 27.461014);
        var mySecondLatlng = new google.maps.LatLng(42.698334, 23.319941);
        var mapOptions: google.maps.MapOptions = {
            zoom: 13,
            center: myLatlng,
            scrollwheel: false
        };
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        var markers: google.maps.Marker[] = [
            new google.maps.Marker({
                position: myLatlng,
                label: "Start"
            }),
            new google.maps.Marker({
                position: mySecondLatlng,
                label: "End"
            })]

        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
            bounds.extend(markers[i].getPosition());
        }

        map.fitBounds(bounds);

        var directionsService = new google.maps.DirectionsService();

        var request: google.maps.DirectionsRequest = {
            origin: myLatlng,
            destination: mySecondLatlng,
            travelMode: google.maps.TravelMode.DRIVING
        };

        directionsService.route(request, function (response, status) {
            if (status === google.maps.DirectionsStatus.OK) {

                new google.maps.DirectionsRenderer({
                    map: map,
                    directions: response,
                    suppressMarkers: true
                });
            } else {
                alert('Google route unsuccesfull!');
            }
        });
    }
}
