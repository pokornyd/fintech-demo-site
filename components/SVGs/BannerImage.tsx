import { NextFC } from 'next';
import PropTypes, { ValidationMap } from 'prop-types';
import React from 'react';


export interface IBannerImageStateProps {
  readonly imageUrl: string;
}

export interface IBannerImageDispatchProps {
}

interface IBannerImageProps extends IBannerImageStateProps, IBannerImageDispatchProps {
}

const propTypes: ValidationMap<IBannerImageProps> = {
  imageUrl: PropTypes.string.isRequired,
};

export const BannerImage: NextFC<IBannerImageProps> = ({ imageUrl }) => {
  return (
    <svg
      version="1.1"
      id="Layer_2"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 1290 1024"
      style={{
        enableBackground: 'new 0 0 1290 1024',
      } as any}
      xmlSpace="preserve"
    >
      <g id="XMLID_81_">
        <defs>
          <path
            id="XMLID_3_"
            d="M1290,0v1024c0,0-229.8-152.2-550-52.9C467.3,1055.7-22.5,927.6,47.8,540C120.4,139.6,17,0,17,0H1290z"
          />
        </defs>
        <clipPath id="XMLID_83_">
          <use
            xlinkHref="#XMLID_3_"
            style={{ overflow: 'visible' }}
          />
        </clipPath>
        <g style={{ clipPath: 'url(#XMLID_83_)' }}>
          {/*-- Set your 1290px X 1024px image below --*/}
          <image
            style={{ overflow: 'visible' }}
            width="1290"
            height="1024"
            id="XMLID_82_"
            xlinkHref={`${imageUrl}?w=1290&h=1024&fit=crop`}
            transform="matrix(0.9999 0 0 0.9999 8.063897e-002 6.401104e-002)"
          />
        </g>
      </g>
    </svg>
  );
};

BannerImage.displayName = 'BannerImage';
BannerImage.propTypes = propTypes;
