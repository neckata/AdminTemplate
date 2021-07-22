import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { FormType } from '../../shared/enums/form-types.enum';

@Component({
    selector: 'app-maps',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

    mapForm = new FormGroup({
        from: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
        destination: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)])
    });

    formTypes = FormType;

    map: google.maps.Map;

    myLatlng = new google.maps.LatLng(42.510578, 27.461014);

    markers: google.maps.Marker[] = [
        new google.maps.Marker({
            position: new google.maps.LatLng(42.510578, 27.461014),
            label: "Burgas Job"
        }),
        new google.maps.Marker({
            position: new google.maps.LatLng(42.698334, 23.319941),
            label: "Sofia Job"
        }),
        new google.maps.Marker({
            position: new google.maps.LatLng(42.7037426, 27.2376576),
            label: "Aitos Job"
        }),
        new google.maps.Marker({
            position: new google.maps.LatLng(42.6564741, 26.9591193),
            label: "Karnobat Job"
        })]

    mapOptions: google.maps.MapOptions = {
        zoom: 13,
        center: this.myLatlng,
        scrollwheel: false
    };

    searchDestination() {
        var directionsService = new google.maps.DirectionsService();

        var request: google.maps.DirectionsRequest = {
            origin: this.mapForm.value.from,
            destination: this.mapForm.value.destination,
            travelMode: google.maps.TravelMode.DRIVING
        };

        this.map = new google.maps.Map(document.getElementById("map"), this.mapOptions);
        var mapGoogle = this.map;

        directionsService.route(request, function (response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                new google.maps.DirectionsRenderer({
                    map: mapGoogle,
                    directions: response
                });
            } else {
                alert('Google route unsuccesfull!');
            }
        });
    }

    findNearMe() {
        var radius = 50;
        this.map = new google.maps.Map(document.getElementById("map"), this.mapOptions);
        var bounds = new google.maps.LatLngBounds();
        for (let i = 0; i < this.markers.length; i++) {
         
            var distance_from_location = google.maps.geometry.spherical.computeDistanceBetween(this.markers[i].getPosition(), this.myLatlng)
            var distanceInkm = distance_from_location / 1000;

            if (distanceInkm < radius) {
                this.markers[i].setMap(this.map);
                bounds.extend(this.markers[i].getPosition());
            }
        }

        this.map.fitBounds(bounds);
    }

    ngOnInit() {
        this.map = new google.maps.Map(document.getElementById("map"), this.mapOptions);

        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(this.map);
            bounds.extend(this.markers[i].getPosition());
        }

        this.map.fitBounds(bounds);
    }
}
