import React from 'react';
import { addClassToPTags } from '../utilities/utils';
import { getElementRenderer } from './ElementValue';

export const Description = getElementRenderer(
  'section_introduction__description',
  React.forwardRef<HTMLDivElement, IElementStringValue>(({ value }, ref) => (
    <div
      ref={ref}
      dangerouslySetInnerHTML={{
        __html: addClassToPTags(value, 'mb-0'),
      }}
    />
  )),
);

export const PreTitle = getElementRenderer(
  'section_introduction__subtitle',
  React.forwardRef<HTMLSpanElement, IElementStringValue>(({ value }, ref) => (
    <span
      ref={ref}
      className="pre-title"
    >
      {value}
    </span>
  )),
);

export const Title = getElementRenderer(
  'section_introduction__title',
  React.forwardRef<HTMLHeadingElement, IElementStringValue>(({ value }, ref) => (
    <h2
      ref={ref}
    >
      {value}
    </h2>
  )),
);
