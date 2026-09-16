"use client";

import { useState, useEffect } from "react";
import { Filter, Youtube } from "lucide-react";

import { CertificationsStrip } from "@/components/certifications-strip";
import { SectionHeading } from "@/components/section-heading";
import { VideoCard } from "@/components/video-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { normalizeVideos, type VideoItem } from "@/lib/video-utils";

type Video = VideoItem;

export default function VideosPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>(["All"]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch('/api/videos');
        const data = await response.json();
        
        if (data.success) {
          const normalized = normalizeVideos(data.data);
          setVideos(normalized);
          const uniqueCategories: string[] = [
            "All",
            ...Array.from(new Set(normalized.map((v) => v.category).filter(Boolean))),
          ];
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  const filteredVideos =
    selectedCategory === "All" ? videos : videos.filter((v) => v.category === selectedCategory);

  return (
    <div className="relative">
      <SiteHeader />
      <main>
        {/* Page Hero */}
        <section className="page-hero">
          <div className="page-shell">
            <SectionHeading
              center
              eyebrow="Video Gallery"
              title="Watch Our Story & Processes"
              description="Take a visual journey through our organic farms, traditional handicraft workshops, and standard quality testing workflows."
            />
          </div>
        </section>
        <CertificationsStrip />

        {/* Filters and Grids */}
        <section className="section-space pt-12">
          <div className="page-shell">
            {/* Category Filter */}
            {!loading && categories.length > 1 && (
              <div className="flex flex-wrap items-center justify-center gap-3.5 mb-12">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted mr-1.5">
                  <Filter className="h-4 w-4" />
                  Filter:
                </div>
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-full px-5 py-2.5 text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                      selectedCategory === category
                        ? "bg-primary text-black shadow-md border border-transparent"
                        : "border border-border bg-surface text-body hover:border-primary hover:bg-primary/5"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}

            {/* Videos Grid */}
            {!loading ? (
              <>
                {filteredVideos.length > 0 ? (
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredVideos.map((video) => (
                      <VideoCard
                        key={video.id || video.youtubeId}
                        title={video.title}
                        description={video.description}
                        youtubeId={video.youtubeId}
                        category={video.category}
                        thumbnail={video.thumbnail}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <p className="text-lg text-muted">No videos found in this category.</p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-lg text-muted">Loading visual catalog...</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Subscription section */}
        <section className="pb-24">
          <div className="page-shell">
            <div className="cta-band text-center">
              <div className="relative z-10 flex flex-col items-center">
                <p className="text-xs font-bold uppercase tracking-widest text-[#fef9c3]">
                  Want to learn more?
                </p>
                <h2 className="mt-4 text-3xl font-serif font-light text-white md:text-5xl leading-tight max-w-xl">
                  Subscribe to Our YouTube Channel
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/80">
                  Stay updated with our latest videos on organic agriculture, artisan workshop stories, and standard export container packaging.
                </p>
                <div className="mt-8 flex justify-center">
                  <a
                    href="https://www.youtube.com/@GreenEllora"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-primary text-sm bg-white text-primary-dark hover:bg-accent-soft hover:text-primary-dark shadow-xl"
                  >
                    <Youtube className="h-4 w-4 text-red-500 fill-current" />
                    Subscribe on YouTube
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
