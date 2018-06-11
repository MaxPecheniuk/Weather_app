import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import * as classnames from 'classnames';
import { apiConfigs } from '../../configs/apiConfigs';
import { WeatherByDateTypes } from '../../types/weatherByDate.types';

interface DetailedWeatherItemProps {
  weatherData: WeatherByDateTypes;
}

@observer
export class DetailedWeatherItem extends React.Component<DetailedWeatherItemProps> {
  @observable
  private showDetailFlag = true;

  render() {
    let className = classnames('detailed-forecast');
    if (this.showDetailFlag) {
      className += ' hide';
    }

    return (
      <div className="detailed-weather__list-item">
        <div className="time">
          {/*{new Date(this.props.weatherData.date).toLocaleDateString(*/}
            {/*'us', {day: '2-digit', month: '2-digit'})}*/}
          {this.props.weatherData.date}
        </div>
        <div onClick={() => this.showDetailFlag = !this.showDetailFlag}>
          See More
        </div>
        <div className={className}>
        {this.props.weatherData.weatherData.map((item, i) => {
          return (
            <div key={i} className="city-list-item__main__weather-data ">
              <div>
                {new Date(item.dt * 1000).toLocaleTimeString(
                  'ru', {hour: 'numeric', minute: 'numeric'})}
              </div>
              <div className="city-list-item__main__weather-condition">
                <div className="city-list-item__main__weather-condition__description">
                  {item.weather[0].description}
                </div>
                <img src={apiConfigs.conditionIconUrl + item.weather[0].icon + '.png'} alt=""/>
              </div>
              <div className="city-list-item__main__current-temp">
                {Math.round(item.main.temp)}°C
              </div>
            </div>
          );
        })}
        </div>

      </div>
    );
  }
}