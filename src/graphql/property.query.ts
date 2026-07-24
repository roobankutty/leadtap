export const GET_PROPERTIES = `
query GetProperties {
  properties(first: 100) {
    nodes {
      title
      slug

      featuredImage {
        node {
          sourceUrl
          altText
        }
      }

      propertyDetails {
        price
        bedrooms
        bathrooms
        address
        agentName
        phone
        email
        propertyId
      }

      propertyTypes {
        nodes {
          name
        }
      }

      cities {
        nodes {
          name
        }
      }

      propertyStatuses {
        nodes {
          name
        }
      }
    }
  }
}
`;