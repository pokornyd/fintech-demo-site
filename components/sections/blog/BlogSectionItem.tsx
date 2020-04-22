import { ContentItem } from 'kentico-cloud-delivery';
import { NextFC } from 'next';
import PropTypes, { ValidationMap } from 'prop-types';
import React from 'react';
import { stripPTags } from '../../../utilities/utils';
import { getItemElementRenderer } from '../../ItemElementValue';


export interface IBlogSectionItemStateProps {
  readonly data: ContentItem;
}

export interface IBlogSectionItemDispatchProps {
}

interface IBlogSectionItemProps extends IBlogSectionItemStateProps, IBlogSectionItemDispatchProps {
}

const propTypes: ValidationMap<IBlogSectionItemProps> = {
  data: PropTypes.any.isRequired,
};



const BlogTitle = getItemElementRenderer(
  'title',
  React.forwardRef<HTMLAnchorElement, IElementStringValue>(({ value }, ref) => (
    <a
      ref={ref}
      className="article-title"
      href="#!"
    >
      {value}
    </a>
  )),
);

const BlogContent = getItemElementRenderer(
  'content',
  React.forwardRef<HTMLParagraphElement, IElementStringValue>(({ value }, ref) => (
    <p
      ref={ref}
      className="mb-0"
    >
      {stripPTags(value)}
    </p>
  )),
);

export const BlogSectionItem: NextFC<IBlogSectionItemProps> = ({ data }) => {
  return (
    <div
      className="item"
    >
      <div className="article">
        <div className="article-info">
          <BlogTitle
            data={data}
          />
          <BlogContent
            data={data}
          />
        </div>
      </div>
    </div>
  );
};

BlogSectionItem.displayName = 'BlogSectionItem';
BlogSectionItem.propTypes = propTypes;
