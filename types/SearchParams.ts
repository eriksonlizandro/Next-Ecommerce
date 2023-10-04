import { type } from "os";

type Params = { 
  id : string;
}
type SearchParams = {
  id: string;
  name: string;
  image: string;
  unit_amount: number | null;
  description: string | null;
  features: string;
}

export type SearchParamsTypes = {
  params: Params,
  searchParams: SearchParams,
};
