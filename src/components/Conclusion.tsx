import { useState, useEffect } from "react";

const INICIO = new Date("2024-08-29T00:00:00");

const FOTOS = [
  "./imgCarrousel1.jpg",
  "./imgCarrousel2.jpg",
  "./imgCarrousel3.jpg",
  "./imgCarrousel4.jpg",
  "./imgCarrousel5.jpg",
  "./imgCarrousel6.jpg",
  "./imgCarrousel7.jpg",
  "./imgCarrousel8.jpg",
  "./imgCarrousel9.jpg",
  "./imgCarrousel10.jpg",
  "./imgCarrousel11.jpg",
  "./imgCarrousel12.jpg",
  "./imgCarrousel13.jpg",
];

const FRASES = [
  <>Chegamos ao <em className="not-italic text-purple-400">fim.</em> Mas não ao fim de nós.</>,
  <>Cada seção desse site é só um <em className="not-italic text-purple-400">pedacinho</em> do que sinto por você.</>,
  <>Porque o que eu sinto por você é <em className="not-italic text-purple-400">grande demais</em> pra caber em qualquer tela.</>,
];

const PROMESSAS = [
  { texto: "Te escolho hoje.", emoji: "💜" },
  { texto: "Te escolherei amanhã.", emoji: "🌙" },
  { texto: "E em todos os dias que ainda virão.", emoji: "✨" },
  { texto: "Obrigada por ser minha.", emoji: "🌸" },
];

function BgOrbs() {
  return (
    <>
      <div className="absolute rounded-full pointer-events-none" style={{ width: 500, height: 500, background: "#6b21a8", opacity: 0.2, filter: "blur(90px)", top: -120, left: -100 }} />
      <div className="absolute rounded-full pointer-events-none" style={{ width: 380, height: 380, background: "#4f46e5", opacity: 0.15, filter: "blur(80px)", bottom: -80, right: -80 }} />
      <div className="absolute rounded-full pointer-events-none" style={{ width: 280, height: 280, background: "#be185d", opacity: 0.10, filter: "blur(80px)", top: "40%", left: "60%" }} />
    </>
  );
}

function useTimer() {
  const [diff, setDiff] = useState(Date.now() - INICIO.getTime());
  useEffect(() => {
    const id = setInterval(() => setDiff(Date.now() - INICIO.getTime()), 1000);
    return () => clearInterval(id);
  }, []);

const totalSec = Math.floor(diff / 1000);
  const horas = Math.floor((totalSec % 86400) / 3600);
  const minutos = Math.floor((totalSec % 3600) / 60);
  const segundos = totalSec % 60;

  const agora = new Date(Date.now());
const inicio = INICIO;

let anos = agora.getFullYear() - inicio.getFullYear();
let meses = agora.getMonth() - inicio.getMonth();
let diasRestantes = agora.getDate() - inicio.getDate();

if (diasRestantes < 0) {
  meses -= 1;
  const ultimoMes = new Date(agora.getFullYear(), agora.getMonth(), 0);
  diasRestantes += ultimoMes.getDate();
}
if (meses < 0) {
  anos -= 1;
  meses += 12;
}

  return { anos, meses, diasRestantes, horas, minutos, segundos };
}

