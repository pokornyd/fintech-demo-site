import { ContentItem } from 'kentico-cloud-delivery';
import { NextFC } from 'next';
import PropTypes, { ValidationMap } from 'prop-types';
import React from 'react';
import { stripPTags, addPersistentProjId, addDetailQueryString } from '../../../utilities/utils';
import { getItemElementRenderer } from '../../ItemElementValue';
import { IElementStringValue, IElementStringValueWithQuery } from '../auxiliarytypes';


export interface IBlogListItemStateProps {
  readonly data: ContentItem;
  readonly query: Record<string, string | string[] | undefined>;
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

const MAX_CHAR = 200;
const BlogContent = getItemElementRenderer(
  'content',
  React.forwardRef<HTMLParagraphElement, IElementStringValue>(({ value }, ref) => (
    <p
      ref={ref}
      className="mb-0"
    >
      {stripPTags(value).substring(0,MAX_CHAR) + "..."}
    </p>
  )),
);

const BlogReadMore = getItemElementRenderer(
'system.codename',
  React.forwardRef<HTMLAnchorElement, IElementStringValueWithQuery>(({ value, query }, ref) => (
    <a
      ref={ref}
      className="mb-0"
      href={'/blog'+ addPersistentProjId(query) + addDetailQueryString(query) + value}
    >
      READ MORE
    </a>
  )),
);

export const BlogListItem: NextFC<IBlogListItemProps> = ({ data, query }) => {
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
            query={query}
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
