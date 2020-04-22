import { ContentItem } from 'kentico-cloud-delivery';
import { NextFC } from 'next';
import PropTypes, { ValidationMap } from 'prop-types';
import React from 'react';
import { stripPTags } from '../../../utilities/utils';
import { getItemElementRenderer } from '../../ItemElementValue';


export interface IArticleSectionItemStateProps {
  readonly data: ContentItem;
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

export const ArticleSectionItem: NextFC<IArticleSectionItemProps> = ({ data }) => {
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
    </div>
  );
};

ArticleSectionItem.displayName = 'ArticleSectionItem';
ArticleSectionItem.propTypes = propTypes;
