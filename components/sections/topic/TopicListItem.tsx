import { ContentItem, DeliveryClient } from 'kentico-cloud-delivery';
import { NextFC } from 'next';
import PropTypes, { ValidationMap } from 'prop-types';
import React from 'react';
import { getItemElementRenderer } from '../../ItemElementValue';
import { getProjectApiKey } from '../../../pages/topics'
import { ArticleListItem} from '../article/ArticleListItem';
import { BlogListItem} from '../blog/BlogListItem';
import { IElementStringValue } from '../auxiliarytypes';



export interface ITopicListItemStateProps {
  readonly data: ContentItem;
  readonly query: Record<string, string | string[] | undefined>;
}

export interface ITopicListItemDispatchProps {
}

interface ITopicListItemProps extends ITopicListItemStateProps, ITopicListItemDispatchProps {
}

const propTypes: ValidationMap<ITopicListItemProps> = {
  data: PropTypes.any.isRequired
};

const TopicTitle = getItemElementRenderer(
  'name',
  React.forwardRef<HTMLAnchorElement, IElementStringValue>(({ value }, ref) => (
    <div className='pb-5'>
      <h2>
        {value}
      </h2>
    </div>
  )),
);


export const TopicListItem: NextFC<ITopicListItemProps> = ({ data, query }) => {
  return (
    <div
      className="item"
    >
      <div className="topic">
        <div className="topic-info">
          
          <TopicTitle
            data={data}
          /> 
          {data.related_posts.filter((article: ContentItem) => article.system.type == 'article').map((article: ContentItem) => ( 
                    
                    <ArticleListItem
                      query={query}
                      key={article.system.id}
                      data={article}
                    />
           ))}

          {data.related_posts.filter((blog: ContentItem) => blog.system.type == 'blog_post').map((blog: ContentItem) => ( 
                    
                    <BlogListItem
                      query={query}
                      key={blog.system.id}
                      data={blog}
                    />
           ))}
         

        </div>
      </div>
      <br/>
      <br/>
    </div>
    
  );
};

TopicListItem.displayName = 'TopicListItem';
TopicListItem.propTypes = propTypes;
