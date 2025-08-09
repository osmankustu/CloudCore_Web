import { BlobOptions } from "buffer";

export interface Paginated<T> {
  items: Array<T>;
  index: number;
  size: number;
  count: number;
  pages: number;
  hasPrevious: boolean;
  hasNext: BlobOptions;
}
