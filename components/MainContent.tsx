"use client";
import { useState, useEffect, useRef } from "react";
import { SITE_DATA } from "@/data/content";
import confetti from "canvas-confetti";
import {
  Heart,
  Music,
  Camera,
  Ticket,
  Code2,
  Play,
  Pause,
  Sparkles,
  CheckCircle2,
  MapPin,
  MessageCircle,
} from "lucide-react";

export default function MainContent() {
  // Carga los cupones ya canjeados desde la memoria del navegador
  const [redeemed, setRedeemed] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("redeemed_coupons");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [showDevModal, setShowDevModal] = useState(false);
  const [showMemoryModal, setShowMemoryModal] = useState(false);
  const [showRouteModal, setShowRouteModal] = useState(false);
  const [activeAlbum, setActiveAlbum] = useState<string[] | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState("Todos");

  // ESTADOS PARA EL JUEGO DE LA PISTA DEL CUPÓN 3 🎁
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [quizAttempts, setQuizAttempts] = useState(2);
  const [quizStatus, setQuizStatus] = useState<"playing" | "won" | "lost">(
    "playing",
  );

  // Guarda en el navegador cada vez que se canjea un cupón
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("redeemed_coupons", JSON.stringify(redeemed));
    }
  }, [redeemed]);

  // MENSAJE SECRETO EN CONSOLA 💻❤️
  useEffect(() => {
    console.log(
      "%c¡Feliz cumple Amor! ❤️",
      "color: #38bdf8; font-size: 18px; font-weight: bold; background: #0f172a; padding: 8px 12px; border-radius: 6px;",
    );
    console.log(
      "%cHoy el universo celebra, UN AÑO MAS .\nMil cosas lindas.\nHay días que merecen sentirse un poquito más mágicos. Este empieza con esta sorpresa y termina con un recuerdo nuevo.\nTe AMO!",
      "color: #94a3b8; font-size: 13px; line-height: 1.6; padding-top: 6px;",
    );
  }, []);

  // NAVEGACIÓN CON LAS FLECHITAS DEL TECLADO ⌨️
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null || !activeAlbum) return;

      if (e.key === "ArrowRight") {
        setSelectedIndex((prev) =>
          prev !== null && prev < activeAlbum.length - 1 ? prev + 1 : 0,
        );
      } else if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) =>
          prev !== null && prev > 0 ? prev - 1 : activeAlbum.length - 1,
        );
      } else if (e.key === "Escape") {
        setSelectedIndex(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, activeAlbum]);

  // REFERENCIA Y CONTROL DE AUDIO NATIVO
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // MÁQUINA DE ESCRIBIR PARA EL MENSAJE PRINCIPAL
  const [typedMessage, setTypedMessage] = useState("");

  useEffect(() => {
    let charIdx = 0;
    const fullMessage = SITE_DATA.loveMessage;

    const interval = setInterval(() => {
      if (charIdx <= fullMessage.length) {
        setTypedMessage(fullMessage.slice(0, charIdx));
        charIdx++;
      } else {
        clearInterval(interval);
      }
    }, 35);

    return () => clearInterval(interval);
  }, []);

  const handleRedeem = (id: number) => {
    if (id === 3) {
      setShowQuizModal(true);
      return;
    }

    if (!redeemed.includes(id)) {
      setRedeemed([...redeemed, id]);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#38bdf8", "#3b82f6", "#1d4ed8", "#60a5fa"],
      });
    }
  };

  // Filtrar fotos según la pestaña activa
  const filteredPhotos =
    activeTab === "Todos"
      ? SITE_DATA.photos
      : SITE_DATA.photos.filter((photo) => photo.category === activeTab);

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 p-4 md:p-8 font-mono relative overflow-hidden">
      {/* ELEMENTO AUDIO OCULTO */}
      <audio
        ref={audioRef}
        src={SITE_DATA.song.audioUrl}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/15 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-b border-slate-800/60 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600/20 rounded-2xl border border-blue-500/30">
              <Heart className="w-7 h-7 text-blue-400 fill-blue-400 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                ¡Feliz Cumple Amor!
              </h1>
              <p className="text-xs text-blue-400 font-sans tracking-wide">
                15 de Noviembre del 2026
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowDevModal(true)}
            className="px-4 py-2.5 bg-blue-950/60 hover:bg-blue-900/60 text-blue-400 border border-blue-500/30 rounded-xl text-xs font-mono transition-all flex items-center gap-2 shadow-lg shadow-blue-950/50"
          >
            <Code2 className="w-4 h-4 text-blue-400" />
            <span>Ver Mensaje en Consola / F12</span>
          </button>
        </div>

        {/* CONTENEDOR GRANDE PRINCIPAL */}
        <div className="bg-slate-900/50 border border-blue-500/30 p-6 md:p-8 rounded-[32px] shadow-2xl backdrop-blur-xl space-y-6">
          {/* Insignia */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/10 border border-blue-400/30 text-blue-400 text-xs rounded-full shadow-inner">
              <Sparkles className="w-3.5 h-3.5" /> Mensaje Especial para Vos
            </div>
          </div>

          {/* Cuadro de Texto */}
          <div className="bg-slate-950/70 border border-blue-500/20 p-6 md:p-8 rounded-2xl shadow-inner relative">
            <p className="text-slate-200 leading-relaxed whitespace-pre-line text-sm md:text-base font-mono">
              {typedMessage}
              <span className="inline-block w-2 h-4 bg-blue-400 ml-1 animate-pulse" />
            </p>
          </div>

          {/* Reproductor de Música y Botón de Recuerdo */}
          <div className="bg-slate-950/70 border border-blue-500/20 p-4 md:p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="w-12 h-12 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
                <Music className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider block">
                  Una Canción Especial
                </span>
                <h3 className="font-bold text-white text-sm md:text-base">
                  {SITE_DATA.song.title}
                </h3>
              </div>
            </div>

            {/* Ondas de audio animadas cuando reproduce */}
            <div className="hidden md:flex items-center gap-1 h-5">
              {[40, 80, 30, 90, 60, 100, 50, 70].map((h, i) => (
                <div
                  key={i}
                  style={{ height: isPlaying ? `${h}%` : "20%" }}
                  className={`w-1 bg-blue-500/80 rounded-full transition-all duration-300 ${isPlaying ? "animate-pulse" : ""}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              {/* BOTÓN VER RECUERDO 📸 */}
              <button
                onClick={() => setShowMemoryModal(true)}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-blue-950/60 border border-blue-500/40 text-blue-300 hover:bg-blue-900/60 hover:border-blue-400 transition-all duration-300 text-xs font-mono shadow-lg shadow-blue-950/50"
              >
                <Camera className="w-4 h-4 text-blue-400" />
                <span>Ver recuerdo</span>
              </button>

              <button
                onClick={togglePlay}
                className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-2xl shadow-lg shadow-blue-600/30 flex items-center justify-center transition-all active:scale-95 shrink-0"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5 ml-0.5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* GALERÍA DE FOTOS Y MOMENTOS */}
        <div className="space-y-6 pt-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <h2 className="text-xl font-bold flex items-center gap-2 text-white">
              <Camera className="w-5 h-5 text-blue-400" /> Momentos & Viajes
              Inolvidables
            </h2>

            {/* Pestañas de categorías */}
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 text-xs">
              {[
                "Todos",
                "Viajes",
                "Especiales",
                "Familia",
                "Amigos",
                "Mascotas",
              ].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    activeTab === tab
                      ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => {
                  if (photo.isRouteModal) {
                    setShowRouteModal(true);
                  } else if (photo.isAlbumModal && photo.albumImages) {
                    setActiveAlbum(photo.albumImages);
                  }
                }}
                className={`bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800/80 shadow-xl group cursor-pointer transition-all hover:border-blue-400 hover:scale-[1.02]`}
              >
                <div className="aspect-square rounded-xl overflow-hidden mb-3 relative bg-slate-950">
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {photo.isRouteModal ? (
                    <div className="absolute inset-0 bg-blue-950/40 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 text-center opacity-90 group-hover:opacity-100 transition-opacity">
                      <MapPin className="w-8 h-8 text-blue-400 animate-bounce mb-2" />
                      <span className="text-xs font-bold text-white bg-blue-600/80 px-3 py-1 rounded-full border border-blue-400/50">
                        ✈️ Ver Itinerario Europa
                      </span>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-blue-950/40 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="w-8 h-8 text-blue-400 animate-bounce mb-2" />
                      <span className="text-xs font-bold text-white bg-blue-600/80 px-3 py-1 rounded-full border border-blue-400/50">
                        📸 Ver Galería de Fotos
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-slate-300 text-center font-mono">
                  {photo.caption}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CUPONES */}
        <div className="space-y-4 pt-2">
          <h2 className="text-xl font-bold flex items-center gap-2 text-white">
            <Ticket className="w-5 h-5 text-blue-400" /> Cupones Especiales
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {SITE_DATA.coupons.map((coupon) => {
              const isRedeemed = redeemed.includes(coupon.id);
              return (
                <div
                  key={coupon.id}
                  className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
                    isRedeemed
                      ? "bg-slate-900/40 border-emerald-500/40"
                      : "bg-slate-900/90 border-blue-500/25 hover:border-blue-400 shadow-xl"
                  }`}
                >
                  <div>
                    <div className="text-2xl mb-2">{coupon.icon}</div>
                    <h3 className="font-bold text-white text-sm mb-1.5">
                      {coupon.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4 font-sans">
                      {coupon.description}
                    </p>

                    {/* MENSAJE WHATSAPP PARA CUPÓN 1 Y 2 SI ESTÁN CANJEADOS */}
                    {isRedeemed && (coupon.id === 1 || coupon.id === 2) && (
                      <div className="mb-4 p-3 bg-blue-950/60 border border-blue-500/30 rounded-xl space-y-2">
                        <p className="text-[11px] text-blue-300 leading-tight">
                          Enviar un WhatsApp a Macu con la fecha elegida para la
                          confirmación:
                        </p>
                        <a
                          href={`https://wa.me/5491140458808?text=Hola%20Macu!%20Quiero%20canjear%20el%20cupón:%20${encodeURIComponent(coupon.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all shadow-md"
                        >
                          <MessageCircle className="w-4 h-4" /> Enviar WhatsApp
                          💬
                        </a>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleRedeem(coupon.id)}
                    disabled={isRedeemed}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      isRedeemed && coupon.id !== 1 && coupon.id !== 2
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-default"
                        : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25 active:scale-95"
                    }`}
                  >
                    {isRedeemed && coupon.id !== 1 && coupon.id !== 2 ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />{" "}
                        Canjeado
                      </>
                    ) : isRedeemed && (coupon.id === 1 || coupon.id === 2) ? (
                      "¡Cupón Activado! 🎉"
                    ) : (
                      "Canjear Cupón"
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* MODAL RECUERDO DE CHAT 📸 */}
        {showMemoryModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 border border-blue-500/40 p-5 rounded-3xl max-w-lg w-full space-y-4 shadow-2xl font-mono">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-blue-400 text-xs flex items-center gap-2">
                  <Camera className="w-4 h-4" /> {SITE_DATA.song.memoryTitle}
                </h3>
                <button
                  onClick={() => setShowMemoryModal(false)}
                  className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 w-7 h-7 rounded-full flex items-center justify-center text-xs transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="rounded-2xl overflow-hidden border border-blue-500/30 bg-slate-950 p-2 flex items-center justify-center max-h-[65vh]">
                <img
                  src={SITE_DATA.song.memoryImage}
                  alt="Recuerdo de chat"
                  className="w-full h-auto max-h-[60vh] object-contain rounded-xl"
                />
              </div>

              <button
                onClick={() => setShowMemoryModal(false)}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-xl text-xs font-bold transition-all"
              >
                Cerrar Recuerdo
              </button>
            </div>
          </div>
        )}

        {/* MODAL INFOGRAFÍA RUTA EUROPA ✈️ */}
        {showRouteModal && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 border border-blue-500/50 p-5 rounded-3xl max-w-3xl w-full space-y-4 shadow-2xl font-mono">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-blue-400 text-xs flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Europa 2027 • Nuestra Ruta de
                  Viaje ✈️🚆
                </h3>
                <button
                  onClick={() => setShowRouteModal(false)}
                  className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 w-7 h-7 rounded-full flex items-center justify-center text-xs transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="rounded-2xl overflow-hidden border border-blue-500/30 bg-slate-950 p-2 flex items-center justify-center max-h-[70vh]">
                <img
                  src="/images/Europa2027.png"
                  alt="Ruta de viaje Europa"
                  className="w-full h-auto max-h-[65vh] object-contain rounded-xl"
                />
              </div>

              <button
                onClick={() => setShowRouteModal(false)}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-xl text-xs font-bold transition-all"
              >
                Cerrar Mapa de Ruta
              </button>
            </div>
          </div>
        )}

        {/* MODAL JUEGO / PISTA CUPÓN 3 🎁 */}
        {showQuizModal && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 border border-blue-500/50 p-6 rounded-3xl max-w-lg w-full space-y-5 shadow-2xl font-mono">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-blue-400 text-sm flex items-center gap-2 font-bold">
                  🎁 Pista: Regalo Especial
                </h3>
                <button
                  onClick={() => setShowQuizModal(false)}
                  className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 w-8 h-8 rounded-full flex items-center justify-center text-xs transition-colors"
                >
                  ✕
                </button>
              </div>

              {quizStatus === "playing" && (
                <div className="space-y-4">
                  <p className="text-sm text-slate-200 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-blue-500/20">
                    Tenés un regalito escondido donde guardamos todo lo de
                    librería. <br />
                    <span className="text-blue-400 text-xs block mt-2">
                      📍 ¿Dónde está escondido? (Intentos restantes:{" "}
                      {quizAttempts})
                    </span>
                  </p>

                  <div className="space-y-2">
                    {[
                      { id: 1, text: "1. En el mueble de la escalera" },
                      {
                        id: 2,
                        text: "2. En el mueble de arriba de la pieza, adentro del taper",
                      },
                      { id: 3, text: "3. En la pieza chiqita" },
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => {
                          if (option.id === 2) {
                            setQuizStatus("won");
                            setRedeemed([...redeemed, 3]);
                            confetti({
                              particleCount: 150,
                              spread: 90,
                              origin: { y: 0.5 },
                            });
                          } else {
                            if (quizAttempts > 1) {
                              setQuizAttempts(quizAttempts - 1);
                              alert(
                                "¡Mmmm no! Ese no es. ¡Te queda 1 oportunidad más!",
                              );
                            } else {
                              setQuizStatus("lost");
                            }
                          }
                        }}
                        className="w-full text-left p-3 rounded-xl bg-slate-950 hover:bg-blue-950/60 border border-slate-800 hover:border-blue-400 text-xs text-slate-300 hover:text-white transition-all shadow"
                      >
                        {option.text}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {quizStatus === "won" && (
                <div className="text-center space-y-4 py-4">
                  <div className="text-3xl">🎉🥳</div>
                  <h4 className="text-base font-bold text-emerald-400">
                    ¡Correcto! ¡Adivinaste!
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    ¡Ya podés ir a buscar tu regalito donde corresponde! El
                    cupón ha sido canjeado con éxito. 💙
                  </p>
                  <button
                    onClick={() => setShowQuizModal(false)}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl text-xs font-bold transition-all shadow-lg"
                  >
                    ¡Ir a buscarlo! 🚀
                  </button>
                </div>
              )}

              {quizStatus === "lost" && (
                <div className="text-center space-y-4 py-4">
                  <div className="text-3xl">😢</div>
                  <h4 className="text-base font-bold text-rose-400">
                    ¡Te quedaste sin intentos!
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Le pifiaste las dos veces jajaja. Pero no te preocupes, andá
                    a reclamarle un abrazo a Macu o probá de nuevo cerrando y
                    abriendo el cupón. 💙
                  </p>
                  <button
                    onClick={() => {
                      setQuizAttempts(2);
                      setQuizStatus("playing");
                      setShowQuizModal(false);
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl text-xs font-bold transition-all shadow-lg"
                  >
                    Cerrar y reintentar
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* MODAL GALERÍA GRANDE DE FOTOS 📸 */}
        {activeAlbum && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8 z-50">
            <div className="bg-slate-900 border border-blue-500/50 p-6 rounded-3xl max-w-5xl w-full h-[85vh] flex flex-col space-y-4 shadow-2xl font-mono">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
                <h3 className="text-blue-400 text-sm flex items-center gap-2">
                  <Camera className="w-5 h-5" /> Galería de Recuerdos (
                  {activeAlbum.length} fotos) • Tocá cualquiera para verla en
                  grande 💙
                </h3>
                <button
                  onClick={() => {
                    setActiveAlbum(null);
                    setSelectedIndex(null);
                  }}
                  className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Cuadrícula optimizada con espaciado prolijo y scroll limpio */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 overflow-y-auto p-4 bg-slate-950 rounded-2xl border border-blue-500/30 grow">
                {activeAlbum.map((imgSrc, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedIndex(index)}
                    className="h-36 sm:h-44 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 relative group cursor-pointer shadow-md hover:border-blue-400 transition-all flex items-center justify-center"
                  >
                    <img
                      src={imgSrc}
                      alt={`Foto ${index + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-blue-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-xs bg-blue-600 text-white px-2.5 py-1 rounded-full shadow font-bold">
                        Ver 🔍
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  setActiveAlbum(null);
                  setSelectedIndex(null);
                }}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl text-xs font-bold transition-all shrink-0 shadow-lg shadow-blue-600/30"
              >
                Cerrar Galería
              </button>
            </div>
          </div>
        )}

        {/* VISOR DE FOTO EN GRANDE CON FLECHAS LATERALES ⬅️ ➡️ */}
        {selectedIndex !== null && activeAlbum && (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4 z-[60]">
            <div className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center">
              {/* Botón Cerrar Visor */}
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute top-2 right-2 text-white bg-slate-800/80 hover:bg-slate-700 w-10 h-10 rounded-full flex items-center justify-center text-lg transition-colors z-20 shadow-xl"
              >
                ✕
              </button>

              {/* Botón Anterior (Izquierda) */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex((prev) =>
                    prev !== null && prev > 0
                      ? prev - 1
                      : activeAlbum.length - 1,
                  );
                }}
                className="absolute left-2 md:left-4 text-white bg-blue-600/80 hover:bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center text-xl transition-colors z-20 shadow-xl"
              >
                ◀
              </button>

              {/* Imagen Actual */}
              <div className="relative max-w-3xl max-h-[80vh] flex items-center justify-center p-2">
                <img
                  src={activeAlbum[selectedIndex]}
                  alt={`Foto ampliada ${selectedIndex + 1}`}
                  className="max-w-full max-h-[80vh] object-contain rounded-2xl border border-blue-500/40 shadow-2xl"
                />
                {/* Indicador de posición (ej: 3 / 20) */}
                <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 bg-slate-900/80 border border-blue-500/40 text-blue-300 px-3 py-1 rounded-full text-xs font-mono shadow">
                  {selectedIndex + 1} / {activeAlbum.length}
                </div>
              </div>

              {/* Botón Siguiente (Derecha) */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex((prev) =>
                    prev !== null && prev < activeAlbum.length - 1
                      ? prev + 1
                      : 0,
                  );
                }}
                className="absolute right-2 md:right-4 text-white bg-blue-600/80 hover:bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center text-xl transition-colors z-20 shadow-xl"
              >
                ▶
              </button>
            </div>
          </div>
        )}

        {/* Modal Easter Egg */}
        {showDevModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 border border-blue-500/40 p-6 rounded-3xl max-w-md w-full space-y-4 shadow-2xl font-mono">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-blue-400 text-xs flex items-center gap-2">
                  <Code2 className="w-4 h-4" /> DevTools Output
                </h3>
                <span className="text-[10px] text-slate-500">
                  Status: 200 OK
                </span>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-cyan-300 leading-relaxed">
                <p>&gt; console.log(&quot;%c¡Feliz Cumple Amor! ❤️&quot;);</p>
                <p className="text-blue-400 mt-2">
                  &gt; &quot;Creado especialmente para vos con mucho amor. Toca
                  F12 para ver el mensaje secreto.&quot;
                </p>
              </div>
              <button
                onClick={() => setShowDevModal(false)}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-xl text-xs font-bold transition-all"
              >
                Cerrar Terminal
              </button>
            </div>
          </div>
        )}

        {/* PIE DE PÁGINA / FIRMA */}
        <div className="text-center pt-8 pb-4 border-t border-slate-800/60 mt-12 space-y-1">
          <p className="text-xs text-blue-400 font-mono">
            Creado con todo mi amor para vos 💙
          </p>
          <p className="text-[10px] text-slate-500 font-mono">
            15 de Noviembre • Edición Especial
          </p>
        </div>
      </div>
    </div>
  );
}
