import { ContentItem } from 'kentico-cloud-delivery';
import { NextFC } from 'next';
import PropTypes, { ValidationMap } from 'prop-types';
import React from 'react';
import { stripPTags } from '../../../utilities/utils';
import { getItemElementRenderer } from '../../ItemElementValue';


export interface IServiceFeatureStateProps {
  readonly data: ContentItem;
}

export interface IServiceFeatureDispatchProps {
}

interface IServiceFeatureProps extends IServiceFeatureStateProps, IServiceFeatureDispatchProps {
}

const propTypes: ValidationMap<IServiceFeatureProps> = {
  data: PropTypes.any.isRequired,
};

const FeatureIcon = getItemElementRenderer(
  'icon_class',
  React.forwardRef<HTMLDivElement, IElementStringValue>(({ value }, ref) => (
    <div
      ref={ref}
      className="feature-box-icon"
    >
      <i className={value} />
    </div>
  )),
);

const FeatureTitle = getItemElementRenderer(
  'title',
  React.forwardRef<HTMLHeadingElement, IElementStringValue>(({ value }, ref) => (
    <h3
      ref={ref}
      className="feature-box-title"
    >
      {value}
    </h3>
  )),
);

const FeatureDescription = getItemElementRenderer(
  'description',
  React.forwardRef<HTMLParagraphElement, IElementStringValue>(({ value }, ref) => (
    <p
      ref={ref}
      className="feature-box-desc"
      dangerouslySetInnerHTML={{
        __html: stripPTags(value),
      }}
    />
  )),
);

const FeatureCTALink = getItemElementRenderer(
  'feature_link_label',
  React.forwardRef<HTMLAnchorElement, IElementStringValue & { readonly linkUrl: string }>(({ value, linkUrl }, ref) => (
    <a
      ref={ref}
      className="mt-3"
      href={linkUrl}
    >
      {value}
    </a>
  )),
);

export const ServiceFeature: NextFC<IServiceFeatureProps> = ({ data }) => {
  return (

    <div className="col-md-4 mt-30">
      <div className="feature-box f-style-2 icon-grad h-100">
        <FeatureIcon
          data={data}
        />
        <FeatureTitle
          data={data}
        />
        <FeatureDescription
          data={data}
        />
        <FeatureCTALink
          data={data}
          linkUrl={data.feature_link_url.value}
        />
      </div>
    </div>
  );
};

ServiceFeature.displayName = 'ServiceFeature';
ServiceFeature.propTypes = propTypes;
