import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import GlobalStyle from './styles/globalStyles';
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import {Colors} from "./styles/theme/color";
import {Toaster} from "react-hot-toast";
import ScrollToTop from "./components/ScrollToTop";

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
    <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true}/>
        <BrowserRouter>
            <ScrollToTop/>
            <Toaster
                position="top-center"
                reverseOrder={true}
                gutter={8}
                toastOptions={{
                    className: '',
                    duration: 5000,
                    style: {
                        background: Colors["White"],
                        color: Colors["Black"],
                    },
                }}
            />
            <App/>
            <GlobalStyle/>
        </BrowserRouter>
    </QueryClientProvider>
);

reportWebVitals();
