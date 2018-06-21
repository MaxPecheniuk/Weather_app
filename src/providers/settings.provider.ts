import { SettingsTypes } from '../types/settings.types';
import { defaultCitiesConfig } from '../configs/defaultCities.config';

export class SettingsProvider {
  fetchSettings(): Promise<SettingsTypes> {
    return new Promise(
      (resolve, reject) => {
        const xhr = localStorage.getItem('__settingsWeather__');
        let data: SettingsTypes | null;
        if (xhr === null) {
          data = defaultCitiesConfig;
        } else {
          data = JSON.parse(xhr);
        }
        if (data !== null) {
          resolve(data);
          console.log(data);
        } else {
          reject('Error get settings');
        }
      }
    );
  }
}

export const settingsProvider = new SettingsProvider();