// ── Fase de frases ────────────────────────────────────────────────────────────
function PhraseStage({ onReveal }: { onReveal: () => void }) {
  const [fraseAtual, setFraseAtual] = useState(0);
  const [state, setState] = useState<"visible" | "exit">("visible");
  const [finished, setFinished] = useState(false);

  function nextPhrase() {
    setState("exit");
    setTimeout(() => {
      const next = fraseAtual + 1;
      if (next < FRASES.length) {
        setFraseAtual(next);
        setState("visible");
      } else {
        setFinished(true);
      }
    }, 500);
  }

  const isLast = fraseAtual === FRASES.length - 1;
  const totalDots = FRASES.length + 1;
  const dotAtivo = finished ? totalDots - 1 : fraseAtual;

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen gap-10 px-6 relative z-10">
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-purple-400" style={{ animation: "fadeUp 0.6s ease 0.3s both" }}>
        Para sempre 💜
      </p>

      <div className="relative flex items-center justify-center w-full max-w-xl" style={{ minHeight: 120 }}>
        {!finished && (
          <p
            className="absolute w-full text-center font-bold leading-tight tracking-tight text-white"
            style={{
              fontSize: "clamp(22px, 5vw, 36px)",
              opacity: state === "visible" ? 1 : 0,
              transform: state === "exit" ? "translateY(-20px)" : "translateY(0)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            {FRASES[fraseAtual]}
          </p>
        )}
      </div>

      <div className="flex gap-1.5 items-center">
        {Array.from({ length: totalDots }).map((_, i) => (
          <div
            key={i}
            className="h-1 rounded-full transition-all duration-500"
            style={{ width: i === dotAtivo ? 24 : 8, background: i <= dotAtivo ? "#a855f7" : "#374151" }}
          />
        ))}
      </div>

      {!finished && (
        <button
          onClick={nextPhrase}
          className="bg-purple-500 hover:bg-purple-600 active:scale-95 text-white font-semibold rounded-full px-10 py-3.5 text-sm transition-all"
        >
          {isLast ? "Ver mais →" : "Continuar →"}
        </button>
      )}

      {finished && (
        <button
          onClick={onReveal}
          className="text-white font-bold rounded-full px-14 py-5 text-lg active:scale-95 transition-all"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #a855f7)",
            boxShadow: "0 0 40px rgba(168,85,247,0.35)",
            animation: "fadeUp 0.5s ease both",
          }}
        >
          Ver a conclusão 💜
        </button>
      )}
    </div>
  );
}

// ── Carrossel simples (auto) ──────────────────────────────────────────────────
function AutoCarrossel() {
  const [atual, setAtual] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setAtual((a) => (a + 1) % FOTOS.length);
        setFading(false);
      }, 400);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="w-full rounded-2xl overflow-hidden"
      style={{
        aspectRatio: "1/1",
        maxWidth: 320,
        opacity: fading ? 0 : 1,
        transition: "opacity 0.4s ease",
        boxShadow: "0 0 60px rgba(168,85,247,0.2)",
      }}
    >
      <img src={FOTOS[atual]} alt="" className="w-full h-full object-cover" />
    </div>
  );
}

// ── Timer ─────────────────────────────────────────────────────────────────────
function TimerBlock({ valor, label }: { valor: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span
        className="font-black text-white tabular-nums"
        style={{ fontSize: "clamp(28px, 8vw, 48px)", lineHeight: 1, letterSpacing: "-0.03em" }}
      >
        {String(valor).padStart(2, "0")}
      </span>
      <span className="text-xs font-semibold tracking-widest uppercase text-gray-500">{label}</span>
    </div>
  );
}

