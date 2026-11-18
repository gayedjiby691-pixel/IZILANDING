import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowUpRight, 
  ShieldCheck, 
  Clock, 
  Cpu, 
  Zap, 
  CheckCircle2, 
  ChevronRight, 
  Activity, 
  Navigation, 
  Sparkles, 
  Crosshair, 
  Layers, 
  Terminal, 
  X,
  Radio,
  Check
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const mainRef = useRef(null);
  const heroRef = useRef(null);
  const manifestoRef = useRef(null);
  const cardsStackRef = useRef(null);

  // Modal State & Shipping Request Coordinates Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shippingForm, setShippingForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    pickupAddress: '',
    deliveryAddress: '',
    packageType: 'standard', // 'pli', 'standard', 'prestige'
    urgency: '120min',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingForm(prev => ({ ...prev, [name]: value }));
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (shippingForm.fullName && shippingForm.phone && shippingForm.pickupAddress && shippingForm.deliveryAddress) {
      const generatedCode = 'LX-EXP-' + Math.floor(1000 + Math.random() * 9000);
      setTrackingNumber(generatedCode);
      setSubmitted(true);
    }
  };

  // 1. CARTE FONCTIONNALITÉ 1 : Mélangeur Diagnostique (3 cartes cyclantes toutes les 3s)
  const initialDiagnosticCards = [
    {
      id: '01',
      code: 'DISPATCH_SYNAPTIQUE',
      title: "Indexation Immédiate (T-00:00)",
      metric: "< 12 sec",
      desc: "Assignation synaptique du coursier le plus proche par algorithme de proximité gravitationnelle.",
      status: "OPTIMAL"
    },
    {
      id: '02',
      code: 'CINETIQUE_NEURALE',
      title: "Routage Neural Adaptatif (T-00:15)",
      metric: "99.8% Fluide",
      desc: "Évitement prédictif des goulets d'étranglement urbains et couloirs prioritaires de transit.",
      status: "CALCULÉ"
    },
    {
      id: '03',
      code: 'DELIVRANCE_CLINIQUE',
      title: "Dépôt Sécurisé T-120MIN (T-01:48)",
      metric: "1h 48m Moyenne",
      desc: "Remise en main propre biométrique scellée. Traçabilité inviolable de bout en bout.",
      status: "SCELLÉ"
    }
  ];
  const [diagnosticStack, setDiagnosticStack] = useState(initialDiagnosticCards);

  useEffect(() => {
    const interval = setInterval(() => {
      setDiagnosticStack(prev => {
        const next = [...prev];
        const last = next.pop();
        if (last) next.unshift(last);
        return next;
      });
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // 2. CARTE FONCTIONNALITÉ 2 : Machine à Écrire Télémétrie en Direct
  const telemetryLogs = [
    "[GEO-01] 48.8566° N, 2.3522° E | Axe Haussmann | Vitesse: 28.4 km/h",
    "[INTEGRITE] Capteur inertiel: 0.00G | Température caisson: 19.1°C (Nominal)",
    "[SYNCHRO] Balise cryptographique active | Déviation estimée: 0.00%",
    "[COMPTEUR] T-01:24:18 avant échéance 120min | Coursier: #LX-804"
  ];
  const [logIndex, setLogIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentLog = telemetryLogs[logIndex];
    if (charIndex < currentLog.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + currentLog[charIndex]);
        setCharIndex(prev => prev + 1);
      }, 35);
      return () => clearTimeout(timeout);
    } else {
      const waitTimeout = setTimeout(() => {
        setDisplayedText("");
        setCharIndex(0);
        setLogIndex(prev => (prev + 1) % telemetryLogs.length);
      }, 2400);
      return () => clearTimeout(waitTimeout);
    }
  }, [charIndex, logIndex]);

  // 3. CARTE FONCTIONNALITÉ 3 : Planificateur Protocole Curseur
  const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  const [activeDayIndex, setActiveDayIndex] = useState(2); // Mercredi par défaut
  const [cursorPos, setCursorPos] = useState({ x: 42, y: 35 });
  const [isClicking, setIsClicking] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    let step = 0;
    const loop = setInterval(() => {
      if (step === 0) {
        // Move to Friday (index 4)
        setCursorPos({ x: 62, y: 38 });
        setIsClicking(false);
        setIsSaved(false);
      } else if (step === 1) {
        // Click Friday
        setIsClicking(true);
        setActiveDayIndex(4);
      } else if (step === 2) {
        // Release and move to Save Button
        setIsClicking(false);
        setCursorPos({ x: 80, y: 78 });
      } else if (step === 3) {
        // Click Save Button
        setIsClicking(true);
        setIsSaved(true);
      } else if (step === 4) {
        // Move back to Wednesday
        setIsClicking(false);
        setCursorPos({ x: 38, y: 38 });
      } else if (step === 5) {
        // Click Wednesday
        setIsClicking(true);
        setActiveDayIndex(2);
      } else if (step === 6) {
        setIsClicking(false);
        setCursorPos({ x: 80, y: 78 });
      } else if (step === 7) {
        setIsClicking(true);
        setIsSaved(true);
      }
      step = (step + 1) % 8;
    }, 1100);

    return () => clearInterval(loop);
  }, []);

  // GSAP ScrollTrigger & Lifecycle Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Animations Fade Up
      gsap.from(".hero-anim", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.2
      });

      // 2. Navbar Morph ScrollTrigger
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom 15%",
        onLeave: () => setScrolledPastHero(true),
        onEnterBack: () => setScrolledPastHero(false),
      });

      // 3. Manifesto Reveal Animation
      gsap.from(".manifesto-line", {
        scrollTrigger: {
          trigger: manifestoRef.current,
          start: "top 75%",
          end: "bottom 80%",
          toggleActions: "play none none reverse"
        },
        y: 35,
        opacity: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: "power3.out"
      });

      // 4. PROTOCOL: Archive Empilée Sticky (Pinning + Stack scaling/blurring)
      const cards = gsap.utils.toArray('.stack-card');
      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          gsap.to(card, {
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top 80%",
              end: "top 25%",
              scrub: true,
            },
            scale: 0.9,
            filter: "blur(18px)",
            opacity: 0.45,
            ease: "power2.inOut"
          });
        }
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div ref={mainRef} className="relative min-h-screen bg-creme text-charbon selection:bg-argile selection:text-white font-title">
      
      {/* ========================================================
          A. NAVBAR — L'Île Flottante
          ======================================================== */}
      <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav 
          className={`pointer-events-auto flex items-center justify-between gap-4 md:gap-8 px-5 py-3 rounded-full transition-all duration-500 ease-out ${
            scrolledPastHero
              ? 'bg-creme/80 backdrop-blur-xl border border-mousse/15 shadow-xl text-charbon'
              : 'bg-charbon/30 backdrop-blur-md border border-white/10 text-white'
          }`}
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 font-display font-extrabold tracking-tight text-lg link-lift">
            <span className="w-2.5 h-2.5 rounded-full bg-argile shadow-[0_0_10px_#CC5833]" />
            <span className="tracking-tighter">LIVR<span className="font-normal text-argile">EXPRESS</span></span>
          </a>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-7 text-xs font-semibold tracking-wider uppercase font-mono">
            <a href="#fonctionnalites" className="link-lift hover:text-argile opacity-80 hover:opacity-100">Artefacts</a>
            <a href="#philosophie" className="link-lift hover:text-argile opacity-80 hover:opacity-100">Manifeste</a>
            <a href="#protocole" className="link-lift hover:text-argile opacity-80 hover:opacity-100">Protocole</a>
            <a href="#tarifs" className="link-lift hover:text-argile opacity-80 hover:opacity-100">Grille</a>
          </div>

          {/* CTA Nav */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-magnetic bg-argile text-white px-4 py-2 rounded-full text-xs font-bold tracking-wide uppercase flex items-center gap-1.5 shadow-md hover:shadow-lg"
          >
            <span className="btn-slide-layer bg-argile-dark" />
            <span className="relative z-10 flex items-center gap-1">
              <span>Demander une expédition</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </button>
        </nav>
      </header>

      {/* ========================================================
          B. SECTION HERO — Le Plan d'Ouverture
          ======================================================== */}
      <section 
        ref={heroRef}
        className="relative h-[100dvh] min-h-[700px] w-full flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-16 overflow-hidden"
      >
        {/* Background Image: Coursier Urbain LivrExpress */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage: `url('/hero-courier.avif')`,
          }}
        />

        {/* Cinematic Gradient Overlays: Deep Charcoal protection for text, revealing courier */}
        <div className="absolute inset-0 bg-gradient-to-t from-charbon via-charbon/65 to-charbon/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-charbon/90 via-charbon/55 to-charbon/20" />
        <div className="absolute inset-0 bg-mousse/30 mix-blend-multiply pointer-events-none" />

        {/* Biological subtle glow */}
        <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-mousse-light/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-80 h-80 bg-argile/15 rounded-full blur-[100px] pointer-events-none" />

        {/* Content pushed to lower-left third */}
        <div className="relative z-10 max-w-5xl">
          {/* Badge */}
          <div className="hero-anim inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-creme text-xs font-mono tracking-widest uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-argile animate-ping" />
            <span>BIO-LOGISTIQUE URBAINE // PROTOCOLE 120 MIN</span>
          </div>

          {/* Heading with 3-5x contrast pattern: [Nom concept] est le (Sans) / [Mot puissant]. (Serif Dramatique Massif) */}
          <div className="mb-6">
            <p className="hero-anim font-title font-extrabold text-white text-3xl sm:text-5xl md:text-6xl tracking-tight leading-tight">
              LivrExpress est le
            </p>
            <h1 className="hero-anim font-dramatic italic text-creme-card text-6xl sm:text-8xl md:text-[8.5rem] lg:text-[10rem] leading-none tracking-normal drop-shadow-2xl">
              Rythme Vivant<span className="text-argile">.</span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="hero-anim max-w-2xl text-creme/85 text-base sm:text-lg md:text-xl font-normal leading-relaxed mb-8">
            Livraison express de colis urbains en moins de deux heures chrono. 
            Une synchronisation biologique de vos flux logistiques, orchestrée avec une précision clinique et zéro déchet d’attente.
          </p>

          {/* CTA & Telemetry strip */}
          <div className="hero-anim flex flex-wrap items-center gap-5">
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-magnetic bg-argile text-white px-8 py-4 rounded-full font-bold text-sm tracking-wide uppercase flex items-center gap-3 shadow-[0_10px_30px_rgba(204,88,51,0.35)]"
            >
              <span className="btn-slide-layer bg-argile-dark" />
              <span className="relative z-10 flex items-center gap-2">
                <span>Demander une expédition</span>
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </button>

            <a 
              href="#protocole" 
              className="link-lift inline-flex items-center gap-2 text-creme/80 hover:text-white text-xs font-mono tracking-wider uppercase px-4 py-3 rounded-full border border-white/10 hover:border-white/30 backdrop-blur-sm"
            >
              <span>Explorer le Protocole</span>
              <ChevronRight className="w-3.5 h-3.5 text-argile" />
            </a>
          </div>

          {/* Bottom Telemetry Ticker */}
          <div className="hero-anim mt-12 pt-6 border-t border-white/10 flex flex-wrap items-center gap-8 text-xs font-mono text-creme/60">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>FENÊTRE GARANTIE : &lt; 120 MIN</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-argile" />
              <span>COUVERTURE : HYPER-CENTRES & PREMIÈRE COURONNE</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-creme/50" />
              <span>INDEX CARBONE : VÉLO-CARGO ÉLECTRIQUE ACTIF</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          C. FONCTIONNALITÉS — Artefacts Fonctionnels Interactifs
          ======================================================== */}
      <section id="fonctionnalites" className="py-28 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mousse/10 text-mousse text-xs font-mono tracking-widest uppercase mb-3">
            <Terminal className="w-3.5 h-3.5 text-argile" />
            <span>MICRO-INTERFACES LOGICIELLES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-mousse">
            Trois artefacts de précision.
          </h2>
          <p className="mt-3 text-charbon/70 max-w-xl text-base">
            Chaque dimension de notre réseau fonctionne comme un instrument clinique autonome.
          </p>
        </div>

        {/* Grid 3 Interactive Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* ----------------------------------------------------
              CARTE 1 : Mélangeur Diagnostique (3 cartes cyclantes)
              ---------------------------------------------------- */}
          <div className="bg-creme-card border border-mousse/10 rounded-[2.5rem] p-7 shadow-lg flex flex-col justify-between relative overflow-hidden group">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-argile tracking-wider uppercase font-semibold">ARTEFACT 01 // VITESSE</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-mousse/10 text-mousse">AUTO-CYCLE 3.2S</span>
              </div>
              <h3 className="text-xl font-bold text-mousse tracking-tight">Mélangeur Diagnostique</h3>
              <p className="text-xs text-charbon/70 mt-1">Vitesse d'exécution instantanée sans temps mort.</p>
            </div>

            {/* Stack container with vertical cycling */}
            <div className="relative h-64 w-full flex items-center justify-center my-2">
              {diagnosticStack.map((card, idx) => {
                const isTop = idx === 0;
                const isMid = idx === 1;
                const translateY = isTop ? 0 : isMid ? 24 : 48;
                const scale = isTop ? 1 : isMid ? 0.94 : 0.88;
                const opacity = isTop ? 1 : isMid ? 0.75 : 0.45;
                const zIndex = 30 - idx * 10;

                return (
                  <div
                    key={card.id}
                    onClick={() => {
                      setDiagnosticStack(prev => {
                        const next = [...prev];
                        const last = next.pop();
                        if (last) next.unshift(last);
                        return next;
                      });
                    }}
                    style={{
                      transform: `translateY(${translateY}px) scale(${scale})`,
                      opacity,
                      zIndex,
                      transition: 'all 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}
                    className={`absolute inset-x-2 top-2 p-5 rounded-[2rem] border cursor-pointer select-none transition-shadow ${
                      isTop 
                        ? 'bg-mousse text-creme border-mousse-light shadow-xl' 
                        : 'bg-creme border-mousse/15 text-charbon'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${isTop ? 'bg-white/10 text-argile-light' : 'bg-mousse/10 text-mousse'}`}>
                        {card.code}
                      </span>
                      <span className={`text-xs font-mono font-bold ${isTop ? 'text-argile' : 'text-argile-dark'}`}>
                        {card.metric}
                      </span>
                    </div>
                    <div className="font-bold text-sm leading-tight mb-2">{card.title}</div>
                    <p className={`text-[11px] leading-relaxed line-clamp-2 ${isTop ? 'text-creme/80' : 'text-charbon/70'}`}>
                      {card.desc}
                    </p>
                    <div className="mt-3 pt-2 border-t border-current/10 flex items-center justify-between text-[10px] font-mono">
                      <span>STATUT : {card.status}</span>
                      <span className="underline opacity-60">CLIQUEZ POUR CYCLER</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-mousse/10 flex items-center justify-between text-xs text-charbon/60 font-mono">
              <span>PILOTAGE SYNC</span>
              <span className="text-argile font-bold">100% LATENCE ZÉRO</span>
            </div>
          </div>

          {/* ----------------------------------------------------
              CARTE 2 : Machine à Écrire Télémétrie en Direct
              ---------------------------------------------------- */}
          <div className="bg-creme-card border border-mousse/10 rounded-[2.5rem] p-7 shadow-lg flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-argile tracking-wider uppercase font-semibold">ARTEFACT 02 // PRÉCISION</span>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-[10px] font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>FLUX EN DIRECT</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-mousse tracking-tight">Machine à Écrire Télémétrique</h3>
              <p className="text-xs text-charbon/70 mt-1">Précision chirurgicale et zéro compromis.</p>
            </div>

            {/* Live Terminal Screen */}
            <div className="my-6 bg-charbon-deep rounded-[2rem] p-5 font-mono text-xs text-creme border border-charbon/80 shadow-inner flex flex-col justify-between h-64">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-[10px] text-creme/50">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-400/80" />
                  <span className="w-2 h-2 rounded-full bg-yellow-400/80" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
                  <span className="ml-2 font-mono">TERMINAL_LX_NODE_09</span>
                </div>
                <span>BAUD 115200</span>
              </div>

              {/* Terminal Logs area */}
              <div className="flex-1 py-3 overflow-hidden flex flex-col justify-end gap-2 text-[11px] leading-relaxed">
                <div className="text-creme/40 line-clamp-1">// TÉLÉMÉTRIE VÉHICULE & ENVELOPPE BIO-SCELLÉE ACTIVE</div>
                <div className="text-creme/60 line-clamp-1">[RADAR] Pression barométrique : 1013 hPa [OK]</div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-creme">
                  <span className="text-argile font-bold mr-2">&gt;</span>
                  <span>{displayedText}</span>
                  <span className="inline-block w-2 h-4 ml-1 bg-argile animate-pulse align-middle" />
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-creme/50">
                <span>BUFFER : 4/4 LOGS</span>
                <span className="text-emerald-400">CHIFFREMENT BIO-256</span>
              </div>
            </div>

            <div className="pt-4 border-t border-mousse/10 flex items-center justify-between text-xs text-charbon/60 font-mono">
              <span>MARGE D'ERREUR</span>
              <span className="text-argile font-bold">0.00% EN ROUTAGE</span>
            </div>
          </div>

          {/* ----------------------------------------------------
              CARTE 3 : Planificateur Protocole Curseur
              ---------------------------------------------------- */}
          <div className="bg-creme-card border border-mousse/10 rounded-[2.5rem] p-7 shadow-lg flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-argile tracking-wider uppercase font-semibold">ARTEFACT 03 // FLUIDITÉ</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-mousse/10 text-mousse">SIMULATION AUTO</span>
              </div>
              <h3 className="text-xl font-bold text-mousse tracking-tight">Planificateur Protocole Curseur</h3>
              <p className="text-xs text-charbon/70 mt-1">Intégration fluide et sans friction.</p>
            </div>

            {/* Interactive Grid with Simulated SVG Cursor */}
            <div className="relative my-6 bg-creme rounded-[2rem] p-5 border border-mousse/15 h-64 flex flex-col justify-between overflow-hidden">
              <div>
                <div className="text-xs font-mono font-semibold text-mousse mb-3 flex items-center justify-between">
                  <span>DISPONIBILITÉ CRÉNEAUX 2H</span>
                  <span className="text-argile text-[11px] font-bold">SEMAINE 42</span>
                </div>

                {/* Days of week grid */}
                <div className="grid grid-cols-7 gap-1.5">
                  {days.map((d, index) => {
                    const isActive = activeDayIndex === index;
                    return (
                      <div
                        key={index}
                        className={`h-14 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 font-mono ${
                          isActive
                            ? 'bg-argile text-white shadow-md scale-105'
                            : 'bg-white/80 text-charbon border border-mousse/10 hover:border-argile/40'
                        }`}
                      >
                        <span className="text-[10px] opacity-70">{d}</span>
                        <span className="text-xs font-bold">{12 + index}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Button & Confirmation */}
              <div className="flex items-center justify-between pt-3 border-t border-mousse/10">
                <div className="text-[11px] font-mono text-charbon/70">
                  Créneau : <span className="font-bold text-mousse">120 MIN DISPO</span>
                </div>
                <div
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all duration-300 flex items-center gap-1 ${
                    isSaved
                      ? 'bg-mousse text-creme shadow-sm scale-100'
                      : 'bg-white text-mousse border border-mousse/20'
                  }`}
                >
                  {isSaved ? <Check className="w-3 h-3 text-argile" /> : null}
                  <span>{isSaved ? 'Validé' : 'Sauvegarder'}</span>
                </div>
              </div>

              {/* Animated Simulated SVG Cursor */}
              <div 
                className="absolute pointer-events-none transition-all duration-500 ease-out z-20"
                style={{
                  left: `${cursorPos.x}%`,
                  top: `${cursorPos.y}%`,
                  transform: `translate(-50%, -50%) scale(${isClicking ? 0.85 : 1})`
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 3L19 12L12 14L9 21L5 3Z" fill="#CC5833" stroke="#FFFFFF" strokeWidth="2" strokeLinejoin="round"/>
                </svg>
                {isClicking && (
                  <div className="w-6 h-6 rounded-full bg-argile/40 animate-ping absolute -top-1 -left-1" />
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-mousse/10 flex items-center justify-between text-xs text-charbon/60 font-mono">
              <span>EXPÉRIENCE SANS FRICTION</span>
              <span className="text-argile font-bold">1-CLIC CONFIRMÉ</span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          D. PHILOSOPHIE — Le Manifeste
          ======================================================== */}
      <section 
        id="philosophie" 
        ref={manifestoRef}
        className="relative py-32 px-6 md:px-16 bg-charbon text-creme overflow-hidden"
      >
        {/* Parallax organic texture background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15 mix-blend-luminosity scale-110"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=2400&q=85')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charbon via-charbon/95 to-charbon" />

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Label */}
          <div className="manifesto-line inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-creme text-xs font-mono tracking-widest uppercase mb-10">
            <Radio className="w-3.5 h-3.5 text-argile" />
            <span>LE MANIFESTE LIVREXPRESS</span>
          </div>

          {/* Statement 1 : The Common Flawed Approach */}
          <div className="manifesto-line mb-12">
            <p className="text-creme/50 text-lg sm:text-2xl font-light font-title max-w-3xl leading-relaxed">
              La plupart des géants de la logistique urbaine se concentrent sur : 
              <span className="text-creme/70 font-normal"> l'entassement des flux, les centres de tri périphériques et les plages horaires incertaines s'étendant sur des journées entières.</span>
            </p>
          </div>

          {/* Divider */}
          <div className="manifesto-line w-24 h-[1px] bg-argile/60 my-8" />

          {/* Statement 2 : The Differentiated Vision (Dramatic Massive Serif Italic) */}
          <div className="manifesto-line">
            <p className="text-sm font-mono text-argile tracking-widest uppercase mb-4">
              NOUS NOUS CONCENTRONS SUR :
            </p>
            <h2 className="font-dramatic italic text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-creme leading-[1.08] tracking-tight">
              La pulsation en deux heures chrono, orchestrée avec la rigueur clinique d'un organisme vivant<span className="text-argile">.</span>
            </h2>
          </div>

          {/* Manifesto details */}
          <div className="manifesto-line grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-12 border-t border-white/10">
            <div>
              <div className="font-mono text-xs text-argile mb-2 font-bold">01 // ZÉRO ENTREPÔT LOINTAIN</div>
              <p className="text-xs text-creme/65 leading-relaxed">
                Le colis transite de main en main en point à point. Aucun goulot d'étranglement centralisé.
              </p>
            </div>
            <div>
              <div className="font-mono text-xs text-argile mb-2 font-bold">02 // CYCLIQUE & DÉCARBONÉ</div>
              <p className="text-xs text-creme/65 leading-relaxed">
                Vélo-cargos et micromobilité agile. Une empreinte écologique minimale pour un impact maximal.
              </p>
            </div>
            <div>
              <div className="font-mono text-xs text-argile mb-2 font-bold">03 // PRÉCISION HORLOGÈRE</div>
              <p className="text-xs text-creme/65 leading-relaxed">
                Chaque minute est mesurée et garantie par nos contrats de niveau de service (SLA) contractuels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          E. PROTOCOLE — Archive Empilée Sticky (3 cartes avec animations Canvas/SVG)
          ======================================================== */}
      <section id="protocole" ref={cardsStackRef} className="py-24 px-6 md:px-16 max-w-6xl mx-auto">
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mousse/10 text-mousse text-xs font-mono tracking-widest uppercase mb-3">
            <Layers className="w-3.5 h-3.5 text-argile" />
            <span>ARCHIVE EMPILÉE STICKY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-mousse">
            Le Protocole en Trois Phases.
          </h2>
          <p className="mt-3 text-charbon/70 text-sm">
            Scrollez pour observer la convergence physique et digitale de notre système d'expédition.
          </p>
        </div>

        {/* Stack Container */}
        <div className="relative flex flex-col gap-12">
          
          {/* Card 1: PHASE 01 — Ingestion Synaptique */}
          <div className="stack-card sticky top-28 bg-mousse text-creme border border-mousse-light rounded-[3rem] p-8 md:p-14 shadow-2xl min-h-[480px] flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden">
            <div className="max-w-md">
              <span className="font-mono text-xs text-argile-light tracking-widest uppercase font-semibold">PHASE 01 // ARCHIVE</span>
              <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight mt-2 mb-4 text-white">
                Ingestion Synaptique
              </h3>
              <p className="text-creme/80 text-sm sm:text-base leading-relaxed mb-6">
                Dès la commande passée via notre interface ou webhook API, la télémétrie urbaine localise les vecteurs disponibles dans un rayon de 800 mètres.
              </p>
              <div className="font-mono text-xs text-creme/50 space-y-1">
                <div>• Temps d'injection moyen : 8.4 secondes</div>
                <div>• Cryptage de traçabilité généré sur terminal</div>
              </div>
            </div>

            {/* Unique SVG Animation: Rotating Geometric Concentric Pattern */}
            <div className="w-64 h-64 relative flex items-center justify-center">
              <svg className="w-full h-full animate-[spin_20s_linear_infinite]" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="85" fill="none" stroke="#FAF9F5" strokeWidth="1" strokeDasharray="4 6" opacity="0.3" />
                <circle cx="100" cy="100" r="65" fill="none" stroke="#CC5833" strokeWidth="1.5" strokeDasharray="8 8" opacity="0.7" />
                <circle cx="100" cy="100" r="45" fill="none" stroke="#FAF9F5" strokeWidth="1" opacity="0.5" />
                <circle cx="100" cy="100" r="25" fill="#CC5833" opacity="0.8" />
                {/* Crosshairs */}
                <line x1="100" y1="10" x2="100" y2="190" stroke="#FAF9F5" strokeWidth="0.8" opacity="0.3" />
                <line x1="10" y1="100" x2="190" y2="100" stroke="#FAF9F5" strokeWidth="0.8" opacity="0.3" />
              </svg>
              <div className="absolute font-mono text-[10px] text-creme/80 tracking-widest">
                ROTATION 1.0X
              </div>
            </div>
          </div>

          {/* Card 2: PHASE 02 — Trajectoire Cinématique */}
          <div className="stack-card sticky top-32 bg-charbon text-creme border border-charbon-muted rounded-[3rem] p-8 md:p-14 shadow-2xl min-h-[480px] flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden">
            <div className="max-w-md">
              <span className="font-mono text-xs text-argile tracking-widest uppercase font-semibold">PHASE 02 // CINÉTIQUE</span>
              <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight mt-2 mb-4 text-white">
                Trajectoire Cinématique
              </h3>
              <p className="text-creme/80 text-sm sm:text-base leading-relaxed mb-6">
                Navigation prédictive par micro-tronçons. Nos coursiers empruntent les voies vertes et passages protégés afin de contourner tout aléa routier.
              </p>
              <div className="font-mono text-xs text-creme/50 space-y-1">
                <div>• Vitesse moyenne soutenue : 26 km/h</div>
                <div>• Zéro émission thermique directe</div>
              </div>
            </div>

            {/* Unique SVG Animation: Laser Scanning Horizontal Line on Matrix Grid */}
            <div className="w-64 h-64 relative bg-charbon-deep rounded-2xl p-4 border border-white/10 flex flex-col justify-between overflow-hidden">
              {/* Dot matrix */}
              <div className="grid grid-cols-6 gap-3 flex-1 items-center justify-items-center opacity-40">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-creme" />
                ))}
              </div>

              {/* Sweeping Laser Line */}
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-argile to-transparent shadow-[0_0_15px_#CC5833] animate-[bounce_3s_ease-in-out_infinite]" />

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-creme/60">
                <span>BALAYAGE RADAR</span>
                <span className="text-argile font-bold">ACTIF</span>
              </div>
            </div>
          </div>

          {/* Card 3: PHASE 03 — Délivrance en 120 Minutes */}
          <div className="stack-card sticky top-36 bg-creme-card text-charbon border border-mousse/15 rounded-[3rem] p-8 md:p-14 shadow-2xl min-h-[480px] flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden">
            <div className="max-w-md">
              <span className="font-mono text-xs text-argile-dark tracking-widest uppercase font-semibold">PHASE 03 // LIVRAISON</span>
              <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight mt-2 mb-4 text-mousse">
                Délivrance en 120 Minutes
              </h3>
              <p className="text-charbon/75 text-sm sm:text-base leading-relaxed mb-6">
                Le destinataire reçoit une notification d'arrivée à 3 minutes. Remise scellée, signature horodatée et archivage sécurisé de confirmation.
              </p>
              <div className="font-mono text-xs text-charbon/60 space-y-1">
                <div>• Taux de conformité horaire : 99.4%</div>
                <div>• Signature biométrique cryptographique</div>
              </div>
            </div>

            {/* Unique SVG Animation: Pulsing ECG Style Waveform with stroke-dashoffset */}
            <div className="w-64 h-64 relative bg-creme rounded-2xl p-4 border border-mousse/20 flex flex-col justify-between">
              <div className="text-[10px] font-mono text-mousse flex items-center justify-between">
                <span>RYTHME D'ARRIVÉE</span>
                <span className="text-emerald-600 font-bold">120 MIN SLA</span>
              </div>

              {/* ECG Pulse SVG */}
              <div className="relative flex-1 flex items-center justify-center">
                <svg className="w-full h-24" viewBox="0 0 200 60" fill="none">
                  <path
                    d="M 0 30 L 40 30 L 55 10 L 70 50 L 85 20 L 95 35 L 105 30 L 200 30"
                    stroke="#CC5833"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="200"
                    strokeDashoffset="0"
                    className="animate-[dash_2.5s_linear_infinite]"
                  />
                </svg>
                <style>{`
                  @keyframes dash {
                    0% { stroke-dashoffset: 200; }
                    50% { stroke-dashoffset: 0; }
                    100% { stroke-dashoffset: -200; }
                  }
                `}</style>
              </div>

              <div className="text-[10px] font-mono text-charbon/50 flex items-center justify-between pt-2 border-t border-mousse/10">
                <span>CONTRAT REMPLI</span>
                <span className="font-bold text-mousse">SUCCÈS 100%</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          F. ADHÉSION / TARIFICATION — Grille à Trois Niveaux
          ======================================================== */}
      <section id="tarifs" className="py-28 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mousse/10 text-mousse text-xs font-mono tracking-widest uppercase mb-3">
            <Zap className="w-3.5 h-3.5 text-argile" />
            <span>TARIFICATION TRANSPARENTE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-mousse">
            Grille d'Expédition.
          </h2>
          <p className="mt-3 text-charbon/70 text-sm">
            Trois formules conçues pour les particuliers exigeants, les boutiques de prestige et les opérations d'entreprise.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* TIER 1 : Essentiel */}
          <div className="bg-creme-card border border-mousse/15 rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs text-charbon/60 uppercase font-semibold mb-2">TIER 01 // ESSENTIEL</div>
              <h3 className="text-2xl font-bold text-mousse mb-2">À la Demande</h3>
              <p className="text-xs text-charbon/70 mb-6">Pour les envois ponctuels nécessitant l'assurance des 120 minutes.</p>
              
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-extrabold text-mousse">19€</span>
                <span className="text-xs font-mono text-charbon/60">/ course</span>
              </div>

              <div className="space-y-3 font-mono text-xs text-charbon/80">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-argile shrink-0" />
                  <span>Délai garanti &lt; 120 minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-argile shrink-0" />
                  <span>Suivi GPS en direct par lien SMS</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-argile shrink-0" />
                  <span>Colis jusqu'à 5 kg sécurisé</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-argile shrink-0" />
                  <span>Assurance standard incluse (500€)</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-8 btn-magnetic w-full py-3.5 rounded-full border border-mousse text-mousse hover:text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <span className="btn-slide-layer bg-mousse" />
              <span className="relative z-10 flex items-center gap-1">
                <span>Choisir Essentiel</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </button>
          </div>

          {/* TIER 2 : Performance (Featured - Primaire Mousse + Bouton Accent Argile) */}
          <div className="bg-mousse text-creme border-2 border-argile/40 rounded-[2.5rem] p-8 shadow-2xl flex flex-col justify-between relative scale-105 z-10">
            {/* Top Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-argile text-white font-mono text-[10px] font-bold tracking-wider uppercase shadow-md">
              LE CHOIX CLINIQUE // RECOMMANDÉ
            </div>

            <div>
              <div className="font-mono text-xs text-argile-light uppercase font-semibold mb-2 mt-2">TIER 02 // PERFORMANCE</div>
              <h3 className="text-2xl font-bold text-white mb-2">Abonnement Flux</h3>
              <p className="text-xs text-creme/75 mb-6">Pour boutiques de luxe, galeries, laboratoires et professionnels à fort volume.</p>
              
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-extrabold text-creme">290€</span>
                <span className="text-xs font-mono text-creme/60">/ mois (20 courses incluses)</span>
              </div>

              <div className="space-y-3 font-mono text-xs text-creme/90">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-argile-light shrink-0" />
                  <span>Courses prioritaires (délai moyen: 78 min)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-argile-light shrink-0" />
                  <span>Accès complet API & Webhooks temps réel</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-argile-light shrink-0" />
                  <span>Colis jusqu'à 15 kg et caissons thermorégulés</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-argile-light shrink-0" />
                  <span>Assurance haute valeur (jusqu'à 5 000€)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-argile-light shrink-0" />
                  <span>Gestionnaire de compte dédié 7j/7</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-8 btn-magnetic w-full py-4 rounded-full bg-argile text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_8px_25px_rgba(204,88,51,0.4)]"
            >
              <span className="btn-slide-layer bg-argile-dark" />
              <span className="relative z-10 flex items-center gap-1.5">
                <span>Demander une expédition</span>
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </button>
          </div>

          {/* TIER 3 : Entreprise */}
          <div className="bg-creme-card border border-mousse/15 rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs text-charbon/60 uppercase font-semibold mb-2">TIER 03 // INSTITUTIONNEL</div>
              <h3 className="text-2xl font-bold text-mousse mb-2">Sur Mesure</h3>
              <p className="text-xs text-charbon/70 mb-6">Flotte dédiée, intégration ERP et SLA contractuels stricts sous astreinte.</p>
              
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-extrabold text-mousse">Sur devis</span>
              </div>

              <div className="space-y-3 font-mono text-xs text-charbon/80">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-argile shrink-0" />
                  <span>Flotte de coursiers réservée à votre marque</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-argile shrink-0" />
                  <span>Marquage personnalisé et packaging bio-scellé</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-argile shrink-0" />
                  <span>Garantie de pénalité financière par retard</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-argile shrink-0" />
                  <span>Rapports d'empreinte carbone certifiés</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-8 btn-magnetic w-full py-3.5 rounded-full border border-mousse text-mousse hover:text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <span className="btn-slide-layer bg-mousse" />
              <span className="relative z-10 flex items-center gap-1">
                <span>Contacter l'Ingénierie</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================
          G. PIED DE PAGE — Sombre Profond & Statut Opérationnel
          ======================================================== */}
      <footer className="bg-charbon-deep text-creme rounded-t-[4rem] pt-20 pb-12 px-6 md:px-16 mt-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 pb-16 border-b border-white/10">
            
            {/* Col 1-2: Brand & Mission */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 font-display font-extrabold tracking-tight text-2xl text-white mb-4">
                <span className="w-3 h-3 rounded-full bg-argile" />
                <span>LIVR<span className="text-argile">EXPRESS</span></span>
              </div>
              <p className="text-creme/65 text-xs sm:text-sm max-w-sm leading-relaxed mb-6">
                L'instrument de précision de la logistique urbaine en 2 heures. 
                Rapprocher l'expéditeur et le destinataire sans compromis de temps ni d'intégrité.
              </p>
              
              {/* Operational Status Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-creme/80">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>SYSTÈME OPÉRATIONNEL — LATENCE 8MS — 100% DISPONIBLE</span>
              </div>
            </div>

            {/* Col 3: Navigation */}
            <div>
              <div className="font-mono text-xs text-argile uppercase font-bold tracking-wider mb-4">PLATEFORME</div>
              <ul className="space-y-2.5 text-xs text-creme/70 font-mono">
                <li><a href="#fonctionnalites" className="link-lift hover:text-white">Artefacts</a></li>
                <li><a href="#philosophie" className="link-lift hover:text-white">Le Manifeste</a></li>
                <li><a href="#protocole" className="link-lift hover:text-white">Protocole 120min</a></li>
                <li><a href="#tarifs" className="link-lift hover:text-white">Grille Tarifaire</a></li>
              </ul>
            </div>

            {/* Col 4: Télémétrie & API */}
            <div>
              <div className="font-mono text-xs text-argile uppercase font-bold tracking-wider mb-4">TECHNOLOGIE</div>
              <ul className="space-y-2.5 text-xs text-creme/70 font-mono">
                <li><a href="#" className="link-lift hover:text-white">Spécification Webhooks</a></li>
                <li><a href="#" className="link-lift hover:text-white">SDK Node & Python</a></li>
                <li><a href="#" className="link-lift hover:text-white">Algorithme Synaptique</a></li>
                <li><a href="#" className="link-lift hover:text-white">Bilan Éco-Mobilité</a></li>
              </ul>
            </div>

            {/* Col 5: Légal & Conformité */}
            <div>
              <div className="font-mono text-xs text-argile uppercase font-bold tracking-wider mb-4">CONFORMITÉ</div>
              <ul className="space-y-2.5 text-xs text-creme/70 font-mono">
                <li><a href="#" className="link-lift hover:text-white">Conditions de Service</a></li>
                <li><a href="#" className="link-lift hover:text-white">SLA 120 Minutes</a></li>
                <li><a href="#" className="link-lift hover:text-white">Protection des Données</a></li>
                <li><a href="#" className="link-lift hover:text-white">Assurance Transport</a></li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-creme/50">
            <div>
              © 2026 LIVREXPRESS TECHNOLOGIES INC. TOUS DROITS RÉSERVÉS.
            </div>
            <div className="flex items-center gap-6">
              <span>PRESET A : TECH ORGANIQUE</span>
              <span>PARIS // LYON // BORDEAUX</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ========================================================
          MODALE / SECTION COMMANDE — Demander une Expédition
          ======================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-charbon/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-creme-card border border-mousse/20 rounded-[2.5rem] p-6 sm:p-10 shadow-2xl text-charbon my-auto max-h-[92vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              onClick={() => {
                setIsModalOpen(false);
                setSubmitted(false);
              }}
              className="absolute top-5 right-5 sm:top-7 sm:right-7 p-2 rounded-full hover:bg-mousse/10 text-charbon/60 hover:text-charbon transition-colors z-20"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-argile/10 text-argile text-xs font-mono tracking-widest uppercase mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>COMMANDE EN DIRECT // PROTOCOLE 120 MIN</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-mousse tracking-tight mb-2">
                  Demander une expédition
                </h3>
                <p className="text-xs sm:text-sm text-charbon/70 leading-relaxed mb-6 font-title">
                  Remplissez vos coordonnées et adresses de course. Un coursier dédié sera immédiatement dépêché avec garantie d'arrivée en moins de deux heures.
                </p>

                <form onSubmit={handleModalSubmit} className="space-y-5">
                  
                  {/* Section Coordonnées Client */}
                  <div className="bg-white/70 p-4 sm:p-5 rounded-2xl border border-mousse/10 space-y-4">
                    <div className="font-mono text-xs text-mousse font-bold uppercase tracking-wider flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-argile" />
                      <span>1. Vos Coordonnées</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-mono text-charbon/70 uppercase mb-1 font-semibold">
                          Nom & Prénom / Raison Sociale *
                        </label>
                        <input
                          type="text"
                          required
                          name="fullName"
                          value={shippingForm.fullName}
                          onChange={handleInputChange}
                          placeholder="ex: Alexandre V. — Atelier Parisien"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-creme/50 border border-mousse/20 focus:border-argile focus:outline-none text-xs sm:text-sm font-mono text-charbon shadow-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-charbon/70 uppercase mb-1 font-semibold">
                          Téléphone Portable (Suivi SMS) *
                        </label>
                        <input
                          type="tel"
                          required
                          name="phone"
                          value={shippingForm.phone}
                          onChange={handleInputChange}
                          placeholder="ex: 06 12 34 56 78"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-creme/50 border border-mousse/20 focus:border-argile focus:outline-none text-xs sm:text-sm font-mono text-charbon shadow-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-charbon/70 uppercase mb-1 font-semibold">
                        Adresse Email (Confirmation & Facturation) *
                      </label>
                      <input
                        type="email"
                        required
                        name="email"
                        value={shippingForm.email}
                        onChange={handleInputChange}
                        placeholder="contact@societe.fr"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-creme/50 border border-mousse/20 focus:border-argile focus:outline-none text-xs sm:text-sm font-mono text-charbon shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Section Trajet & Adresses */}
                  <div className="bg-white/70 p-4 sm:p-5 rounded-2xl border border-mousse/10 space-y-4">
                    <div className="font-mono text-xs text-mousse font-bold uppercase tracking-wider flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-argile" />
                      <span>2. Itinéraire de la Course</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-mono text-charbon/70 uppercase mb-1 font-semibold">
                          Adresse d'Enlèvement (Retrait) *
                        </label>
                        <input
                          type="text"
                          required
                          name="pickupAddress"
                          value={shippingForm.pickupAddress}
                          onChange={handleInputChange}
                          placeholder="ex: 14 Rue du Faubourg Saint-Honoré, 75008"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-creme/50 border border-mousse/20 focus:border-argile focus:outline-none text-xs sm:text-sm font-mono text-charbon shadow-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-charbon/70 uppercase mb-1 font-semibold">
                          Adresse de Livraison (Destination) *
                        </label>
                        <input
                          type="text"
                          required
                          name="deliveryAddress"
                          value={shippingForm.deliveryAddress}
                          onChange={handleInputChange}
                          placeholder="ex: 82 Boulevard Haussmann, 75009"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-creme/50 border border-mousse/20 focus:border-argile focus:outline-none text-xs sm:text-sm font-mono text-charbon shadow-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section Type de Colis & Format */}
                  <div className="bg-white/70 p-4 sm:p-5 rounded-2xl border border-mousse/10 space-y-3">
                    <div className="font-mono text-xs text-mousse font-bold uppercase tracking-wider flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-argile" />
                        <span>3. Format du Colis & Délai</span>
                      </div>
                      <span className="text-[10px] text-argile font-bold">120 MIN GARANTI</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'pli', label: 'Pli Urgent', sub: '< 1 kg (Enveloppe)' },
                        { id: 'standard', label: 'Colis Standard', sub: '< 5 kg (Carton)' },
                        { id: 'prestige', label: 'Haute Valeur', sub: 'Thermorégulé / Scellé' }
                      ].map(type => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setShippingForm(prev => ({ ...prev, packageType: type.id }))}
                          className={`p-2.5 rounded-xl border text-left transition-all ${
                            shippingForm.packageType === type.id
                              ? 'bg-mousse text-creme border-mousse shadow-sm'
                              : 'bg-white text-charbon border-mousse/15 hover:border-argile/40'
                          }`}
                        >
                          <div className="font-bold text-xs">{type.label}</div>
                          <div className={`text-[10px] mt-0.5 ${shippingForm.packageType === type.id ? 'text-creme/70' : 'text-charbon/50'}`}>
                            {type.sub}
                          </div>
                        </button>
                      ))}
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-charbon/70 uppercase mb-1 font-semibold">
                        Instructions Particulières pour le Coursier (Optionnel)
                      </label>
                      <input
                        type="text"
                        name="notes"
                        value={shippingForm.notes}
                        onChange={handleInputChange}
                        placeholder="Digicode, étage, personne référente à l'accueil..."
                        className="w-full px-3.5 py-2 rounded-xl bg-creme/50 border border-mousse/20 focus:border-argile focus:outline-none text-xs font-mono text-charbon shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn-magnetic w-full py-4 rounded-full bg-argile text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl"
                  >
                    <span className="btn-slide-layer bg-argile-dark" />
                    <span className="relative z-10 flex items-center gap-2">
                      <span>Valider l'expédition immédiate en 2h</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </button>

                  <div className="pt-2 text-[10px] font-mono text-charbon/60 text-center flex flex-wrap items-center justify-center gap-3">
                    <span>✓ COURSIER EN DIRECT</span>
                    <span>•</span>
                    <span>✓ SUIVI GPS TEMPS RÉEL</span>
                    <span>•</span>
                    <span>✓ ASSURANCE INCLUSE</span>
                  </div>

                </form>
              </div>
            ) : (
              <div className="text-center py-6 sm:py-8 space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center mx-auto text-2xl font-bold animate-bounce">
                  <Check className="w-8 h-8" />
                </div>

                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 text-xs font-mono tracking-widest uppercase mb-3">
                    <span>STATUT : COURSIER EN ROUTE</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-mousse tracking-tight mb-2">
                    Expédition Confirmée !
                  </h3>
                  <p className="text-xs sm:text-sm text-charbon/75 max-w-lg mx-auto leading-relaxed">
                    Un coursier dédié a été affecté à votre course. Il est en route vers l'adresse d'enlèvement.
                  </p>
                </div>

                {/* Recap Card */}
                <div className="bg-white/80 p-5 rounded-2xl border border-mousse/15 text-left font-mono text-xs space-y-3 max-w-lg mx-auto shadow-sm">
                  <div className="flex items-center justify-between pb-2 border-b border-mousse/10">
                    <span className="text-charbon/60 uppercase">NUMÉRO DE SUIVI</span>
                    <span className="font-bold text-argile text-sm">{trackingNumber}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-charbon/60">CONTACT :</span>
                    <span className="font-bold text-mousse">{shippingForm.fullName} ({shippingForm.phone})</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-charbon/60">DÉPART :</span>
                    <span className="font-semibold text-charbon line-clamp-1">{shippingForm.pickupAddress}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-charbon/60">ARRIVÉE :</span>
                    <span className="font-semibold text-charbon line-clamp-1">{shippingForm.deliveryAddress}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-mousse/10 text-emerald-700 font-bold">
                    <span>DÉLAI CONTRACTUEL :</span>
                    <span>&lt; 120 MINUTES CHRONO</span>
                  </div>
                </div>

                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setSubmitted(false);
                      setShippingForm({
                        fullName: '',
                        phone: '',
                        email: '',
                        pickupAddress: '',
                        deliveryAddress: '',
                        packageType: 'standard',
                        urgency: '120min',
                        notes: ''
                      });
                    }}
                    className="btn-magnetic px-8 py-3 rounded-full bg-mousse text-creme text-xs font-bold font-mono uppercase tracking-wider shadow-md"
                  >
                    Fermer la fenêtre
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
