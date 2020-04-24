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
  readonly dataArticles: ContentItem;
  readonly dataBlogs: ContentItem;
}

export interface ITopicListItemDispatchProps {
}

interface ITopicListItemProps extends ITopicListItemStateProps, ITopicListItemDispatchProps {
}

const propTypes: ValidationMap<ITopicListItemProps> = {
  data: PropTypes.any.isRequired,
  dataArticles: PropTypes.any.isRequired,
  dataBlogs: PropTypes.any.isRequired,
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

// const RelatedPosts = getItemElementRenderer(
//   'related_posts',
//   React.forwardRef<HTMLAnchorElement, IElementStringValue>(({value}, ref) =>(
//     <h4>
//       {value}
//     </h4>
//   )),
// );


export const TopicListItem: NextFC<ITopicListItemProps> = ({ data, dataArticles, dataBlogs }) => {
  return (
    <div
      className="item"
    >
      <div className="topic">
        <div className="topic-info">
          
          <TopicTitle
            data={data}
          /> 
         
          {dataArticles.article.map((article: ContentItem) => ( //if contentItem is linked display, otherwise skip
                    <ArticleListItem
                      key={article.system.id}
                      data={article}
                    />
                  ))}
          {dataBlogs.blog.map((blog: ContentItem) => (
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
