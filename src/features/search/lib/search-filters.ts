import type {
  PropertyAtmosphere,
  PropertyFacility,
  PropertySummary,
  PropertyType,
} from "@/types/domain";

import type { SearchParamValue } from "./search-context";

export const priceOptions = [
  { value: "30000", label: "Up to ₹30,000", maximum: 30000 },
  { value: "40000", label: "Up to ₹40,000", maximum: 40000 },
  { value: "50000", label: "Up to ₹50,000", maximum: 50000 },
] as const;

export const ratingOptions = [
  { value: "4.9", label: "4.90 and above", minimum: 4.9 },
  { value: "4.95", label: "4.95 and above", minimum: 4.95 },
] as const;

export const propertyTypeOptions = [
  { value: "boutique-hotel", label: "Boutique hotel" },
  { value: "private-cabin", label: "Private cabin" },
  { value: "desert-lodge", label: "Desert lodge" },
  { value: "heritage-stay", label: "Heritage stay" },
  { value: "wellness-retreat", label: "Wellness retreat" },
] as const satisfies readonly {
  value: PropertyType;
  label: string;
}[];

export const facilityOptions = [
  { value: "pool", label: "Pool" },
  { value: "wellness", label: "Wellness" },
  { value: "breakfast", label: "Breakfast" },
  { value: "destination-dining", label: "Destination dining" },
  { value: "private-transfers", label: "Private transfers" },
] as const satisfies readonly {
  value: PropertyFacility;
  label: string;
}[];

export const atmosphereOptions = [
  { value: "quiet", label: "Quiet" },
  { value: "design-led", label: "Design-led" },
  { value: "remote", label: "Remote" },
  { value: "nature-led", label: "Nature-led" },
  { value: "heritage", label: "Heritage" },
] as const satisfies readonly {
  value: PropertyAtmosphere;
  label: string;
}[];

export interface SearchFilters {
  maxPrice: number | null;
  minRating: number | null;
  propertyTypes: PropertyType[];
  facilities: PropertyFacility[];
  atmospheres: PropertyAtmosphere[];
  activeCount: number;
}

const searchIntentKeys = [
  "destination",
  "checkIn",
  "checkOut",
  "adults",
  "children",
  "rooms",
] as const;

function getValues(value: SearchParamValue) {
  if (!value) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}

function getSingleValue(value: SearchParamValue) {
  return getValues(value)[0];
}

function getAllowedValues<T extends string>(
  value: SearchParamValue,
  allowedValues: readonly T[],
) {
  const allowed = new Set<string>(allowedValues);

  return [...new Set(getValues(value))].filter((item): item is T =>
    allowed.has(item),
  );
}

export function getSearchFilters(
  params: Record<string, SearchParamValue>,
): SearchFilters {
  const priceValue = getSingleValue(params.maxPrice);
  const priceOption = priceOptions.find(
    (option) => option.value === priceValue,
  );
  const ratingValue = getSingleValue(params.minRating);
  const ratingOption = ratingOptions.find(
    (option) => option.value === ratingValue,
  );
  const propertyTypes = getAllowedValues(
    params.propertyType,
    propertyTypeOptions.map((option) => option.value),
  );
  const facilities = getAllowedValues(
    params.facility,
    facilityOptions.map((option) => option.value),
  );
  const atmospheres = getAllowedValues(
    params.atmosphere,
    atmosphereOptions.map((option) => option.value),
  );

  return {
    maxPrice: priceOption?.maximum ?? null,
    minRating: ratingOption?.minimum ?? null,
    propertyTypes,
    facilities,
    atmospheres,
    activeCount:
      (priceOption ? 1 : 0) +
      (ratingOption ? 1 : 0) +
      propertyTypes.length +
      facilities.length +
      atmospheres.length,
  };
}

export function filterProperties(
  properties: readonly PropertySummary[],
  filters: SearchFilters,
) {
  return properties.filter((property) => {
    const matchesPrice =
      filters.maxPrice === null ||
      property.priceFrom.amount <= filters.maxPrice;
    const matchesRating =
      filters.minRating === null || property.rating >= filters.minRating;
    const matchesPropertyType =
      filters.propertyTypes.length === 0 ||
      filters.propertyTypes.includes(property.propertyType);
    const matchesFacilities =
      filters.facilities.length === 0 ||
      filters.facilities.every((facility) =>
        property.facilityTags.includes(facility),
      );
    const matchesAtmosphere =
      filters.atmospheres.length === 0 ||
      filters.atmospheres.some((atmosphere) =>
        property.atmosphereTags.includes(atmosphere),
      );

    return (
      matchesPrice &&
      matchesRating &&
      matchesPropertyType &&
      matchesFacilities &&
      matchesAtmosphere
    );
  });
}

export function getSearchIntentEntries(
  params: Record<string, SearchParamValue>,
) {
  return searchIntentKeys.flatMap((key) =>
    getValues(params[key]).map((value) => [key, value] as [string, string]),
  );
}

export function getClearFiltersHref(
  params: Record<string, SearchParamValue>,
) {
  const query = new URLSearchParams(getSearchIntentEntries(params)).toString();

  return query ? `/search?${query}` : "/search";
}
