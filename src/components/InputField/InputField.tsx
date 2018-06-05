import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { SyntheticEvent } from 'react';
// import { SyntheticEvent } from 'react';

@observer
export class InputField extends React.Component {
  @observable
  private inputValue: string = '';

  get searchCity(): string {
    return this.inputValue;
  }

  handlerInputChange = (event: SyntheticEvent<HTMLInputElement>) => {
    // console.log(event.target.addEventListener);
    this.inputValue = event.currentTarget.value;
    console.log(this.inputValue);
  }
  render() {

    return (
      <div>
        <input
          type="text"
          value={this.inputValue}
          onChange={this.handlerInputChange}
        />

      </div>
    );
  }
}