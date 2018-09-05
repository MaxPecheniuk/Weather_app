import { action, computed, observable } from 'mobx';
import { FavoriteWeatherListTypes } from '../../types/currentWeather.types';
import { favoriteCitiesProvider } from './FavoriteCities.provider';
import { SettingsTypes } from '../../types/settings.types';

export class FavoriteCitiesStore {
  @observable
  private _currentWeather: FavoriteWeatherListTypes;

  @observable
  private _errorMessage: string;

  @computed
  get currentWeather(): FavoriteWeatherListTypes {
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
    if (id.length > 0) {
      this.fetchWeather(id);
    }
  }

  private fetchWeather(id: Array<SettingsTypes>): void {
    favoriteCitiesProvider
      .fetchCurrentWeather(id.join(','))
      .then(action((currentWeather: FavoriteWeatherListTypes) => this._currentWeather = currentWeather))
      .catch(action((e: XMLHttpRequest) => {
        this._errorMessage = e.statusText;
        throw new Error(e.statusText);
      }));
  }
}

export const favoriteCitiesStore = new FavoriteCitiesStore();