import * as React from 'react';
import { appStore } from '../../stores/app.store';
import { reaction } from 'mobx';
import {  SettingsTypes } from '../../types/settings.types';
import { observer } from 'mobx-react';
import { defaultCitiesStore } from '../defaultCities/DefaultCities.store';
// import { detailedWeatherStore } from '../detailedWeather/DetailedWeather.store';
// import { defaultCitiesStore } from '../defaultCities/DefaultCities.store';

@observer
export class Settings extends React.Component {
  componentDidMount() {
    appStore.getSettingList();

    reaction(() => appStore.settingCity, (item: SettingsTypes) => console.log(item));

  }

  del() {
    localStorage.setItem('__settingsOpenWeather__', JSON.stringify(appStore.settingCity));

    let a = localStorage.getItem('__settingsOpenWeather__');
    console.log(a);

    // localStorage.removeItem('__settingsOpenWeather__');
  }

  deleteLocalStorage() {
    localStorage.removeItem('__settingsOpenWeather__');
  }

  render() {
    let cityItem = null;
    if (appStore.settingCity !== undefined) {
      console.log(appStore.settingCity);
      let a = appStore.settingCity;
      defaultCitiesStore.getData(a);

      cityItem = appStore.settingCity.cities.map((item, i) => {

        return (
          <div
            className="item"
            onClick={() => {
              this.del();
              appStore.deleteCity(item.id);
            }}
            key={i}
          >
            {item.name}
          </div>
        );
      });
    }
    return (
      <div className="par">
        {cityItem}
        <div onClick={() => this.deleteLocalStorage()}>
          ffff
        </div>
      </div>
    );
  }
}