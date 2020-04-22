import { ContentItem } from 'kentico-cloud-delivery';
import React from 'react';
import { ContentItemElementContext } from './context/ContentItemElementContext';
import { getElementRenderer } from './ElementValue';

interface IItemElementRendererState {
  readonly showOverlay: boolean;
}

export function getItemElementRenderer<T extends { readonly value: any }>(elementCodename: string, Render: React.FC<T> | React.ComponentClass<T>) {
  const Element = getElementRenderer(elementCodename, Render);

  class ItemElementValue extends React.PureComponent<Omit<T, 'value'> & { readonly data: ContentItem }, IItemElementRendererState> {
    render() {
      const { data } = this.props;
      return (
        <ContentItemElementContext.Provider
          value={{
            elementCodename,
            language: data.system.language,
            itemId: data.system.id,
          }}
        >
          <Element
            {...this.props}
            data={data}
          />
        </ContentItemElementContext.Provider>
      );
    }
  }

  return ItemElementValue;
}
