import { useState, useEffect } from "react";

const MUSICAS = [
  { id: "2pWMc34naG2miGcu5R4kYY", titulo: "No escuro", artista: "Ana Gabriela, Anavitória" },
  { id: "736PP5LTtREkDgktNmX3Gu", titulo: "Superpowers", artista: "Daniel Caesar" },
  { id: "66WeFkFXdWoDaKgk8SrnBs", titulo: "Grecia", artista: "Teto" },
  { id: "13hJUmR1UpCUzyHjotiImK", titulo: "Gen Z luv", artista: "Central Cee" },
  { id: "0yRsHuqDYOeug4ACp38Rjt", titulo: "Mrs", artista: "Central Cee" },
  { id: "0sdPwPOYj1W5SDSWDWmp46", titulo: "Pensando em mim", artista: "Matchola, 2Z, Dinizzz" },

];

const FRASES = [
  <>No nosso relacionamento, a <em className="not-italic text-purple-400">música</em> tem um papel muito importante pra mim.</>,
  <>Eu gosto <em className="not-italic text-purple-400">MUITO</em> de escutar músicas que me lembram de ti.</>,
  <>Por isso escolhi algumas que desempenham muito bem <em className="not-italic text-purple-400">esse papel!</em></>,
];

function SpotifyEmbed({ trackId }: { trackId: string }) {
  return (
    <iframe
      key={trackId}
      src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0&autoplay=1`}
      width="100%"
      height="152"
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      style={{ borderRadius: 16, display: "block" }}
    />
  );
}

function BgOrbs() {
  return (
    <>
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 500, height: 500,
          background: "#6b21a8", opacity: 0.25,
          filter: "blur(80px)",
          top: -120, left: -100,
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 400, height: 400,
          background: "#4f46e5", opacity: 0.18,
          filter: "blur(80px)",
          bottom: -80, right: -80,
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 300, height: 300,
          background: "#be185d", opacity: 0.12,
          filter: "blur(80px)",
          top: "40%", left: "60%",
        }}
      />
    </>
  );
}

function PhraseStage({ onReveal }: { onReveal: () => void }) {
  const [fraseAtual, setFraseAtual] = useState(0);
  const [state, setState] = useState<"visible" | "exit" | "hidden">("visible");

  function nextPhrase() {
    setState("exit");
    setTimeout(() => {
      const next = fraseAtual + 1;
      setFraseAtual(next);
      setState(next < FRASES.length ? "visible" : "hidden");
    }, 500);
  }

  const finished = fraseAtual >= FRASES.length;
  const isLast = fraseAtual === FRASES.length - 1;

  const totalDots = FRASES.length + 1;
  const dotAtivo = finished ? totalDots - 1 : fraseAtual;

  return (
    <div
        style={{ animation: "fadeUp 0.6s ease" }}
       className="flex flex-col items-center justify-center w-full min-h-screen gap-10 px-6 relative z-10">
      <p
        className="text-xs font-semibold tracking-[0.2em] uppercase text-purple-400"
        style={{ animation: "fadeUp 0.6s ease 0.3s both" }}
      >
        Músicas 🎵
      </p>

      {/* Frase */}
      <div className="relative flex items-center justify-center w-full max-w-xl" style={{ minHeight: 120 }}>
        {!finished && (
          <p
            className="absolute w-full text-center text-3xl md:text-4xl font-bold leading-tight tracking-tight text-white"
            style={{
              opacity: state === "visible" ? 1 : 0,
              transform: state === "exit" ? "translateY(-20px)" : state === "visible" ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            {FRASES[fraseAtual]}
          </p>
        )}
      </div>

      {/* Dots */}
      <div className="flex gap-1.5 items-center">
        {Array.from({ length: totalDots }).map((_, i) => (
          <div
            key={i}
            className="h-1 rounded-full transition-all duration-500"
            style={{
              width: i === dotAtivo ? 24 : 8,
              background: i <= dotAtivo ? "#a855f7" : "#374151",
            }}
          />
        ))}
      </div>

      {/* Botões */}
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
          className="text-white font-bold rounded-full px-14 py-5 text-lg transition-all active:scale-95"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #a855f7)",
            boxShadow: "0 0 40px rgba(168,85,247,0.35)",
            animation: "fadeUp 0.5s ease both",
          }}
        >
          Ouvir as músicas 🎵
        </button>
      )}
    </div>
  );
}

function PlayerStage({ onNext }: { onNext?: () => void }) {
  const [atual, setAtual] = useState(0);
  const [maxVisto, setMaxVisto] = useState(0);
  const [fading, setFading] = useState(false);

  function goToTrack(i: number) {
    if (i === atual) return;
    setFading(true);
    setTimeout(() => {
      setAtual(i);
      setMaxVisto((m) => Math.max(m, i));
      setFading(false);
    }, 380);
  }

  useEffect(() => {
    ScrollReveal().reveal("#muscDiv", {
      duration: 1000,
      distance: "60px",
      origin: "bottom",
      delay: 100
    })
  })

  function prev() { goToTrack((atual - 1 + MUSICAS.length) % MUSICAS.length); }
  function next() { goToTrack((atual + 1) % MUSICAS.length); }

  const musica = MUSICAS[atual];

  return (
    <div
      className="flex flex-col items-center justify-center w-full min-h-screen px-6 pb-16 gap-0 relative z-10"
      style={{ animation: "fadeUp 0.6s ease" }}
    >
      {/* Header da faixa */}
      <div className="w-full max-w-sm mb-3">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-gray-500 mb-2">
          {atual + 1} / {MUSICAS.length}
        </p>
        <h2
          className="font-black leading-none tracking-tighter text-white mb-1"
          style={{
            fontSize: "clamp(28px, 8vw, 44px)",
            opacity: fading ? 0 : 1,
            transform: fading ? "translateY(6px)" : "translateY(0)",
            transition: "opacity 0.38s ease, transform 0.38s ease",
          }}
        >
          {musica.titulo}
        </h2>
        <p
          className="text-gray-400 text-sm mb-6"
          style={{
            opacity: fading ? 0 : 1,
            transition: "opacity 0.38s ease",
          }}
        >
          {musica.artista}
        </p>
      </div>

      {/* Embed */}
      <div
        className="w-full max-w-sm rounded-2xl overflow-hidden"
        style={{
          opacity: fading ? 0 : 1,
          transform: fading ? "translateY(8px)" : "translateY(0)",
          transition: "opacity 0.38s ease, transform 0.38s ease",
        }}
      >
        <SpotifyEmbed trackId={musica.id} />
      </div>

      {/* Track dots */}
      <div className="flex gap-1.5 mt-5">
        {MUSICAS.map((_, i) => (
          <button
            key={i}
            onClick={() => goToTrack(i)}
            className="h-2 rounded-full border-none transition-all duration-300 cursor-pointer"
            style={{
              width: i === atual ? 24 : 8,
              background: i <= maxVisto ? "#7c3aed" : "#3f3f46",
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Nav */}
      <div className="flex gap-3 w-full max-w-sm mt-6">
        <button
          onClick={prev}
          className="flex-1 py-3 rounded-full text-sm font-semibold text-gray-300 border border-zinc-700 hover:bg-zinc-800 transition"
        >
          ← Anterior
        </button>
        <button
          onClick={next}
          className="flex-1 py-3 rounded-full text-sm font-semibold text-white transition"
          style={{ background: "#7c3aed" }}
          onMouseEnter={e => (e.currentTarget.style.background = "#6d28d9")}
          onMouseLeave={e => (e.currentTarget.style.background = "#7c3aed")}
        >
          Próxima →
        </button>
      </div>

      {/* Continuar */}
      <button
        onClick={onNext}
        className="mt-7 border border-gray-600 text-gray-400 hover:border-purple-500 hover:text-purple-400 rounded-full px-8 py-2.5 text-sm font-medium transition-all"
      >
        Continuar 💜
      </button>
    </div>
  );
}

export default function MusicSection({ onNext }: { onNext?: () => void }) {
  const [showPlayer, setShowPlayer] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  function handleReveal() {
    setFadeOut(true);
    setTimeout(() => setShowPlayer(true), 400);
  }

  useEffect(() => {
    // ScrollReveal pode ser mantido se o resto do projeto usar
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ background: "#0a0a0f", minHeight: "100vh" }}
    >
      <BgOrbs />

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {!showPlayer && (
        <div
          style={{
            opacity: fadeOut ? 0 : 1,
            transition: "opacity 0.4s ease",
          }}
        >
          <PhraseStage onReveal={handleReveal} />
        </div>
      )}

      {showPlayer && <PlayerStage onNext={onNext} />}
    </div>
  );
}