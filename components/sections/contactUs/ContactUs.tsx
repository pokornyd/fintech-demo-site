import { ContentItem } from 'kentico-cloud-delivery';
import PropTypes, { ValidationMap } from 'prop-types';
import React, { Props } from 'react';
import { runCarousel } from '../../../utilities/carousel';
import {
  Description,
  PreTitle,
  Title,
  Form,
} from '../../sectionIntroductionRenderers';




export interface ITopicListStateProps {
    readonly data: ContentItem;
    readonly query: Record<string, string | string[] | undefined>;
    formConfig: object
  }
  
  export interface ITopicListDispatchProps {
  }
  
  interface ITopicListProps extends ITopicListStateProps, ITopicListDispatchProps {
  }

  export interface IFormEmbedConfig {
    embed_code: string;
    link: string;
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
      const { data } = this.props;

  // if (typeof window !== 'undefined') {
  //     var test: IFormEmbedConfig = JSON.parse(data.elements.contact_form.value).publish;
  //     const formElement = document.getElementById("form")
  //     formElement.innerHTML = test.embed_code;
  //     var script = formElement.getElementsByTagName("script")[0];
  //     var src = script.src;
  //     $.getScript(src)
  //     .done(function (script, textStatus) {
  //       $(".title").append(
  //         test
  //           .embed_code
  //       );
  //     })
  //     .fail(function (jqxhr, settings, exception) {
  //       $("div.log").text("Triggered ajaxError handler.");
  //     });
  //   }
  }


  
    render() {
      const { data, query } = this.props;
      // var test: IFormEmbedConfig = JSON.parse(data.elements.contact_form.value).publish;
      return (
        <section className="topic-list">
          <div className="container">
            <div className="row">
              <div className="mx-auto">
                <div id="test" className="title text-center">
                  <PreTitle
                    data={data}
                  />
                  <Title
                    data={data}
                  />
                  <Description
                    data={data}
                  />
                  <Form
                    data={data}
                  />
                </div>
              </div>
            </div>
      </div>
        </section>
      );
    }
  }
  
  