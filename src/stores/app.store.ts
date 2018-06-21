import { action, computed, observable } from 'mobx';
import { SettingsItemTypes, SettingsTypes } from '../types/settings.types';
import { settingsProvider } from '../providers/settings.provider';

export class AppStore {
  @observable
  private _settingList: SettingsTypes;

  @observable
  private _errorMessage: string;

  @computed
  get settingCity(): SettingsTypes {
    return this._settingList;
  }

  @computed
  set addCity(item: SettingsItemTypes) {
    this._settingList.cities.push(item);
  }

  @computed
  get errorMessage(): string {
    return this._errorMessage;
  }

  @computed
  set deleteCity(id: number) {
    if (this._settingList.cities.length === 1) {
      console.log('You can\'t delete the last item');
    } else {
      this._settingList.cities = this._settingList.cities.filter((item) => {
        return item.id !== id;
      });
    }
  }

  public getSettingList() {

    this.fetchSettings();
    // console.log(this._settingList);
  }

  private fetchSettings() {
      settingsProvider
      .fetchSettings()
      .then(action((settingCity: SettingsTypes) => {
        console.log(this._settingList);
        this._settingList = settingCity;
      }))
      .catch(action((e: XMLHttpRequest) => {
        this._errorMessage = e.statusText;
        throw new Error(e.statusText);
      }));
  }

}

export const appStore = new AppStore();