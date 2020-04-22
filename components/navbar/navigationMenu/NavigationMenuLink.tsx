import { NextFC } from 'next';
import PropTypes, { ValidationMap } from 'prop-types';
import React from 'react';


export interface INavigationMenuLinkStateProps {
  readonly href: string;
  readonly showHotMarker?: boolean | null;
  readonly text: string;
}

export interface INavigationMenuLinkDispatchProps {
}

interface INavigationMenuLinkProps extends INavigationMenuLinkStateProps, INavigationMenuLinkDispatchProps {
}

const propTypes: ValidationMap<INavigationMenuLinkProps> = {
  href: PropTypes.string.isRequired,
  showHotMarker: PropTypes.bool,
  text: PropTypes.string.isRequired,
};

export const NavigationMenuLink: NextFC<INavigationMenuLinkProps> = (props) => {
  const { text, showHotMarker, href } = props;
  return (
    <li>
      <a
        className="dropdown-item"
        href={href}
      >
        {text}
        {showHotMarker && (
          <span className="badge badge-success ml-2">Hot</span>
        )}
      </a>
    </li>
  );
};

NavigationMenuLink.displayName = 'NavigationMenuLink';
NavigationMenuLink.propTypes = propTypes;
