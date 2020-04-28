import { ContentItem } from 'kentico-cloud-delivery';
import PropTypes, { ValidationMap } from 'prop-types';
import React from 'react';
import { runCarousel } from '../../../utilities/carousel';
import {
  Description,
  PreTitle,
  Title,
} from '../../sectionIntroductionRenderers';
import { BlogsBlogSectionItem } from './BlogsBlogSectionItem';


export interface IBlogsBlogSectionStateProps {
  readonly data: ContentItem;
  readonly query: Record<string, string | string[] | undefined>;
}

export interface IBlogsBlogSectionDispatchProps {
}

interface IBlogsBlogSectionProps extends IBlogsBlogSectionStateProps, IBlogsBlogSectionDispatchProps {
}

const propTypes: ValidationMap<IBlogsBlogSectionProps> = {
  data: PropTypes.any.isRequired,
};

export class BlogsBlogSection extends React.PureComponent<IBlogsBlogSectionProps> {
  static displayName = 'BlogsBlogSection';
  static propTypes = propTypes;

  private readonly carouselRef = React.createRef<HTMLDivElement>();

  componentDidMount(): void {
    if (this.carouselRef.current) {
      runCarousel(this.carouselRef.current);
    }
  }

  render() {
    const { data, query } = this.props;
    return (
      <section className="article">
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
            <div className="col-md-12">
              <div
                ref={this.carouselRef}
                className="owl-carousel arrow-dark arrow-hover"
                data-dots="false"
                data-items-xl="3"
                data-items-lg="3"
                data-items-md="2"
                data-items-sm="2"
                data-items-xs="1"
              >
                {data.article.map((article: ContentItem) => (
                  <BlogsBlogSectionItem
                    query={query}
                    key={article.system.id}
                    data={article}
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

