import { useState, useRef, useEffect } from "react";
import { HeartLockClosed } from "../utils/svgs";

const ERROR_PHRASES = [
  "Não é essa... mas eu sei que você consegue lembrar.",
  "A senha tá escondida em uma lembrança que eu tenho certeza que você não esqueceu.",
  "Você sabe essa senha, só está pensando demais!",
  "Eu prometo que a resposta faz sentido quando você lembrar dela.",
  "Se quiser mais uma dica, posso te dar... mas vai custar um beijinho!",
];

export default function PasswordModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const SENHA = "2908";
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [errorPhrase, setErrorPhrase] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    return () => { document.body.style.overflow = ""; };
  }, []);

  function handleSubmit() {
    if (value === SENHA) {
      setError(false);
      onSuccess();
    } else {
      const phrase = ERROR_PHRASES[Math.floor(Math.random() * ERROR_PHRASES.length)];
      setErrorPhrase(phrase);
      setError(true);
      setShaking(true);
      setValue("");
      setTimeout(() => setShaking(false), 500);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", animation: "fadeUp 0.25s ease" }}
    >
      {/* Card */}
      <div
        className="relative flex flex-col items-center gap-5 w-80 rounded-3xl p-8"
        style={{
          background: "#141417",
          border: "1px solid #27272a",
          boxShadow: "0 0 60px rgba(124,58,237,0.2)",
          animation: "fadeUp 0.3s ease",
        }}
      >
        {/* Orb decorativo */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{ width: 200, height: 200, background: "#6b21a8", opacity: 0.15, filter: "blur(50px)", top: -60, left: "50%", transform: "translateX(-50%)" }}
        />

        <HeartLockClosed className="w-14 h-14 relative z-10" />

        <div className="text-center relative z-10">
          <h2 className="text-base font-bold text-white">Acesso protegido 💜</h2>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            Dica: um dia muuuuito especial para nós!
          </p>
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="password"
          inputMode="numeric"
          maxLength={10}
          placeholder="••••"
          value={value}
          onChange={(e) => { setValue(e.target.value); setError(false); }}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className={[
            "w-full text-center text-xl tracking-widest rounded-xl px-4 py-3 outline-none transition-all relative z-10",
            shaking ? "animate-shake" : "",
          ].join(" ")}
          style={{
            background: "#1c1c1f",
            border: `2px solid ${error ? "#ef4444" : "#3f3f46"}`,
            color: error ? "#f87171" : "#fff",
            caretColor: "#a855f7",
          }}
          onFocus={e => { if (!error) e.currentTarget.style.borderColor = "#7c3aed"; }}
          onBlur={e => { if (!error) e.currentTarget.style.borderColor = "#3f3f46"; }}
        />

        {/* Frase de erro */}
        <div style={{ minHeight: 16, marginTop: -8 }}>
          {error && (
            <p
              className="text-xs text-center"
              style={{ color: "#f87171", animation: "fadeUp 0.2s ease" }}
            >
              {errorPhrase}
            </p>
          )}
        </div>

        {/* Botões */}
        <div className="flex gap-3 w-full relative z-10">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all"
            style={{ background: "transparent", border: "1px solid #3f3f46", color: "#9ca3af" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#1c1c1f")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            Voltar
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all active:scale-95"
            style={{ background: "#7c3aed", boxShadow: "0 0 20px rgba(124,58,237,0.3)" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#6d28d9")}
            onMouseLeave={e => (e.currentTarget.style.background = "#7c3aed")}
          >
            Provar 💜
          </button>
        </div>

        <p className="text-xs text-center relative z-10" style={{ color: "#4b5563" }}>
          só os números, sem espaços!
        </p>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}