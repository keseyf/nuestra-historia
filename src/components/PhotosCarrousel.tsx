import { useState, useRef } from "react";

const DIAS = "1 ano e 7 meses";

const FOTOS = [
  { src: "./imgCarrousel1.jpg", legenda: "Piquenique", motivo: "E esse foi o dia em que passei uma tarde de piquenique ao seu lado. Eu amo essa foto, porque ela transmite uma sensação de leveza e paz tão sincera que, toda vez que olho para ela, sinto vontade de voltar no tempo e viver esse dia mais uma vez com você.❤️" },
  { src: "./imgCarrousel2.jpg", legenda: "Skin Care", motivo: "Essa memória registrada, é apenas um dos dias em que partilhamos o nosso tempo de qualidade, gosto dessa foto, pois você esta tão natural e linda, que se tornou uma imagem de conforto." },
  { src: "./imgCarrousel3.jpg", legenda: "Halloween 🎃", motivo: "E esse foi o dia em que decidimos ir no halloween juntas, e foi um dia especial, porque você saiu comigo a noite, só porque eu estava muito animada para ir, por isso essa memória é importante pra mim." },
  { src: "./imgCarrousel4.jpg", legenda: "Festa de família", motivo: "E esse foi o dia em que eu fui a uma festa da sua família. Confesso que estava morrendo de vergonha, mas a sua presença transformou todo o nervosismo em conforto e me fez sentir em casa. ❤️" },
  { src: "./imgCarrousel5.jpg", legenda: "Te escolho todos os dias 💕", motivo: "Esse foi apenas um dia comum entre tantos momentos que vivemos juntas, mas cada detalhe daquela tarde ficou guardado em mim e me fez ter a certeza de que quero te escolher todos os dias pelo resto da minha vida." },
  { src: "./imgCarrousel6.jpg", legenda: "Shopping", motivo: "Esse dia foi incrível! Foi o dia em que tivemos um tempinho só para nós durante um passeio no shopping. Confesso que nem me lembro qual filme assistimos — talvez tenha sido Como Treinar o Seu Dragão, ou algum outro. Mas, sinceramente, isso pouco importa. O que realmente ficou guardado na minha memória foi aquele momento ao seu lado. Estar com você tornou aquele dia especial de uma forma que nenhum filme conseguiria explicar. Naquele instante, nada mais importava além da sua companhia. Era só você, e mais ninguém." },
  { src: "./imgCarrousel7.jpg", legenda: "Conforto.", motivo: "Esse foi o dia em que dormi no seu apartamento, e foi simplesmente incrível. Assistimos filmes, compartilhamos fofocas, demos boas risadas e aproveitamos cada instante juntas. Mas, por melhor que tudo isso tenha sido, o que tornou aquele dia realmente especial foi poder dormir ao seu lado. Ter você tão perto de mim trouxe uma sensação de paz e felicidade que é difícil colocar em palavras. Foi um daqueles momentos simples que se transformam em lembranças inesquecíveis." },
  { src: "./imgCarrousel8.jpg", legenda: "Aniversário 🎂", motivo: "Essa foi uma noite linda e uma memória muito especial de recordar. Foi o aniversário da minha mãe, e você estava simplesmente deslumbrante e muito cheirosa. Por mais que o tempo que passamos juntas tenha sido curto, cada momento ao seu lado tornou aquela noite inesquecível. É uma lembrança que guardo com muito carinho no coração, porque, além de especial, foi extremamente importante para mim." },
  { src: "./imgCarrousel9.jpg", legenda: "Começo.", motivo: "Essa memória é do nosso começo. Admito que sinto falta de te cortejar, mas cada uma das nossas lembranças está guardada para sempre no meu coração." },
  { src: "./imgCarrousel10.jpg", legenda: "Subway", motivo: "Esse é um dos muitos dias em que nós duas nos encontramos para comer no Subway. Com o tempo, esse simples lanche se tornou muito mais do que uma refeição: virou um refúgio de conforto, um lugar onde compartilhamos conversas, risadas e momentos que tornaram nossos dias mais leves." },
  { src: "./imgCarrousel11.jpg", legenda: "Aniversário pt2", motivo: "Esse foi o aniversário da sua irmã, e esse final de semana foi muito engraçado. Demos boas risadas, aproveitamos bastante e criamos mais uma daquelas lembranças que eu gosto de guardar com carinho. Pode até ter sido só mais um final de semana, mas estar ao seu lado fez tudo ficar mais especial." },
  { src: "./imgCarrousel12.jpg", legenda: "🧡", motivo: "" },
  { src: "./imgCarrousel13.jpg", legenda: "🪷", motivo: "" },
];

const FRASES: React.ReactNode[] = [
  <>Já fazem <em className="not-italic text-purple-400">{DIAS}</em> que nos amamos! 💜</>,
  <>E nesses {DIAS} tiramos <em className="not-italic text-purple-400">muitas fotos!</em> 📸</>,
  <>Quero te mostrar as minhas <em className="not-italic text-purple-400">favoritas</em> e destacar o porquê de cada uma!</>,
];

// ── Orbs de fundo ─────────────────────────────────────────────────────────────
function BgOrbs() {
  return (
    <>
      <div className="absolute rounded-full pointer-events-none" style={{ width: 500, height: 500, background: "#6b21a8", opacity: 0.22, filter: "blur(90px)", top: -140, left: -120 }} />
      <div className="absolute rounded-full pointer-events-none" style={{ width: 380, height: 380, background: "#4f46e5", opacity: 0.15, filter: "blur(80px)", bottom: -60, right: -80 }} />
      <div className="absolute rounded-full pointer-events-none" style={{ width: 260, height: 260, background: "#be185d", opacity: 0.10, filter: "blur(70px)", top: "45%", left: "55%" }} />
    </>
  );
}

