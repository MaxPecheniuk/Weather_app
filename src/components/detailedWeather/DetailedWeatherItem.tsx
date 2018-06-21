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
  private showDetailFlag = false;

  render() {
    let className = classnames('list-item__weather-forecast__detailed-list');
    let showDetailButton = null;

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
              src={require('../../assets/humidity.svg')}
              alt=""
            />
            <div className="detailed-item__weather-data__text-block">
              <div className="detailed-item__weather-data__text-block__name">Humidity</div>
              <div className="__detailed-item__weather-data__text-block__value">
                {item.main.humidity}%
              </div>
            </div>
          </div>
          <div className="detailed-item__weather-data">
            <img
              className="detailed-item__weather-data__weather-icon"
              src={require('../../assets/pressure.svg')}
              alt=""
            />
            <div className="detailed-item__weather-data__text-block">
              <div className="detailed-item__weather-data__text-block__name">Pressure</div>
              <div className="detailed-item__weather-data__value">{item.main.pressure} hPa</div>
            </div>
          </div>
          <div className="detailed-item__weather-data">
            <img
              className="detailed-item__weather-data__weather-icon"
              src={require('../../assets/wind.svg')}
              alt=""
            />
            <div className="detailed-item__weather-data__text-block">
              <div className="detailed-item__weather-data__text-block__name">Wind</div>
              <div className="detailed-item__weather-data__text-block__value">
                {item.wind.speed} m/s
              </div>
            </div>
          </div>
        </div>
      );
    });

    if (!this.showDetailFlag) {
      showDetailButton = <span>Show details</span>;
      className += ' hide';
    } else {
      showDetailButton = <span>Hide details</span>;
    }

    return (
      <div className="detailed-weather__list-item">
        <div className="list-item__date">
          {this.props.weatherData.date}
        </div>
        <div className="list-item__weather-forecast">
          <div className="list-item__weather-forecast__by-hours">
            {weatherByHours}
          </div>
          <div
            onClick={() => this.showDetailFlag = !this.showDetailFlag}
            className="detailed-forecast-show-btn"
          >
            {showDetailButton}
          </div>
          <div className={className}>
            {detailsWeather}
          </div>
        </div>

      </div>
    );
  }
}

// import * as React from 'react';
// import { observer } from 'mobx-react';
// import { observable } from 'mobx';
// import * as classnames from 'classnames';
// import { apiConfigs } from '../../configs/apiConfigs';
// import { WeatherByDateTypes } from '../../types/weatherByDate.types';
//
// interface DetailedWeatherItemProps {
//   weatherData: WeatherByDateTypes;
// }
//
// @observer
// export class DetailedWeatherItem extends React.Component<DetailedWeatherItemProps> {
//   @observable
//   private showDetailFlag = false;
//
//   render() {
//     let className = classnames('list-item__weather-forecast detailed-forecast');
//     let testt = null;
//     if (!this.showDetailFlag) {
//       testt = <span>Show</span>;
//       className += ' hide';
//     } else {
//       testt = <span>hide</span>;
//     }
//
//     return (
//       <div className="detailed-weather__list-item">
//         <div className="list-item__date">
//           {this.props.weatherData.date}
//         </div>
//
//         <div className="list-item__weather-forecast">
//           {this.props.weatherData.weatherData.map((item, i) => {
//             return (
//               <div key={i} className="list-item__weather-forecast__weather-data">
//                 <div className="list-item__weather-forecast__time">
//                   {new Date(item.dt * 1000).toLocaleTimeString(
//                     'ru', {hour: 'numeric', minute: 'numeric'})}
//                 </div>
//                 <div className="list-item__weather-forecast__weather-condition">
//                   <div className="list-item__weather-forecast__weather-condition__description">
//                     {item.weather[0].description}
//                   </div>
//                   <img src={apiConfigs.conditionIconUrl + item.weather[0].icon + '.png'} alt=""/>
//                 </div>
//                 <div className="list-item__weather-forecast__current-temp">
//                   {Math.round(item.main.temp)}°C
//                 </div>
//               </div>
//             );
//           })}
//
//         </div>
//         <div
//           onClick={() => {
//             console.log(this.showDetailFlag);
//             this.showDetailFlag = !this.showDetailFlag;
//           }}
//           className="detailed-forecast-show-btn"
//         >
//           {testt}
//         </div>
//           {this.props.weatherData.weatherData.map((item, i) => {
//             return (
//               <div className={className} key={i}>
//                 <div className="city-list-item__details-item">
//                       <img className="weather-icon" src={require('../../assets/humidity.svg')} alt=""/>
//                       <div className="city-list-item__details-item__text-block">
//                           <div className="text-block__name">Humidity</div>
//                           <div className="text-block__value">{item.main.humidity}%</div>
//                       </div>
//                   </div>
//                 <div className="city-list-item__details-item">
//                   <img className="weather-icon" src={require('../../assets/pressure.svg')} alt=""/>
//                   <div className="city-list-item__details-item__text-block">
//                     <div className="text-block__name">Pressure</div>
//                     <div className="text-block__value">{item.main.pressure} hPa</div>
//                   </div>
//                 </div>
//                 <div className="city-list-item__details-item">
//                   <img className="weather-icon" src={require('../../assets/wind.svg')} alt=""/>
//                   <div className="city-list-item__details-item__text-block">
//                     <div className="text-block__name">Wind</div>
//                     <div className="text-block__value">
//                       {item.wind.speed} m/s
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//
//         </div>
//
//     );
//   }
// }