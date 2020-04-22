import { ValidationMap } from 'prop-types';
import React from 'react';


export interface IWaveStateProps {
}

export interface IWaveDispatchProps {
}

interface IWaveProps extends IWaveStateProps, IWaveDispatchProps {
}

const propTypes: ValidationMap<IWaveProps> = {};

export class Wave extends React.PureComponent<IWaveProps> {
  static displayName = 'Wave';
  static propTypes = propTypes;

  componentDidMount() {
    if ($('#wave-one').length) {
      const wave_one = $('#wave-one');
      wave_one.wavify({
        height: 60,
        bones: 5,
        amplitude: 20,
        color: '#fff',
        speed: .15,
      });
    }
    if ($('#wave-two').length) {
      const wave_two = $('#wave-two');
      wave_two.wavify({
        height: 40,
        bones: 4,
        amplitude: 20,
        color: 'rgba(255, 255, 255, .8)',
        speed: .25,
      });
    }
  }

  render() {
    return (
      <>
        <svg
          width="100%"
          height="100%"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          className="wave"
        >
          <defs />
          <path
            id="wave-one"
            d=""
          />
        </svg>
        <svg
          width="100%"
          height="100%"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          className="wave"
        >
          <defs />
          <path
            id="wave-two"
            d=""
          />
        </svg>
      </>
    );
  }
}

