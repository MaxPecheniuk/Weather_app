import * as React from 'react';
import { observer } from 'mobx-react';
import { SyntheticEvent } from 'react';

interface IInputFieldProps {
  value: string;
  onChange: (inputText: string) => void;
}

@observer
export class InputField extends React.Component<IInputFieldProps> {

  onChange = (event: SyntheticEvent<HTMLInputElement>) => {
    this.props.onChange(event.currentTarget.value);
  }

  render() {
    return (
      <div className="search-form__form__input-wrapper">
        <input
          className="search-form__form__input-field"
          type="text"
          value={this.props.value}
          onChange={this.onChange}
        />
      </div>
    );
  }
}