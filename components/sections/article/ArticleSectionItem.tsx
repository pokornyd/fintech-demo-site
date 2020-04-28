import { ContentItem } from 'kentico-cloud-delivery';
import { NextFC } from 'next';
import PropTypes, { ValidationMap } from 'prop-types';
import React from 'react';
import { stripPTags, addDetailQueryString, addPersistentProjId } from '../../../utilities/utils';
import { getItemElementRenderer } from '../../ItemElementValue';


export interface IArticleSectionItemStateProps {
  readonly data: ContentItem;
  readonly query: Record<string, string | string[] | undefined>;
}

export interface IArticleSectionItemDispatchProps {
}

interface IArticleSectionItemProps extends IArticleSectionItemStateProps, IArticleSectionItemDispatchProps {
}

const propTypes: ValidationMap<IArticleSectionItemProps> = {
  data: PropTypes.any.isRequired,
};

const ArticleTitle = getItemElementRenderer(
  'title',
  React.forwardRef<HTMLAnchorElement, IElementStringValue>(({ value }) => (
    <h4
      className="article-title"
    >
      {value}
    </h4>
  )),
);

const ArticleContent = getItemElementRenderer(
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

const ArticleReadMore = getItemElementRenderer(
  'system.codename',
    React.forwardRef<HTMLAnchorElement, IElementStringValueWithQuery>(({ value, query }, ref) => (
      <a
        ref={ref}
        className="mb-0"
        href={'/article'+ addPersistentProjId(query) + addDetailQueryString(query) + value}
      >
        READ MORE
      </a>
    )),
  );

export const ArticleSectionItem: NextFC<IArticleSectionItemProps> = ({ data, query }) => {
  return (
    <div className="item">
      <div className="article">
        <div className="article-info">
          <ArticleTitle
            data={data}
          />
          <ArticleContent
            data={data}
          />
          <ArticleReadMore
            query={query}
            data={data}
          />
        </div>
      </div>
    </div>
  );
};

ArticleSectionItem.displayName = 'ArticleSectionItem';
ArticleSectionItem.propTypes = propTypes;
