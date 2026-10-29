import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // The only image is a pre-sized headshot, so skip the optimizer (Workers have none by default).
  images: { unoptimized: true },
};

export default nextConfig;

// Lets `next dev` read Cloudflare bindings and .dev.vars locally.
initOpenNextCloudflareForDev();
