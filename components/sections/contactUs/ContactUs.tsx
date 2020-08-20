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
    constructor(props: Readonly<ITopicListProps>) {
      super(props);
      this.state = { formConfiguration: JSON.parse(this.props.data.elements.contact_form.value) }
    }
  
    private readonly carouselRef = React.createRef<HTMLDivElement>();
  
    componentDidMount(): void {
      if (this.carouselRef.current) {
        runCarousel(this.carouselRef.current);
      }
      const { data } = this.props;
      if (typeof window !== "undefined" && data.elements.contact_form.value !== null) {
        var tmp = document.createElement("div");
        tmp.innerHTML = JSON.parse(
          data.elements.contact_form.value
        ).publish.embed_code;
        var script = tmp.getElementsByTagName("script")[0];
        var src = script.src;
        $.getScript(src)
          .done(function (script, textStatus) {
            $(".title").append(
              JSON.parse(data.elements.contact_form.value).publish
                .embed_code
            );
          })
          .fail(function (jqxhr, settings, exception) {
            $("div.log").text("Triggered ajaxError handler.");
          });
      }
    }
  
    render() {
      const { data, query } = this.props;
      return (
        <section className="topic-list">
          <div className="container">
            <div className="row">
              <div className="mx-auto">
                <div className="title text-center">
                  <PreTitle data={data} />
                  <Title data={data} />
                  <Description data={data} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
              </div>
            </div>
          </div>
        </section>
      );
    }
  }
  
  