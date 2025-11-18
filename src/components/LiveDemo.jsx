import { useEffect, useMemo, useRef, useState } from 'react';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function LiveDemo() {
  const [sessionId, setSessionId] = useState(null);
  const [input, setInput] = useState('I appreciate your help, but I still feel a bit worried about the deadline.');
  const [speaker, setSpeaker] = useState('You');
  const [events, setEvents] = useState([]);
  const [score, setScore] = useState(60);
  const [loading, setLoading] = useState(false);
  const inited = useRef(false);

  useEffect(() => {
    if (inited.current) return;
    inited.current = true;

    const boot = async () => {
      try {
        const res = await fetch(`${API_URL}/api/session/start`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: 'Demo Session',
            baseline_connection: 62,
            participants: [{ name: 'You', role: 'you' }, { name: 'Partner', role: 'partner' }]
          })
        });
        const data = await res.json();
        setSessionId(data.session_id);
        setScore(data.connection_score || 60);
      } catch (e) {
        console.error(e);
      }
    };
    boot();
  }, []);

  const submitUtterance = async () => {
    if (!sessionId || !input.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/session/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          speaker,
          text: input,
          features: { energy: 0.6, pauses: 2, pace: 140 }
        })
      });
      const data = await res.json();
      setEvents(prev => [data, ...prev].slice(0, 10));
      setScore(data.insight?.connection_score ?? score);
      setInput('');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const connectionColor = useMemo(() => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 65) return 'text-indigo-400';
    if (score >= 50) return 'text-amber-400';
    return 'text-rose-400';
  }, [score]);

  return (
    <section id="live-demo" className="relative py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Live Demo</h3>
              <div className={`text-sm font-medium ${connectionColor}`}>Connection Score: {Math.round(score)}</div>
            </div>
            <div className="flex gap-2 mb-3">
              <select value={speaker} onChange={e => setSpeaker(e.target.value)} className="bg-white/10 text-white px-3 py-2 rounded-lg border border-white/10">
                <option value="You">You</option>
                <option value="Partner">Partner</option>
              </select>
              <input value={input} onChange={e => setInput(e.target.value)} placeholder="Say something…"
                     className="flex-1 bg-white/10 text-white px-4 py-2 rounded-lg border border-white/10 outline-none placeholder-white/50" />
              <button onClick={submitUtterance} disabled={!sessionId || loading} className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white font-medium disabled:opacity-50">Send</button>
            </div>
            <p className="text-white/60 text-sm">Type a sentence and see real-time empathy prompts and suggestions.</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur">
            <h3 className="text-white font-semibold mb-4">AI Insights</h3>
            <div className="space-y-4 max-h-[360px] overflow-auto pr-2">
              {events.length === 0 && (
                <div className="text-white/60 text-sm">No insights yet. Share a line to begin.</div>
              )}
              {events.map((e, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-black/30 border border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm">{e.speaker}</span>
                    <span className="text-xs text-white/40">{new Date(e.created_at).toLocaleTimeString()}</span>
                  </div>
                  <p className="mt-1 text-white">{e.text}</p>
                  <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-white/60">Sentiment</div>
                      <div className="text-white font-semibold">{Math.round((e.insight?.sentiment ?? 0) * 100)}%</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-white/60">Emotions</div>
                      <div className="text-white font-semibold">{(e.insight?.emotions || []).join(', ')}</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 col-span-2">
                      <div className="text-white/60">Empathy Prompt</div>
                      <div className="text-white">{e.insight?.empathy_prompt}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
