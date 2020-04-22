import { ValidationMap } from 'prop-types';
import React from 'react';


export interface IPreLoaderStateProps {
}

export interface IPreLoaderDispatchProps {
}

interface IPreLoaderProps extends IPreLoaderStateProps, IPreLoaderDispatchProps {
}

const propTypes: ValidationMap<IPreLoaderProps> = {};

export class PreLoader extends React.PureComponent<IPreLoaderProps> {
  static displayName = 'PreLoader';
  static propTypes = propTypes;

  componentDidMount() {
    if ($('.preloader').length) {
      const $preloader = $('.preloader');
      $preloader.delay(200).fadeOut(600);
    }
  }

  render() {
    return (
      <div className="preloader">
        <img
          src="static/assets/images/preloader.svg"
          alt="Pre-loader"
        />
      </div>
    );
  }
}

