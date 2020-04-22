import Head from 'next-server/head';
import classNames from 'classnames';
import { SyntheticEvent } from 'react';
import * as React from 'react';
import {
  Device,
  DeviceMap,
} from '../components/devices';
import '../styles/app-simulator.styl';
import '../styles/marvel-devices.styl';
import '../styles/marvel-styles.scss';

type AppSimulatorState = {
  readonly phone: Device;
  readonly color: string;
  readonly landscape: boolean;
}

class AppSimulator extends React.PureComponent<{}, AppSimulatorState> {
  state: AppSimulatorState = {
    color: 'black',
    phone: Device.IPhone8plus,
    landscape: false,
  };

  deviceSelected = (event: SyntheticEvent<HTMLSelectElement>) => {
    const device: Device = (event.target as HTMLSelectElement).value as Device;
    this.setState(() => ({
      phone: device,
    }));
  };

  colorClicked = (event: SyntheticEvent<HTMLLIElement>) => {
    const color: string = ((event.target as HTMLLIElement).getAttribute('data-color')) || '';
    this.setState(() => ({
      color,
    }));
  };

  landscapeClicked = () => {
    this.setState(({ landscape }) => ({ landscape: !landscape }));
  };

  render() {
    const { phone, color, landscape } = this.state;

    const { colorOptions, DeviceComponent } = DeviceMap[phone];

    return (
      <>
        <Head>
          <meta charSet="utf-8" />
          <meta
            httpEquiv="X-UA-Compatible"
            content="IE=edge"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
          />
          <meta
            name="description"
            content="Mobile app simulator"
          />

          {/*-- Favicon --*/}
          <link
            rel="shortcut icon"
            href="static/assets/images/favicon.ico"
          />
        </Head>
        <div className="config">
          <div className="device-picker">
            <h2
              className="device-picker__title"
            >
              Choose device
            </h2>
            <select
              className="device-picker__select"
              onChange={this.deviceSelected}
              value={phone}
            >
              {Object.keys(DeviceMap)
                .sort((deviceAKey, deviceBKey) =>
                  DeviceMap[deviceAKey].deviceName.localeCompare(DeviceMap[deviceBKey].deviceName),
                )
                .map(device => (
                  <option
                    key={device}
                    value={device}
                  >
                    {DeviceMap[device].deviceName}
                  </option>
                ))}
            </select>
          </div>
          <div className="color-picker activate-marvel-styles">
            <h2 className="color-picker__title">
              Choose color
            </h2>
            <ul className="selector">
              {colorOptions && colorOptions.map(({ name, selectorClassName }) => (
                <li
                  onClick={this.colorClicked}
                  key={name}
                  data-color={name}
                  className={classNames(selectorClassName, {
                    selected: name === this.state.color,
                  })}
                >
                  {name}
                </li>
              ))}
              <li
                onClick={this.landscapeClicked}
                className={classNames('select-landscape', { selected: landscape })}
              >
                Landscape
              </li>
            </ul>
          </div>
        </div>
        <div className="device-wrapper">
          <DeviceComponent
            color={color}
            landscape={landscape}
          >
            <iframe
              className="phone-emulator__iframe"
              src="/?no-scrollbar"
            />
          </DeviceComponent>
        </div>
      </>
    );
  }
}

export default AppSimulator;
