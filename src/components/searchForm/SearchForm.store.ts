import { action, computed, observable } from 'mobx';
import { WeatherTypes } from '../../types/currentWeather.types';
import { searchCityNameProvider, searchCityWeatherProvider } from './SearchForm.provider';
import { SettingsItemTypes } from '../../types/settings.types';

// на счет прдеикативного ввода нужно при каждом добавлении символа делать запрос на сервер на получение данных, 
// скорее всего тебе будет прилетать массив, и ты его выводишь в выпадающем оконе 
// и открывать деталку по городу нуджно только после выбоа из списка городов
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
      .then(action((cityWeather: WeatherTypes) => this._cityWeather = cityWeather))
      .catch(action((e: XMLHttpRequest) => {
        this._errorMessage = e.statusText;
        throw new Error(e.statusText);
      }));
  }
}

export const searchFormStore = new SearchFormStore();