import * as React from 'react';
import { InputField } from '../InputField/InputField';
import { SyntheticEvent } from 'react';

export class SearchForm extends React.Component {

  submitForm = (event: SyntheticEvent<HTMLFontElement>) => {
    event.preventDefault();

  }
  render() {

    return (
      <form>
        <InputField/>
      </form>
    );
  }
}