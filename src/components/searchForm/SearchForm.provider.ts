import { apiConfigs } from '../../configs/apiConfigs';
import { BaseProvider } from '../../providers/base.provider';
import { WeatherTypes } from '../../types/currentWeather.types';
import { SettingsItemTypes } from '../../types/settings.types';

export class SearchCityWeatherProvider extends BaseProvider {
  fetchCityWeather(id: string): Promise<WeatherTypes> {
    return this.get<WeatherTypes>(`weather?q=${id}&appid=${apiConfigs.token}&units=metric`);
  }
}

export class SearchCityNameProvider extends BaseProvider {
  fetchName(id: string): Promise<SettingsItemTypes> {
    return this.get<SettingsItemTypes>(`weather?q=${id}&appid=${apiConfigs.token}&units=metric`);
  }
}
export const searchCityNameProvider = new SearchCityNameProvider();
export const searchCityWeatherProvider = new SearchCityWeatherProvider();