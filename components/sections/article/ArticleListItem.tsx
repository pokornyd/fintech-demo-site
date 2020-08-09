import { ContentItem } from 'kentico-cloud-delivery';
import { NextFC } from 'next';
import PropTypes, { ValidationMap } from 'prop-types';
import React from 'react';
import { stripPTags, addDetailQueryString, addPersistentProjId } from '../../../utilities/utils';
import { getItemElementRenderer } from '../../ItemElementValue';
import { IElementStringValue, IElementStringValueWithQuery } from '../auxiliarytypes';


export interface IArticleListItemStateProps {
  readonly data: ContentItem;
  readonly query: Record<string, string | string[] | undefined>;
}

export interface IArticleListItemDispatchProps {
}

interface IArticleListItemProps extends IArticleListItemStateProps, IArticleListItemDispatchProps {
}

const propTypes: ValidationMap<IArticleListItemProps> = {
  data: PropTypes.any.isRequired,
};



const ArticleTitle = getItemElementRenderer(
  'title',
  React.forwardRef<HTMLAnchorElement, IElementStringValue>(({ value }, ref) => (
    <h3>
      {value}
    </h3>
  )),
);

const ArticleContent = getItemElementRenderer(
  'subtitle',
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

export const ArticleListItem: NextFC<IArticleListItemProps> = ({ data, query }) => {
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
            data={data}
            query={query}
          />
        </div>
      </div>
      <br/>
      <br/>
    </div>
    
  );
};

ArticleListItem.displayName = 'ArticleListItem';
ArticleListItem.propTypes = propTypes;
