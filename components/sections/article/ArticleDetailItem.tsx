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
  React.forwardRef<HTMLAnchorElement, IElementStringValue>(({ value }) => (
    <h1>
      {value}
    </h1>
  )),
);

const ArticleContent = getItemElementRenderer(
  'content',
  React.forwardRef<HTMLParagraphElement, IElementStringValue>(({ value }, ref) => (
    <div
      ref={ref}
      className="lead"
    >
      {stripPTags(value)}
    </div>
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
          
        </div>
      </div>
      <br/>
      <br/>
    </div>
    
  );
};

ArticleDetailItem.displayName = 'ArticleDetailItem';
ArticleDetailItem.propTypes = propTypes;
