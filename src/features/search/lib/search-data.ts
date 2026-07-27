import { mockProperties } from "@/data/mock";
import type { PropertySummary } from "@/types/domain";

import type { SearchParamValue } from "./search-context";

export type SearchDataResult =
  | {
      status: "ready";
      properties: readonly PropertySummary[];
    }
  | {
      status: "error";
    };

function getSingleValue(value: SearchParamValue) {
  return Array.isArray(value) ? value[0] : value;
}

export function getSearchData(
  params: Record<string, SearchParamValue>,
): SearchDataResult {
  const demoState = getSingleValue(params._demo);

  if (demoState === "error") {
    return { status: "error" };
  }

  return {
    status: "ready",
    properties: demoState === "empty" ? [] : mockProperties,
  };
}
