import * as React from 'react';
import { appStore } from '../../stores/app.store';
import { reaction } from 'mobx';
// import {  SettingsTypes } from '../../types/settings.types';

export class Settings extends React.Component {
  componentDidMount() {
    console.log('bbb');
    appStore.getSettingList();
    reaction(() => appStore.settingCity, (item) => {
      console.log('aaa');
      console.log(item);
    });

  }

  render() {
    return (
      <div>
        test
      </div>
    );
  }
}