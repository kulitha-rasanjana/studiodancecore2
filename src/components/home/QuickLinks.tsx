const quickLinks = [
  { title: "JOIN A CLASS", href: "/classes" },
  { title: "MERCH", href: "/merch" },
  { title: "LESSONS", href: "/lessons" },
];

export default function QuickLinks() {
  return (
    <section className="happening-section relative px-5 pb-14 pt-6 md:px-12 md:pb-20">
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-3">
        {quickLinks.map((item) => (
          <a
            key={item.title}
            href={item.href}
            className="group block h-24 border-2 border-[#101820] bg-white transition-all duration-300 hover:-translate-y-2 hover:border-violet-500 hover:bg-violet-50 hover:shadow-xl sm:h-32 lg:h-40"
            style={{ transform: "skewX(-10deg)" }}
          >
            <div
              className="flex h-full items-center justify-center px-4 text-center"
              style={{ transform: "skewX(10deg)" }}
            >
              <span className="text-xs font-bold tracking-wide text-[#101820] transition-colors group-hover:text-violet-700 md:text-sm">
                {item.title}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
