import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../common/contexts/authContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools} from 'react-query/devtools';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (<QueryClientProvider client={queryClient}><AuthProvider>
                <Component {...pageProps} />
                <ReactQueryDevtools />
            </AuthProvider>
            </QueryClientProvider>);
}
export default MyApp
