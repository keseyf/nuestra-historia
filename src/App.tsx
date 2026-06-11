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

const SECTIONS: Section[] = ["lock", "photos", "music", "poems", "more", "conclusion"];

function SectionPlaceholder({ name }: { name: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen gap-4 text-center px-6"
      style={{ background: "#0a0a0f" }}
    >
      <span className="text-6xl">🚧</span>
      <h2 className="text-2xl font-bold text-purple-400">{name}</h2>
      <p className="text-gray-600 text-sm">em construção...</p>
    </div>
  );
}

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
            <p
              className="text-xs font-semibold tracking-[0.2em] uppercase text-purple-400"
              style={{ animation: "fadeUp 0.6s ease 0.4s both" }}
            >
              Para minha amada 💜
            </p>
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
        return <ConclusaoSection/>;



      case "poems":
        return <PoemSection onNext={() => goToSection("conclusion")} />;
    }
  }

  return <>{renderSection()
      
  } <MusicButton/></>;
}