import LogoIcon from "@/components/LogoIcon";
import { ImageResponse } from "next/og";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");

  return new ImageResponse(
    title ? (
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "75px", // Rounded corners
          backgroundColor: "#d9d9d9", // Foreground color
          paddingTop: "100px",
          color: "#1e1e1e", // Text color
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            backgroundColor: "#f0efed", // Background color
            paddingTop: "50px",
            paddingBottom: "50px",
            display: "flex", // Ensure this div has flex properties
            justifyContent: "center", // Center align
          }}
        >
          <h1
            style={{
              fontSize: "8rem", // Text size
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {title}
          </h1>
        </div>
        <div
          style={{
            display: "flex", // Ensure flex layout for the next div
            justifyContent: "space-between",
            padding: "50px",
          }}
        >
          <h2
            style={{
              fontSize: "5rem", // Subheading size
              fontWeight: "bold",
              margin: 0, // Reset default margin
            }}
          >
            name
          </h2>
          <h2
            style={{
              fontSize: "5rem", // Subheading size
              fontWeight: "bold",
              margin: 0, // Reset default margin
            }}
          >
            price
          </h2>
        </div>
      </div>
    ) : (
      <div
        style={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 1200,
            height: 630,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LogoIcon style={{ width: 900, height: 495 }} />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
