import { action, computed, observable } from 'mobx';
import { SettingsTypes } from '../types/settings.types';
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

  // @computed
  // set addCity(item: SettingsItemTypes) {
  //   this._settingList.cities.push(item);
  // }

  @computed
  get errorMessage(): string {
    return this._errorMessage;
  }

  @computed
  set deleteCity(id: any) {
    if (this._settingList.cities.length === 1) {
      console.log('You can\'t delete the last item');
    } else {
      this._settingList.cities.splice(id, 1);
    }
  }

  public getSettingList() {
    this.fetchSettings();
  }

  private fetchSettings() {
    settingsProvider
      .fetchSettings()
      .then(action((settingCity: SettingsTypes) => {
        this._settingList = settingCity;
      }))
      .catch(action((e: XMLHttpRequest) => {
        this._errorMessage = e.statusText;
        throw new Error(e.statusText);
      }));
  }

}

export const appStore = new AppStore();