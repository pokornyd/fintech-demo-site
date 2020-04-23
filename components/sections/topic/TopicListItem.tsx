import { ContentItem, DeliveryClient } from 'kentico-cloud-delivery';
import { NextFC } from 'next';
import PropTypes, { ValidationMap } from 'prop-types';
import React from 'react';
import { getItemElementRenderer } from '../../ItemElementValue';
import { getProjectApiKey } from '../../../pages/topics'


export interface ITopicListItemStateProps {
  readonly data: ContentItem;
}

export interface ITopicListItemDispatchProps {
}

interface ITopicListItemProps extends ITopicListItemStateProps, ITopicListItemDispatchProps {
}

const propTypes: ValidationMap<ITopicListItemProps> = {
  data: PropTypes.any.isRequired,
};

const TopicTitle = getItemElementRenderer(
  'name',
  React.forwardRef<HTMLAnchorElement, IElementStringValue>(({ value }, ref) => (
    <h3>
      {value}
    </h3>
  )),
);

const RelatedPosts = getItemElementRenderer(
  'related_posts',
  React.forwardRef<HTMLAnchorElement, IElementStringValue>(({value}, ref) =>(
    <h4>
      {value}
    </h4>
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
          <RelatedPosts
            data={data}
          />       
        </div>
      </div>
      <br/>
      <br/>
    </div>
    
  );
};

TopicListItem.displayName = 'TopicListItem';
TopicListItem.propTypes = propTypes;
