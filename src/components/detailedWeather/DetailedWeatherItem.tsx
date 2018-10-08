import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import * as classnames from 'classnames';
import { apiConfigs } from '../../configs/apiConfigs';
import { WeatherByDateTypes } from '../../types/weatherByDate.types';

interface IDetailedWeatherItemProps {
  weatherData: WeatherByDateTypes;
}

@observer
export class DetailedWeatherItem extends React.Component<IDetailedWeatherItemProps> {

  @observable
  private showDetailFlag = false;

  render() {
    let className = classnames('detailed-weather__list-item__weather-forecast__detailed-weather');
    const weatherByHours = this.props.weatherData.weatherData.map((item, i) => {
      return (
        <div key={i} className="list-item__weather-forecast__weather-data">
          <div className="list-item__weather-forecast__time">
            {new Date(item.dt * 1000).toLocaleTimeString(
              'ru', {hour: 'numeric', minute: 'numeric'})}
          </div>
          <div className="list-item__weather-forecast__weather-condition">
            <div className="list-item__weather-forecast__weather-condition__description">
              {item.weather[0].description}
            </div>
            <img src={apiConfigs.conditionIconUrl + item.weather[0].icon + '.png'} alt=""/>
          </div>
          <div className="list-item__weather-forecast__current-temp">
            {Math.round(item.main.temp)}°C
          </div>
        </div>
      );
    });

    const detailsWeather = this.props.weatherData.weatherData.map((item, i) => {
      return (
        <div className="list-item__weather-forecast__detailed__item" key={i}>
          <div className="detailed-item__weather-data">
            <img
              className="detailed-item__weather-data__weather-icon"
              src={require('../../assets/humidity_white.svg')}
              alt=""
            />
            <div className="detailed-item__weather-data__text-block">
              <div className="detailed-item__weather-data__text-block__name">Humidity</div>
              <div className="detailed-item__weather-data__text-block__value">
                {Math.round(item.main.humidity)}%
              </div>
            </div>
          </div>
          <div className="detailed-item__weather-data">
            <img
              className="detailed-item__weather-data__weather-icon"
              src={require('../../assets/pressure_white.svg')}
              alt=""
            />
            <div className="detailed-item__weather-data__text-block">
              <div className="detailed-item__weather-data__text-block__name">Pressure</div>
              <div className="detailed-item__weather-data__text-block__value">{Math.round(item.main.pressure)} hPa</div>
            </div>
          </div>
          <div className="detailed-item__weather-data">
            <img
              className="detailed-item__weather-data__weather-icon"
              src={require('../../assets/wind-white.svg')}
              alt=""
            />
            <div className="detailed-item__weather-data__text-block">
              <div className="detailed-item__weather-data__text-block__name">Wind</div>
              <div className="detailed-item__weather-data__text-block__value">
                {Math.round(item.wind.speed)} m/s
              </div>
            </div>
          </div>
        </div>
      );
    });

    if (!this.showDetailFlag) {
      className += ' hide';
    }

    return (
      <div className="detailed-weather__list-item">
        <div className="detailed-weather__list-item__date">
          {this.props.weatherData.date}
        </div>
        <div className="detailed-weather__list-item__weather-forecast">

          <div
            className="detailed-weather__list-item__weather-forecast__by-hours"
            onClick={() => this.showDetailFlag = !this.showDetailFlag}
          >
            {weatherByHours}
          </div>
          <div className={className}>
            {detailsWeather}
          </div>

        </div>
      </div>

    );
  }
}