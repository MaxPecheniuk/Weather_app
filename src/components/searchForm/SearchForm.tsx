import * as React from 'react';
import { InputField } from '../inputField/inputField';
import { SyntheticEvent } from 'react';
import { observer } from 'mobx-react';
import { action, observable, reaction } from 'mobx';
import { searchFormStore } from './SearchForm.store';
// import { Redirect } from 'react-router';

import './searchForm.scss';
import { SettingsItemTypes } from '../../types/settings.types';
import { appStore } from '../../stores/app.store';
// import { appStore } from '../../stores/app.store';

// TODO: REFACTOR THIS CLASS
@observer
export class SearchForm extends React.Component {

  // @observable
  // private _redirect: boolean = false;

  @observable
  private _inputText: string = '';

  submitForm = (event: SyntheticEvent<HTMLFormElement> | React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    // searchFormStore.getData(this._inputText);
    // this._redirect = true;
    // if (this._inputText.length > 0 && this._inputText !== ' ') {
    //
    // }
  }

  add = () => {
    console.log(this._inputText);
    searchFormStore.getName(this._inputText);
    reaction(() => searchFormStore.favoriteData, (city) => console.log(city));
    console.log(searchFormStore.favoriteData);

    // appStore.addCity = searchFormStore.favoriteData;
  }

  render() {
    // if (searchFormStore.currentCityWeather !== undefined) {
    //   return (
    //     this._redirect && (
    //       <Redirect to={'/city/' + searchFormStore.currentCityWeather.id}/>)
    //   );
    // }
    if (searchFormStore.favoriteData !== undefined) {
      let a: SettingsItemTypes = {
        name: searchFormStore.favoriteData.name,
        country: searchFormStore.favoriteData.country,
        id: searchFormStore.favoriteData.id
      };
      console.log(a);
      appStore.addCity = a;
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
          <button
            className="search-form__form__submit-btn"
            onClick={this.submitForm}
          >
            Search
          </button>
          <button
            onClick={this.add}
          >
            test
          </button>

        </form>
      </div>
    );
  }
}