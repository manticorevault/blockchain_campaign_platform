import React from "react";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }: {Component: React.FC; pageProps: any }) {
 
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
      );
  }
 
  export default MyApp;