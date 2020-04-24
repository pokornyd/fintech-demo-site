import { ContentItem } from 'kentico-cloud-delivery';
import { NextFC } from 'next';
import PropTypes, { ValidationMap } from 'prop-types';
import React from 'react';
import { stripPTags } from '../../../utilities/utils';
import { getItemElementRenderer } from '../../ItemElementValue';


export interface IBlogListItemStateProps {
  readonly data: ContentItem;
}

export interface IBlogListItemDispatchProps {
}

interface IBlogListItemProps extends IBlogListItemStateProps, IBlogListItemDispatchProps {
}

const propTypes: ValidationMap<IBlogListItemProps> = {
  data: PropTypes.any.isRequired,
};



const BlogTitle = getItemElementRenderer(
  'title',
  React.forwardRef<HTMLAnchorElement, IElementStringValue>(({ value }, ref) => (
    <h3>
      {value}
    </h3>
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

const BlogReadMore = getItemElementRenderer(
'system.codename',
  React.forwardRef<HTMLAnchorElement, IElementStringValue>(({ value }, ref) => (
    <a
      ref={ref}
      className="mb-0"
      href={'/blog?name='+ value}
    >
      READ MORE
    </a>
  )),
);

export const BlogListItem: NextFC<IBlogListItemProps> = ({ data }) => {
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
          <BlogReadMore
            data={data}
          />
        </div>
      </div>
      <br/>
      <br/>
    </div>
    
  );
};

BlogListItem.displayName = 'ArticleListItem';
BlogListItem.propTypes = propTypes;
