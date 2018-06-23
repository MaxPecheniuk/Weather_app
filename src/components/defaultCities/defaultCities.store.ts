import { action, computed, observable } from 'mobx';
import { WeatherListTypes } from '../../types/currentWeather.types';
import { defaultCitiesProvider } from './DefaultCities.provider';
import { SettingsTypes } from '../../types/settings.types';

export class DefaultCitiesStore {
  @observable
  private _currentWeather: WeatherListTypes;

  @observable
  private _errorMessage: string;

  @computed
  get currentWeather(): WeatherListTypes {
    return this._currentWeather;
  }

  @computed
  get errorMessage(): string {
    return this._errorMessage;
  }

  getData(citiesId: any) {
    let id: Array<SettingsTypes> = [];
    citiesId.cities.map((item: any) => {
      id.push(item.id);
    });
    this.fetchWeather(id);
  }

  private fetchWeather(id: Array<SettingsTypes>): void {
    defaultCitiesProvider
      .fetchCurrentWeather(id.join(','))
      .then(action((currentWeather: WeatherListTypes) => this._currentWeather = currentWeather))
      .catch(action((e: XMLHttpRequest) => {
        this._errorMessage = e.statusText;
        throw new Error(e.statusText);
      }));
  }
}

export const defaultCitiesStore = new DefaultCitiesStore();