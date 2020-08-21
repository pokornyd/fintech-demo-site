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
import { ArticleDetail } from '../components/sections/article/ArticleDetail';
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
import { getCodenameFromQuery } from '../utilities/utils';
import { RecommendationClient } from '@kentico/kontent-recommendations';
import { ContactUs } from '../components/sections/contactUs/ContactUs';


type Content = {
  readonly item: ContentItem;
  readonly linkedItems: ReadonlyArray<ContentItem>;
};

type ArticlesProps = {
  readonly queryObj: Record<string, string | string[] | undefined>;
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
  'section_article_list': ArticleDetail,
  'section_contact_us': ContactUs
};

const getProjectApiKey = async (projectId: string, hostname: string): Promise<string | undefined> => {
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

const Articles: NextFC<ArticlesProps> = ({
    queryObj,
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
            query={queryObj}
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
                    query={queryObj}
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
  
  Articles.getInitialProps = async ({ query, req }) => {
    const queryObj = query;
    const hostname = req ? req.headers.host : location.hostname;
    const isPreview = Object.hasOwnProperty.call(query, 'preview');
    const removeScrollbar = Object.hasOwnProperty.call(query, 'no-scrollbar');
    const recommenderKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIwN2EwZTZlMi03NTIyLTAxNjgtNGFiZS05NmNhNTRlZTY4ZTMiLCJwaWQiOiIwN2EwZTZlMi03NTIyLTAxNjgtNGFiZS05NmNhNTRlZTY4ZTMiLCJqdGkiOiJwbzBtT2pNMXZTN0pacHdsIiwiaXNzIjoicmVjb21tZW5kLmtvbnRlbnQuYWkiLCJhdWQiOiJyZWNvbW1lbmQua29udGVudC5haSJ9.ENSEeEOWwwVa-iGye3XxPYwHqyLTfnTv0VRb1oqMmW8';
    const projectId = getProjectIdFromQuery(query);
    const client = new DeliveryClient({
      projectId,
      enablePreviewMode: isPreview,
      previewApiKey: isPreview ? await getProjectApiKey(projectId, hostname || '') : '',
    });
    const recommendationClient = new RecommendationClient({
      projectId: projectId,
      apiKey: recommenderKey
      //baseUrl: 'https://recommend.kontent.ai/api/v2/'
    });
    const { debug: forget1, ...content } = await client.item('articles').withParameter('depth', '10').getPromise();

    const codename = getCodenameFromQuery(query);
    
    var { items } = await client.items().type('article').equalsFilter('system.codename',codename).limitParameter(1).getPromise();
    var recommendationConfig = JSON.parse(items[0].elements.recommendations.value); 
    
    const linkedItemsByCodename = content.linkedItems.reduce((map: ItemMap, contentItem: ContentItem) => {
      return {
        ...map,
        [contentItem.system.codename]: contentItem,
      };
    }, {} as ItemMap);
  
    const sections: ReadonlyArray<ContentItem> = content.item.sections.linkedItemCodenames.map((codename: string) => linkedItemsByCodename[codename]);
  
    const articleSection = sections.find((section: ContentItem) => section.system.type === 'section_articles');
    const articleDetail = sections.find((section: ContentItem) => section.system.type === 'section_article_list');
    const index = sections.findIndex((section: ContentItem) => section.system.type === 'section_hero_unit');

    if (articleDetail) {      
        articleDetail.article = items;
        sections[index].title.value = items[0].elements.title.value;
        sections[index].description.value = "";
        //sections[index].backdrop_image.value = items[0].elements.
        sections[index].elements.backdrop_image.value[0] = items[0].elements.teaser_image.value[0];
    }

    if (articleSection) {
      var { data } = await recommendationClient.recommendItems()
        .withData({
          currentItemCodename: recommendationConfig.itemCodename,
          requestedTypeCodename: recommendationConfig.requestedType,
          responseLimit: recommendationConfig.requestedCount,
          visitId: 'z',
          recommendationSettings: {
            scenario: recommendationConfig.scenario
          }
        }).toPromise();

      var { items } = await client.items().type('article').inFilter('system.codename', data.map(item => item.codename)).getPromise(); 
      articleSection.article = items;
    }
  
    const { debug: forget2, ...navigation } = await client.item('website_navigation').withParameter('depth', '10').getPromise();
    const { debug: forget3, ...brandDetails } = await client.item('brand_details').withParameter('depth', '10').getPromise();
   
  
    return {
      brandDetails,
      content: content as Content,
      isPreview,
      navigation,
      projectId,
      removeScrollbar,
      sections,
      queryObj,
    };
  };
  
  export default Articles;
  