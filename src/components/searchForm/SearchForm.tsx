import * as React from 'react';
import { InputField } from '../InputField/InputField';
import { SyntheticEvent } from 'react';
import { observer } from 'mobx-react';
import { action, observable, reaction } from 'mobx';
import { searchFormStore } from './SearchForm.store';
import { Redirect } from 'react-router';

@observer
export class SearchForm extends React.Component {

  @observable
  private _redirect: boolean = false;

  @observable
  private _inputText: string = '';

  submitForm = (event: SyntheticEvent<HTMLFormElement> | React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    searchFormStore.getData(this._inputText);
    this._redirect = true;
    reaction(() => searchFormStore.currentCityWeather, (currentCityWeather) => console.log(currentCityWeather.id));

  }

  render() {
    let item = null;
    if (searchFormStore.currentCityWeather !== undefined) {
      return(  item =
        this._redirect && (
            <Redirect to={'/city/' + searchFormStore.currentCityWeather.id}/>)

      );
    }

    return (
      <div>
        <form onSubmit={this.submitForm}>
          <InputField
            value={this._inputText}
            onChange={action((value: string) => this._inputText = value)}
          />
          <button onClick={this.submitForm}>
            Search
          </button>
        </form>
        {item}
      </div>
    );
  }
}