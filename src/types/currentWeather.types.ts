export interface WeatherListTypes {
  list: Array<WeatherTypes>;
}

export interface WeatherTypes {
  coord: {
    lon: number;
    lat: number;
  };
  sys: {
    type: number;
    id: number;
    message: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  weather: Array<
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
  main: {
    temp: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
    sea_level: number;
    grnd_level: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  id: number;
  name: string;

}