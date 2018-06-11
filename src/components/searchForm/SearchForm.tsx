import * as React from 'react';
import { InputField } from '../InputField/InputField';
import { SyntheticEvent } from 'react';
import { observer } from 'mobx-react';
import { action, observable, reaction } from 'mobx';
import { searchFormStore } from './SearchForm.store';
import { Redirect } from 'react-router';

import './searchForm.scss';

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
    if (searchFormStore.currentCityWeather !== undefined) {
      return (
        this._redirect && (
          <Redirect to={'/city/' + searchFormStore.currentCityWeather.id}/>)

      );
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
        </form>
      </div>
    );
  }
}
//
//
// import * as React from 'react';
// import { InputField } from '../InputField/InputField';
// import { SyntheticEvent } from 'react';
// import { observer } from 'mobx-react';
// import { action, observable, reaction } from 'mobx';
// import { searchFormStore } from './SearchForm.store';
// // import { Redirect } from 'react-router';
// import { History } from 'history';
//
// interface LoginPageComponentProps {
//   history: History;
// }
//
// import './searchForm.scss';
//
// @observer
// export class SearchForm extends React.Component<LoginPageComponentProps> {
//
//   // @observable
//   // private _redirect: boolean = false;
//
//   @observable
//   private _inputText: string = '';
//
//   submitForm = (event: SyntheticEvent<HTMLFormElement> | React.MouseEvent<HTMLElement>) => {
//     event.preventDefault();
//     searchFormStore.getData(this._inputText);
//
//     reaction(() => searchFormStore.currentCityWeather, (currentCityWeather) => console.log(currentCityWeather.id));
//
//   }
//
//   render() {
//     if (searchFormStore.currentCityWeather !== undefined) {
//       this.props.history.replace('/city/' + searchFormStore.currentCityWeather.id);
//     }
//
//     return (
//       <div className="search-form-wrapper">
//         <form
//           className="search-form__form"
//           onSubmit={this.submitForm}
//         >
//           <InputField
//             value={this._inputText}
//             onChange={action((value: string) => this._inputText = value)}
//           />
//           <button
//             className="search-form__form__submit-btn"
//             onClick={this.submitForm}
//           >
//             Search
//           </button>
//         </form>
//       </div>
//     );
//   }
// }