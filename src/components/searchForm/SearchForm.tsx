import * as React from 'react';
import { SyntheticEvent } from 'react';
import { observer } from 'mobx-react';
import { action, observable, reaction } from 'mobx';
import { Redirect } from 'react-router';
import * as classnames from 'classnames';
import { settingsStore } from '../settings/Settings.store';
import { searchFormStore } from './SearchForm.store';
import { SettingsItemTypes } from '../../types/settings.types';
import { InputField } from '../inputField/inputField';

import './searchForm.scss';

@observer
export class SearchForm extends React.Component {

  @observable
  private _inputTextValue: string = '';

  @observable
  private _redirect: boolean = false;

  @observable
  private _className: string = classnames('');

  @observable
  private _placeholder: string = 'Enter city name';

  submitForm = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  searchCityWeather = () => {
    if (this._inputTextValue.length > 0 && this._inputTextValue !== ' ') {
      searchFormStore.getData(this._inputTextValue);
      this._redirect = true;
    }
  }

  addCityToFavorite = () => {
    if (this._inputTextValue.length > 0 && this._inputTextValue !== ' ') {
      searchFormStore.getName(this._inputTextValue);
      this._redirect = true;
    }

    reaction(() => searchFormStore.favoriteList, (item: SettingsItemTypes) => {
      if (settingsStore.settingsList.find((obj) => obj.id === searchFormStore.favoriteList.id)) {
        this._className = (' incorrect');
        this._placeholder = 'The city is already in favorite list';
      } else {
        item = {
          id: item.id,
          name: item.name,
          sys: {
            country: item.sys.country,
          },
        };
        settingsStore.addCity = item;
      }

    });
  }

  render() {
    reaction(() => this._inputTextValue.length, (length) => {
      if (length > 0) {
        this._className = '';
        this._placeholder = 'Enter city name';
      }
    });

    if (searchFormStore.currentCityWeather !== undefined) {
      if (this._redirect) {
        return <Redirect push={true} to={'/city/' + searchFormStore.currentCityWeather.id}/>;
      }
    } else {
      if (searchFormStore.errorMessage) {
        if (this._redirect) {
          return <Redirect push={true} to={'/NotFound/'}/>;
        }
      }
    }

    return (
      <div className="search-form-wrapper">
        <form
          className="search-form__form"
          onSubmit={this.submitForm}
        >
          <InputField
            classNames={this._className}
            value={this._inputTextValue}

            placeholder={this._placeholder}
            onChange={action((value: string) => this._inputTextValue = value)}
          />
          <div className="search-form__form__control-panel">
            <button
              className="search-form__form__control-panel__submit-btn"
              onClick={this.searchCityWeather}
            >
              Search
            </button>
            <button
              className="search-form__form__control-panel__submit-btn"
              onClick={() => {
                this.addCityToFavorite();
                this.clearInput();
              }}
            >
              Add to favorite
            </button>
          </div>
        </form>
      </div>
    );
  }

  private clearInput() {
    this._inputTextValue = '';
  }
}