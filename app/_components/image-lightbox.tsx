"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

interface ImageLightboxProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  imgClassName?: string;
}

export function ImageLightbox({
  src,
  alt,
  width,
  height,
  className,
  imgClassName,
}: ImageLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function open(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    dialogRef.current?.showModal();
  }

  function close() {
    dialogRef.current?.close();
  }

  // Close on backdrop click
  function handleDialogClick(e: React.MouseEvent<HTMLDialogElement>) {
    e.stopPropagation();
    if (e.target === dialogRef.current) close();
  }

  // Close on Escape (native dialog handles this already, but ensure cleanup)
  useEffect(() => {
    const el = dialogRef.current;
    return () => {
      if (el?.open) el.close();
    };
  }, []);

  return (
    <>
      {/* Thumbnail trigger */}
      <button
        type="button"
        onClick={open}
        className={className}
        aria-label={`View ${alt} full size`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={imgClassName}
        />
        {/* Zoom hint */}
        <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <span className="rounded-full bg-black/60 p-2 backdrop-blur-sm">
            <svg
              className="h-5 w-5 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
              <path d="M11 8v6M8 11h6" />
            </svg>
          </span>
        </span>
      </button>

      {/* Lightbox dialog */}
      <dialog
        ref={dialogRef}
        onClick={handleDialogClick}
        className="m-auto max-h-screen max-w-screen-xl bg-transparent p-4 backdrop:bg-black/85 backdrop:backdrop-blur-sm"
        style={{ border: "none", outline: "none" }}
      >
        <div className="relative">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            className="absolute -right-2 -top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/80 text-white ring-1 ring-white/20 transition-colors hover:bg-white/20"
            aria-label="Close"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
          />
        </div>
      </dialog>
    </>
  );
}
