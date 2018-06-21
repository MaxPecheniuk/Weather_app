import { action, computed, observable } from 'mobx';
import { WeatherListTypes } from '../../types/currentWeather.types';
import { defaultCitiesProvider } from './defaultCities.provider';
import { citiesList } from '../../configs/citiesList';
// В целом это должен быть просто cities store  который хранит конкретные города 
// не важно они заданы по умолчанию или нет, т.к. может в любой момент добавится 
// функциональность добавления нового города для конкретного пользователя
// плюс добавь сюда сеттера для добавления новых городов в данный список. 
// Типа пользователь вводит в поисковой строке имя города и при нажатии на ентер выпадает список городов и иконка +, 
// при нажатии данная иконка добавит в список городов новый город
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
  getData() {
    const id = citiesList.join(',');
    this.fetchWeather(id);
  }

  private fetchWeather(id: string): void {
    defaultCitiesProvider
      .fetchCurrentWeather(id)
      .then(action((currentWeather: WeatherListTypes) => this._currentWeather = currentWeather))
      .catch(action((e: XMLHttpRequest) => {
        this._errorMessage = e.statusText;
        throw new Error(e.statusText);
      }));
  }
}

export const defaultCitiesStore = new DefaultCitiesStore();