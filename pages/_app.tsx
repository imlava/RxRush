import { AppProps } from 'next/app';
import '../styles/globals.css'; // If you have global styles

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;