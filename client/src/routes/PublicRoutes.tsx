import { Route, Routes, Navigate } from "react-router-dom";
import PublicLayout from "@/components/layout/PublicLayout";
import LandingPage from "@/pages/LandingPage";

export default function PublicRoutes() {
    return (
        <Routes>
            <Route element={<PublicLayout />}>
                <Route
                    path="/"
                    element={<LandingPage />}
                />

                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />
            </Route>
        </Routes>
    );
}