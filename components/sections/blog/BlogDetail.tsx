import { ContentItem } from 'kentico-cloud-delivery';
import PropTypes, { ValidationMap } from 'prop-types';
import React from 'react';
import { runCarousel } from '../../../utilities/carousel';
import { BlogDetailItem } from './BlogDetailItem';



export interface IBlogDetailStateProps {
    readonly data: ContentItem;
  }
  
  export interface IBlogDetailDispatchProps {
  }
  
  interface IBlogDetailProps extends IBlogDetailStateProps, IBlogDetailDispatchProps {
  }
  
  const propTypes: ValidationMap<IBlogDetailProps> = {
    data: PropTypes.any.isRequired,
  };
  
  export class BlogDetail extends React.PureComponent<IBlogDetailProps> {
    static displayName = 'BlogDetail';
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
        <section className="article-Detail" >
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                  {data.article.map((article: ContentItem) => (
                    <BlogDetailItem
                      key={article.system.id}
                      data={article}
                    />
                  ))}
                </div>             
            </div>
          </div>         
        </section>
      );
    }
  }
  
  