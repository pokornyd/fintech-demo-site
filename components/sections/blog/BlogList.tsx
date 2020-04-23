import { ContentItem } from 'kentico-cloud-delivery';
import PropTypes, { ValidationMap } from 'prop-types';
import React from 'react';
import { runCarousel } from '../../../utilities/carousel';
import {
  Description,
  PreTitle,
  Title,
} from '../../sectionIntroductionRenderers';
import { BlogListItem } from './BlogListItem';

export interface IArticleListStateProps {
    readonly data: ContentItem;
  }
  
  export interface IArticleListDispatchProps {
  }
  
  interface IArticleListProps extends IArticleListStateProps, IArticleListDispatchProps {
  }
  
  const propTypes: ValidationMap<IArticleListProps> = {
    data: PropTypes.any.isRequired,
  };
  
  export class BlogList extends React.PureComponent<IArticleListProps> {
    static displayName = 'BlogList';
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
        <section className="article-list" >
          <div className="container">
            <div className="row">
              <div className="mx-auto">
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

                  {data.article.map((article: ContentItem) => (
                    <BlogListItem
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
  
  