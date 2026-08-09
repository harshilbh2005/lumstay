# Mock booking-history fixtures

`src/data/mock/bookings.ts` provides the deterministic records for the later
Trips and booking-detail interfaces. The exported reference date is
`2026-08-09`; status labels should be interpreted against that date instead of
the viewer's clock so screenshots, tests, and product review do not drift.

## State matrix

| State | Records | Reservation reference | Payment meaning |
| --- | ---: | --- | --- |
| Upcoming | 2 | `LUMA-MOCK-*` | Mock payment marked paid |
| Completed | 2 | `LUMA-MOCK-*` | Mock payment marked paid |
| Cancelled | 1 | `LUMA-MOCK-*` | Full mock refund, zero cancellation fee |
| Payment failed | 1 | `null` | Declined attempt only; no reservation or charge |

Every record carries a property and room snapshot, dates, party, lead guest,
rate inclusions, cancellation summary, and an open INR price ledger. Property
identity and media IDs resolve from the central catalog. The Casa Serein room
snapshot also resolves from the central room fixture; the other room snapshots
are intentionally scoped history data for properties whose full detail pages
have not been built yet.

Price totals use the existing prototype policy: accommodation is nightly rate ×
nights × rooms, estimated tax is 12% of accommodation rounded to the nearest
rupee, and the Luma service fee is ₹900 per room for the stay.

## Limitations

These are frontend-only interface fixtures. They are not account history and do
not represent live reservations, inventory, property records, tax rules,
payments, refunds, card authorization, or provider responses. The visible last
four digits belong to the documented mock card, and no full card or security
code is stored. A `payment-failed` entry is an attempt record with a distinct
`LUMA-ATTEMPT-*` identifier and can never expose a booking reference.
