import { action, computed, observable } from 'mobx';
import { DetailedWeatherTypes } from '../../types/detailedWeather.types';
import { detailedWeatherProvider } from './DetailedWeather.provider';

export class DetailedWeatherStore {
  @observable
  private _cityWeather: DetailedWeatherTypes;

  // @observable
  // private _cityName: DetailedWeatherCityTypes;

  @observable
  private _errorMessage: string;

  @computed
  get cityWeather(): DetailedWeatherTypes {
    return this._cityWeather;
  }

  // @computed
  // get cityName(): DetailedWeatherCityTypes {
  //   return this._cityName;
  // }

  @computed
  get errorMessage(): string {
    return this._errorMessage;
  }

  getData(id: string): void {
    this.fetchWeather(id);
    // this.fetchDetailedCity(id);
  }

  private fetchWeather(id: string): void {
    detailedWeatherProvider
      .fetchDetailedWeather(id)
      .then(action((cityWeather: DetailedWeatherTypes) => {
        this._cityWeather = cityWeather;
      }))
      .catch(action((e: XMLHttpRequest) => {
        this._errorMessage = e.statusText;
        throw new Error(e.statusText);
      }));
  }
  // private fetchDetailedCity(id: string): void {
  //   detailedCityNameProvider
  //     .fetchDetailedCityName(id)
  //     .then(action((cityName: DetailedWeatherCityTypes) => {
  //       this._cityName = cityName;
  //     }))
  //     .catch(action((e: XMLHttpRequest) => {
  //       this._errorMessage = e.statusText;
  //       throw new Error(e.statusText);
  //     }));
  // }
}

export const detailedWeatherStore = new DetailedWeatherStore();