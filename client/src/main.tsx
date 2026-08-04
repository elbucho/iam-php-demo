import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import {
    QueryClient,
    QueryClientProvider
} from "@tanstack/react-query";
import { Security } from "@okta/okta-react";
import { toRelativeUrl } from "@okta/okta-auth-js";
import App from "./App";
import { okta } from "./services/okta";
import AuthProvider from "@/context/AuthProvider";

const queryClient = new QueryClient();

function AppWithAuth() {
    const navigate = useNavigate();

    const restoreOriginalUri = async (
        _oktaAuth: unknown,
        originalUri?: string
    )=> {
        navigate(
            toRelativeUrl(
                originalUri || "/",
                window.location.origin,
            ),
            { replace: true }
        );
    };

    return (
        <Security
            oktaAuth={okta}
            restoreOriginalUri={restoreOriginalUri}
        >
            <AuthProvider>
                <App />
            </AuthProvider>
        </Security>
    );
}

const container = document.getElementById("root");

if (!container) {
    throw new Error('Root element with id="root" was not found.');
}

const root = ReactDOM.createRoot(container);

root.render(
    <React.StrictMode>
        <ChakraProvider value={defaultSystem}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <AppWithAuth />
                </BrowserRouter>
            </QueryClientProvider>
        </ChakraProvider>
    </React.StrictMode>
);