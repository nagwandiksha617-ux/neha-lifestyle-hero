import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { ProductColour } from "@/lib/products";

// Main photo + thumbnails for one product, with an optional colour switch.
// Clicking the main photo opens a large viewer where every photo of the colour can be browsed.
export function ProductGallery({ name, colours }: { name: string; colours: ProductColour[] }) {
  const [colourIndex, setColourIndex] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const colour = colours[colourIndex] ?? colours[0]!;
  const photos = colour.photos;
  const photo = photos[photoIndex] ?? photos[0]!;
  const step = (d: number) => setPhotoIndex((i) => (i + d + photos.length) % photos.length);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const thumbs = (size: string) => (
    <ul className="flex flex-wrap justify-center gap-2">
      {photos.map((p, i) => (
        <li key={p.src}>
          <button
            type="button"
            onClick={() => setPhotoIndex(i)}
            aria-label={`Show photo ${i + 1} of ${photos.length}`}
            aria-current={i === photoIndex}
            className={`block overflow-hidden rounded-sm bg-card ring-1 transition ${size} ${i === photoIndex ? "ring-2 ring-wine" : "ring-gold/25 opacity-75 hover:opacity-100"}`}
          >
            <img src={p.src} alt="" loading="lazy" className="h-full w-full object-contain" />
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Enlarge photo: ${photo.alt}`}
        className="relative block w-full cursor-zoom-in"
      >
        <img src={photo.src} alt={photo.alt} width={768} height={960} loading="lazy" className="aspect-[4/5] w-full object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
        <span className="absolute bottom-3 right-3 grid h-8 w-8 place-items-center rounded-full bg-background/85 text-wine shadow-sm" aria-hidden="true">
          <Expand className="h-3.5 w-3.5" strokeWidth={1.5} />
        </span>
      </button>
      <div className="px-3 pb-3">{thumbs("h-11 w-11 sm:h-12 sm:w-12")}</div>

      {colours.length > 1 && (
        <div role="group" aria-label="Colour" className="flex justify-center gap-2 px-3 pb-4">
          {colours.map((c, i) => (
            <button
              key={c.name}
              type="button"
              aria-pressed={i === colourIndex}
              onClick={() => {
                setColourIndex(i);
                setPhotoIndex(0);
              }}
              className={`min-h-9 px-4 text-[0.6rem] font-semibold uppercase tracking-[0.2em] ring-1 transition-colors ${i === colourIndex ? "bg-wine text-wine-foreground ring-wine" : "bg-background text-foreground/75 ring-gold/40 hover:text-wine"}`}
            >
              {c.name}
            </button>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[95vh] w-[calc(100vw-1.5rem)] max-w-4xl gap-4 overflow-y-auto bg-card p-4 sm:p-6">
          <DialogTitle className="pr-8 font-display text-xl font-normal text-foreground sm:text-2xl">
            {name} — {colour.name}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Photo {photoIndex + 1} of {photos.length}. Use the arrows to see the other photos.
          </DialogDescription>
          <div className="relative">
            <img src={photo.src} alt={photo.alt} className="mx-auto max-h-[65vh] w-full object-contain" />
            {photos.length > 1 && (
              <>
                <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="absolute left-1 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-background/90 text-wine shadow-sm ring-1 ring-gold/30 hover:bg-background">
                  <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
                </button>
                <button type="button" onClick={() => step(1)} aria-label="Next photo" className="absolute right-1 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-background/90 text-wine shadow-sm ring-1 ring-gold/30 hover:bg-background">
                  <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
                </button>
              </>
            )}
          </div>
          <p className="text-center text-xs text-foreground/60">
            {photoIndex + 1} / {photos.length}
          </p>
          {thumbs("h-14 w-14 sm:h-16 sm:w-16")}
        </DialogContent>
      </Dialog>
    </div>
  );
}
