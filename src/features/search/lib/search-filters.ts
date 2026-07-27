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

export const sortOptions = [
  { value: "luma-edit", label: "Luma edit" },
  { value: "price-ascending", label: "Price: low to high" },
  { value: "price-descending", label: "Price: high to low" },
  { value: "rating-descending", label: "Guest rating" },
] as const;

export type SearchSortOrder = (typeof sortOptions)[number]["value"];

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

const defaultSortOrder: SearchSortOrder = "luma-edit";

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

export function getSearchSort(
  params: Record<string, SearchParamValue>,
): SearchSortOrder {
  const sortValue = getSingleValue(params.sort);

  return (
    sortOptions.find((option) => option.value === sortValue)?.value ??
    defaultSortOrder
  );
}

export function sortProperties(
  properties: readonly PropertySummary[],
  sortOrder: SearchSortOrder,
) {
  const sortedProperties = [...properties];

  switch (sortOrder) {
    case "price-ascending":
      return sortedProperties.sort(
        (first, second) => first.priceFrom.amount - second.priceFrom.amount,
      );
    case "price-descending":
      return sortedProperties.sort(
        (first, second) => second.priceFrom.amount - first.priceFrom.amount,
      );
    case "rating-descending":
      return sortedProperties.sort(
        (first, second) =>
          second.rating - first.rating ||
          second.reviewCount - first.reviewCount,
      );
    case "luma-edit":
      return sortedProperties;
  }
}

export function getSearchIntentEntries(
  params: Record<string, SearchParamValue>,
) {
  return searchIntentKeys.flatMap((key) =>
    getValues(params[key]).map((value) => [key, value] as [string, string]),
  );
}

export function getAppliedFilterEntries(filters: SearchFilters) {
  const priceOption = priceOptions.find(
    (option) => option.maximum === filters.maxPrice,
  );
  const ratingOption = ratingOptions.find(
    (option) => option.minimum === filters.minRating,
  );

  return [
    ...(priceOption
      ? ([["maxPrice", priceOption.value]] as [string, string][])
      : []),
    ...(ratingOption
      ? ([["minRating", ratingOption.value]] as [string, string][])
      : []),
    ...filters.propertyTypes.map(
      (value) => ["propertyType", value] as [string, string],
    ),
    ...filters.facilities.map(
      (value) => ["facility", value] as [string, string],
    ),
    ...filters.atmospheres.map(
      (value) => ["atmosphere", value] as [string, string],
    ),
  ];
}

export function getPreservedSortEntries(
  params: Record<string, SearchParamValue>,
) {
  const sortOrder = getSearchSort(params);

  return sortOrder === defaultSortOrder
    ? []
    : ([["sort", sortOrder]] as [string, string][]);
}

function getCanonicalSearchParams(
  params: Record<string, SearchParamValue>,
  filters: SearchFilters,
  sortOrder: SearchSortOrder,
) {
  return new URLSearchParams([
    ...getSearchIntentEntries(params),
    ...getAppliedFilterEntries(filters),
    ...(sortOrder === defaultSortOrder
      ? []
      : ([["sort", sortOrder]] as [string, string][])),
  ]);
}

function getSearchHref(params: URLSearchParams) {
  const query = params.toString();

  return query ? `/search?${query}` : "/search";
}

export function getCanonicalSearchHref(
  params: Record<string, SearchParamValue>,
) {
  return getSearchHref(
    getCanonicalSearchParams(
      params,
      getSearchFilters(params),
      getSearchSort(params),
    ),
  );
}

function getFilterRemovalHref(
  params: Record<string, SearchParamValue>,
  filters: SearchFilters,
  sortOrder: SearchSortOrder,
  name: string,
  value: string,
) {
  const query = getCanonicalSearchParams(params, filters, sortOrder);
  const remainingValues = query
    .getAll(name)
    .filter((currentValue) => currentValue !== value);

  query.delete(name);
  remainingValues.forEach((remainingValue) =>
    query.append(name, remainingValue),
  );

  return getSearchHref(query);
}

export interface AppliedFilterChip {
  key: string;
  label: string;
  href: string;
}

export function getAppliedFilterChips(
  params: Record<string, SearchParamValue>,
  filters: SearchFilters,
  sortOrder: SearchSortOrder,
): AppliedFilterChip[] {
  const priceOption = priceOptions.find(
    (option) => option.maximum === filters.maxPrice,
  );
  const ratingOption = ratingOptions.find(
    (option) => option.minimum === filters.minRating,
  );
  const chips: AppliedFilterChip[] = [];

  if (priceOption) {
    chips.push({
      key: `maxPrice-${priceOption.value}`,
      label: priceOption.label,
      href: getFilterRemovalHref(
        params,
        filters,
        sortOrder,
        "maxPrice",
        priceOption.value,
      ),
    });
  }

  if (ratingOption) {
    chips.push({
      key: `minRating-${ratingOption.value}`,
      label: ratingOption.label,
      href: getFilterRemovalHref(
        params,
        filters,
        sortOrder,
        "minRating",
        ratingOption.value,
      ),
    });
  }

  const multiSelectGroups = [
    {
      name: "propertyType",
      values: filters.propertyTypes,
      options: propertyTypeOptions,
    },
    {
      name: "facility",
      values: filters.facilities,
      options: facilityOptions,
    },
    {
      name: "atmosphere",
      values: filters.atmospheres,
      options: atmosphereOptions,
    },
  ] as const;

  multiSelectGroups.forEach((group) => {
    group.values.forEach((value) => {
      const option = group.options.find(
        (currentOption) => currentOption.value === value,
      );

      if (!option) {
        return;
      }

      chips.push({
        key: `${group.name}-${value}`,
        label: option.label,
        href: getFilterRemovalHref(
          params,
          filters,
          sortOrder,
          group.name,
          value,
        ),
      });
    });
  });

  return chips;
}

export function getClearFiltersHref(
  params: Record<string, SearchParamValue>,
) {
  const query = new URLSearchParams([
    ...getSearchIntentEntries(params),
    ...getPreservedSortEntries(params),
  ]);

  return getSearchHref(query);
}
