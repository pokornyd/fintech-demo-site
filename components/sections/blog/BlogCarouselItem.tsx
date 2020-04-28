import { ContentItem } from 'kentico-cloud-delivery';
import { NextFC } from 'next';
import PropTypes, { ValidationMap } from 'prop-types';
import React from 'react';
import { printFuzzyDate } from '../../../utilities/timeUtils';
import { stripPTags, addPersistentProjId, addDetailQueryString } from '../../../utilities/utils';
import { getItemElementRenderer } from '../../ItemElementValue';
import { IElementStringValueWithQuery, IElementStringValue } from '../auxiliarytypes';


export interface IBlogCarouselItemStateProps {
  readonly data: ContentItem;
  readonly query: Record<string, string | string[] | undefined>;
}

export interface IBlogCarouselItemDispatchProps {
}

interface IBlogCarouselItemProps extends IBlogCarouselItemStateProps, IBlogCarouselItemDispatchProps {
}

const propTypes: ValidationMap<IBlogCarouselItemProps> = {
  data: PropTypes.any.isRequired,
};

interface ITaxonomyElementProps {
  readonly taxonomyTerms: ReadonlyArray<{ readonly name: string }>;
}

const PostTag = getItemElementRenderer(
  'blog_categories',
  React.forwardRef<HTMLSpanElement, IElementStringValue & ITaxonomyElementProps>(({ taxonomyTerms }, ref) => (
      taxonomyTerms[0] ? (
        <span
          ref={ref}
          className="post-tag bg-grad text-white mb-3 clearfix"
        >
          <a href="#!">{taxonomyTerms[0].name}</a>
        </span>
      ) : null
    ),
  ));

const PostAuthor = getItemElementRenderer(
  'surname',
  React.forwardRef<HTMLDivElement, IElementStringValue & { readonly name: string; }>(({ value: surname, name }, ref) => (
    <div
      ref={ref}
      className="post-author"
    >
      <a href="#!">By{' '}{name}{' '}{surname[0]}</a>
    </div>
  )),
);

const PostPublishDate = getItemElementRenderer(
  'official_publish_date',
  React.forwardRef<HTMLImageElement, IElementStringValue>(({ value }, ref) => (
    <div
      className="post-time"
      ref={ref}
    >
      <a href="#!">{' '}{printFuzzyDate(new Date(value))}</a>
    </div>
  )),
);

const PostTitle = getItemElementRenderer(
  'title',
  React.forwardRef<HTMLAnchorElement, IElementStringValueWithQuery>(({ value, query }, ref) => (
    <a
      ref={ref}
      className="post-title"
      href={'/blog'+ addPersistentProjId(query) + addDetailQueryString(query) + value}
    >
      {value}
    </a>
  )),
);

const PostLeadParagraph = getItemElementRenderer(
  'lead_paragraph',
  React.forwardRef<HTMLParagraphElement, IElementStringValue>(({ value }, ref) => (
    <p
      ref={ref}
      className="mb-0"
    >
      {stripPTags(value)}
    </p>
  )),
);

export const BlogCarouselItem: NextFC<IBlogCarouselItemProps> = ({ data, query }) => {
  const { author: { 0: author } } = data;
  return (
    <div
      className="item"
    >
      <div className="post">
        <div className="post-info">
          <PostTag
            data={data}
            taxonomyTerms={data.blog_categories.taxonomyTerms}
          />
          <PostAuthor
            data={author}
            name={author.name.value}
          />
          ,
          <PostPublishDate
            data={data}
          />
          <PostTitle
            query={query}
            data={data}
          />
          <PostLeadParagraph
            data={data}
          />
        </div>
      </div>
    </div>
  );
};

BlogCarouselItem.displayName = 'BlogCarouselItem';
BlogCarouselItem.propTypes = propTypes;
