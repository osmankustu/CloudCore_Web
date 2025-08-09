export interface FilterField {
  label: string;
  value: string;
  type?: "string" | "date" | "number" | "enum"; // field tipi ekliyoruz
}

export interface FilterItem {
  field?: string;
  operator?: string;
  value?: string;
  from?: string;
  to?: string;
}

export interface SortItem {
  field: string;
  dir: string;
}

interface Filter {
  field?: string;
  operator?: string;
  value?: string;
  logic?: string;
  caseSensitive?: boolean;
  filters?: FilterItem[];
}

export interface DynamicQuery {
  sort: SortItem[];
  filter: Filter;
}

export interface Operator {
  label: string;
  value: string;
}
