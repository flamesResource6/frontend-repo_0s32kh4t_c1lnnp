export default function HowItWorks() {
  const steps = [
    {
      title: 'Listen',
      desc: 'We capture the flow of your conversation and detect tone, pace, and pauses.',
    },
    {
      title: 'Understand',
      desc: 'A lightweight on-device model infers emotion and empathy gaps without storing raw audio.',
    },
    {
      title: 'Coach',
      desc: 'Subtle prompts help you validate feelings, invite depth, and repair ruptures quickly.',
    },
  ];

  return (
    <section id="how-it-works" className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center">How it works</h2>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center backdrop-blur">
              <div className="text-indigo-400 font-semibold">Step {i + 1}</div>
              <div className="mt-2 text-white text-xl font-semibold">{s.title}</div>
              <p className="mt-2 text-white/70">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
