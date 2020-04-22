import { ContentItem } from 'kentico-cloud-delivery';
import React from 'react';
import { PreviewContext } from './context/PreviewContext';
import { EditElementOverlay } from './EditElementOverlay';

interface IElementRendererState {
  readonly showOverlay: boolean;
}

export function getElementRenderer<T extends { readonly value: any }>(elementCodename: string, Render: React.ComponentType<T>) {
  class ElementValue extends React.PureComponent<Omit<T, 'value'> & { readonly data: ContentItem }, IElementRendererState> {
    private hoverable = React.createRef<HTMLDivElement>();

    state: IElementRendererState = {
      showOverlay: false,
    };

    componentDidMount() {
      if (this.context.isPreview) {
        window.addEventListener('mousemove', this.onMouseMove);
      }
    }

    componentWillUnmount() {
      if (this.context.isPreview) {
        window.removeEventListener('mousemove', this.onMouseMove);
      }
    }

    onMouseMove = (event: MouseEvent) => {
      const { current } = this.hoverable;
      if (current) {
        const { clientX, clientY } = event;
        const { height, width, left, top } = current.getBoundingClientRect();
        if ((clientX < left) ||
          (clientX > left + width) ||
          (clientY < top) ||
          (clientY > top + height)
        ) {
          this.hideOverlay();
        }
        else {
          this.unhideOverlay();
        }
      }
    };

    unhideOverlay = () => {
      this.setState(() => ({
        showOverlay: true,
      }));
    };

    hideOverlay = () => {
      this.setState(() => ({
        showOverlay: false,
      }));
    };

    render() {
      const { projectId } = this.context;
      return (
        <>
          <Render
            ref={this.hoverable}
            {...this.props}
            value={elementCodename == 'system.codename' ? this.props.data.system.codename  : this.props.data[elementCodename].value}
          />
          {this.state.showOverlay && (
            <EditElementOverlay
              projectId={projectId}
              parentRef={this.hoverable}
            />
          )}
        </>
      );
    }
  }

  ElementValue.contextType = PreviewContext;

  return ElementValue;
}
