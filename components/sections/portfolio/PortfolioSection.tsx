import { ContentItem } from 'kentico-cloud-delivery';
import PropTypes, { ValidationMap } from 'prop-types';
import React from 'react';
import {
  Description,
  PreTitle,
  Title,
} from '../../sectionIntroductionRenderers';
import { PortfolioCard } from './PortfolioCard';


export interface IPortfolioSectionStateProps {
  readonly data: ContentItem;
}

export interface IPortfolioSectionDispatchProps {
}

interface IPortfolioSectionProps extends IPortfolioSectionStateProps, IPortfolioSectionDispatchProps {
}

const propTypes: ValidationMap<IPortfolioSectionProps> = {
  data: PropTypes.any.isRequired,
};

export class PortfolioSection extends React.PureComponent<IPortfolioSectionProps> {
  static displayName = 'PortfolioSection';
  static propTypes = propTypes;

  componentDidMount() {
    if ($().isotope) {
      const $container = $('.portfolio-wrap');
      $container.imagesLoaded(function () {
        $container.isotope({
          itemSelector: '.isotope-item',
          transitionDuration: '0.5s',
        });
      });
    }
  }

  render() {
    const { data } = this.props;
    return (
      <section className="portfolio pb-0">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-7 mx-auto">
              {/*-- title --*/}
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
            <div className="col-md-12 p-0">
              <div
                className="portfolio-wrap grid items-3 items-padding"
              >
                {data.list_of_insurance_offerings.map((offering: ContentItem) => (
                  <PortfolioCard
                    key={offering.system.id}
                    data={offering}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
