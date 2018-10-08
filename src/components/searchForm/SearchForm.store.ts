import { action, computed, observable } from 'mobx';
import { FavoriteWeatherTypes } from '../../types/currentWeather.types';
import { searchCityNameProvider, searchCityWeatherProvider } from './SearchForm.provider';
import { SettingsItemTypes } from '../../types/settings.types';

export class SearchFormStore {

  @observable
  private _cityWeather: FavoriteWeatherTypes;

  @observable
  private _favoriteList: SettingsItemTypes;

  @observable
  private _errorMessage: string;

  @computed
  get favoriteList(): SettingsItemTypes {
    return this._favoriteList;
  }

  @computed
  get currentCityWeather(): FavoriteWeatherTypes {
    return this._cityWeather;
  }

  @computed
  get errorMessage(): string {
    return this._errorMessage;
  }

  public getName(id: string) {
    this.fetchNameCity(id);
  }

  public getData(id: string) {
    this.fetchCityWeather(id);
  }

  private fetchNameCity(id: string): void {
    searchCityNameProvider
      .fetchName(id)
      .then(action((name: SettingsItemTypes) => this._favoriteList = name))
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