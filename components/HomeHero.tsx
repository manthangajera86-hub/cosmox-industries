"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { PauseIcon, PlayIcon } from "@/components/icons";
import {
  type HeroVideoSources,
  prefersReducedMotion,
  setHeroVideoPlaying,
  subscribeToMotion,
  videosAllowed,
} from "@/lib/hero-video";
import type { Photo } from "@/lib/photos";

export type HomeHeroSlide = {
  title: string;
  href: string;
  photo: Photo;
  /**
   * Muted background video shown behind the hero while this slide is active: a Full HD file for
   * wide screens and a tall centre crop for phones, so neither is enlarged much.
   */
  video?: HeroVideoSources;
};

type HomeHeroProps = {
  /** Headline; each entry renders on its own line on wide screens. */
  titleLines: string[];
  photo: Photo;
  /** Small status line at the bottom left, e.g. a key fact. */
  meta?: ReactNode;
  slides: HomeHeroSlide[];
  /** Milliseconds between slides. */
  interval?: number;
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function HomeHero({ titleLines, photo, meta, slides, interval = 6000 }: HomeHeroProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  // Set by the pause button: stops both the slides and the video until pressed again.
  const [stopped, setStopped] = useState(false);
  // The slide whose video is on screen. It changes only once the next video is playing,
  // so the previous one stays visible while the next loads.
  const [shown, setShown] = useState(-1);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const withVideo = useSyncExternalStore(subscribeToMotion, videosAllowed, () => false) && slides.some((s) => s.video);
  // The hero is light over the photo and turns dark (light text) once a video is on screen.
  const videoShown = withVideo && shown >= 0;
  const slide = slides[index];

  useEffect(() => {
    setHeroVideoPlaying(videoShown);
    return () => setHeroVideoPlaying(false);
  }, [videoShown]);

  useEffect(() => {
    if (paused || stopped || slides.length < 2) return;
    if (prefersReducedMotion()) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % slides.length), interval);
    return () => window.clearTimeout(id);
  }, [index, paused, stopped, slides.length, interval]);

  // Each slide's video starts from the beginning when the slide comes up.
  useEffect(() => {
    const video = videos.current[index];
    if (video) video.currentTime = 0;
  }, [index]);

  useEffect(() => {
    videos.current.forEach((video, i) => {
      if (video && (stopped || (i !== index && i !== shown))) video.pause();
    });
    // Browsers may refuse to play (e.g. low-power mode); the photo then stays in view.
    if (!stopped) videos.current[index]?.play().catch(() => {});
  }, [index, shown, stopped, withVideo]);

  return (
    <section className="home-hero" aria-label="Introduction" data-video={videoShown}>
      <Image
        className="hero-image"
        src={photo.src}
        alt={photo.alt}
        fill
        // The header photo is the page's main content, so fetch it ahead of fonts and scripts.
        loading="eager"
        fetchPriority="high"
        placeholder="blur"
        sizes="100vw"
        style={photo.position ? { objectPosition: photo.position } : undefined}
      />
      {/* The photo above stays as the page's first paint; each video fades in over it once playing. */}
      {withVideo && (
        <div className="home-hero-videos" aria-hidden="true">
          {slides.map(
            (item, i) =>
              item.video && (
                <video
                  key={item.href}
                  ref={(node) => {
                    videos.current[i] = node;
                  }}
                  muted
                  loop
                  playsInline
                  preload="none"
                  disablePictureInPicture
                  data-active={i === shown}
                  onPlaying={() => {
                    if (i === index) setShown(i);
                  }}
                >
                  {/* Browsers that ignore `media` take the first source, the landscape one. */}
                  <source src={item.video.landscape} type="video/mp4" media="(min-aspect-ratio: 4/5)" />
                  <source src={item.video.portrait} type="video/mp4" />
                </video>
              ),
          )}
        </div>
      )}
      <div className="home-hero-overlay" aria-hidden="true" />

      <div className="container home-hero-inner">
        <h1 className="home-hero-title">
          {titleLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h1>

        <div
          className="home-hero-bar"
          role="region"
          aria-roledescription="carousel"
          aria-label="Highlights"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
          }}
        >
          {meta && <p className="home-hero-meta">{meta}</p>}

          <div className="home-hero-story">
            {/* Every headline stays in the DOM (only the active one shows), so the text never
                changes under page translation tools such as Google Translate. */}
            <p className="home-hero-headline">
              {slides.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  data-active={i === index}
                  aria-hidden={i === index ? undefined : true}
                  tabIndex={i === index ? undefined : -1}
                >
                  {item.title}
                </Link>
              ))}
            </p>
            <div className="home-hero-controls">
              <span className="home-hero-count" aria-hidden="true">
                {pad(index + 1)}
              </span>
              <span className="home-hero-progress" aria-hidden="true">
                <span key={`${index}-${paused || stopped}`} style={{ animationDuration: `${interval}ms` }} data-paused={paused || stopped} />
              </span>
              <ul className="home-hero-dots">
                {slides.map((item, i) => (
                  <li key={item.href}>
                    <button
                      type="button"
                      aria-label={`Show highlight ${i + 1}: ${item.title}`}
                      aria-current={i === index ? "true" : undefined}
                      onClick={() => setIndex(i)}
                    />
                  </li>
                ))}
              </ul>
              {withVideo && (
                <button
                  type="button"
                  className="home-hero-pause"
                  aria-label={stopped ? "Play background video and highlights" : "Pause background video and highlights"}
                  onClick={() => setStopped((value) => !value)}
                >
                  {stopped ? <PlayIcon /> : <PauseIcon />}
                </button>
              )}
            </div>
          </div>

          <Link className="home-hero-card" href={slide.href} tabIndex={-1} aria-hidden="true">
            <Image
              key={index}
              src={slide.photo.src}
              alt=""
              fill
              placeholder="blur"
              sizes="(max-width: 760px) 100vw, 320px"
              style={slide.photo.position ? { objectPosition: slide.photo.position } : undefined}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
