import { ContentItem } from 'kentico-cloud-delivery';
import PropTypes, {
  ValidationMap,
} from 'prop-types';
import React from 'react';

import '../../../static/assets/vendor/owlcarousel/css/owl.carousel.css';
import { runCarousel } from '../../../utilities/carousel';
import { TestimonialCarouselItem } from './TestimonialCarouselItem';


export interface ITestimonialsSectionStateProps {
  readonly data: ContentItem;
}

export interface ITestimonialsSectionDispatchProps {
}

interface ITestimonialsSectionProps extends ITestimonialsSectionStateProps, ITestimonialsSectionDispatchProps {
}

interface TestimonialsSectionState {
}


const propTypes: ValidationMap<ITestimonialsSectionProps> = {
  data: PropTypes.any.isRequired,
};

export class TestimonialsSection extends React.PureComponent<ITestimonialsSectionProps, TestimonialsSectionState> {
  static displayName = 'TestimonialsSection';
  static propTypes = propTypes;

  private readonly carouselRef = React.createRef<HTMLDivElement>();

  componentDidMount(): void {
    if (this.carouselRef.current) {
      runCarousel(this.carouselRef.current);
    }
  }

  render() {
    const { data } = this.props;
    return (
      <section className="bg-light">
        <div className="container">
          <div
            ref={this.carouselRef}
            className="owl-carousel owl-grab arrow-hover dots-dark"
            data-arrow="false"
            data-dots="true"
            data-items="1"
          >
            {data.list_of_testimonials.map((testimonial: ContentItem) => (
              <TestimonialCarouselItem
                key={testimonial.system.id}
                data={testimonial}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }
}

