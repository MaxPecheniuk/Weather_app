import { action, computed, observable } from 'mobx';
import { FavoriteWeatherTypes } from '../../types/currentWeather.types';
import { searchCityNameProvider, searchCityWeatherProvider } from './SearchForm.provider';
import { SettingsItemTypes } from '../../types/settings.types';

export class SearchFormStore {
  @observable
  private _cityWeather: FavoriteWeatherTypes;

  @observable
  private _favorite: SettingsItemTypes;

  @observable
  private _errorMessage: string;

  @computed
  get favoriteData(): SettingsItemTypes {
    return this._favorite;
  }

  @computed
  get currentCityWeather(): FavoriteWeatherTypes {
    return this._cityWeather;
  }

  @computed
  get errorMessage(): string {
    return this._errorMessage;
  }

  getName(id: string) {
    this.fetchNameCity(id);
  }

  getData(id: string) {
    this.fetchCityWeather(id);
  }

  private fetchNameCity(id: string): void {
    searchCityNameProvider
      .fetchName(id)
      .then(action((name: SettingsItemTypes) => this._favorite = name))
      .catch(action((e: XMLHttpRequest) => {
        this._errorMessage = e.statusText;
        throw new Error(e.statusText);
      }));
  }

  private fetchCityWeather(id: string): void {
    searchCityWeatherProvider
      .fetchCityWeather(id)
      .then(action((cityWeather: FavoriteWeatherTypes) => this._cityWeather = cityWeather))
      .catch(action((e: XMLHttpRequest) => {
        this._errorMessage = e.statusText;
        throw new Error(e.statusText);
      }));
  }
}

export const searchFormStore = new SearchFormStore();