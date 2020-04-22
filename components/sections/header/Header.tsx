import { ContentItem } from 'kentico-cloud-delivery';
import PropTypes, { ValidationMap } from 'prop-types';
import React from 'react';
import { stripPTags } from '../../../utilities/utils';
import { getElementRenderer } from '../../ElementValue';
import { Wave } from '../../SVGs/Wave';
import { Banner } from './Banner';


export interface IHeaderStateProps {
  readonly data: ContentItem;
}

export interface IHeaderDispatchProps {
}

interface IHeaderProps extends IHeaderStateProps, IHeaderDispatchProps {
}

const propTypes: ValidationMap<IHeaderProps> = {
  data: PropTypes.any.isRequired,
};

const HeaderTitle = getElementRenderer(
  'title',
  React.forwardRef<HTMLHeadingElement, IElementStringValue>(({ value }, ref) => (
    <h2
      ref={ref}
      className="display-6 display-xl-4 font-weight-normal"
    >
      {value}
    </h2>
  )),
);

const HeaderDescription = getElementRenderer(
  'description',
  React.forwardRef<HTMLParagraphElement, IElementStringValue>(({ value }, ref) => (
    <p
      ref={ref}
      className="h6 mb-4 font-weight-normal d-none d-sm-block"
    >
      {stripPTags(value)}
    </p>
  )),
);

const HeaderBanner = getElementRenderer(
  'backdrop_image',
  React.forwardRef<HTMLParagraphElement, IAssetElementValue>(({ value }, ref) => (
    <div
      ref={ref}
      className="col-md-6 d-none d-md-block p-0 position-absolute top-0 right-0 align-top align-text-top"
    >
      <Banner
        imageUrl={value[0].url}
      />
    </div>
  )),
);

const HeaderCTAButton = getElementRenderer(
  'cta_button_label',
  React.forwardRef<HTMLAnchorElement, IElementStringValue & { readonly url: string }>(({ value, url }, ref) => (
    <a
      ref={ref}
      className="btn btn-dark mb-7"
      href={url}
    >
      {value}
    </a>
  )),
);

export class Header extends React.PureComponent<IHeaderProps> {
  static displayName = 'Header';
  static propTypes = propTypes;

  render() {
    const { data } = this.props;

    return (
      <section className="p-0 position-relative height-900-responsive ie-height-800 bg-grad pattern-overlay-1 overflow-hidden">
        <div className="container d-flex h-100">
          <div className="row align-self-center w-100">
            <div className="col-md-6 mt-md-0 all-text-white">
              <HeaderTitle
                data={data}
              />
              <HeaderDescription
                data={data}
              />
              <HeaderCTAButton
                data={data}
                url={data.cta_button_url.value}
              />
            </div>
            <HeaderBanner
              data={data}
            />
          </div>
        </div>
        <Wave />
      </section>
    );
  }
}

