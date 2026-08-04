import request from "./api";
import { Doohickey } from "@/types/Doohickey";

const API_BASE = import.meta.env.VITE_RESOURCE_URL;

export const doohickeyApi = {
    list() {
        return request<Doohickey[]>(`${API_BASE}/doohickeys`);
    },

    get(id: number) {
        return request<Doohickey>(`${API_BASE}/doohickeys/${id}`);
    },

    create(doohickey: Doohickey) {
        return request<Doohickey>(`${API_BASE}/doohickeys`, {
            method: "POST",
            body: JSON.stringify(doohickey)
        });
    },

    update(doohickey: Doohickey) {
        return request<Doohickey>(`${API_BASE}/doohickeys/${doohickey.id}`, {
            method: "PATCH",
            body: JSON.stringify(doohickey)
        });
    },

    remove(id: number) {
        return request<void>(`${API_BASE}/doohickeys/${id}`, {
            method: "DELETE"
        });
    }
}