// ── Conclusão ─────────────────────────────────────────────────────────────────
function ConclusaoStage({ onNext }: { onNext?: () => void }) {
  const { anos, meses, diasRestantes, horas, minutos, segundos } = useTimer();
  const [promAtual, setPromAtual] = useState(0);
  const [promVisible, setPromVisible] = useState(true);
  const todasVistas = promAtual >= PROMESSAS.length - 1;

  function nextProm() {
    if (todasVistas) return;
    setPromVisible(false);
    setTimeout(() => {
      setPromAtual((p) => p + 1);
      setPromVisible(true);
    }, 400);
  }

  return (
    <div
      className="flex flex-col items-center w-full px-6 pb-20 pt-16 gap-14 relative z-10"
      style={{ animation: "fadeUp 0.6s ease" }}
    >
      {/* Eyebrow */}
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-purple-400">
        Para sempre 💜
      </p>

      {/* Carrossel + Timer lado a lado no topo */}
      <div className="flex flex-col items-center gap-10 w-full max-w-sm">
        <AutoCarrossel />

        {/* Timer */}
        <div className="flex flex-col items-center gap-4 w-full">
          <p className="text-gray-500 text-xs tracking-widest uppercase">juntas há</p>

          {/* Anos e meses */}
          <div className="flex gap-6 items-end justify-center">
            <TimerBlock valor={anos} label="anos" />
            <TimerBlock valor={meses} label="meses" />
            <TimerBlock valor={diasRestantes} label="dias" />
          </div>

          {/* Divider */}
          <div className="w-px h-6" style={{ background: "#27272a" }} />

          {/* HH:MM:SS */}
          <div className="flex gap-4 items-end justify-center">
            <TimerBlock valor={horas} label="horas" />
            <span className="text-gray-600 font-bold pb-5 text-xl">:</span>
            <TimerBlock valor={minutos} label="min" />
            <span className="text-gray-600 font-bold pb-5 text-xl">:</span>
            <TimerBlock valor={segundos} label="seg" />
          </div>

          <p className="text-gray-600 text-xs">desde 29 de agosto de 2024 💜</p>
        </div>
      </div>

      {/* Promessas */}
      <div className="flex flex-col items-center gap-6 w-full max-w-sm">
        <div
          className="w-full rounded-2xl px-6 py-8 flex flex-col items-center gap-3 text-center"
          style={{ background: "#18181b", border: "1px solid #27272a", minHeight: 140 }}
        >
          <span style={{ fontSize: 32, opacity: promVisible ? 1 : 0, transition: "opacity 0.4s ease" }}>
            {PROMESSAS[promAtual].emoji}
          </span>
          <p
            className="text-white font-bold"
            style={{
              fontSize: "clamp(18px, 5vw, 24px)",
              opacity: promVisible ? 1 : 0,
              transform: promVisible ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
            }}
          >
            {PROMESSAS[promAtual].texto}
          </p>
        </div>

        {/* Dots promessas */}
        <div className="flex gap-1.5">
          {PROMESSAS.map((_, i) => (
            <div
              key={i}
              className="h-1 rounded-full transition-all duration-300"
              style={{ width: i === promAtual ? 20 : 6, background: i <= promAtual ? "#a855f7" : "#27272a" }}
            />
          ))}
        </div>

        {!todasVistas ? (
          <button
            onClick={nextProm}
            className="bg-purple-500 hover:bg-purple-600 active:scale-95 text-white font-semibold rounded-full px-10 py-3.5 text-sm transition-all"
          >
            Continuar →
          </button>
        ) : (
          <div className="flex flex-col items-center gap-4" style={{ animation: "fadeUp 0.5s ease" }}>
            <p className="text-gray-500 text-sm italic">Te amo. 💜</p>
            <a
            href="/"
              onClick={onNext}
              className="border border-gray-700 text-gray-500 hover:border-purple-500 hover:text-purple-400 rounded-full px-8 py-2.5 text-sm transition-all"
            >
              Recomeçar do início 🔁
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Componente principal ──────────────────────────────────────────────────────
export default function ConclusaoSection({ onNext }: { onNext?: () => void }) {
  const [showConclusao, setShowConclusao] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  function handleReveal() {
    setFadeOut(true);
    setTimeout(() => setShowConclusao(true), 400);
  }

  return (
    <div className="relative w-full overflow-hidden" style={{ background: "#0a0a0f", minHeight: "100vh" }}>
      <BgOrbs />

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        :root { overflow-y: scroll; }
      `}</style>

      {!showConclusao && (
        <div style={{ opacity: fadeOut ? 0 : 1, transition: "opacity 0.4s ease" }}>
          <PhraseStage onReveal={handleReveal} />
        </div>
      )}

      {showConclusao && <ConclusaoStage onNext={onNext} />}
    </div>
  );
}