import { GraphQLClient } from "graphql-request";
import { GET_PROPERTIES } from "../graphql/property.query";
import { GET_PROPERTY_BY_SLUG } from "../graphql/propertyBySlug.query";

export async function getProperties(
  filters?: {
    city?: string;
    type?: string;
    status?: string;
    search?: string;
  },
  page: number = 1,
  limit: number = 10
) {
  const endpoint = process.env.WORDPRESS_GRAPHQL!;

  const client = new GraphQLClient(endpoint);

  const data: any = await client.request(GET_PROPERTIES);

  const properties = data.properties.nodes.map((property: any) => ({
    id: property.propertyDetails.propertyId,
    title: property.title,
    slug: property.slug,

    // Featured Image
    image: property.featuredImage?.node?.sourceUrl ?? null,
    imageAlt: property.featuredImage?.node?.altText ?? null,

    price: property.propertyDetails.price,
    bedrooms: property.propertyDetails.bedrooms,
    bathrooms: property.propertyDetails.bathrooms,
    address: property.propertyDetails.address,
    agentName: property.propertyDetails.agentName,
    phone: property.propertyDetails.phone,
    email: property.propertyDetails.email,

    type: property.propertyTypes.nodes[0]?.name ?? null,
    city: property.cities.nodes.map((city: any) => city.name),
    status: property.propertyStatuses.nodes[0]?.name ?? null
  }));


  // Filtering logic

  let filteredProperties = properties;


  // Filter by City
  if (filters?.city) {
    filteredProperties = filteredProperties.filter((property: any) =>
      property.city.some(
        (city: string) =>
          city.toLowerCase() === filters.city!.toLowerCase()
      )
    );
  }


  // Filter by Property Type
  if (filters?.type) {
    filteredProperties = filteredProperties.filter(
      (property: any) =>
        property.type?.toLowerCase() === filters.type!.toLowerCase()
    );
  }


  // Filter by Property Status
  if (filters?.status) {
    filteredProperties = filteredProperties.filter(
      (property: any) =>
        property.status?.toLowerCase() === filters.status!.toLowerCase()
    );
  }


  // Search by Title
  if (filters?.search) {
    filteredProperties = filteredProperties.filter((property: any) =>
      property.title
        .toLowerCase()
        .includes(filters.search!.toLowerCase())
    );
  }


  // Pagination

  const total = filteredProperties.length;
  const totalPages = Math.ceil(total / limit);

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedProperties = filteredProperties.slice(
    startIndex,
    endIndex
  );


  return {
    page,
    limit,
    total,
    totalPages,
    count: paginatedProperties.length,
    properties: paginatedProperties,
  };
}



export async function getPropertyBySlug(slug: string) {

  const endpoint = process.env.WORDPRESS_GRAPHQL!;

  const client = new GraphQLClient(endpoint);


  const variables = {
    slug
  };


  const data: any = await client.request(
    GET_PROPERTY_BY_SLUG,
    variables
  );


  if (!data.property) {
    return null;
  }


  const property = data.property;


  return {
    id: property.propertyDetails.propertyId,
    title: property.title,
    slug: property.slug,
    description: property.content,
    
    // Featured Image
    image: property.featuredImage?.node?.sourceUrl ?? null,
    imageAlt: property.featuredImage?.node?.altText ?? null,

    price: property.propertyDetails.price,
    bedrooms: property.propertyDetails.bedrooms,
    bathrooms: property.propertyDetails.bathrooms,
    address: property.propertyDetails.address,
    agentName: property.propertyDetails.agentName,
    phone: property.propertyDetails.phone,
    email: property.propertyDetails.email,

    type: property.propertyTypes.nodes[0]?.name ?? null,
    city: property.cities.nodes.map((city: any) => city.name),
    status: property.propertyStatuses.nodes[0]?.name ?? null
  };
}