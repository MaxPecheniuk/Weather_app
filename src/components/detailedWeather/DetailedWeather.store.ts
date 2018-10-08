import { action, computed, observable } from 'mobx';
import { DetailedWeatherTypes } from '../../types/detailedWeather.types';
import { detailedWeatherProvider } from './DetailedWeather.provider';

export class DetailedWeatherStore {

  @observable
  private _cityWeather: DetailedWeatherTypes;

  @observable
  private _errorMessage: string;

  @computed
  get cityWeather(): DetailedWeatherTypes {
    return this._cityWeather;
  }

  @computed
  get errorMessage(): string {
    return this._errorMessage;
  }

  public getData(id: string): void {
    this.fetchWeather(id);
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
}

export const detailedWeatherStore = new DetailedWeatherStore();