import { PageRequest } from "@/core/models/requests/PageRequest";

export const QueryParserForPageRequest = (
  query: { [key: string]: string | undefined } | URLSearchParams,
  defaults: PageRequest = { pageIndex: 0, pageSize: 20 },
): PageRequest => {
  const get = (key: string) => (query instanceof URLSearchParams ? query.get(key) : query[key]);

  const pageIndex = parseInt(get("pageIndex") || "", 10);
  const pageSize = parseInt(get("pageSize") || "", 10);

  return {
    pageIndex: isNaN(pageIndex) || pageIndex < 0 ? defaults.pageIndex : pageIndex,
    pageSize: isNaN(pageSize) || pageSize < 1 ? defaults.pageSize : pageSize,
  };
};
