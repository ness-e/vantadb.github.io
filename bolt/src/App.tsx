import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CodeSection from './components/CodeSection';
import FeaturesSection from './components/FeaturesSection';
import UseCasesSection from './components/UseCasesSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-[#0d0d0f] min-h-screen">
      <Navbar />
      <Hero />
      <CodeSection />
      <FeaturesSection />
      <UseCasesSection />
      <Footer />
    </div>
  );
}
