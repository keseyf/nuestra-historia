import { useState } from "react";

const FRASES = [
  <>Uma coisa que você <em className="not-italic text-purple-400">EXALTA em mim</em> é a criatividade.</>,
  <>Então resolvi usar ela para criar algo que fosse <em className="not-italic text-purple-400">digno de você.</em></>,
];

const VERSES = [
  { text: <>O que os olhos dizem</>, stanzaEnd: true },
  { text: <>Seus olhos são poesia pura;</>, stanzaEnd: false },
  { text: <>eles dizem muito mais do que qualquer verso que eu tente escrever.</>, stanzaEnd: false },
  { text: <>Sem você, o mundo seria um lugar mais árido</>, stanzaEnd: false },
  { text: <>sem as flores que brotam na minha mente toda vez que penso em você.</>, stanzaEnd: false },
  { text: <>Sei que, às vezes, as palavras me escapam</>, stanzaEnd: false },
  { text: <>e traduzir sentimentos não é o meu maior talento.</>, stanzaEnd: false },
  { text: <>Mas o meu amor se revela nos gestos, no toque,</>, stanzaEnd: false },
  { text: <>na presença e na constância de cada dia.</>, stanzaEnd: false },
  { text: <>Talvez eu não saiba transformar tudo o que sinto em belas palavras</>, stanzaEnd: false },
  { text: <>mas procuro demonstrar em cada atitude o quanto você é importante para mim.</>, stanzaEnd: false },
  { text: <>Prefiro te amar em silêncio</>, stanzaEnd: false },
  { text: <><em style={{ fontStyle: "italic", color: "#c084fc" }}>e em ações sinceras</em></>, stanzaEnd: false },
  { text: <>do que me perder em palavras vazias.</>, stanzaEnd: false },
  { text: <>Afinal, meu amor por você</>, stanzaEnd: false },
  { text: <><em style={{ fontStyle: "italic", color: "#c084fc" }}>sempre fala mais alto naquilo que faço do que naquilo que digo.</em></>, stanzaEnd: false },
];

function BgOrbs() {
  return (
    <>
      <div className="absolute rounded-full pointer-events-none" style={{ width: 400, height: 400, background: "#6b21a8", opacity: 0.2, filter: "blur(80px)", top: -100, left: -80 }} />
      <div className="absolute rounded-full pointer-events-none" style={{ width: 300, height: 300, background: "#4f46e5", opacity: 0.15, filter: "blur(80px)", bottom: -60, right: -60 }} />
    </>
  );
}

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
        Para você — com amor
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

      {/* Dots */}
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
          Ler o poema ✨
        </button>
      )}
    </div>
  );
}

function ArrowButton({ onClick, finished }: { onClick: () => void; finished: boolean }) {
  return (
    <button
      onClick={onClick}
      aria-label={finished ? "Continuar" : "Próximo verso"}
      style={{
        width: 48, height: 48, borderRadius: "50%",
        border: finished ? "1px solid #3f3f46" : "none",
        background: finished ? "transparent" : "#a855f7",
        color: finished ? "#6b7280" : "#fff",
        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.25s ease", flexShrink: 0,
        boxShadow: finished ? "none" : "0 0 20px rgba(168,85,247,0.35)",
      }}
      onMouseEnter={e => {
        if (finished) { e.currentTarget.style.borderColor = "#a855f7"; e.currentTarget.style.color = "#a855f7"; }
        else e.currentTarget.style.background = "#9333ea";
      }}
      onMouseLeave={e => {
        if (finished) { e.currentTarget.style.borderColor = "#3f3f46"; e.currentTarget.style.color = "#6b7280"; }
        else e.currentTarget.style.background = "#a855f7";
      }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        {finished ? (
          <path d="M3.5 9H14.5M14.5 9L10 4.5M14.5 9L10 13.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        ) : (
          <path d="M9 3.5V14.5M9 14.5L4.5 10M9 14.5L13.5 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        )}
      </svg>
    </button>
  );
}

function PoemStage({ onNext }: { onNext?: () => void }) {
  const [current, setCurrent] = useState(0);
  const finished = current >= VERSES.length;

  function handleClick() {
    if (finished) onNext?.();
    else setCurrent((c) => c + 1);
  }

  return (
    <div
      className="relative w-full overflow-hidden flex flex-col items-center justify-center px-6 py-20"
      style={{ minHeight: "100vh", animation: "fadeUp 0.6s ease" }}
    >
      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-8" style={{ color: "#6b21a8", animation: "fadeUp 0.8s ease 0.2s both" }}>
          Para você — com amor
        </p>

        <h2
          className="text-center mb-12"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(26px, 6vw, 40px)",
            fontWeight: 700, color: "#fff",
            letterSpacing: "-0.02em", lineHeight: 1.1,
            animation: "fadeUp 0.8s ease 0.4s both",
          }}
        >
          O que os olhos dizem
        </h2>

        {current === 0 && (
          <div className="flex flex-col items-center gap-2 mt-4">
            <button
              onClick={handleClick}
              className="text-white font-semibold rounded-full active:scale-95"
              style={{
                background: "#a855f7", border: "none", padding: "12px 36px",
                fontSize: 14, fontFamily: "inherit", cursor: "pointer",
                transition: "background 0.2s", boxShadow: "0 0 20px rgba(168,85,247,0.3)",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#9333ea")}
              onMouseLeave={e => (e.currentTarget.style.background = "#a855f7")}
            >
              Começar ✨
            </button>
          </div>
        )}

        <div className="w-full flex flex-col items-center" style={{ animation: "fadeUp 0.6s ease 0.5s both" }}>
          {VERSES.map((verse, i) => (
            <div key={i} className="w-full flex flex-col items-center">
              <p
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(14px, 3.2vw, 18px)", lineHeight: 1.9,
                  textAlign: "center", padding: "3px 0",
                  opacity: i < current ? (i === current - 1 ? 1 : 0.2) : 0,
                  color: i === current - 1 ? "#fff" : "#9ca3af",
                  transform: i < current ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.6s ease, transform 0.6s ease, color 0.4s ease",
                  pointerEvents: "none", maxWidth: 420,
                }}
              >
                {verse.text}
              </p>
              {verse.stanzaEnd && i < current && <div style={{ height: 16 }} />}

              {i === current - 1 && (
                <div className="flex flex-col items-center gap-3 mt-6" style={{ animation: "fadeUp 0.4s ease" }}>
                  <ArrowButton onClick={handleClick} finished={finished} />
                  {finished && (
                    <p style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#4b5563", fontSize: 12, fontStyle: "italic", animation: "fadeUp 0.5s ease" }}>
                      fim. 💜
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-1.5 items-center mt-10">
          {VERSES.map((_, i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                height: 3,
                width: i < current ? (i === current - 1 ? 20 : 6) : 6,
                background: i < current ? (i === current - 1 ? "#a855f7" : "#3b1f6e") : "#1f1f23",
                transition: "all 0.4s ease",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PoemSection({ onNext }: { onNext?: () => void }) {
  const [showPoem, setShowPoem] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  function handleReveal() {
    setFadeOut(true);
    setTimeout(() => setShowPoem(true), 400);
  }

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ background: "#0a0a0f", minHeight: "100vh" }}
    >
      <BgOrbs />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        :root { overflow-y: scroll; }
      `}</style>

      {!showPoem && (
        <div style={{ animation:"fadeUp 0.6s ease", opacity: fadeOut ? 0 : 1, transition: "opacity 0.4s ease" }}>
          <PhraseStage onReveal={handleReveal} />
        </div>
      )}

      {showPoem && <PoemStage onNext={onNext} />}
    </div>
  );
}