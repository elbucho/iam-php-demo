import {
    Center,
    Spinner
} from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import { LoginCallback } from "@okta/okta-react";
import { useAuth } from "@/hooks/useAuth";
import AppRoutes from "@/routes/AppRoutes";
import PublicRoutes from "@/routes/PublicRoutes";

export default function App() {
    const auth = useAuth();

    return (
        <Routes>
            <Route
                path="/login/callback"
                element={<LoginCallback />}
            />

            <Route
                path="*"
                element={
                    auth.loading ? (
                        <Center h="100vh">
                            <Spinner />
                        </Center>
                    ) : auth.authenticated ? (
                        <AppRoutes />
                    ) : (
                        <PublicRoutes />
                    )
                }
            />
        </Routes>
    );
}