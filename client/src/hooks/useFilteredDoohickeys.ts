import { Doohickey } from "@/types/Doohickey";
import { useMemo } from "react";

export function useFilteredDoohickeys(
    doohickeys: Doohickey[] | undefined,
    search: string
): Doohickey[] {
    return useMemo(() => {
        if (!doohickeys) {
            return [];
        }

        const term = search.trim().toLowerCase();

        if (term === "") {
            return doohickeys;
        }

        return doohickeys.filter(doohickey =>
            doohickey.name.toLowerCase().includes(term) ||
            doohickey.foo.toLowerCase().includes(term)
        );

    }, [doohickeys, search]);
}