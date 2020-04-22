import { ContentItem } from 'kentico-cloud-delivery';
import PropTypes, { ValidationMap } from 'prop-types';
import React from 'react';
import { getItemElementRenderer } from '../../ItemElementValue';
import { OpenTestimonialButton } from './OpenTestimonialButton';


export interface ITestimonialCarouselItemStateProps {
  readonly data: ContentItem;
}

export interface ITestimonialCarouselItemDispatchProps {
}

interface ITestimonialCarouselItemProps extends ITestimonialCarouselItemStateProps, ITestimonialCarouselItemDispatchProps {
}

const propTypes: ValidationMap<ITestimonialCarouselItemProps> = {
  data: PropTypes.any.isRequired,
};

const TagLine = getItemElementRenderer(
  'tagline',
  React.forwardRef<HTMLHeadingElement, IElementStringValue>(({ value }, ref) => (
    <h2
      ref={ref}
    >
      {value}
    </h2>
  )),
);

const AuthorPortrait = getItemElementRenderer(
  'author_s_headshot',
  React.forwardRef<HTMLImageElement, IAssetElementValue>(({ value }, ref) => (
    <img
      ref={ref}
      className="rounded-circle"
      src={`${value[0].url}?w=100&h=100&fit=crop`}
      alt="avatar"
    />
  )),
);

const Quote = getItemElementRenderer(
  'quote',
  React.forwardRef<HTMLParagraphElement, IElementStringValue>(({ value }, ref) => (
    <p
      className="mb-0 lead"
      ref={ref}
    >
      {value}
    </p>
  )),
);

const AuthorName = getItemElementRenderer(
  'author_s_name',
  React.forwardRef<HTMLHeadingElement, IElementStringValue>(({ value }, ref) => (
    <h5
      className="mb-2"
      ref={ref}
    >
      {value}
    </h5>
  )),
);

const AuthorRole = getItemElementRenderer(
  'author_s_role',
  React.forwardRef<HTMLParagraphElement, IElementStringValue>(({ value }, ref) => (
    <p
      ref={ref}
    >
      {value}
    </p>
  )),
);

const IllustrativeImage = getItemElementRenderer(
  'illustrative_image',
  React.forwardRef<HTMLImageElement, IAssetElementValue>(({ value }, ref) => (
    <img
      ref={ref}
      className="rounded"
      src={`${value[0].url}?w=570&h=354&fit=crop`}
      alt={value[0].description}
    />
  )),
);

export const TestimonialCarouselItem: React.SFC<ITestimonialCarouselItemProps> = ({ data }) => {
  return (
    <div className="item mb-3">
      <div className="row">
        <div className="col-md-10 col-lg-6 mx-md-auto align-self-center">
          <div className="text-left">
            <TagLine
              data={data}
            />
            <Quote
              data={data}
            />
            <div className="d-flex mt-3">
              <h6 className="align-self-start mr-3">
                <AuthorPortrait
                  data={data}
                />
              </h6>
              <div className="align-self-center">
                <AuthorName
                  data={data}
                />
                <AuthorRole
                  data={data}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-10 col-lg-6 mx-md-auto align-self-center mt-4 mt-lg-0">
          <IllustrativeImage
            data={data}
          />
          <OpenTestimonialButton
            text="Show image"
            icon="fa-play"
            href={data.illustrative_image.value[0].url}
          />
        </div>
      </div>
    </div>
  );
};

TestimonialCarouselItem.displayName = 'TestimonialCarouselItem';
TestimonialCarouselItem.propTypes = propTypes;
