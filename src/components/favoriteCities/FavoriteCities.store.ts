import { action, computed, observable } from 'mobx';
import { FavoriteWeatherListTypes } from '../../types/currentWeather.types';
import { favoriteCitiesProvider } from './FavoriteCities.provider';
import { SettingsItemTypes } from '../../types/settings.types';

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

  public getData(citiesList: Array<SettingsItemTypes>) {
    let citiesId: Array<number> = [];
    citiesList.map((item: SettingsItemTypes) => {
      citiesId.push(item.id);
    });
    if (citiesId.length > 0) {
      this.fetchWeather(citiesId);
    }
  }

  private fetchWeather(citiesId: Array<number>): void {
    favoriteCitiesProvider
      .fetchCurrentWeather(citiesId.join(','))
      .then(action((currentWeather: FavoriteWeatherListTypes) => this._currentWeather = currentWeather))
      .catch(action((e: XMLHttpRequest) => {
        this._errorMessage = e.statusText;
        throw new Error(e.statusText);
      }));
  }
}

export const favoriteCitiesStore = new FavoriteCitiesStore();