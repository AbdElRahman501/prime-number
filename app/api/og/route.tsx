import LogoIcon from "@/components/LogoIcon";
import { ImageResponse } from "next/og";

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const font1 = await fetch(
    new URL(`${baseUrl}/fonts/Rubik-Bold.ttf`, import.meta.url),
  );

  if (!font1.ok) {
    throw new Error("Failed to fetch the font file");
  }

  const fontData1 = await font1.arrayBuffer();

  const title = searchParams.get("title");
  const color = searchParams.get("color");

  return new ImageResponse(
    title ? (
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "75px", // Rounded corners
          backgroundColor: "#d9d9d9", // Foreground color
          color: color || "#1e1e1e", // Text color
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
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
              fontSize: "10rem", // Text size
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {title}
          </h1>
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
      fonts: [
        {
          name: "Inter",
          data: fontData1,
          style: "normal",
        },
        // {
        //   name: "Regular",
        //   data: fontData2,
        //   style: "normal",
        // },
      ],
    },
  );
}
