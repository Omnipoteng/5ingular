"use client";

import React, { useRef, useEffect } from "react";

interface IntroProps {
  onComplete: () => void;
}

export default function Intro({ onComplete }: IntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Attempt playback in case browser autoplay policy delays it
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn("Autoplay was prevented. Waiting for user input...", err);
      });
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black w-screen h-screen overflow-hidden">
      <video
        ref={videoRef}
        src="/video/5ingular.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
        onEnded={onComplete}
      />
    </div>
  );
}
