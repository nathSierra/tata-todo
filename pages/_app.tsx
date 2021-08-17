import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../common/contexts/authContext';
import { ReactQueryDevtoolsPanel } from 'react-query/devtools';


import {
  QueryClient,
  QueryClientProvider
} from 'react-query';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (<QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
                <ReactQueryDevtoolsPanel />
            </QueryClientProvider>);
}
export default MyApp
