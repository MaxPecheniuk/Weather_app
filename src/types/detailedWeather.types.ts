export interface DetailedWeatherTypes {
    dt: number;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
    };
    sys: {
      pod: string;
    };
    dt_txt: string;
}

export interface DetailedWeatherCityTypes {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
}