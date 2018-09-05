import * as React from 'react';
import { appStore } from '../../stores/app.store';
import { observer } from 'mobx-react';
import { favoriteCitiesStore } from '../favoriteCities/FavoriteCities.store';
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

  render() {
    let cityItem = null;
    // let appName = <div/>;
    let classNameBtn = classnames('settings');
    let classNameItem = classnames('settings__menu-btn');
    if (appStore.settingCity !== undefined) {

      favoriteCitiesStore.getData(appStore.settingCity);
      cityItem = appStore.settingCity.cities.map((item, index) => {
        return (
          <div
            key={index}
            className="settings__list__item"
          >
            <div className="settings__list__item__city-name">
              {item.name}
            </div>
            <img
              className="settings__list__item__delete-item"
              src={require('../../assets/cross.svg')}
              onClick={() => appStore.deleteCity = index}
            />
          </div>
        );
      });
    }

    if (this.showSettings) {
      classNameBtn += ' show';
      classNameItem += ' show';
    }

    return (
      <div className={classNameBtn}>

        <img
          onClick={() => this.showSettings = !this.showSettings}
          className={classNameItem}
          src={require('../../assets/menu-button.svg')}
        />
        {/*{appName}*/}
        <div className="settings__app-name">Weather and forecast</div>

        <div className="settings__wrapper">
          <div className="settings__list">
            {cityItem}
            <div className="settings__wrapper__control-btn">
              {/*<button*/}
                {/*className="settings__wrapper__control-btn__item"*/}
                {/*onClick={() => this.updateLocalStorage()}*/}
              {/*>*/}
                {/*Save*/}
              {/*</button>*/}
              <button
                className="settings__wrapper__control-btn__item"
                onClick={() => this.clearLocalStorage()}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

    );
  }
  public updateLocalStorage() {
    localStorage.setItem('__settingsWeather__', JSON.stringify(appStore.settingCity));
  }

  private clearLocalStorage() {
    localStorage.clear();
  }
}