import { ValidationMap } from 'prop-types';
import React from 'react';


export interface ICannotRenderStateProps {
  data: any;
}

export interface ICannotRenderDispatchProps {
}

interface ICannotRenderProps extends ICannotRenderStateProps, ICannotRenderDispatchProps {
}

const propTypes: ValidationMap<ICannotRenderProps> = {};

export const CannotRender: React.SFC<ICannotRenderProps> = ({ data }) => {
  return (
    <div>
      <h2>
        Cannot render this piece of content:
      </h2>
      <pre>{JSON.stringify(data)}</pre>
    </div>
  );
};

CannotRender.displayName = 'CannotRender';
CannotRender.propTypes = propTypes;
