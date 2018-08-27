import * as React from 'react';
import { SyntheticEvent } from 'react';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';
import { Redirect } from 'react-router';
import { appStore } from '../../stores/app.store';
import { searchFormStore } from './SearchForm.store';
import { SettingsItemTypes } from '../../types/settings.types';
import { InputField } from '../inputField/inputField';
import './searchForm.scss';

@observer
export class SearchForm extends React.Component {

  @observable
  private _redirect: boolean = false;

  @observable
  private _inputText: string = '';

  submitForm = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  searchCityWeather = () => {
    searchFormStore.getData(this._inputText);
    this._redirect = true;
  }

  addCity = () => {
    console.log(this._inputText);
    searchFormStore.getName(this._inputText);
  }

  render() {
    if (searchFormStore.currentCityWeather !== undefined) {
      return (
        this._redirect && (
          <Redirect to={'/city/' + searchFormStore.currentCityWeather.id}/>)
      );
    } else {
      if (searchFormStore.errorMessage) {
        return(this._redirect && (
          <Redirect to={'/NotFound/'}/>));
      }
      }

    if (searchFormStore.favoriteData !== undefined) {
      let cityItem: SettingsItemTypes = {
        name: searchFormStore.favoriteData.name,
        country: searchFormStore.favoriteData.country,
        id: searchFormStore.favoriteData.id
      };
      appStore.addCity = cityItem;
      localStorage.setItem('__settingsWeather__', JSON.stringify(appStore.settingCity));
    }

    return (
      <div className="search-form-wrapper">
        <form
          className="search-form__form"
          onSubmit={this.submitForm}
        >
          <InputField
            value={this._inputText}
            onChange={action((value: string) => this._inputText = value)}
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
                this.addCity();
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
    this._inputText = '';
  }
}