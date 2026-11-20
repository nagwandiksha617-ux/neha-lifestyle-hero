import { useState } from "react";
import logo from "@/assets/neha-lifestyle-logo.jpeg";

export function CatalogueImage({ src, alt, className = "", loading = "lazy" }: { src?: string | null; alt: string; className?: string; loading?: "lazy" | "eager" }) {
  const [loadedSource, setLoadedSource] = useState<string | null>(null);
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const failed = !src || failedSource === src;
  const loadingImage = !failed && loadedSource !== src;
  return (
    <span className="relative block h-full w-full overflow-hidden" aria-busy={loadingImage}>
      {loadingImage && <span aria-hidden="true" className="absolute inset-0 bg-secondary motion-safe:animate-pulse" />}
      <img
        src={failed ? logo : src}
        alt={failed ? `${alt} — product photo unavailable` : alt}
        width={768} height={960} loading={loading}
        ref={(image) => {
          if (!image?.complete || !src || failed) return;
          if (image.naturalWidth > 0 && loadedSource !== src) setLoadedSource(src);
          else if (image.currentSrc && image.naturalWidth === 0) setFailedSource(src);
        }}
        onLoad={() => { if (src) setLoadedSource(src); }}
        onError={() => { if (src && !failed) setFailedSource(src); }}
        className={failed ? "h-full w-full object-contain bg-background p-8" : `${className} ${loadingImage ? "opacity-0" : "opacity-100"}`}
      />
    </span>
  );
}