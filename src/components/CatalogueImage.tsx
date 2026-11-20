import { useState } from "react";
import { ImageOff } from "lucide-react";

export function CatalogueImage({ src, alt, className = "", loading = "lazy" }: { src?: string | null; alt: string; className?: string; loading?: "lazy" | "eager" }) {
  const [loadedSource, setLoadedSource] = useState<string | null>(null);
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const failed = !src || failedSource === src;
  const loadingImage = !failed && loadedSource !== src;
  return (
    <span className="relative block h-full w-full overflow-hidden" aria-busy={loadingImage}>
      {loadingImage && <span aria-hidden="true" className="absolute inset-0 bg-secondary motion-safe:animate-pulse" />}
      {failed ? (
        <span role="img" aria-label={`${alt} — photo unavailable`} className="flex h-full w-full flex-col items-center justify-center gap-2 bg-background px-3 text-center text-wine">
          <ImageOff className="size-6 text-gold-deep" strokeWidth={1.5} aria-hidden="true" />
          <span className="font-display text-lg">NEHA Lifestyle</span>
          <span className="text-[0.65rem] text-foreground/75">Photo unavailable</span>
        </span>
      ) : <img
        src={src ?? undefined}
        alt={alt}
        width={768} height={960} loading={loading}
        ref={(image) => {
          if (!image?.complete || !src || failed) return;
          if (image.naturalWidth > 0 && loadedSource !== src) setLoadedSource(src);
          else if (image.currentSrc && image.naturalWidth === 0) setFailedSource(src);
        }}
        onLoad={() => { if (src) setLoadedSource(src); }}
        onError={() => { if (src && !failed) setFailedSource(src); }}
        className={`${className} ${loadingImage ? "opacity-0" : "opacity-100"}`}
      />}
    </span>
  );
}