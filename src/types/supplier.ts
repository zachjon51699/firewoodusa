export interface Supplier {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  woodTypes: string[];
  deliveryRadius: number; // in miles
  pricing: {
    cordPrice: number;
    halfCordPrice: number;
    faceChordPrice: number;
  };
  services: string[];
  businessDescription: string;
  established: number;
  website?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
  };
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  imageUrl?: string;
}

export interface SearchFilters {
  query: string;
  state: string;
  city: string;
  woodTypes: string[];
  maxDistance: number;
  priceRange: {
    min: number;
    max: number;
  };
  services: string[];
  verifiedOnly: boolean;
}