import { Tag } from "./tag";
export interface ChartData {
  periodData: number[];
  previousData: number[];
  labels: string[];
  periodTags: Tag[];
  previousTags: Tag[];
}
