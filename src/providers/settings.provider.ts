import { SettingsTypes } from '../types/settings.types';
import { defaultCitiesConfig } from '../configs/defaultCities.config';

export class SettingsProvider {
  fetchSettings(): Promise<SettingsTypes> {
    return new Promise((resolve, reject) => {
        let settings = localStorage.getItem('__settingsWeather__');
        let data: SettingsTypes | null;
        if (settings === null) {
          data = defaultCitiesConfig;
        } else {
          data = JSON.parse(settings);
        }
        if (data !== null) {
          resolve(data);
        } else {
          reject('Error get settings');
        }
      }
    );
  }
}

export const settingsProvider = new SettingsProvider();