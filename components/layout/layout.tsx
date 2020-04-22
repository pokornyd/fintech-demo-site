import * as React from 'react';
import { NextFC } from 'next';
import Head from 'next/head';
import './layout.scss';

export const Layout: NextFC = ({ children }) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <meta
        httpEquiv="X-UA-Compatible"
        content="IE=edge"
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      />
      <meta
        name="author"
        content="Webestica.com"
      />
      <meta
        name="description"
        content="Creative Multipurpose Bootstrap Template"
      />

      {/*-- Favicon --*/}
      <link
        rel="shortcut icon"
        href="static/assets/images/favicon.ico"
      />

      {/*-- Google Font --*/}
      <link
        href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800,900%7CPlayfair+Display:400,400i,700,700i%7CRoboto:400,400i,500,700"
        rel="stylesheet"
      />

      {/*-- Plugins CSS --*/}
      <link
        rel="stylesheet"
        type="text/css"
        href="static/assets/vendor/font-awesome/css/font-awesome.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="static/assets/vendor/themify-icons/css/themify-icons.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="static/assets/vendor/animate/animate.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="static/assets/vendor/fancybox/css/jquery.fancybox.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="static/assets/vendor/owlcarousel/css/owl.carousel.min.css"
      />

      {/*-- Theme CSS --*/}
      <link
        rel="stylesheet"
        type="text/css"
        href="static/assets/css/style.css"
      />
    </Head>
    {children}
    {/*--Global JS--*/}
    <script src="static/assets/vendor/jquery/jquery.min.js" />
    <script src="static/assets/vendor/popper.js/umd/popper.min.js" />
    <script src="static/assets/vendor/bootstrap/dist/js/bootstrap.min.js" />
    <script src="static/assets/vendor/jquery-easing/jquery.easing.min.js" />

    {/*--Vendors--*/}
    <div id="vendor-scripts" />
    <script src="static/assets/vendor/owlcarousel/js/owl.carousel.min.js" />
    <script src="static/assets/vendor/fancybox/js/jquery.fancybox.min.js" />

    <script src="static/assets/vendor/jquery-countTo/jquery.countTo.js" />
    <script src="static/assets/vendor/jquery-appear/jquery.appear.js" />
    <script src="static/assets/vendor/wavify/wavify.js" />
  </>
);
