import React from 'react';
import App, { Container } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import ContextProvider from '~/provider/ContextProvider';
import fetch from 'isomorphic-unfetch';
import config from 'react-reveal/globals';
import parser from 'ua-parser-js';

import Layout from '~/components/layouts/default';

import { trackPageView } from '~/utils/analytics';

import GlobalStyles from '~/styles/global/Global';
import TypographyStyles from '~/styles/global/Typography';
import MapStyles from '~/styles/global/Map';
import ContainerStyles from '~/styles/global/Containers';

NProgress.configure({ showSpinner: false });

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = url => {
  NProgress.done();
  trackPageView(url);
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

config({ ssrFadeout: true });

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const isServer = typeof window === 'undefined';

    if (isServer) {
      const ua = parser(ctx.req.headers['user-agent']);
      const browserName = ua.browser.name;

      // Get Availability Data
      let availabilityRes = await fetch('https://cms.dbox.com/wp-json/wp/v2/hsp_availability?per_page=100');
      let availabilityData = await availabilityRes.json();
      const fullAvailabilityData = availabilityData;

      availabilityData = availabilityData.map(el => {
        return el.acf;
      });

      // Get News Data
      let newsRes = await fetch('https://cms.dbox.com/wp-json/wp/v2/hsp_news?per_page=100');
      let newsData = await newsRes.json();
      newsData = newsData.map(el => {
        return el.acf;
      });

      // Get Press Data
      let pressRes = await fetch('https://cms.dbox.com/wp-json/wp/v2/hsp_press?per_page=100');
      let pressData = await pressRes.json();
      pressData = pressData.map(el => {
        return el.acf;
      });

      // Get Contact Data
      let contactRes = await fetch('https://cms.dbox.com/wp-json/wp/v2/hsp_contacts?per_page=100');
      let contactData = await contactRes.json();
      contactData = contactData.map(el => {
        return el.acf;
      });

      let pageProps = {};

      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
      }

      return { browserName, contactData, availabilityData, fullAvailabilityData, newsData, pressData, pageProps };
    } else {
      let pageProps = {};

      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
      }
      return { pageProps };
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <ContextProvider {...this.props}>
          <ContainerStyles />
          <GlobalStyles />
          <TypographyStyles />
          <MapStyles />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ContextProvider>
      </Container>
    );
  }
}
