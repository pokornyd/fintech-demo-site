import { NextFC } from 'next';
import PropTypes, { ValidationMap } from 'prop-types';
import React from 'react';


export interface INavBarLogoStateProps {
  readonly src: string;
}

export interface INavBarLogoDispatchProps {
}

interface INavBarLogoProps extends INavBarLogoStateProps, INavBarLogoDispatchProps {
}

const propTypes: ValidationMap<INavBarLogoProps> = {
  src: PropTypes.string.isRequired,
};

export const NavBarLogo: NextFC<INavBarLogoProps> = ({ src }) => {
  return (
    <svg
      className="navbar-brand-item"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      preserveAspectRatio="xMinYMid"
      width="325.656"
      height="100"
      viewBox="0 0 325.656 100"
    >
      <image
        xlinkHref={src}
        width="325.656"
        height="100"
      />
    </svg>
  );
};

NavBarLogo.displayName = 'NavBarLogo';
NavBarLogo.propTypes = propTypes;
