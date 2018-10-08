import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import * as classnames from 'classnames';
import { settingsStore } from './Settings.store';
import { favoriteCitiesStore } from '../favoriteCities/FavoriteCities.store';
import './Settings.scss';

@observer
export class Settings extends React.Component {

  @observable
  private _showSettingsToggle: boolean = false;

  render() {
    let cityItem = null;
    let toggleClassName = classnames('');
    if (settingsStore.settingsList !== undefined) {
      favoriteCitiesStore.getData(settingsStore.settingsList);
      cityItem = settingsStore.settingsList.map((item, index) => {
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
              onClick={() => settingsStore.deleteCity = index}
            />
          </div>
        );
      });
    }

    if (this._showSettingsToggle) {
      toggleClassName = ' show';
    }

    return (
      <div className={`settings${toggleClassName}`}>
        <img
          onClick={() => this._showSettingsToggle = !this._showSettingsToggle}
          className={`settings__menu-btn${toggleClassName}`}
          src={require('../../assets/menu-button.svg')}
        />
        <div className="settings__app-name">Weather and forecast</div>

        <div className="settings__wrapper">
          <div className="settings__list">
            {cityItem}
            <div className="settings__wrapper__control-btn">
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
    localStorage.setItem('__settingsWeather__', JSON.stringify(settingsStore.settingsList));
  }

  private clearLocalStorage() {
    localStorage.clear();
  }
}