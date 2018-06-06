import { BaseProvider } from '../../providers/base.provider';
import { apiConfigs } from '../../configs/apiConfigs';
import { DetailedWeatherCityTypes, DetailedWeatherTypes } from '../../types/detailedWeather.types';

// TODO: refactor provider and store (response don`t have list or name)extends Base provider
export class DetailedWeatherProvider extends BaseProvider {
  fetchDetailedWeather(id: string): Promise<Array<DetailedWeatherTypes>> {
    return this.get<Array<DetailedWeatherTypes>>(`forecast?id=${id}&appid=${apiConfigs.token}&units=metric&cnt=8`);
  }
}
// TODO: refactor provider and store (response don`t have list or name)extends Base provider
export class DetailedCityNameProvider {
  fetchDetailedCityName(id: string): Promise<DetailedWeatherCityTypes> {
    return new Promise<DetailedWeatherCityTypes>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const uri = `${apiConfigs.apiUrl}forecast?id=${id}&appid=${apiConfigs.token}&lang=ru&units=metric`;
        xhr.open('GET', uri);
        xhr.send();
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              const response = JSON.parse(xhr.response);
              resolve(response.city);
            } else {
              reject(xhr);
            }
          }
        };
      }
    );
  }
}

export const detailedWeatherProvider = new DetailedWeatherProvider();
export const detailedCityNameProvider = new DetailedCityNameProvider();