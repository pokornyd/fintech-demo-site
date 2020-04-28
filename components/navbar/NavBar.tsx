import classNames from 'classnames';
import { ContentItem } from 'kentico-cloud-delivery';
import PropTypes, { ValidationMap } from 'prop-types';
import React from 'react';
import { getItemElementRenderer } from '../ItemElementValue';
import {
  SearchButton,
  SearchForm,
} from '../Search';
import { NavBarLogo } from '../SVGs/NavBarLogo';
import { NavigationMenu } from './navigationMenu/NavigationMenu';
import { IAssetElementValue } from '../sections/auxiliarytypes';


export interface INavBarStateProps {
  readonly brandDetails: ContentItem;
  readonly navigation: ContentItem;
  readonly query: Record<string, string | string[] | undefined>;
}

export interface INavBarDispatchProps {
}

interface INavBarProps extends INavBarStateProps, INavBarDispatchProps {
}

interface INavBarState {
  readonly isSticky: boolean;
}

const propTypes: ValidationMap<INavBarProps> = {
  brandDetails: PropTypes.any.isRequired,
  navigation: PropTypes.any.isRequired,
};


const NavBarLogoEditable = getItemElementRenderer(
  'logotype_positive_version',
  React.forwardRef<HTMLAnchorElement, IAssetElementValue & { readonly url: string }>(({ value, url }, ref) => (
    <a
      ref={ref}
      className="navbar-brand"
      href={url}
    >
      <NavBarLogo
        src={value[0].url}
      />
    </a>
  )),
);

export class NavBar extends React.PureComponent<INavBarProps, INavBarState> {
  static displayName = 'NavBar';
  static propTypes = propTypes;

  state: INavBarState = {
    isSticky: false,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
    this.onScroll();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll = () => {
    const scTop = $(document).scrollTop();
    this.setState(() => ({
      isSticky: scTop > 400,
    }));
  };
  
  render() {
    const { navigation, brandDetails, query } = this.props;
    return (
      <header
        className={classNames('navbar-sticky navbar-transparent navbar-primary', {
          'navbar-sticky-on': this.state.isSticky,
        })}
      >
        <SearchForm />
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <NavBarLogoEditable
              url="#"
              data={brandDetails}
            />
            <NavigationMenu
              query={query}
              navigation={navigation}
            />
            <div className="navbar-nav">
              {/*-- extra item Search--*/}
              <SearchButton />
              {/*-- extra item Btn--*/}
              {/*<div className="nav-item border-0 d-none d-lg-inline-block align-self-center">*/}
              {/*  <a*/}
              {/*    href="#"*/}
              {/*    className=" btn btn-sm btn-grad text-white mb-0"*/}
              {/*  >*/}
              {/*    Buy Now!*/}
              {/*  </a>*/}
              {/*</div>*/}
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

