import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './styles/globalStyles';
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
});
root.render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={true}/>
          <BrowserRouter>
              <App />
              <GlobalStyle />
          </BrowserRouter>
      </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();
