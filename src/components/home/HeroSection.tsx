export default function HeroSection() {
  return (
    <section
      className="
        relative
        h-[40svh] min-h-[220px]
        w-full overflow-hidden
        bg-[#031523]
        md:h-[50svh] md:min-h-[320px]
      "
    >
      <video
        className="
          absolute inset-0
          h-full w-full
          object-cover object-center
          scale-[1.15]
          sm:scale-100
        "
        src="/assets/hero-video.mp4"
        poster="/assets/hero-poster.webp"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label="Studio Dance Core introduction video"
      />

      <div className="pointer-events-none absolute inset-0 bg-black/10" />
    </section>
  );
}
