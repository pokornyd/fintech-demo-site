import { NextFC } from 'next';
import PropTypes, { ValidationMap } from 'prop-types';
import React from 'react';
import { BannerImage } from '../../SVGs/BannerImage';


export interface IBannerStateProps {
  readonly imageUrl: string;
}

export interface IBannerDispatchProps {
}

interface IBannerProps extends IBannerStateProps, IBannerDispatchProps {
}

const propTypes: ValidationMap<IBannerProps> = {
  imageUrl: PropTypes.string.isRequired,
};

export const Banner: NextFC<IBannerProps> = ({ imageUrl }) => {
  return (
    <figure className="w-100 ie-height-750">
      <BannerImage
        imageUrl={imageUrl}
      />
    </figure>
  );
};

Banner.displayName = 'Banner';
Banner.propTypes = propTypes;
