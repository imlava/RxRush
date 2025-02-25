import React from 'react';
import '../styles/globals.css'; // If you have global styles

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;