import { ContentItem } from 'kentico-cloud-delivery';
import { NextFC } from 'next';
import PropTypes, { ValidationMap } from 'prop-types';
import React from 'react';
import { stripPTags, addPersistentProjId, addDetailQueryString } from '../../../utilities/utils';
import { getItemElementRenderer } from '../../ItemElementValue';
import { IElementStringValueWithQuery, IElementStringValue } from '../auxiliarytypes';


export interface IBlogsBlogSectionItemStateProps {
  readonly data: ContentItem;
  readonly query: Record<string, string | string[] | undefined>;
}

export interface IBlogsBlogSectionItemDispatchProps {
}

interface IBlogsBlogSectionItemProps extends IBlogsBlogSectionItemStateProps, IBlogsBlogSectionItemDispatchProps {
}

const propTypes: ValidationMap<IBlogsBlogSectionItemProps> = {
  data: PropTypes.any.isRequired,
};

const BlogTitle = getItemElementRenderer(
  'title',
  React.forwardRef<HTMLAnchorElement, IElementStringValue>(({ value }) => (
    <h4
      className="article-title"
    >
      {value}
    </h4>
  )),
);

const MaxChar = 200;
const BlogContent = getItemElementRenderer(
  'content',
  React.forwardRef<HTMLParagraphElement, IElementStringValue>(({ value }, ref) => (
    <p
      ref={ref}
      className="mb-0"
    >
      {stripPTags(value).substring(0, MaxChar)+"..."}
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

export const BlogsBlogSectionItem: NextFC<IBlogsBlogSectionItemProps> = ({ data, query }) => {
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
    </div>
  );
};

BlogsBlogSectionItem.displayName = 'BlogsBlogSectionItem';
BlogsBlogSectionItem.propTypes = propTypes;
