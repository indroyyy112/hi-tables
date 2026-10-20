import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

interface BackgroundVideoProps {
  streamUrl?: string;
  directMp4Url?: string;
  posterUrl?: string;
}

export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({
  streamUrl = "https://stream.mux.com/kimF2ha9zLrX64H00UgLGPflCzNtl1T0215MlAmeOztv8.m3u8",
  directMp4Url = "https://assets.mixkit.co/videos/preview/mixkit-friends-talking-in-a-coffee-shop-4340-large.mp4",
  posterUrl = "/src/assets/images/coffee_shop_crowd_hero_1791947763368.jpg",
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    const playVideo = () => {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Autoplay was prevented or delayed:", err);
          // Try unmuting or direct mp4 fallback
          if (directMp4Url && video.src !== directMp4Url) {
            video.src = directMp4Url;
            video.play().then(() => setIsPlaying(true)).catch(() => {});
          }
        });
    };

    // Check for native HLS support (Safari)
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = streamUrl;
      video.addEventListener("loadedmetadata", playVideo);
      video.addEventListener("playing", () => setIsPlaying(true));
    } else if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 60,
      });

      hls.loadSource(streamUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        playVideo();
      });

      video.addEventListener("playing", () => setIsPlaying(true));

      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          console.warn("HLS fatal error encountered, switching to direct video stream...");
          hls?.destroy();
          if (directMp4Url) {
            video.src = directMp4Url;
            playVideo();
          }
        }
      });
    } else if (directMp4Url) {
      video.src = directMp4Url;
      video.addEventListener("loadeddata", playVideo);
      video.addEventListener("playing", () => setIsPlaying(true));
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
      video.removeEventListener("loadedmetadata", playVideo);
      video.removeEventListener("playing", () => setIsPlaying(true));
    };
  }, [streamUrl, directMp4Url]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0 bg-[#1F2421]">
      {/* 1. Underlying photorealistic fallback image */}
      <img
        src={posterUrl}
        alt="Lively aesthetic coffee shop crowd enjoying coffee"
        referrerPolicy="no-referrer"
        className={`w-full h-full object-cover transition-opacity duration-1000 ${
          isPlaying ? "opacity-30" : "opacity-90 animate-coffee-drift scale-105"
        }`}
      />

      {/* 2. Fullscreen Edge-to-Edge Moving Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster={posterUrl}
        className={`w-full h-full object-cover transition-opacity duration-1000 absolute inset-0 ${
          isPlaying ? "opacity-90" : "opacity-0"
        }`}
      >
        <source src={directMp4Url} type="video/mp4" />
      </video>

      {/* 3. Warm Paper Scrim & Daylight Overlay: Guarantees high text readability with warm cafe mood */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1F2421]/65 via-[#F9F7F0]/35 to-[#F9F7F0] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,247,240,0.55)_0%,rgba(31,36,33,0.65)_90%)] pointer-events-none" />
    </div>
  );
};
