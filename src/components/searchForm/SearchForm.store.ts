import { action, computed, observable } from 'mobx';
import { WeatherTypes } from '../../types/currentWeather.types';
import { searchFormProvider } from './SearchForm.provider';

export class SearchFormStore {
  @observable
  private _cityWeather: WeatherTypes;

  @observable
  private _errorMessage: string;

  @computed
  get currentCityWeather(): WeatherTypes {
    return this._cityWeather;
  }

  @computed
  get errorMessage(): string {
    return this._errorMessage;
  }

  getData(id: string) {
    this.fetchCityWeather(id);
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