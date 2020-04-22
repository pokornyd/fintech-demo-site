import { NextFC } from 'next';
import PropTypes, { ValidationMap } from 'prop-types';
import React from 'react';


export interface IFooterLogoStateProps {
  readonly src: string;
}

export interface IFooterLogoDispatchProps {
}

interface IFooterLogoProps extends IFooterLogoStateProps, IFooterLogoDispatchProps {
}

const propTypes: ValidationMap<IFooterLogoProps> = {
  src: PropTypes.string.isRequired,
};

export const FooterLogo: NextFC<IFooterLogoProps> = ({ src }) => {
  return (
    <svg
      className="footer-logo-item"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      preserveAspectRatio="xMinYMid"
      width="325.656"
      height="100"
      viewBox="0 0 325.656 100"
    >
      <g>
        <image
          width="325.656"
          height="100"
          xlinkHref={src}
        />
      </g>
    </svg>
  );
};

FooterLogo.displayName = 'FooterLogo';
FooterLogo.propTypes = propTypes;
