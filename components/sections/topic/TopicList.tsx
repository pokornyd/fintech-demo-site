import { ContentItem } from 'kentico-cloud-delivery';
import PropTypes, { ValidationMap } from 'prop-types';
import React from 'react';
import { runCarousel } from '../../../utilities/carousel';
import {
  Description,
  PreTitle,
  Title,
} from '../../sectionIntroductionRenderers';
import { TopicListItem } from './TopicListItem';



export interface ITopicListStateProps {
    readonly data: ContentItem;
  }
  
  export interface ITopicListDispatchProps {
  }
  
  interface ITopicListProps extends ITopicListStateProps, ITopicListDispatchProps {
  }
  
  const propTypes: ValidationMap<ITopicListProps> = {
    data: PropTypes.any.isRequired,
  };
  
  
  export class TopicList extends React.PureComponent<ITopicListProps> {
    static displayName = 'TopicList';
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
        <section className="topic-list" >
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

                  {data.topic.map((topic: ContentItem) => (
                    <TopicListItem
                      key={topic.system.id}
                      data={topic}
                    />
                  ))}
                </div>
              
            </div>
          </div>
          
        </section>
      );
    }
  }
  
  