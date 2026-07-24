export const GET_PROPERTY_BY_SLUG = `
query PropertyBySlug($slug: ID!) {
  property(id: $slug, idType: SLUG) {
    title
    slug
    content 
    
	featuredImage {
	  node {
		sourceUrl
		altText
	  }
	}
	
    propertyDetails {
      propertyId
      price
      bedrooms
      bathrooms
      address
      agentName
      phone
      email
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
`;