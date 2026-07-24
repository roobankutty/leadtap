import api from "../api/axios";

export interface Taxonomy {
  name: string;
  slug: string;
}

export interface TaxonomyResponse {
  cities: Taxonomy[];
  types: Taxonomy[];
  statuses: Taxonomy[];
}

export async function getTaxonomies(): Promise<TaxonomyResponse> {
  const response = await api.get("/taxonomies");
  return response.data;
}