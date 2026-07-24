import api from "../api/axios";
import type { Property } from "../types/property";

export interface PropertyResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  count: number;
  properties: Property[];
}

export async function getProperties(
  filters?: {
    city?: string;
    type?: string;
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }
): Promise<PropertyResponse> {

  const response = await api.get("/properties", {
    params: filters,
  });

  return response.data;
}

export async function getPropertyBySlug(
  slug: string
): Promise<Property> {

  const response = await api.get(`/properties/${slug}`);

  return response.data.property;
}