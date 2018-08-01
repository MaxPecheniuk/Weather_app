import { action, computed, observable } from 'mobx';
import { GeoLocationTypes } from '../../types/geoLocation.types';
import { currentCityProvider } from './CurrentCity.provider';
import { GeocoordTypes } from '../../types/Geocoord.types';

export class CurrentCityStore {

  @observable
  private _userGeoLocation: GeoLocationTypes;

  @observable
  private _currentCityWeather: GeocoordTypes;

  @observable
  private _errorMessage: string;

  @computed
  get currentCityWeather(): GeocoordTypes {
    return this._currentCityWeather;
  }

  @computed
  get geoLocation(): GeoLocationTypes {
    return this._userGeoLocation;
  }

  @computed
  get errorMessage(): string {
    return this._errorMessage;
  }

  getGeoData() {
    this.getGeoLocation();
    console.log(this._userGeoLocation);
    if (this._userGeoLocation !== undefined) {
      this.getWeatherData(this._userGeoLocation.latitude, this._userGeoLocation.longitude);

    }
    console.log(this.geoLocation);
  }

  getWeatherData(lat: number, lon: number) {
    this.getWeather(lat, lon);
  }
  private getGeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((data) => {
        this._userGeoLocation = data.coords;
        console.log(this._userGeoLocation);

        return this._userGeoLocation;
      });
      // console.log(data.coords);
      // return this._userGeoLocation
    }
    console.log(this.geoLocation);

  }
  private getWeather(lat: number, lon: number) {
    // if (this._userGeoLocation !== undefined) {
      currentCityProvider
        .fetchWeather(lat, lon)
        .then(action((cityWeather: GeocoordTypes) => this._currentCityWeather = cityWeather))
        .catch(action((e: XMLHttpRequest) => {
          this._errorMessage = e.statusText;
          throw new Error(e.statusText);
        }));
    // }

  }

}

export const currentCityStore = new CurrentCityStore();