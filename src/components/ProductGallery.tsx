import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { ProductPhoto } from "@/lib/products";
import { CatalogueImage } from "@/components/CatalogueImage";
import { Button } from "@/components/ui/button";

// Main photo + thumbnails for one product.
// Clicking the main photo opens a large viewer where every photo can be browsed.
export function ProductGallery({ title, photos, coverPhoto }: { title: string; photos: ProductPhoto[]; coverPhoto?: ProductPhoto | undefined }) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(false);
  const photo = photos[photoIndex] ?? photos[0];
  const cardPhoto = !selected && coverPhoto ? coverPhoto : photo;
  const step = (d: number) => { if (photos.length > 1) setPhotoIndex((i) => (i + d + photos.length) % photos.length); };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (!photo) return <div className="aspect-[4/5]"><CatalogueImage alt={title} /></div>;

  const thumbs = (size: string) => (
    <ul className="flex flex-wrap justify-center gap-2">
      {photos.map((p, i) => (
        <li key={p.src}>
          <Button variant="ghost"
            type="button"
            onClick={() => { setSelected(true); setPhotoIndex(i); }}
            aria-label={`Show photo ${i + 1} of ${photos.length}`}
            aria-current={i === photoIndex}
            className={`block overflow-hidden rounded-sm bg-card p-0 ring-1 transition ${size} ${i === photoIndex ? "ring-2 ring-wine" : "ring-gold/25 opacity-75 hover:opacity-100"}`}
          >
            <CatalogueImage src={p.src} alt={`${title} photo ${i + 1}`} className="h-full w-full object-contain" />
          </Button>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="flex flex-col gap-3">
      <Button variant="ghost"
        type="button"
        onClick={() => { if (cardPhoto) { const index = photos.findIndex((p) => p.src === cardPhoto.src); setPhotoIndex(index < 0 ? 0 : index); } setSelected(true); setOpen(true); }}
        aria-label={`Enlarge photo: ${cardPhoto?.alt ?? title}`}
        className="relative block h-auto w-full cursor-zoom-in rounded-none p-0 hover:bg-transparent"
      >
        <span className="block aspect-[4/5]"><CatalogueImage src={cardPhoto?.src ?? null} alt={cardPhoto?.alt ?? title} className="h-full w-full object-contain p-4 transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]" /></span>
        <span className="absolute bottom-3 right-3 grid h-8 w-8 place-items-center rounded-full bg-background/85 text-wine shadow-sm" aria-hidden="true">
          <Expand className="h-3.5 w-3.5" strokeWidth={1.5} />
        </span>
      </Button>
      {photos.length > 1 && <div className="px-3 pb-4">{thumbs("h-11 w-11 sm:h-12 sm:w-12")}</div>}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[95vh] w-[calc(100vw-1.5rem)] max-w-4xl gap-4 overflow-y-auto bg-card p-4 sm:p-6">
          <DialogTitle className="pr-8 font-display text-xl font-normal text-foreground sm:text-2xl">
            {title}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Photo {photoIndex + 1} of {photos.length}. Use the arrows to see the other photos.
          </DialogDescription>
          <div className="relative">
            <div className="h-[65vh]"><CatalogueImage src={photo.src} alt={photo.alt} loading="eager" className="h-full w-full object-contain" /></div>
            {photos.length > 1 && (
              <>
                <Button variant="ghost" size="icon" type="button" onClick={() => step(-1)} aria-label="Previous photo" className="absolute left-1 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-background/90 text-wine shadow-sm ring-1 ring-gold/30 hover:bg-background">
                  <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
                </Button>
                <Button variant="ghost" size="icon" type="button" onClick={() => step(1)} aria-label="Next photo" className="absolute right-1 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-background/90 text-wine shadow-sm ring-1 ring-gold/30 hover:bg-background">
                  <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
                </Button>
              </>
            )}
          </div>
          <p className="text-center text-xs text-foreground/60">
            {photoIndex + 1} / {photos.length}
          </p>
          {photos.length > 1 && thumbs("h-14 w-14 sm:h-16 sm:w-16")}
        </DialogContent>
      </Dialog>
    </div>
  );
}
