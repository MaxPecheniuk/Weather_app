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

  getData() {
    this.getGeoLocation();
  }

  private getWeatherData(lat: number, lon: number) {
    currentCityProvider
      .fetchWeather(lat, lon)
      .then(action ((cityWeather:  GeocoordTypes) => this._currentCityWeather = cityWeather))
      .catch(action((e: XMLHttpRequest) => {
      this._errorMessage = e.statusText;
      throw new Error(e.statusText);
    }));
  }

  private getGeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((data) => this._userGeoLocation = data.coords);
      console.log(this._userGeoLocation);

    }
    if (this._userGeoLocation !== undefined) {
      console.log('prov');
      this.getWeatherData(this._userGeoLocation.latitude, this._userGeoLocation.longitude);
    }
}
}

export const currentCityStore = new CurrentCityStore();