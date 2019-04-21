import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { MouseEvent } from '@agm/core';
import { Http, Response } from '@angular/http';

declare var google;

@Component({
  selector: 'app-map-picker',
  templateUrl: './map-picker.component.html',
  styleUrls: ['./map-picker.component.scss'],
})
export class MapPickerComponent implements OnInit {

  static apiKey: string = 'GMaps API';
  
  apiKey: string = MapPickerComponent.apiKey;
  query: string = '';
  places: any = [];

  map = {
    lat : -6.0176719,
    lng : 106.0523897
  }
  mark = {
    lat : -6.0176719,
    lng : 106.0523897
  }

  constructor(public modalCtrl: ModalController, public http: Http, public navParams: NavParams) { }

  ngOnInit() {
    console.log(this.navParams);
  }
  
  markerDragEnd(event: MouseEvent) {
    // console.log('dragEnd', m, $event)
    console.log(event.coords)
    this.mark.lat = event.coords.lat
    this.mark.lng = event.coords.lng
  };

  save() {
    this.modalCtrl.dismiss(this.mark)
  };

  close() {
    this.modalCtrl.dismiss()
  };
  
  searchPlace($event: any) {
    console.log($event.target.value)
    this.query = $event.target.value

    const config = {
      // types: ['geocode'],
      input: this.query
    }

    if (this.query.length > 3) {
      // this.mapsAPILoader.load().then(() => {
        let autocompleteService = new google.maps.places.AutocompleteService()

        autocompleteService.getPlacePredictions(config, (predictions, status) => {
          if (status == google.maps.places.PlacesServiceStatus.OK && predictions) {
            console.log(predictions)
            
            this.places = predictions;
          }
        })
      // })
    } else {
      this.places = [];
    }
  };

  selectPlace(place: any){
    console.log(place)
    
    this.places = [];
    this.query = ""

    this.http.get('https://maps.googleapis.com/maps/api/geocode/json?place_id='+place.place_id+'&key='+this.apiKey+'')
    .subscribe(
      (response: Response) => {
        const data = response.json()
        // this.posts = data;
        console.log(data)
        console.log(data.results[0].geometry.location)

        this.map.lat = data.results[0].geometry.location.lat;
        this.map.lng = data.results[0].geometry.location.lng;

        this.mark.lat = data.results[0].geometry.location.lat;
        this.mark.lng = data.results[0].geometry.location.lng;
        // return data;
      },
      (error) => console.log({
        status: 'Gagal Terhubung',
        error
      })
    )
  };

}
