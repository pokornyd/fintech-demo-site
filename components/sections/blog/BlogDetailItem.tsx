import { ContentItem } from 'kentico-cloud-delivery';
import { NextFC } from 'next';
import PropTypes, { ValidationMap } from 'prop-types';
import React from 'react';
import { stripPTags } from '../../../utilities/utils';
import { getItemElementRenderer } from '../../ItemElementValue';
import { IElementStringValue } from '../auxiliarytypes';


export interface IBlogDetailItemStateProps {
  readonly data: ContentItem;
}

export interface IBlogDetailItemDispatchProps {
}

interface IBlogDetailItemProps extends IBlogDetailItemStateProps, IBlogDetailItemDispatchProps {
}

const propTypes: ValidationMap<IBlogDetailItemProps> = {
  data: PropTypes.any.isRequired,
};



const BlogTitle = getItemElementRenderer(
  'title',
  React.forwardRef<HTMLAnchorElement, IElementStringValue>(({ value }) => (
    <h1>
      {value}
    </h1>
  )),
);

const BlogLeadParagraph = getItemElementRenderer(
  'lead_paragraph',
  React.forwardRef<HTMLParagraphElement, IElementStringValue>(({ value }, ref) => (
    <div
      ref={ref}
      className="lead pt-4"
    >
      {stripPTags(value)}
    </div>
  )),
);

const BlogContent = getItemElementRenderer(
  'content',
  React.forwardRef<HTMLParagraphElement, IElementStringValue>(({ value }, ref) => (
    <div
      ref={ref}
      className="mb-0 pt-4"
    >
      {stripPTags(value)}
    </div>
  )),
);





export const BlogDetailItem: NextFC<IBlogDetailItemProps> = ({ data }) => {
  return (
    <div className="item">
      <div className="article">
        <div className="article-info">
          <BlogTitle
            data={data}
          />
          <BlogLeadParagraph
            data={data}
          />
          <BlogContent
            data={data}
          />         
        </div>
      </div>
      <br/>
      <br/>
    </div>   
  );
};

BlogDetailItem.displayName = 'BlogDetailItem';
BlogDetailItem.propTypes = propTypes;
