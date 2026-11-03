import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const cards = [
  {
    title: "PODCASTS",
    image: "/assets/podcasts.webp",
    href: "/productions",
    color: "#64d9ff",
  },
  {
    title: "ANGLOK",
    image: "/assets/manoloka.webp",
    href: "/productions",
    color: "#c78cff",
  },
  {
    title: "DANCE COVERS",
    image: "/assets/dance-covers.webp",
    href: "/productions",
    color: "#ff79ba",
  },
  {
    title: "SERVICES",
    image: "/assets/services.webp",
    href: "/productions",
    color: "#ffc66d",
  },
  {
    title: "MATYA",
    image: "/assets/matya.webp",
    href: "/productions",
    color: "#8ce4a4",
  },
];

export default function HappeningSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(2);

  const goTo = (index: number, behavior: ScrollBehavior = "smooth") => {
    const next = Math.max(0, Math.min(cards.length - 1, index));
    const container = scrollRef.current;
    const card = cardRefs.current[next];
    if (!container || !card) return;

    container.scrollTo({
      left: card.offsetLeft - (container.clientWidth - card.clientWidth) / 2,
      behavior,
    });
    setActiveIndex(next);
  };

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    if (media.matches) {
      const frame = requestAnimationFrame(() => goTo(2, "instant"));
      return () => cancelAnimationFrame(frame);
    }
  }, []);

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    const center = container.scrollLeft + container.clientWidth / 2;
    let closest = 0;
    let distance = Infinity;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const difference = Math.abs(center - cardCenter);
      if (difference < distance) {
        distance = difference;
        closest = index;
      }
    });

    setActiveIndex(closest);
  };

  return (
    <section className="happening-section relative overflow-hidden py-12 md:py-16 lg:py-20">
      <div className="relative z-10 mx-auto max-w-[1500px]">
        <h2 className="mb-9 px-6 text-2xl font-black tracking-tight text-white drop-shadow-md md:px-12 md:text-4xl">
          WHAT'S HAPPENING
        </h2>

        <div className="relative">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="happening-track flex snap-x snap-mandatory items-center overflow-x-auto px-[calc((100vw-76vw)/2)] py-8 md:justify-center md:overflow-visible md:px-10 lg:px-16"
          >
            {cards.map((card, index) => (
              <a
                key={card.title}
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                href={card.href}
                aria-label={card.title}
                className={`happening-card group relative block h-[300px] w-[76vw] max-w-[290px] shrink-0 snap-center overflow-hidden border border-[#182431] bg-white transition-all duration-300 hover:z-30 hover:-translate-y-3 hover:shadow-2xl md:h-[310px] md:w-[22%] md:max-w-[260px] lg:h-[370px] ${
                  index === activeIndex ? "z-20" : "z-10"
                }`}
                style={{
                  borderColor: index === activeIndex ? card.color : undefined,
                  boxShadow:
                    index === activeIndex
                      ? `0 0 0 2px ${card.color}55`
                      : undefined,
                }}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <span
                  className="pointer-events-none absolute inset-0 border-[3px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ borderColor: card.color }}
                />
                <span className="sr-only">{card.title}</span>
              </a>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-center gap-5 md:hidden">
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Previous card"
              className="rounded-full bg-white/90 p-2 disabled:opacity-40"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {cards.map((card, index) => (
                <button
                  key={card.title}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Go to ${card.title}`}
                  aria-current={activeIndex === index ? "true" : undefined}
                  className={`h-2 rounded-full transition-all ${
                    activeIndex === index
                      ? "w-6 bg-violet-500"
                      : "w-2 bg-white/60"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              disabled={activeIndex === cards.length - 1}
              aria-label="Next card"
              className="rounded-full bg-white/90 p-2 disabled:opacity-40"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
