import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { siteName } from "@/lib/site";

/** Shared settings for every `opengraph-image.tsx` route. */
export const ogSize = { width: 1200, height: 630 };
// JPEG keeps each card small enough for WhatsApp and other apps that skip large previews.
export const ogContentType = "image/jpeg";

type OgImageOptions = {
  /** Small label above the title, e.g. the page name. */
  label: string;
  title: string;
  /** File name in `assets/photos/`. */
  photo: string;
};

/** A 1200×630 JPEG sharing card: the page's photo under a dark gradient, with its label and title. */
export async function renderOgImage({ label, title, photo }: OgImageOptions) {
  const [image, font, mark] = await Promise.all([
    readFile(join(process.cwd(), "assets/photos", photo)),
    readFile(join(process.cwd(), "assets/fonts/BarlowSemiCondensed-Medium.ttf")),
    readFile(join(process.cwd(), "assets/brand/logo-mark.png")),
  ]);

  const png = new ImageResponse(
    (
      <div style={{ position: "relative", display: "flex", width: "100%", height: "100%", background: "#0f0f0e" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- rendered to a PNG, not a web page */}
        <img
          src={`data:image/jpeg;base64,${image.toString("base64")}`}
          alt=""
          width={ogSize.width}
          height={ogSize.height}
          style={{ position: "absolute", top: 0, left: 0, width: ogSize.width, height: ogSize.height, objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: ogSize.width,
            height: ogSize.height,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 72px",
            background: "linear-gradient(90deg, rgba(15,15,14,0.92) 0%, rgba(15,15,14,0.7) 55%, rgba(15,15,14,0.25) 100%)",
            color: "#fafafa",
            fontFamily: "Barlow",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 30, letterSpacing: 6 }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- rendered to a PNG, not a web page */}
            <img src={`data:image/png;base64,${mark.toString("base64")}`} alt="" width={75} height={56} />
            {siteName.toUpperCase()}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div style={{ fontSize: 30, color: "#c9a046" }}>{label}</div>
            <div style={{ maxWidth: 900, fontSize: 72, lineHeight: 1.02 }}>{title}</div>
          </div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: [{ name: "Barlow", data: font, weight: 500, style: "normal" }] },
  );
  const jpeg = await sharp(Buffer.from(await png.arrayBuffer()))
    .jpeg({ quality: 78, mozjpeg: true })
    .toBuffer();
  return new Response(new Uint8Array(jpeg), { headers: { "Content-Type": ogContentType } });
}
