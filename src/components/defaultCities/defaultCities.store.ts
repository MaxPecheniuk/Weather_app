// import { action, computed, observable } from 'mobx';
// import { WeatherListTypes } from '../../types/currentWeather.types';
// import { defaultCitiesProvider } from './defaultCities.provider';
// import { defaultCitiesConfig } from '../../configs/defaultCities.config';

export class DefaultCitiesStore {
  // @observable
  // private _currentWeather: WeatherListTypes;
  //
  // @observable
  // private _errorMessage: string;
  //
  // @computed
  // get currentWeather(): WeatherListTypes {
  //   return this._currentWeather;
  // }
  //
  // @computed
  // get errorMessage(): string {
  //   return this._errorMessage;
  // }
  // getData() {
  //   // const id = defaultCitiesConfig.join(',');
  //   // this.fetchWeather(id);
  // }
  //
  // private fetchWeather(id: string): void {
  //   defaultCitiesProvider
  //     .fetchCurrentWeather(id)
  //     .then(action((currentWeather: WeatherListTypes) => this._currentWeather = currentWeather))
  //     .catch(action((e: XMLHttpRequest) => {
  //       this._errorMessage = e.statusText;
  //       throw new Error(e.statusText);
  //     }));
  // }
}

export const defaultCitiesStore = new DefaultCitiesStore();