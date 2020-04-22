import { ContentItem } from 'kentico-cloud-delivery';
import { NextFC } from 'next';
import PropTypes, { ValidationMap } from 'prop-types';
import React from 'react';
import { stripPTags } from '../../../utilities/utils';
import { getItemElementRenderer } from '../../ItemElementValue';


export interface IArticleDetailItemStateProps {
  readonly data: ContentItem;
}

export interface IArticleDetailItemDispatchProps {
}

interface IArticleDetailItemProps extends IArticleDetailItemStateProps, IArticleDetailItemDispatchProps {
}

const propTypes: ValidationMap<IArticleDetailItemProps> = {
  data: PropTypes.any.isRequired,
};



const ArticleTitle = getItemElementRenderer(
  'title',
  React.forwardRef<HTMLAnchorElement, IElementStringValue>(({ value }, ref) => (
    <a
      ref={ref}
      className="article-title"
      href="#"
    >
      {value}
    </a>
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
  'title',
  React.forwardRef<HTMLAnchorElement, IElementStringValue>(({ value }, ref) => (
    <a
      ref={ref}
      className="article-title"
      href={value}
    >
      READ MORE
    </a>
  )),
);


export const ArticleDetailItem: NextFC<IArticleDetailItemProps> = ({ data }) => {
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

ArticleDetailItem.displayName = 'ArticleDetailItem';
ArticleDetailItem.propTypes = propTypes;
