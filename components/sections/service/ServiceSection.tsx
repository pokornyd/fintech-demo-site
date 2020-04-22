import { ContentItem } from 'kentico-cloud-delivery';
import { NextFC } from 'next';
import PropTypes, { ValidationMap } from 'prop-types';
import React from 'react';
import {
  Description,
  PreTitle,
  Title,
} from '../../sectionIntroductionRenderers';
import { ServiceFeature } from './ServiceFeature';


export interface IServiceSectionStateProps {
  readonly data: ContentItem;
}

export interface IServiceSectionDispatchProps {
}

interface IServiceSectionProps extends IServiceSectionStateProps, IServiceSectionDispatchProps {
}

const propTypes: ValidationMap<IServiceSectionProps> = {
  data: PropTypes.any.isRequired,
};


export const ServiceSection: NextFC<IServiceSectionProps> = ({ data }) => {
  return (
    <section className="service pt-0">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-8 mx-auto">
            <div className="title text-center">
              <PreTitle
                data={data}
              />
              <Title
                data={data}
              />
              <Description
                data={data}
              />
            </div>
          </div>
        </div>
        <div className="row">
          {data.list_of_features.map((feature: ContentItem) => (
            <ServiceFeature
              key={feature.system.id}
              data={feature}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

ServiceSection.displayName = 'ServiceSection';
ServiceSection.propTypes = propTypes;
