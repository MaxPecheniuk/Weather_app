import * as React from 'react';
import { InputField } from '../InputField/InputField';
import { SyntheticEvent } from 'react';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';
import { currentWeatherStore } from '../currentWeather/CurrentWeather.store';

@observer
export class SearchForm extends React.Component {

  @observable
   private _inputText: string;

  submitForm = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    currentWeatherStore.getData(this._inputText);
    console.log(currentWeatherStore.currentWeather);

  }

  render() {

    return (
      <form onSubmit={this.submitForm}>
        <InputField
          value={this._inputText}
          onChange={action((value: string) => this._inputText = value)}
        />
      </form>
    );
  }
}