import Hero from './components/Hero';
import LiveDemo from './components/LiveDemo';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15),transparent_60%)]" />
      <div className="relative">
        <Hero />
        <LiveDemo />
        <HowItWorks />
        <Footer />
      </div>
    </div>
  );
}

export default App;
