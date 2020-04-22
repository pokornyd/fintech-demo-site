import { ValidationMap } from 'prop-types';
import React from 'react';
import classNames from 'classnames';


export interface IGoToTopStateProps {
}

export interface IGoToTopDispatchProps {
}

interface IGoToTopProps extends IGoToTopStateProps, IGoToTopDispatchProps {
}

interface IGoToTopState {
  readonly showButton: boolean;
}

const propTypes: ValidationMap<IGoToTopProps> = {};

export class GoToTop extends React.PureComponent<IGoToTopProps, IGoToTopState> {
  static displayName = 'GoToTop';
  static propTypes = propTypes;

  state: IGoToTopState = {
    showButton: false,
  };

  evaluateWhetherShowButton = () => {
    const showButton = $(window).scrollTop() > 500;
    this.setState(() => ({ showButton }));
  };

  goBackToTop = () => {
    $('html, body').animate({ scrollTop: 0 }, 900, 'easeInOutCirc');
    return false;
  };

  componentDidMount() {
    window.addEventListener('scroll', this.evaluateWhetherShowButton);
    this.evaluateWhetherShowButton();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.evaluateWhetherShowButton);
  }

  render() {
    return (
      <div>
        <a
          href="#"
          className={classNames('back-top btn btn-grad', {
            'btn-show': this.state.showButton,
          })}
          onClick={this.goBackToTop}
        >
          <i className="ti-angle-up" />
        </a>
      </div>
    );
  }
}

