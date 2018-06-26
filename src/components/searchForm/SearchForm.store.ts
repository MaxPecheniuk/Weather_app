import { action, computed, observable } from 'mobx';
import { WeatherTypes } from '../../types/currentWeather.types';
import { nameProv, searchFormProvider } from './SearchForm.provider';
import { SettingsItemTypes } from '../../types/settings.types';

export class SearchFormStore {
  @observable
  private _cityWeather: WeatherTypes;

  @observable
  private _favorite: SettingsItemTypes;

  @observable
  private _errorMessage: string;

  @computed
  get favoriteData(): SettingsItemTypes {
    return this._favorite;
  }

  @computed
  get currentCityWeather(): WeatherTypes {
    return this._cityWeather;
  }

  @computed
  get errorMessage(): string {
    return this._errorMessage;
  }

  getName(id: string) {
    this.fetchName(id);
  }

  getData(id: string) {
    this.fetchCityWeather(id);
  }

  private fetchName(id: string): void {
    nameProv
      .fetchName(id)
      .then(action((name: SettingsItemTypes) => {
        console.log(name);
        this._favorite = name;
      }))
      .catch(action((e: XMLHttpRequest) => {
        this._errorMessage = e.statusText;
        throw new Error(e.statusText);
      }));
  }

  private fetchCityWeather(id: string): void {
    searchFormProvider
      .fetchCityWeather(id)
      .then(action((cityWeather: WeatherTypes) => this._cityWeather = cityWeather))
      .catch(action((e: XMLHttpRequest) => {
        this._errorMessage = e.statusText;
        throw new Error(e.statusText);
      }));
  }
}

export const searchFormStore = new SearchFormStore();