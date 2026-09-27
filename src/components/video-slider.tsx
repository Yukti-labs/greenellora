"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Youtube } from "lucide-react";

import { VideoCard } from "@/components/video-card";

type Video = {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  category: string;
  thumbnail: string;
};

type VideoSliderProps = {
  videos: Video[];
  title: string;
  description: string;
  viewAllHref?: string;
};

export function VideoSlider({ videos, title, description, viewAllHref }: VideoSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) setItemsPerView(1.1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(3);
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, videos.length - Math.floor(itemsPerView));

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX);
    handleSwipe();
  };

  const handleSwipe = () => {
    if (touchStart === 0 || touchEnd === 0) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) handleNext();
    if (distance < -50) handlePrev();
    setTouchStart(0);
    setTouchEnd(0);
  };

  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (videos.length <= Math.floor(itemsPerView)) return;
    const autoAdvance = setInterval(handleNext, 7000);
    return () => clearInterval(autoAdvance);
  }, [currentIndex, maxIndex, videos.length, itemsPerView]);

  if (videos.length === 0) {
    return null;
  }

  return (
    <section className="section-space">
      <div className="page-shell">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-10">
          <div className="text-center sm:text-left">
            <p className="section-kicker">Video Gallery</p>
            <h2 className="section-title">{title}</h2>
            <p className="section-copy">{description}</p>
          </div>
          {viewAllHref && (
            <a href={viewAllHref} className="button-secondary hidden sm:inline-flex shrink-0">
              View all videos
              <Youtube className="h-4 w-4" />
            </a>
          )}
        </div>

        <div className="relative">
          <div
            ref={sliderRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="overflow-hidden py-4 px-1"
          >
            <div
              className="flex items-stretch transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {videos.map((video) => (
                <div
                  key={video.id || video.youtubeId}
                  className="flex w-full flex-shrink-0 self-stretch pr-6"
                  style={{ flexBasis: `${100 / itemsPerView}%`, maxWidth: `${100 / itemsPerView}%` }}
                >
                  <VideoCard
                    title={video.title}
                    description={video.description}
                    youtubeId={video.youtubeId}
                    category={video.category}
                    thumbnail={video.thumbnail}
                  />
                </div>
              ))}
            </div>
          </div>

          {videos.length > Math.floor(itemsPerView) && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className="slider-nav-btn absolute left-2 top-1/2 -translate-y-1/2 md:-translate-x-6"
                aria-label="Previous videos"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="slider-nav-btn absolute right-2 top-1/2 -translate-y-1/2 md:translate-x-6"
                aria-label="Next videos"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              <div className="mt-8 flex justify-center gap-2">
                {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentIndex(index)}
                    className={`slider-dot w-2 h-2 ${
                      currentIndex === index ? "slider-dot--active" : ""
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {viewAllHref && (
          <div className="mt-8 text-center sm:hidden">
            <a href={viewAllHref} className="button-secondary w-full">
              View all videos
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
