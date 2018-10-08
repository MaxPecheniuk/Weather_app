import { computed, observable } from 'mobx';
import { SettingsItemTypes } from '../../types/settings.types';
import { Settings } from './Settings';
import { defaultFavoriteCities } from '../../configs/defaultFavoriteCities';

export class SettingsStore {
  @observable
  private _settingsList: Array<SettingsItemTypes>;

  @computed
  get settingsList(): Array<SettingsItemTypes> {
    return this._settingsList;
  }

  set addCity(item: SettingsItemTypes) {
    this._settingsList.push(item);
    Settings.prototype.updateLocalStorage();
  }

  set deleteCity(id: number) {
    this._settingsList.splice(id, 1);
    Settings.prototype.updateLocalStorage();
  }

  public getSettingList() {
    this.fetchSettings();
  }

  private fetchSettings() {
    this._settingsList =
      JSON.parse(localStorage.getItem('__settingsWeather__') || JSON.stringify(defaultFavoriteCities));
  }

}

export const settingsStore = new SettingsStore();