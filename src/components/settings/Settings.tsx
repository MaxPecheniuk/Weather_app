import * as React from 'react';
import { appStore } from '../../stores/app.store';
import { observer } from 'mobx-react';
import { defaultCitiesStore } from '../defaultCities/defaultCities.store';
import * as classnames from 'classnames';

import './Settings.scss';
import { observable } from 'mobx';

@observer
export class Settings extends React.Component {
  @observable
  showSettings: boolean = false;

  componentDidMount() {
    appStore.getSettingList();
  }

  updateLocalStorage() {
    localStorage.setItem('__settingsWeather__', JSON.stringify(appStore.settingCity));
  }

  clearLocalStorage() {
    localStorage.clear();
  }

  render() {
    let cityItem = null;
    let className = classnames('settings');
    if (appStore.settingCity !== undefined) {
      defaultCitiesStore.getData(appStore.settingCity);
      cityItem = appStore.settingCity.cities.map((item, index) => {
        return (
          <div
            className="settings__list__item"
            onClick={() => appStore.deleteCity = index}
            key={index}
          >
            {item.name}
          </div>
        );
      });
    }
    if (this.showSettings) {
      className += ' show';
    }
    return (
      <div className={className}>

        <div className="settings__wrapper">
          <img
            onClick={() => this.showSettings = !this.showSettings}
            className="settings__menu-btn"
            src={require('../../assets/menu-button.svg')}
          />
          <div className="settings__list">
            {cityItem}
            <div onClick={() => this.updateLocalStorage()}>
              Update list
            </div>
            <div
              onClick={() => this.clearLocalStorage()}
            >
              Reset list
            </div>
          </div>
        </div>
      </div>

    );
  }
}