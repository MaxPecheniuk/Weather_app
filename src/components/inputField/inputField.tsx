import * as React from 'react';
import { observer } from 'mobx-react';
import { SyntheticEvent } from 'react';

interface IInputFieldProps {
  value: string;
  classNames: string;
  placeholder: string;
  onChange: (inputText: string) => void;
}

@observer
export class InputField extends React.Component<IInputFieldProps> {

  onChange = (event: SyntheticEvent<HTMLInputElement>) => {
    this.props.onChange(event.currentTarget.value);
  }

  render() {
    return (
      <input
        className={`search-form__form__input-field${this.props.classNames}`}
        type="text"
        placeholder={this.props.placeholder}
        value={this.props.value}
        onChange={this.onChange}
      />
    );
  }
}
