import { ContentItem, DeliveryClient } from 'kentico-cloud-delivery';
import { NextFC } from 'next';
import PropTypes, { ValidationMap } from 'prop-types';
import React from 'react';
import { getItemElementRenderer } from '../../ItemElementValue';
import { getProjectApiKey } from '../../../pages/topics'
import { ArticleListItem} from '../article/ArticleListItem';
import { BlogListItem} from '../blog/BlogListItem';



export interface ITopicListItemStateProps {
  readonly data: ContentItem;
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
    <div className='row'>
      <h2>
        {value}
      </h2>
      <br/>
      <br/>
      <br/>
    </div>
  )),
);


export const TopicListItem: NextFC<ITopicListItemProps> = ({ data }) => {
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
                      key={article.system.id}
                      data={article}
                    />
           ))}

          {data.related_posts.filter((blog: ContentItem) => blog.system.type == 'blog_post').map((blog: ContentItem) => ( 
                    
                    <BlogListItem
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
