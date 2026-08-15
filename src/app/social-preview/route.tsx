import { ImageResponse } from "next/og";

const imageSize = {
  width: 1200,
  height: 630,
};

const previewDefaults = {
  eyebrow: "Independent travel edit",
  title: "Considered stays, beautifully found",
  description:
    "Explore a considered editorial collection of distinctive stays through the LumaStay frontend prototype.",
  detail: "Considered stays · Frontend prototype",
};

function getBoundedValue(
  searchParams: URLSearchParams,
  key: keyof typeof previewDefaults,
  maxLength: number,
) {
  const value = searchParams.get(key)?.trim();

  return value ? value.slice(0, maxLength) : previewDefaults[key];
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const eyebrow = getBoundedValue(searchParams, "eyebrow", 54);
  const title = getBoundedValue(searchParams, "title", 82);
  const description = getBoundedValue(searchParams, "description", 180);
  const detail = getBoundedValue(searchParams, "detail", 72);
  const titleSize = title.length > 58 ? 58 : title.length > 38 ? 68 : 78;

  return new ImageResponse(
    (
      <div
        style={{
          background: "#fcfbf8",
          color: "#102c2d",
          display: "flex",
          height: "100%",
          padding: "32px",
          width: "100%",
        }}
      >
        <div
          style={{
            border: "2px solid #102c2d",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "100%",
          }}
        >
          <div
            style={{
              alignItems: "center",
              borderBottom: "1px solid #9da4a1",
              display: "flex",
              height: "82px",
              justifyContent: "space-between",
              padding: "0 34px",
              width: "100%",
            }}
          >
            <span
              style={{
                fontSize: "28px",
                fontWeight: 700,
                letterSpacing: "-0.04em",
              }}
            >
              LumaStay
            </span>
            <span
              style={{
                color: "#66706d",
                fontSize: "14px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Travel / rooms / rituals
            </span>
          </div>

          <div style={{ display: "flex", flex: 1, width: "100%" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "48px 48px 42px 34px",
                width: "76%",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    color: "#8d6939",
                    fontSize: "16px",
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    marginBottom: "26px",
                    textTransform: "uppercase",
                  }}
                >
                  {eyebrow}
                </span>
                <span
                  style={{
                    fontSize: `${titleSize}px`,
                    fontWeight: 700,
                    letterSpacing: "-0.055em",
                    lineHeight: 0.98,
                    maxWidth: "810px",
                  }}
                >
                  {title}
                </span>
              </div>

              <span
                style={{
                  color: "#3e4947",
                  fontSize: "23px",
                  lineHeight: 1.35,
                  maxWidth: "780px",
                }}
              >
                {description}
              </span>
            </div>

            <div
              style={{
                background: "#173a3b",
                color: "#fcfbf8",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "40px 34px",
                width: "24%",
              }}
            >
              <span
                style={{
                  color: "#d2ab72",
                  fontSize: "13px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                The Luma folio
              </span>

              <div
                style={{
                  borderBottom: "1px solid rgba(252,251,248,0.32)",
                  borderTop: "1px solid rgba(252,251,248,0.32)",
                  display: "flex",
                  flexDirection: "column",
                  padding: "24px 0",
                }}
              >
                <span
                  style={{
                    fontSize: "96px",
                    fontWeight: 700,
                    letterSpacing: "-0.1em",
                    lineHeight: 0.82,
                  }}
                >
                  L/
                </span>
                <span
                  style={{
                    color: "#d2ab72",
                    fontSize: "96px",
                    fontWeight: 700,
                    letterSpacing: "-0.1em",
                    lineHeight: 0.82,
                    marginLeft: "42px",
                  }}
                >
                  S
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  fontSize: "13px",
                  letterSpacing: "0.14em",
                  lineHeight: 1.45,
                  textTransform: "uppercase",
                }}
              >
                <span>Frontend prototype</span>
                <span>No live inventory</span>
              </div>
            </div>
          </div>

          <div
            style={{
              alignItems: "center",
              borderTop: "1px solid #9da4a1",
              display: "flex",
              height: "58px",
              justifyContent: "space-between",
              padding: "0 34px",
              width: "100%",
            }}
          >
            <span
              style={{
                fontSize: "13px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {detail}
            </span>
            <span
              style={{
                color: "#66706d",
                fontSize: "13px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              lumastay / 2026
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...imageSize,
      headers: {
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    },
  );
}
