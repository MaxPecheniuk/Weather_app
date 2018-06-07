import { BaseProvider } from '../../providers/base.provider';
import { apiConfigs } from '../../configs/apiConfigs';
import { DetailedWeatherTypes } from '../../types/detailedWeather.types';

export class DetailedWeatherProvider extends BaseProvider {
  fetchDetailedWeather(id: string): Promise<DetailedWeatherTypes> {
    return this.get<DetailedWeatherTypes>(`forecast?id=${id}&appid=${apiConfigs.token}&units=metric&cnt=8`);
  }
}

export const detailedWeatherProvider = new DetailedWeatherProvider();