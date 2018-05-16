import { action, computed, observable } from 'mobx';
import { CurrentWeatherTypes } from '../../types/currentWeather.types';
import { currentWeatherProvider } from './CurrnetWeather.provider';
import { citiesList } from '../../configs/citiesList';

export class CurrentWeatherStore {
  @observable
  private _currentWeather: Array<CurrentWeatherTypes>;

  @observable
  private _errorMessage: string;

  @computed
  get currentWeather(): Array<CurrentWeatherTypes> {
    return this._currentWeather;
  }

  @computed
  get errorMessage(): string {
    return this._errorMessage;
  }
  getData() {
    const id = citiesList.join(',');
    this.fetchWeather(id);
  }

  private fetchWeather(id: string): void {
    currentWeatherProvider
      .fetchCurrentWeather(id)
      .then(action((currentWeather: Array<CurrentWeatherTypes>) => this._currentWeather = currentWeather))
      .catch(action((e: XMLHttpRequest) => {
        this._errorMessage = e.statusText;
        throw new Error(e.statusText);
      }));
  }
}

export const currentWeatherStore = new CurrentWeatherStore();