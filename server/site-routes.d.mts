export const PAGE_PATHS: string[];
export function resolvePageRequest(pathname: string): { redirect?: string; file?: string; status?: number } | null;
