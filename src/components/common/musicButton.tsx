import { useState, useRef } from "react";

export default function MusicButton() {
  const [playing, setPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  function toggle() {
    const iframe = iframeRef.current;
    if (!iframe) return;
    if (playing) {
      iframe.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*");
    } else {
      iframe.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', "*");
    }
    setPlaying(!playing);
  }

  return (
    <>
      {/* YouTube player escondido */}
      <iframe
        ref={iframeRef}
        src="https://www.youtube.com/embed/uCvWimRtdBI?si=aAC29O46Uw6hC3lJ&enablejsapi=1&autoplay=1&loop=1"
        // src="https://www.youtube.com/embed/GxldQ9eX2wo?enablejsapi=1&autoplay=1&loop=1&playlist=GxldQ9eX2wo"
        style={{ display: "none" }}
        allow="autoplay"
      />

      {/* Botão fixo */}
      <button
        onClick={toggle}
        title={playing ? "Pausar música" : "Tocar música"}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 9999,
          width: 48,
          height: 48,
          borderRadius: "50%",
          border: "1px solid #3f3f46",
          background: playing ? "#7c3aed" : "#18181b",
          color: "#fff",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: playing ? "0 0 20px rgba(168,85,247,0.4)" : "0 2px 12px rgba(0,0,0,0.4)",
          transition: "all 0.25s ease",
        }}
      >
        {playing ? (
          // pause
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <rect x="3" y="2" width="3.5" height="12" rx="1"/>
            <rect x="9.5" y="2" width="3.5" height="12" rx="1"/>
          </svg>
        ) : (
          // play
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M3 2.5l10 5.5-10 5.5V2.5z"/>
          </svg>
        )}
      </button>
    </>
  );
}