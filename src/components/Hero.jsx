import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/80 border border-white/20 backdrop-blur">SoulSync AI · Emotional Intelligence Coach</span>
        <h1 className="mt-6 text-5xl md:text-6xl font-bold tracking-tight text-white">
          Build deeper connections with real-time emotional insights
        </h1>
        <p className="mt-4 text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
          A gentle coach that listens with you, surfaces what matters, and nudges you toward empathy in the moments that count.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a href="#live-demo" className="px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-semibold transition">Try the live demo</a>
          <a href="#how-it-works" className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition border border-white/20">How it works</a>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.25),transparent_50%)]" />
    </section>
  );
}
