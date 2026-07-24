import { gql } from "graphql-request";

export const GET_TAXONOMIES = gql`
  query GetTaxonomies {
    cities(first: 100) {
      nodes {
        name
        slug
      }
    }

    propertyTypes(first: 100) {
      nodes {
        name
        slug
      }
    }

    propertyStatuses(first: 100) {
      nodes {
        name
        slug
      }
    }
  }
`;