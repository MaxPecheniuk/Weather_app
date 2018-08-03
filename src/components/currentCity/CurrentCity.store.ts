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
  }

  getWeatherData(lat: number, lon: number) {
    this.getWeather(lat, lon);
  }

  private getGeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((data) => {
        this._userGeoLocation = data.coords;
        console.log('if navigator:' + this._userGeoLocation);
        this.getWeatherData(this._userGeoLocation.latitude, this._userGeoLocation.longitude);
      });
    }
  }

  private getWeather(lat: number, lon: number) {
    console.log('request');
    currentCityProvider
      .fetchWeather(lat, lon)
      .then(action((cityWeather: GeocoordTypes) => this._currentCityWeather = cityWeather))
      .catch(action((e: XMLHttpRequest) => {
        this._errorMessage = e.statusText;
        throw new Error(e.statusText);
      }));
  }

}

export const currentCityStore = new CurrentCityStore();