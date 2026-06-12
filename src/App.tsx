import { useState, useEffect } from "react";
import PasswordModal from "./components/passwordModal";
import { HeartNormal, HeartLockClosed, HeartLockOpen } from "./utils/svgs";
import PhotosCarrousel from "./components/PhotosCarrousel";
import MusicSection from "./components/Musics";
import PoemSection from "./components/PoemSection";
import MusicButton from "./components/common/musicButton";
import ConclusaoSection from "./components/Conclusion";

type Section =
  | "lock"
  | "photos"
  | "music"
  | "poems"
  | "more"
  | "conclusion";

type LockStage = "heart" | "locked" | "modal" | "unlocking" | "unlocked";

// ── Tela de cadeado ────────────────────────────────────────────────────────────
function LockSection({ onUnlocked }: { onUnlocked: () => void }) {
  const [lockStage, setLockStage] = useState<LockStage>("heart");
  const [flipped, setFlipped] = useState(false);
  const [heartVisible, setHeartVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeartVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = lockStage === "unlocked" ? "" : "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [lockStage]);

  function handleHeartClick() {
    if (lockStage !== "heart") return;
    setFlipped(true);
    setTimeout(() => setLockStage("locked"), 400);
  }

  function handleLockedClick() {
    if (lockStage !== "locked") return;
    setLockStage("modal");
  }

  function handleModalClose() {
    setLockStage("locked");
  }

  function handleSuccess() {
    setLockStage("unlocking");
    setTimeout(() => {
      setLockStage("unlocked");
      setFlipped(false);
      setTimeout(onUnlocked, 800);
    }, 1800);
  }

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen px-4 overflow-hidden"
      style={{ background: "#0a0a0f" }}
    >
      {/* Orbs */}
      <div className="absolute rounded-full pointer-events-none" style={{ width: 500, height: 500, background: "#6b21a8", opacity: 0.22, filter: "blur(90px)", top: -140, left: -120 }} />
      <div className="absolute rounded-full pointer-events-none" style={{ width: 380, height: 380, background: "#4f46e5", opacity: 0.15, filter: "blur(80px)", bottom: -60, right: -80 }} />

      {(lockStage === "heart" || lockStage === "locked" || lockStage === "modal") && (
        <div className="flex flex-col items-center gap-6 text-center relative z-10">
          {lockStage === "heart" && (
            <div>
              <p

                className="text-xs font-semibold tracking-[0.2em] uppercase text-purple-400"
                style={{ animation: "fadeUp 0.6s ease 0.4s both" }}
              >
                Para minha amada 💜
              </p>
              <p style={{ animation: "fadeUp 0.6s ease 0.4s both" }} className="text-xs mt-2 text-purple-300/15">
                Aperte o play no botão inferior para uma melhor experiência.
              </p>
            </div>
          )}

          <div
            className="flip-card w-56 h-56 cursor-pointer select-none"
            onClick={lockStage === "heart" ? handleHeartClick : handleLockedClick}
          >
            <div className={`flip-inner w-full h-full ${flipped ? "flipped" : ""}`}>
              <div className="flip-face">
                <div className="relative flex items-center justify-center">
                  <HeartNormal
                    className={`w-56 h-56 drop-shadow-lg transition-all ${heartVisible ? "animate-grow" : "opacity-0 scale-50"
                      }`}
                  />
                </div>
              </div>
              <div className="flip-face flip-face-back">
                <HeartLockClosed className="w-56 h-56 drop-shadow-lg" />
              </div>
            </div>
          </div>

          {lockStage === "heart" && (
            <p className="text-purple-500 text-sm animate-pulse">Toque no coração ✨</p>
          )}

          {(lockStage === "locked" || lockStage === "modal") && (
            <div className="text-center" style={{ animation: "fadeUp 0.4s ease" }}>
              <p className="text-white font-black text-base">
                Antes de entrar, tem que provar seu amor!
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Insira a senha para entrar!
              </p>
              <button
                onClick={handleLockedClick}
                className="mt-5 px-8 py-3 rounded-full text-white text-sm font-semibold transition-all active:scale-95"
                style={{ background: "#7c3aed", boxShadow: "0 0 30px rgba(124,58,237,0.35)" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#6d28d9")}
                onMouseLeave={e => (e.currentTarget.style.background = "#7c3aed")}
              >
                Provar meu amor! 💜
              </button>
            </div>
          )}
        </div>
      )}

      {lockStage === "unlocking" && (
        <div className="flex flex-col items-center gap-4 relative z-10" style={{ animation: "fadeUp 0.3s ease" }}>
          <HeartLockOpen className="w-56 h-56 animate-unlockPop drop-shadow-xl" />
        </div>
      )}

      {lockStage === "modal" && (
        <PasswordModal onClose={handleModalClose} onSuccess={handleSuccess} />
      )}

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ── App principal ──────────────────────────────────────────────────────────────
export default function App() {
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
  const [currentSection, setCurrentSection] = useState<Section>("lock");

  function goToSection(section: Section) {
    setCurrentSection(section);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderSection() {

    switch (currentSection) {
      case "lock":
        return <LockSection onUnlocked={() => goToSection("photos")} />;

      case "photos":
        return <PhotosCarrousel onNext={() => goToSection("music")} />;

      case "music":
        return <MusicSection onNext={() => goToSection("poems")} />;

      case "conclusion":
        return <ConclusaoSection />;



      case "poems":
        return <PoemSection onNext={() => goToSection("conclusion")} />;
    }
  }

  return <>{
    renderSection()

  } <MusicButton />
    <div>
      {FOTOS.map((foto, index) => (
        <div className="hidden" key={index}>
          <img src={foto.src} alt={`Foto ${index + 1}`} />
          <h3>{foto.legenda}</h3>
          <p>{foto.motivo}</p>
        </div>
      ))}
    </div>
  </>;
}