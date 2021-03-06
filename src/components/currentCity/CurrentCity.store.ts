import { action, computed, observable } from 'mobx';
import { GeoLocationTypes } from '../../types/geoLocation.types';
import { currentCityProvider } from './CurrentCity.provider';
import { GeoCoordsWeatherTypes } from '../../types/Geocoord.types';

export class CurrentCityStore {

  @observable
  private _userGeoLocation: GeoLocationTypes;

  @observable
  private _currentCityWeather: GeoCoordsWeatherTypes;

  @observable
  private _errorMessage: string;

  @computed
  get currentCityWeather(): GeoCoordsWeatherTypes {
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

  public getGeoData() {
    this.getGeoLocation();
  }

  public getWeatherData(lat: number, lon: number) {
    this.getWeather(lat, lon);
  }

  private getGeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((data) => {
        this._userGeoLocation = data.coords;
        this.getWeatherData(this._userGeoLocation.latitude, this._userGeoLocation.longitude);
      });
    }
  }

  private getWeather(lat: number, lon: number) {
    currentCityProvider
      .fetchWeather(lat, lon)
      .then(action((cityWeather: GeoCoordsWeatherTypes) => this._currentCityWeather = cityWeather))
      .catch(action((e: XMLHttpRequest) => {
        this._errorMessage = e.statusText;
        throw new Error(e.statusText);
      }));
  }
}

export const currentCityStore = new CurrentCityStore();