import { Widget } from "@/types/Widget";
import { useMemo } from "react";

export function useFilteredWidgets(
    widgets: Widget[] | undefined,
    search: string
): Widget[] {
    return useMemo(() => {
        if (!widgets) {
            return [];
        }

        const term = search.trim().toLowerCase();

        if (term === "") {
            return widgets;
        }

        return widgets.filter(widget =>
            widget.name.toLowerCase().includes(term) ||
            widget.type.toLowerCase().includes(term)
        );

    }, [widgets, search]);
}