// ── Fase de frases ─────────────────────────────────────────────────────────────
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
        Nossas memórias 📸
      </p>

      {/* Frase */}
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
          className="text-white font-bold rounded-full px-14 py-5 text-lg active:scale-95 transition-all"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #a855f7)",
            boxShadow: "0 0 40px rgba(168,85,247,0.35)",
            animation: "fadeUp 0.5s ease both",
          }}
        >
          Ver as fotos 📸
        </button>
      )}
    </div>
  );
}

// ── Carrossel ─────────────────────────────────────────────────────────────────
function Carrossel({ onNext }: { onNext?: () => void }) {
  const [atual, setAtual] = useState(0);
  const [fading, setFading] = useState(false);
  const [maxVisto, setMaxVisto] = useState(0);
  const todasVistas = maxVisto >= FOTOS.length - 1;

  function goTo(i: number) {
    if (i === atual) return;
    setFading(true);
    setTimeout(() => {
      setAtual(i);
      setMaxVisto((m) => Math.max(m, i));
      setFading(false);
    }, 350);
  }

  function prev() { goTo((atual - 1 + FOTOS.length) % FOTOS.length); }
  function next() { goTo((atual + 1) % FOTOS.length); }

  const foto = FOTOS[atual];

  return (
    <div className="flex flex-col items-center w-full max-w-sm px-4 pb-16 gap-5 relative z-10" style={{ animation: "fadeUp 0.6s ease" }}>

      {/* Contador */}
      <div className="w-full flex items-baseline gap-2">
        <span className="text-xs font-semibold tracking-[0.18em] uppercase text-gray-500">
          {atual + 1} / {FOTOS.length}
        </span>
        <span
          className="font-black tracking-tighter text-white leading-none"
          style={{ fontSize: "clamp(24px, 7vw, 38px)" }}
        >
          {foto.legenda}
        </span>
      </div>

      {/* Foto */}
      <div
        className="relative w-full rounded-2xl overflow-hidden"
        style={{
          aspectRatio: "1/1",
          opacity: fading ? 0 : 1,
          transform: fading ? "scale(0.98)" : "scale(1)",
          transition: "opacity 0.35s ease, transform 0.35s ease",
        }}
      >
        <img
          src={foto.src}
          alt={foto.legenda}
          className="w-full h-full object-cover"
        />
        {/* Overlay sutil no canto */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 50%)" }}
        />
      </div>

      {/* Motivo */}
      {foto.motivo && (
        <div
          className="w-full rounded-2xl px-5 py-4"
          style={{
            background: "#18181b",
            border: "1px solid #27272a",
            opacity: fading ? 0 : 1,
            transform: fading ? "translateY(6px)" : "translateY(0)",
            transition: "opacity 0.35s ease, transform 0.35s ease",
          }}
        >
          <p className="text-gray-300 text-sm leading-relaxed">{foto.motivo}</p>
        </div>
      )}

      {/* Dots */}
      <div className="flex gap-1.5 flex-wrap justify-center max-w-xs">
        {FOTOS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="rounded-full border-none transition-all duration-300 cursor-pointer"
            style={{
              width: i === atual ? 24 : 8,
              height: 8,
              padding: 0,
              background: i <= maxVisto ? "#7c3aed" : "#3f3f46",
            }}
          />
        ))}
      </div>

      {/* Nav */}
      <div className="flex gap-3 w-full">
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

      {/* Continuar — só aparece depois de ver todas */}
      <div style={{ minHeight: 44, display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
        {todasVistas ? (
          <button
            onClick={onNext}
            className="border border-gray-600 text-gray-400 hover:border-purple-500 hover:text-purple-400 rounded-full px-8 py-2.5 text-sm font-medium transition-all"
            style={{ animation: "fadeUp 0.5s ease" }}
          >
            Músicas 🎵
          </button>
        ) : (
          <p className="text-gray-600 text-xs text-center">
            veja todas as fotos para continuar 💜
          </p>
        )}
      </div>
    </div>
  );
}

// ── Componente principal ──────────────────────────────────────────────────────
export default function PhotosCarrousel({ onNext }: { onNext?: () => void }) {
  const [showCarrossel, setShowCarrossel] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const carrosselRef = useRef<HTMLDivElement>(null);

  function handleReveal() {
    setFadeOut(true);
    setTimeout(() => {
      setShowCarrossel(true);
      setTimeout(() => carrosselRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }, 400);
  }

  return (
    <div  className="relative w-full overflow-hidden" style={{ background: "#0a0a0f", minHeight: "100vh" }}>
      <BgOrbs />

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        :root{
          overflow-y: scroll;
        }
      `}</style>

      {!showCarrossel && (
        <div style={{ animation: "fadeUp 0.6s ease", opacity: fadeOut ? 0 : 1, transition: "opacity 0.4s ease" }}>
          <PhraseStage onReveal={handleReveal} />
        </div>
      )}

      {showCarrossel && (
        <div ref={carrosselRef} className="flex justify-center w-full pt-12">
          <Carrossel onNext={onNext} />
        </div>
      )}
    </div>
  );
}