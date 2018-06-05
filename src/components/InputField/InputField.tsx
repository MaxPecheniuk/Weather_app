import * as React from 'react';
import { observer } from 'mobx-react';
import { SyntheticEvent } from 'react';

interface Props {
  value: string;
  onChange: (inputText: string) => void;
}

@observer
export class InputField extends React.Component<Props> {

  onChange = (event: SyntheticEvent<HTMLInputElement>) => {
    this.props.onChange(event.currentTarget.value);
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.props.value}
          onChange={this.onChange}
        />
      </div>
    );
  }
}