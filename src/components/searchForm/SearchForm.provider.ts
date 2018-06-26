import { apiConfigs } from '../../configs/apiConfigs';
import { BaseProvider } from '../../providers/base.provider';
import { WeatherTypes } from '../../types/currentWeather.types';
import { SettingsItemTypes } from '../../types/settings.types';

export class SearchFormProvider extends BaseProvider {
  fetchCityWeather(id: string): Promise<WeatherTypes> {
    return this.get<WeatherTypes>(`weather?q=${id}&appid=${apiConfigs.token}&units=metric`);
  }
}

export class NameProv extends BaseProvider {
  fetchName(id: string): Promise<SettingsItemTypes> {
    return this.get<SettingsItemTypes>(`weather?q=${id}&appid=${apiConfigs.token}&units=metric`);
  }
}
export const nameProv = new NameProv();
export const searchFormProvider = new SearchFormProvider();