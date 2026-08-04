import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import Dashboard from "@/pages/Dashboard";
import Tokens from "@/pages/Tokens";
import WidgetsPage from "@/pages/WidgetsPage";
import DoohickeysPage from "@/pages/DoohickeysPage";

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route
                    path="/"
                    element={<Dashboard />}
                />

                <Route
                    path="/tokens"
                    element={<Tokens />}
                />

                <Route
                    path="/widgets"
                    element={<WidgetsPage />}
                />

                <Route
                    path="/doohickeys"
                    element={<DoohickeysPage />}
                />

                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />
            </Route>
        </Routes>
    );
}