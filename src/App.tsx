import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="min-h-screen bg-[#020b12]">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}
