import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f1b2d",
          color: "#f4f1ea",
          fontSize: 30,
          fontWeight: 800,
          letterSpacing: -1,
          borderRadius: 12,
          borderBottom: "8px solid #c2410c",
        }}
      >
        SC
      </div>
    ),
    size,
  );
}
