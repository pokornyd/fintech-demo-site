import React from 'react';

interface IPreviewContext {
  readonly isPreview: boolean;
  readonly projectId: string;
}

export const PreviewContext = React.createContext<IPreviewContext>({
  isPreview: false,
  projectId: '',
});
