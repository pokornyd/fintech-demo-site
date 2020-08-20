import { ContentItem } from 'kentico-cloud-delivery';
import PropTypes, { ValidationMap } from 'prop-types';
import React from 'react';
import { runCarousel } from '../../../utilities/carousel';
import {
  Description,
  PreTitle,
  Title,
} from '../../sectionIntroductionRenderers';




export interface ITopicListStateProps {
    readonly data: ContentItem;
    readonly query: Record<string, string | string[] | undefined>;
  }
  
  export interface ITopicListDispatchProps {
  }
  
  interface ITopicListProps extends ITopicListStateProps, ITopicListDispatchProps {
  }
  
  const propTypes: ValidationMap<ITopicListProps> = {
    data: PropTypes.any.isRequired
  };
  
  
  export class ContactUs extends React.PureComponent<ITopicListProps> {
    static displayName = 'TopicList';
    static propTypes = propTypes;
  
    private readonly carouselRef = React.createRef<HTMLDivElement>();
  
    componentDidMount(): void {
      if (this.carouselRef.current) {
        runCarousel(this.carouselRef.current);
      }
    }
  
    render() {
      const { data, query } = this.props;
      var formConfiguration = JSON.parse(data.elements.contact_form.value);
      console.log(formConfiguration);
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
            <div id="apply_form">
            <div style={{ width: "50%", margin: "auto", textAlign: "center" }} dangerouslySetInnerHTML={{ __html: formConfiguration.publish.embed_code }} />
          </div>
            <div className="row">
              <div className="col-md-12">
                </div>
            </div>
            <div>

        </div>
      </div>
          
        </section>
      );
    }
  }
  
  