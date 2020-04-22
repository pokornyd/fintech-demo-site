import React from 'react';

interface IContentItemElementContext {
  readonly elementCodename: string;
  readonly itemId: string;
  readonly language: string;
}

export const ContentItemElementContext = React.createContext<IContentItemElementContext>({
  elementCodename: '',
  itemId: '',
  language: '',
});
