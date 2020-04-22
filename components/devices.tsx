import classNames from 'classnames';
import { NextFC } from 'next';
import * as React from 'react';


interface IPhoneProps {
  readonly color: string;
  readonly landscape: boolean;
}

const IPhoneX: NextFC<IPhoneProps> = ({ color, children, landscape }) => (
  <div className={classNames('phone-emulator marvel-device iphone-x', color, { landscape })}>
    <div className="notch">
      <div className="camera" />
      <div className="speaker" />
    </div>
    <div className="top-bar" />
    <div className="sleep" />
    <div className="bottom-bar" />
    <div className="volume" />
    <div className="overflow">
      <div className="shadow shadow--tr" />
      <div className="shadow shadow--tl" />
      <div className="shadow shadow--br" />
      <div className="shadow shadow--bl" />
    </div>
    <div className="inner-shadow" />
    <div className="screen">
      {children}
    </div>
  </div>
);

const IPhone8: NextFC<IPhoneProps> = ({ color, children, landscape }) => (
  <div className={classNames('phone-emulator marvel-device iphone8', color, { landscape })}>
    <div className="top-bar" />
    <div className="sleep" />
    <div className="volume" />
    <div className="camera" />
    <div className="sensor" />
    <div className="speaker" />
    <div className="screen">
      {children}
    </div>
    <div className="home" />
    <div className="bottom-bar" />
  </div>
);

const IPhone8plus: NextFC<IPhoneProps> = ({ color, children, landscape }) => (
  <div className={classNames('phone-emulator marvel-device iphone8plus', color, { landscape })}>
    <div className="top-bar" />
    <div className="sleep" />
    <div className="volume" />
    <div className="camera" />
    <div className="sensor" />
    <div className="speaker" />
    <div className="screen">
      {children}
    </div>
    <div className="home" />
    <div className="bottom-bar" />
  </div>
);

const IPhone5s: NextFC<IPhoneProps> = ({ color, children, landscape }) => (
  <div className={classNames('phone-emulator marvel-device iphone5s', color, { landscape })}>
    <div className="top-bar" />
    <div className="sleep" />
    <div className="volume" />
    <div className="camera" />
    <div className="sensor" />
    <div className="speaker" />
    <div className="screen">
      {children}
    </div>
    <div className="home" />
    <div className="bottom-bar" />
  </div>
);


const GalaxyNote8: NextFC<IPhoneProps> = ({ color, children, landscape }) => (
  <div className={classNames('marvel-device note8', color, { landscape })}>
    <div className="inner" />
    <div className="overflow">
      <div className="shadow" />
    </div>
    <div className="speaker" />
    <div className="sensors" />
    <div className="more-sensors" />
    <div className="sleep" />
    <div className="volume" />
    <div className="camera" />
    <div className="screen">
      {children}
    </div>
  </div>
);

export enum Device {
  IPhone5s = 'IPhone5s',
  IPhone8 = 'IPhone8',
  IPhone8plus = 'IPhone8plus ',
  IPhoneX = 'IPhoneX',
  GalaxyNote8 = 'GalaxyNote8'
}

interface IColorOption {
  readonly name: string;
  readonly selectorClassName: string;
}

interface IDeviceInfo {
  readonly deviceName: string;
  readonly DeviceComponent: NextFC<IPhoneProps>;
  readonly colorOptions?: ReadonlyArray<IColorOption>;
}

interface IDeviceMap {
  [key: string]: IDeviceInfo
}

export const DeviceMap: IDeviceMap = {
  [Device.GalaxyNote8]: {
    deviceName: 'Galaxy Note 8',
    DeviceComponent: GalaxyNote8,
  },
  [Device.IPhoneX]: {
    deviceName: 'iPhone X',
    DeviceComponent: IPhoneX,
  },
  [Device.IPhone5s]: {
    deviceName: 'iPhone 5S',
    DeviceComponent: IPhone5s,
    colorOptions: [
      {
        name: 'gold',
        selectorClassName: 'select-gold',
      },
      {
        name: 'black',
        selectorClassName: 'select-black',
      },
      {
        name: 'silver',
        selectorClassName: 'select-silver',
      },
    ],
  },
  [Device.IPhone8]: {
    deviceName: 'iPhone 8',
    DeviceComponent: IPhone8,
    colorOptions: [
      {
        name: 'gold',
        selectorClassName: 'select-gold',
      },
      {
        name: 'black',
        selectorClassName: 'select-black',
      },
      {
        name: 'silver',
        selectorClassName: 'select-silver',
      },
    ],
  },
  [Device.IPhone8plus]: {
    deviceName: 'iPhone 8 Plus',
    DeviceComponent: IPhone8plus,
    colorOptions: [
      {
        name: 'gold',
        selectorClassName: 'select-gold',
      },
      {
        name: 'black',
        selectorClassName: 'select-black',
      },
      {
        name: 'silver',
        selectorClassName: 'select-silver',
      },
    ],
  },
};
