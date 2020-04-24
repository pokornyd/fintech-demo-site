import { ContentItem } from 'kentico-cloud-delivery';
import { NextFC } from 'next';
import PropTypes, { ValidationMap } from 'prop-types';
import React from 'react';
import { stripPTags } from '../../../utilities/utils';
import { getItemElementRenderer } from '../../ItemElementValue';


export interface IArticleListItemStateProps {
  readonly data: ContentItem;
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
  React.forwardRef<HTMLAnchorElement, IElementStringValue>(({ value }, ref) => (
    <a
      ref={ref}
      className="mb-0"
      href={'/article?name='+ value}
    >
      READ MORE
    </a>
  )),
);

export const ArticleListItem: NextFC<IArticleListItemProps> = ({ data }) => {
  return (
    <div
      className="item"
    >
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
