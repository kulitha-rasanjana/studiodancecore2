export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#020b12] px-5 py-7 text-center text-white/60">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-xs sm:flex-row">
        <p>© {year} Studio Dance Core. All rights reserved.</p>
        <p>Developed by our Developer Team</p>
      </div>
    </footer>
  );
}
