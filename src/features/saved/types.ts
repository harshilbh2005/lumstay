export interface SavedPropertyEntry {
  id: string;
  slug: string;
  name: string;
  location: {
    city: string;
    country: string;
  };
  description: string;
  rating: number;
  reviewCount: number;
  priceFrom: {
    amount: number;
    currency: "INR";
  };
  atmosphere: readonly string[];
  facilities: readonly string[];
  media: {
    src: string;
    alt: string;
    focalPoint: string;
  };
}
