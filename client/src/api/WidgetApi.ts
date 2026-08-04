import request from "./api";
import { Widget } from "@/types/Widget";

const API_BASE = import.meta.env.VITE_RESOURCE_URL;

export const widgetApi = {
    list() {
        return request<Widget[]>(`${API_BASE}/widgets`);
    },

    get(id: number) {
        return request<Widget>(`${API_BASE}/widgets/${id}`);
    },

    create(widget: Widget) {
        return request<Widget>(`${API_BASE}/widgets`, {
            method: "POST",
            body: JSON.stringify(widget)
        });
    },

    update(widget: Widget) {
        return request<Widget>(`${API_BASE}/widgets/${widget.id}`, {
            method: "PATCH",
            body: JSON.stringify(widget)
        });
    },

    remove(id: number) {
        return request<void>(`${API_BASE}/widgets/${id}`, {
            method: "DELETE"
        });
    }
}