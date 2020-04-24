import Head from 'next-server/head';
import {
  ComponentClass,
  FC,
} from 'react';
import * as React from 'react';
import { NextFC } from 'next';
import { CannotRender } from '../components/CannotRender';
import { GoToTop } from '../components/GoToTop';
import { Header } from '../components/sections/header/Header';
import { NavBar } from '../components/navbar/NavBar';
import { Layout } from '../components/layout/layout';
import { PreLoader } from '../components/PreLoader';
import { AboutUsSection } from '../components/sections/aboutUs/AboutUsSection';
import { ArticleSection } from '../components/sections/article/ArticleSection';
import { ArticleList } from '../components/sections/article/ArticleList';
import { TopicList } from '../components/sections/topic/TopicList';
import { FooterSection } from '../components/sections/footer/FooterSection';
import { ServiceSection } from '../components/sections/service/ServiceSection';
import {
  ContentItem,
  DeliveryClient,
} from 'kentico-cloud-delivery';
import { PreviewContext } from '../components/context/PreviewContext';
import { ContentItemElementContext } from '../components/context/ContentItemElementContext';
import fetch from 'cross-fetch';
import { getProjectIdFromQuery } from '../utilities/utils';


type Content = {
  readonly item: ContentItem;
  readonly linkedItems: ReadonlyArray<ContentItem>;
};

type TopicsProps = {
  readonly content: Content;
  readonly navigation: Content;
  readonly brandDetails: Content;
  readonly sections: ReadonlyArray<ContentItem>;
  readonly isPreview: boolean;
  readonly removeScrollbar: boolean;
  readonly projectId: string;
}

const SectionRendererMap: { [contentType: string]: ComponentClass<any> | FC<any> } = {
  'none': CannotRender,
  'section_about_us': AboutUsSection,
  'section_hero_unit': Header,
  'section_highlighted_features': ServiceSection,
  'section_articles': ArticleSection,
  'section_article_list': ArticleList,
  'section_topic_list': TopicList
};

export const getProjectApiKey = async (projectId: string, hostname: string): Promise<string | undefined> => {
  console.log('hostname:', hostname);
  return (await (await fetch(`http${hostname.includes('localhost') ? '' : 's'}://${hostname}/api-key/${projectId}`)).json()).key;
};

const getRenderComponentForSection = (sectionType: string): (ComponentClass<any> | FC<any>) => {
  if (SectionRendererMap[sectionType]) {
    return SectionRendererMap[sectionType];
  }
  return SectionRendererMap['none'];
};
type ItemMap = { readonly [codename: string]: ContentItem };

const Topics: NextFC<TopicsProps> = ({
    brandDetails,
    content,
    isPreview,
    navigation,
    projectId,
    removeScrollbar,
    sections
  }) => {
  
    return (
      <PreviewContext.Provider
        value={{
          isPreview,
          projectId,
        }}
      >
        <Layout>
          <Head>
            <title>{content.item.page_title.value}</title>
            {removeScrollbar && (
              <style>
                {`::-webkit-scrollbar { 
      display: none; 
  }
  html,body{
    scrollbar-width: none;
  }`}
              </style>
            )}
          </Head>
          <PreLoader />
  
          <NavBar
            navigation={navigation.item}
            brandDetails={brandDetails.item}
          />
  
          <ContentItemElementContext.Provider
            value={{
              itemId: content.item.system.id,
              language: content.item.system.language,
              elementCodename: 'sections',
            }}
          >
            {
              sections.map((section: ContentItem) => {
                const Component = getRenderComponentForSection(section.system.type);
                return (
                  <Component
                    key={section.system.id}
                    data={section}
                  />
                );
              })
            }
          </ContentItemElementContext.Provider>
          <FooterSection
            data={brandDetails.item}
          />
          <GoToTop />
        </Layout>
      </PreviewContext.Provider>
    );
  };
  
  Topics.getInitialProps = async ({ query, req }) => {
    const hostname = req ? req.headers.host : location.hostname;
    const isPreview = Object.hasOwnProperty.call(query, 'preview');
    const removeScrollbar = Object.hasOwnProperty.call(query, 'no-scrollbar');
    const projectId = getProjectIdFromQuery(query);
    const client = new DeliveryClient({
      projectId,
      enablePreviewMode: isPreview,
      previewApiKey: isPreview ? await getProjectApiKey(projectId, hostname || '') : '',
    });
    const { debug: forget1, ...content } = await client.item('all_topics').withParameter('depth', '10').getPromise();
    const { debug: forget2, ...navigation } = await client.item('website_navigation').withParameter('depth', '10').getPromise();
    const { debug: forget3, ...brandDetails } = await client.item('brand_details').withParameter('depth', '10').getPromise();
    
    const linkedItemsByCodename = content.linkedItems.reduce((map: ItemMap, contentItem: ContentItem) => {
      return {
        ...map,
        [contentItem.system.codename]: contentItem,
      };
    }, {} as ItemMap);

  
    const sections: ReadonlyArray<ContentItem> = content.item.sections.linkedItemCodenames.map((codename: string) => linkedItemsByCodename[codename]);

    const articleSection = sections.find((section: ContentItem) => section.system.type === 'section_articles');
    const articleList = sections.find((section: ContentItem) => section.system.type === 'section_article_list');
    const topicList = sections.find((section: ContentItem) => section.system.type === 'section_topic_list'); 
    
    if (topicList) {  
        var { items } = await client.items().type('topic').getPromise(); // get all topics  
       topicList.topic = items;
    }

    if (articleSection) {  // top 3 articles    
      var { items } = await client.items().type('article').getPromise(); // get all articles
      articleSection.article = items;
    }

    if (articleList) { 
        var { items } = await client.items().type('blog_post').getPromise(); // get all blogs     
        articleList.article = items; 
    }
  

  
    return {
      brandDetails,
      content: content as Content,
      isPreview,
      navigation,
      projectId,
      removeScrollbar,
      sections
    };
  };
  
  export default Topics;
  