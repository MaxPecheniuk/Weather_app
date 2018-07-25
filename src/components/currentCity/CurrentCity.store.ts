import { computed, observable } from 'mobx';
import { GeoLocationTypes } from '../../types/geoLocation.types';

export class CurrentCityStore {

  @observable
  private _userGeoLocation: GeoLocationTypes;

  @observable
  // private _currentCityWeather:

  @computed
  get geoLocation(): GeoLocationTypes {
    return this._userGeoLocation;
  }

  getData() {
    this.getGeoLocation();
  }

  private getGeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((data) => this._userGeoLocation = data.coords);
          }
  }
}

export const currentCityStore = new CurrentCityStore();