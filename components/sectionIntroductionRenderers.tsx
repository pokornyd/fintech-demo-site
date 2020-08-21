import React from 'react';
import { addClassToPTags } from '../utilities/utils';
import { getElementRenderer } from './ElementValue';
import { IFormEmbedConfig } from './sections/contactUs/ContactUs';

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

export const Form = getElementRenderer(
  "contact_form",
  React.forwardRef<HTMLDivElement, IElementStringValue>(({ value }, ref) => (
    <div
      ref={ref}
      dangerouslySetInnerHTML={{
        __html: JSON.parse(value).publish.embed_code,
      }}
    />
  ))
);

// export function Form(props) {
//   console.log(props)
//   return(
//         <div
//       dangerouslySetInnerHTML={{
//         __html: props.data.embed_code,
//       }}
//     />
//   )
// }
