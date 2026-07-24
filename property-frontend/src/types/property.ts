export interface Property {
  id: number;
  title: string;
  slug: string;

   description: string;

  image: string | null;
  imageAlt: string | null;

  price: number;
  bedrooms: number;
  bathrooms: number;
  address: string;
  agentName: string;
  phone: string;
  email: string;

  type: string | null;
  city: string[];
  status: string | null;
}