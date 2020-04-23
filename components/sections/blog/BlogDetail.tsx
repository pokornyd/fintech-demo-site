import { ContentItem } from 'kentico-cloud-delivery';
import PropTypes, { ValidationMap } from 'prop-types';
import React from 'react';
import { runCarousel } from '../../../utilities/carousel';
import {
  Description,
  PreTitle,
  Title,
} from '../../sectionIntroductionRenderers';
import { BlogDetailItem } from './BlogDetailItem';



export interface IArticleDetailStateProps {
    readonly data: ContentItem;
  }
  
  export interface IArticleDetailDispatchProps {
  }
  
  interface IArticleDetailProps extends IArticleDetailStateProps, IArticleDetailDispatchProps {
  }
  
  const propTypes: ValidationMap<IArticleDetailProps> = {
    data: PropTypes.any.isRequired,
  };
  
  export class BlogDetail extends React.PureComponent<IArticleDetailProps> {
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
              <div className="mx-auto">
                <div className="title text-center">


                </div>
              </div>
            </div>
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
  
  