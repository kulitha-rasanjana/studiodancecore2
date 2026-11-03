export default function AboutSection() {
  return (
    <section className="overflow-hidden bg-white">
      <div className="grid min-h-[240px] grid-cols-1 md:grid-cols-[60%_40%]">
        <div className="flex flex-col justify-center px-6 py-12 text-[#07121e] sm:px-10 lg:px-16">
          <h2 className="mb-5 text-center text-3xl font-bold md:text-left">
            ABOUT US
          </h2>

          <p className="max-w-2xl text-sm leading-7 md:text-base">
            Studio Dance Core is a vibrant hub for artistic expression located
            in Sri Lanka. We are passionate about creating unique, high-quality
            video content that showcases our innovative ideas and talent. Our
            professional dance classes are specifically tailored for young Sri
            Lankan students and teenagers, providing a nurturing environment
            where they can develop their skills and creativity. Beyond the
            studio, we are dedicated to producing meaningful and enjoyable
            projects for our audience.
          </p>
        </div>

        <div className="about-logo-panel flex min-h-[200px] items-center justify-center bg-[#031523] px-10 py-10 md:min-h-[280px]">
          <img
            src="/assets/logo.png"
            alt="Studio Dance Core"
            className="w-full max-w-[320px] object-contain"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
