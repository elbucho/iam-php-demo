import request from "./api";
import { Permission } from "@/types/Permission";

const API_BASE = import.meta.env.VITE_IAM_URL;

export const permissionApi = {
    list(): Promise<Permission[]> {
        return request<Permission[]>(`${API_BASE}/permissions`, {}, 'permissions');
    }
}