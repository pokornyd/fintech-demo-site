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


const ArticleSubTitle = getItemElementRenderer(
  'subtitle',
  React.forwardRef<HTMLAnchorElement, IElementStringValue>(({ value }) => (
    <h2
      className="article-title"
    >
      {value}
    </h2>
  )),
);

const ArticleContent = getItemElementRenderer(
  'content',
  React.forwardRef<HTMLParagraphElement, IElementStringValue>(({ value }, ref) => (
    <div
      ref={ref}
      className="lead"
      dangerouslySetInnerHTML={{__html:value}}
    >      
    </div>
  )),
);





export const ArticleDetailItem: NextFC<IArticleDetailItemProps> = ({ data }) => {
  return (
    <div className="item">
      <div className="article">
        <div className="article-info">
          <ArticleTitle
            data={data}
          />
          <ArticleSubTitle
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
