import { ContentItem } from 'kentico-cloud-delivery';
import { NextFC } from 'next';
import PropTypes, { ValidationMap } from 'prop-types';
import React from 'react';
import { getElementRenderer } from '../../ElementValue';
import { AboutImage } from '../../SVGs/AboutImage';
import { SectionWaveSeparator } from '../../SVGs/SectionWaveSeparator';


export interface IAboutUsSectionStateProps {
  readonly data: ContentItem;
}

export interface IAboutUsSectionDispatchProps {
}

interface IAboutUsSectionProps extends IAboutUsSectionStateProps, IAboutUsSectionDispatchProps {
}

const propTypes: ValidationMap<IAboutUsSectionProps> = {
  data: PropTypes.any.isRequired,
};

const AboutUsImage = getElementRenderer(
  'illustrative_image',
  React.forwardRef<HTMLDivElement, IAssetElementValue>(({ value }, ref) => (
    <div
      ref={ref}
    >
      <AboutImage
        imageUrl={value[0].url}
      />
    </div>
  )),
);

const SectionLabel = getElementRenderer(
  'section_label',
  React.forwardRef<HTMLHeadingElement, IElementStringValue>(({ value }, ref) => (
    <h6
      ref={ref}
      className="text-primary"
    >
      {value}
    </h6>
  )),
);

const SectionTitle = getElementRenderer(
  'title',
  React.forwardRef<HTMLHeadingElement, IElementStringValue>(({ value }, ref) => (
    <h2
      ref={ref}
      className="h1"
    >
      {value}
    </h2>
  )),
);

const LeadParagraph = getElementRenderer(
  'lead_paragraph',
  React.forwardRef<HTMLParagraphElement, IElementStringValue>(({ value }, ref) => (
    <p
      ref={ref}
      className="lead"
    >
      {value}
    </p>
  )),
);

const Description = getElementRenderer(
  'description',
  React.forwardRef<HTMLParagraphElement, IElementStringValue>(({ value }, ref) => (
    <p
      ref={ref}
    >
      {value}
    </p>
  )),
);

export const AboutUsSection: NextFC<IAboutUsSectionProps> = ({ data }) => {
  return (
    <section className="position-relative bg-light">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          {/*-- left --*/}
          <div className="col-md-6">
            <AboutUsImage
              data={data}
            />
          </div>
          <div className="col-md-6 mt-4 mt-md-0 mb-auto">
            <SectionLabel
              data={data}
            />
            <SectionTitle
              data={data}
            />
            <LeadParagraph
              data={data}
            />
            <Description
              data={data}
            />
          </div>
        </div>
      </div>
      <SectionWaveSeparator />
    </section>
  );
};

AboutUsSection.displayName = 'AboutUsSection';
AboutUsSection.propTypes = propTypes;
