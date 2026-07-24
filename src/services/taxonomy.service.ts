import { GraphQLClient } from "graphql-request";
import { GET_TAXONOMIES } from "../graphql/taxonomy.query";

export async function getTaxonomies() {
  const client = new GraphQLClient(process.env.WORDPRESS_GRAPHQL!);

  const data: any = await client.request(GET_TAXONOMIES);

  return {
    cities: data.cities.nodes,
    types: data.propertyTypes.nodes,
    statuses: data.propertyStatuses.nodes,
  };
}