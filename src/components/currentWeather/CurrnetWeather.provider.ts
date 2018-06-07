import { BaseProvider } from '../../providers/base.provider';
import { apiConfigs } from '../../configs/apiConfigs';
import { CurrentWeatherTypes } from '../../types/currentWeather.types';

export class CurrentWeatherProvider extends BaseProvider {
  fetchCurrentWeather(id: string): Promise<CurrentWeatherTypes> {
    return this.get<CurrentWeatherTypes>(`group?id=${id}&appid=${apiConfigs.token}&units=metric`);
  }
}

export const currentWeatherProvider = new CurrentWeatherProvider();
