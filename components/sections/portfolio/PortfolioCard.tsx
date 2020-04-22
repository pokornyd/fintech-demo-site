import { ContentItem } from 'kentico-cloud-delivery';
import { NextFC } from 'next';
import PropTypes, { ValidationMap } from 'prop-types';
import React from 'react';
import { getItemElementRenderer } from '../../ItemElementValue';


export interface IPortfolioCardStateProps {
  readonly data: ContentItem;
}

export interface IPortfolioCardDispatchProps {
}

interface IPortfolioCardProps extends IPortfolioCardStateProps, IPortfolioCardDispatchProps {
}

const propTypes: ValidationMap<IPortfolioCardProps> = {
  data: PropTypes.any.isRequired,
};

const AssetImage = getItemElementRenderer(
  'illustrative_image_for_an_offering',
  React.forwardRef<HTMLImageElement, IAssetElementValue>(({ value }, ref) => (
    <img
      ref={ref}
      src={`${value[0].url}?w=373&h=249&fit=crop`}
      alt={value[0].description}
    />
  )),
);

const CardTitle = getItemElementRenderer(
  'title',
  React.forwardRef<HTMLHeadingElement, IAssetElementValue>(({ value }, ref) => (
    <h6
      ref={ref}
      className="info-title"
    >
      <a
        href="#"
        title=""
      >
        {value}
      </a>
    </h6>
  )),
);

const CardDescription = getItemElementRenderer(
  'short_description',
  React.forwardRef<HTMLParagraphElement, IAssetElementValue>(({ value }, ref) => (
    <p
      ref={ref}
    >
      {value}
    </p>
  )),
);

export const PortfolioCard: NextFC<IPortfolioCardProps> = ({ data }) => {
  return (
    <div className="portfolio-card isotope-item digital">
      <div className="portfolio-card-body">
        <div className="portfolio-card-header">
          <AssetImage
            data={data}
          />
        </div>
        <div className="portfolio-card-footer">
          <a
            className="full-screen"
            href={data.illustrative_image_for_an_offering.value[0].url}
            data-fancybox="portfolio"
            data-caption={data.title.value}
          >
            <i className="ti-fullscreen" />
          </a>
          <CardTitle
            data={data}
          />
          <CardDescription
            data={data}
          />
        </div>
      </div>
    </div>
  );
};

PortfolioCard.displayName = 'PortfolioCard';
PortfolioCard.propTypes = propTypes;
