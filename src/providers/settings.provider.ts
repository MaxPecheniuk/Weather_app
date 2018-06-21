import { SettingsTypes } from '../types/settings.types';
import { defaultCitiesConfig } from '../configs/defaultCities.config';

export class SettingsProvider {
  fetchSettings(): Promise<SettingsTypes> {
    return new Promise((resolve, reject) => {
        let settings = localStorage.getItem('__settingsOpenWeather__');
        console.log(settings);
        let data: SettingsTypes | null;
        if (settings === null) {
          data = defaultCitiesConfig;
        } else {
          console.log(settings);
          data = JSON.parse(settings);
        }
        if (data !== null) {
          console.log(data);
          resolve(data);
        } else {
          reject('Error get settings');
        }
      }
    );
  }
}

export const settingsProvider = new SettingsProvider();