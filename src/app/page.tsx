'use client'

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { Menu, X, Calendar, BookOpen, Users, DollarSign, HelpCircle, Info } from "lucide-react";

// ── Constants ───────────────────────────────────────────────
const SYMPLA_URL = "https://www.sympla.com.br/evento/minha-jornada-social-media/3160774";
const TARGET_DATE = new Date("2026-11-24T23:59:59").getTime();

// ── Scroll Reveal Hook ──────────────────────────────────────
function useScrollReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

// ── Reveal Wrapper Component ────────────────────────────────
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease-out ${delay}ms, transform 0.7s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ── Countdown Unit ──────────────────────────────────────────
function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl sm:text-4xl font-bold text-white bg-black/20 backdrop-blur-sm rounded-xl px-3 sm:px-5 py-2 min-w-[50px] sm:min-w-[72px] tabular-nums text-center">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[10px] sm:text-xs text-white/70 mt-1.5 uppercase tracking-widest font-medium">
        {label}
      </span>
    </div>
  );
}

// ── FAQ Accordion Item ──────────────────────────────────────
function FAQItem({
  question,
  answer,
  defaultOpen = false,
}: {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[#b26a26]/15 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 px-1 text-left group cursor-pointer"
      >
        <span className="text-base sm:text-lg font-medium text-[#4a2a12] pr-4 group-hover:text-[#b26a26] transition-colors">
          {question}
        </span>
        <span
          className={`text-[#b26a26] text-2xl font-light flex-shrink-0 transition-transform duration-300 ${open ? "rotate-45" : ""
            }`}
        >
          +
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-96 pb-5" : "max-h-0"
          }`}
      >
        <p className="px-1 text-gray-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// ██  MAIN PAGE COMPONENT
// ═════════════════════════════════════════════════════════════
export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Countdown timer
  useEffect(() => {
    const tick = () => {
      const distance = TARGET_DATE - Date.now();
      if (distance <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return {
        days: Math.floor(distance / 86400000),
        hours: Math.floor((distance % 86400000) / 3600000),
        minutes: Math.floor((distance % 3600000) / 60000),
        seconds: Math.floor((distance % 60000) / 1000),
      };
    };
    setTimeLeft(tick());
    const interval = setInterval(() => setTimeLeft(tick()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll listener for sticky header
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="font-sans flex flex-col min-h-screen bg-white">
      {/* ══════════════════════════════════════════════════════
          BARRA DE URGÊNCIA — topo fixo
      ══════════════════════════════════════════════════════ */}
      <div className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-red-700 via-red-600 to-orange-600 text-white text-center py-2.5 px-4 text-xs sm:text-sm font-medium shadow-sm">
        🔥 <span className="font-bold">Inscrições até 24 de Novembro!</span> Vagas limitadas —{" "}
        <a
          href={SYMPLA_URL}
          target="_blank"
          className="underline underline-offset-2 font-bold hover:text-yellow-200 transition-colors"
        >
          garanta a sua agora
        </a>
      </div>

      {/* ══════════════════════════════════════════════════════
          HEADER FIXO — sticky com CTA & Menu Mobile
      ══════════════════════════════════════════════════════ */}
      <header
        className={`fixed top-[37px] left-0 w-full z-40 transition-all duration-300 ${scrolled || mobileMenuOpen
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-white/80 backdrop-blur-sm"
          }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-6 py-3">
          <a
            href="#"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base sm:text-lg font-bold text-[#b26a26] tracking-tight flex items-center gap-1.5"
          >
            <span>✨</span>
            <span>Jornada Social Media</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600 font-medium">
            <a href="#sobre" className="hover:text-[#b26a26] transition-colors">
              Sobre
            </a>
            <a
              href="#cronograma"
              className="hover:text-[#b26a26] transition-colors"
            >
              Cronograma
            </a>
            <a
              href="#modulos"
              className="hover:text-[#b26a26] transition-colors"
            >
              Módulos
            </a>
            <a
              href="#mentoras"
              className="hover:text-[#b26a26] transition-colors"
            >
              Mentoras
            </a>
            <a
              href="#investimento"
              className="hover:text-[#b26a26] transition-colors"
            >
              Investimento
            </a>
            <a
              href="#faq"
              className="hover:text-[#b26a26] transition-colors"
            >
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={SYMPLA_URL}
              target="_blank"
              className="hidden sm:inline-block px-5 py-2 bg-[#b26a26] text-white font-semibold rounded-full text-sm shadow-md hover:bg-orange-800 hover:scale-105 transition-all duration-300"
            >
              Inscreva-se →
            </a>

            {/* Botão Hamburger Mobile */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-[#b26a26] hover:bg-[#b26a26]/10 rounded-xl transition-colors focus:outline-none"
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#b26a26]" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Menu Drawer Mobile */}
        <div
          className={`md:hidden border-t border-[#b26a26]/10 bg-white transition-all duration-300 ease-in-out overflow-hidden shadow-2xl ${mobileMenuOpen
              ? "max-h-[85vh] opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
            }`}
        >
          <div className="flex flex-col p-5 space-y-1.5 overflow-y-auto max-h-[calc(85vh-3rem)]">
            <p className="text-[11px] uppercase font-bold text-gray-400 tracking-wider px-3 mb-1">
              Menu de Navegação
            </p>

            {[
              { href: "#sobre", label: "Sobre a Mentoria", icon: Info },
              {
                href: "#cronograma",
                label: "Cronograma das Aulas",
                icon: Calendar,
                badge: "25/11",
              },
              { href: "#modulos", label: "Módulos do Curso", icon: BookOpen },
              { href: "#mentoras", label: "Suas Mentoras", icon: Users },
              {
                href: "#investimento",
                label: "Investimento & Vagas",
                icon: DollarSign,
                badge: "12x R$ 83",
              },
              { href: "#faq", label: "Perguntas Frequentes", icon: HelpCircle },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <a
                  key={idx}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-3 rounded-xl text-gray-700 hover:text-[#b26a26] hover:bg-[#b26a26]/10 active:bg-[#b26a26]/15 transition-colors text-base font-medium"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#b26a26]/10 flex items-center justify-center text-[#b26a26]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[11px] font-bold text-[#b26a26] bg-[#b26a26]/15 px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </a>
              );
            })}

            <div className="pt-3 mt-2 border-t border-gray-100 flex flex-col gap-2">
              <a
                href={SYMPLA_URL}
                target="_blank"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3.5 px-6 bg-[#b26a26] hover:bg-orange-800 text-white font-bold rounded-full shadow-lg transition-all text-sm sm:text-base active:scale-95"
              >
                Garantir Minha Vaga 🚀
              </a>
              <p className="text-center text-[11px] text-gray-400">
                ⏰ Inscrições encerram em 24 de Novembro!
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Backdrop para fechar o menu mobile ao clicar fora */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-30 md:hidden"
          aria-hidden="true"
        />
      )}

      {/* ══════════════════════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════════════════════ */}
      <main className="mt-[96px] w-full flex flex-col items-center justify-center overflow-x-hidden">
        {/* ─────────── SEÇÃO HERO ─────────── */}
        <section className="w-full flex flex-col-reverse md:flex-row items-center justify-center gap-8 lg:gap-16 px-6 md:px-16 lg:px-24 py-14 sm:py-20 lg:py-24">
          {/* Texto */}
          <div className="flex-1 flex flex-col gap-5 text-center md:text-left max-w-2xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 bg-[#b26a26]/10 text-[#b26a26] text-sm font-semibold px-4 py-1.5 rounded-full w-fit mx-auto md:mx-0">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Inscrições até 24 de Novembro
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-[#b26a26] leading-[1.1] tracking-tight">
                Minha Jornada
                <br className="hidden sm:block" /> Social Media:
                <span className="block text-[#4a2a12] mt-1">
                  do zero à profissão
                </span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-xl mx-auto md:mx-0">
                Se tu já tentou de tudo e ainda não te encontrou
                profissionalmente,
                <strong className="text-[#4a2a12]">
                  {" "}
                  essa é a tua oportunidade!
                </strong>
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="flex flex-wrap items-center gap-2.5 justify-center md:justify-start text-sm text-gray-500">
                <span className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-full px-3.5 py-1.5 font-medium text-gray-700">
                  🗓️ Aulas: 25/11, 02/12, 09/12 e 16/12
                </span>
                <span className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-full px-3.5 py-1.5">
                  📹 4 encontros 100% ao vivo
                </span>
                <span className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-full px-3.5 py-1.5">
                  📋 10 módulos completos
                </span>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
                <a
                  href={SYMPLA_URL}
                  target="_blank"
                  className="inline-block px-10 py-4 bg-[#b26a26] text-white font-bold rounded-full text-lg shadow-lg hover:bg-orange-800 hover:scale-105 transition-all duration-300 animate-pulse-cta text-center w-full sm:w-auto"
                >
                  Quero me inscrever
                </a>
                <span className="text-sm text-gray-400">
                  ou 12x de R$ 83,08
                </span>
              </div>
            </Reveal>
          </div>

          {/* Imagem hero */}
          <Reveal
            delay={200}
            className="flex-1 flex items-center justify-center w-full max-w-md lg:max-w-lg"
          >
            <div className="relative w-full">
              <div className="absolute -inset-6 bg-gradient-to-br from-[#b26a26]/20 via-orange-200/20 to-yellow-100/30 rounded-[2rem] blur-3xl pointer-events-none" />
              <Image
                width={500}
                height={500}
                src="/section1.png"
                alt="Mentoras da Jornada Social Media"
                className="relative w-full h-auto object-cover"
                priority
              />
            </div>
          </Reveal>
        </section>

        {/* ─────────── COUNTDOWN BANNER ─────────── */}
        <section className="w-full bg-gradient-to-r from-[#7a4418] via-[#b26a26] to-[#d48d3e] py-7 px-6">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8">
            <div className="text-center sm:text-left">
              <p className="text-white font-bold text-base sm:text-lg">
                ⏰ Inscrições até 24 de Novembro!
              </p>
              <p className="text-white/80 text-xs sm:text-sm">
                Aulas nos dias 25/11, 02/12, 09/12 e 16/12
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <CountdownUnit value={timeLeft.days} label="Dias" />
              <span className="text-xl sm:text-3xl text-white/40 font-light -mt-4">
                :
              </span>
              <CountdownUnit value={timeLeft.hours} label="Horas" />
              <span className="text-xl sm:text-3xl text-white/40 font-light -mt-4">
                :
              </span>
              <CountdownUnit value={timeLeft.minutes} label="Min" />
              <span className="text-xl sm:text-3xl text-white/40 font-light -mt-4">
                :
              </span>
              <CountdownUnit value={timeLeft.seconds} label="Seg" />
            </div>
          </div>
        </section>

        {/* ─────────── SEÇÃO SOBRE A JORNADA ─────────── */}
        <section
          id="sobre"
          className="relative w-full flex flex-col items-center justify-center text-center px-6 sm:px-20 py-20 sm:py-28 bg-[#1a0d04] overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-[url('/Earth.png')] bg-center bg-no-repeat bg-contain opacity-[0.04] pointer-events-none"
            aria-hidden="true"
          />
          <div className="relative z-10 max-w-3xl mx-auto">
            <Reveal>
              <h2 className="text-3xl sm:text-5xl font-bold text-white mb-8">
                Jornada Social Media
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-lg sm:text-xl text-white/90 leading-relaxed">
                Uma mentoria on-line com{" "}
                <span className="font-bold text-yellow-300">
                  quatro encontros 100% ao vivo
                </span>
                .
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-5 text-lg sm:text-xl text-white/80 leading-relaxed">
                É mais do que um curso on-line — nossas aulas serão ao vivo,
                queremos{" "}
                <span className="font-bold text-yellow-300">
                  caminhar de perto contigo nessa jornada.
                </span>
              </p>
            </Reveal>
            <Reveal delay={300}>
              <p className="mt-5 text-lg sm:text-xl text-white/80 leading-relaxed">
                Criada para quem deseja algo novo, busca reconhecimento
                profissional e quer ser{" "}
                <span className="font-bold text-yellow-300">
                  bem remunerado pelo seu trabalho.
                </span>
              </p>
            </Reveal>
            <Reveal delay={400}>
              <div className="mt-10">
                <a
                  href={SYMPLA_URL}
                  target="_blank"
                  className="inline-block px-10 py-4 bg-white text-[#b26a26] font-bold rounded-full text-lg shadow-lg hover:bg-yellow-50 hover:scale-105 transition-all duration-300 animate-pulse-cta-white"
                >
                  Garantir minha vaga 🚀
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ─────────── SEÇÃO CRONOGRAMA DAS AULAS ─────────── */}
        <section
          id="cronograma"
          className="w-full bg-[#faf5ef] py-20 sm:py-24 px-6 sm:px-16"
        >
          <div className="max-w-5xl mx-auto flex flex-col items-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 bg-[#b26a26]/10 text-[#b26a26] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                🗓️ Datas Confirmadas
              </div>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#b26a26] text-center mb-4">
                Cronograma dos Encontros Ao Vivo
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-lg sm:text-xl text-gray-600 text-center max-w-2xl mb-12">
                Quatro noites de imersão direta e prática 100% ao vivo. Anote na sua agenda:
              </p>
            </Reveal>

            {/* Grid dos 4 encontros */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full mb-10">
              {[
                {
                  aula: "Encontro 1",
                  data: "25 de Novembro",
                  dia: "Quarta-feira",
                  destaque: "Início da Mentoria",
                },
                {
                  aula: "Encontro 2",
                  data: "02 de Dezembro",
                  dia: "Quarta-feira",
                  destaque: "Estratégia & Criação",
                },
                {
                  aula: "Encontro 3",
                  data: "09 de Dezembro",
                  dia: "Quarta-feira",
                  destaque: "Tráfego & Métricas",
                },
                {
                  aula: "Encontro 4",
                  data: "16 de Dezembro",
                  dia: "Quarta-feira",
                  destaque: "Prospecção & Prática",
                },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className="bg-white rounded-2xl p-6 border border-[#b26a26]/15 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center flex flex-col items-center h-full">
                    <span className="text-xs uppercase tracking-wider font-bold text-[#b26a26] bg-[#b26a26]/10 px-3 py-1 rounded-full mb-3">
                      {item.aula}
                    </span>
                    <p className="text-xl font-extrabold text-[#4a2a12] mb-1">
                      {item.data}
                    </p>
                    <p className="text-sm font-medium text-gray-500 mb-3">
                      {item.dia}
                    </p>
                    <span className="text-xs text-[#b26a26] font-semibold bg-orange-50 px-2.5 py-1 rounded-md border border-orange-200/50 mt-auto">
                      {item.destaque}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Alerta de encerramento das inscrições */}
            <Reveal delay={400} className="w-full max-w-2xl">
              <div className="bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 border-2 border-red-500/30 rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left shadow-sm">
                <span className="text-4xl flex-shrink-0">⚠️</span>
                <div>
                  <h3 className="text-lg font-bold text-red-700">
                    Prazo Final: Inscrições encerram em 24 de Novembro!
                  </h3>
                  <p className="text-sm text-gray-700 mt-1">
                    As inscrições encerram impreterivelmente na véspera do primeiro encontro. Garanta sua vaga com antecedência para receber todos os links de acesso e materiais.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ─────────── PARA QUEM É ─────────── */}
        <section className="w-full bg-white py-20 sm:py-24 px-6 sm:px-16">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#b26a26] text-center mb-14">
                Para quem é essa mentoria?
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              <Reveal delay={100}>
                <div className="bg-green-50/70 border border-green-200/60 rounded-2xl p-7 sm:p-8 h-full">
                  <h3 className="text-xl font-bold text-green-700 mb-5 flex items-center gap-2">
                    ✅ É pra ti se…
                  </h3>
                  <ul className="space-y-3.5">
                    {[
                      "Quer começar uma carreira nova com liberdade",
                      "Busca trabalhar de casa ou de qualquer lugar",
                      "Tem vontade de aprender mas não sabe por onde começar",
                      "Quer ganhar dinheiro fazendo o que gosta",
                      "Está cansada de empregos que não te valorizam",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-gray-700 leading-relaxed"
                      >
                        <span className="text-green-500 mt-1 flex-shrink-0">
                          ●
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={200}>
                <div className="bg-red-50/70 border border-red-200/60 rounded-2xl p-7 sm:p-8 h-full">
                  <h3 className="text-xl font-bold text-red-600 mb-5 flex items-center gap-2">
                    ❌ Não é pra ti se…
                  </h3>
                  <ul className="space-y-3.5">
                    {[
                      "Busca fórmulas mágicas sem esforço",
                      "Não tem disposição para aprender coisas novas",
                      "Não quer investir em si mesma",
                      "Espera resultados sem colocar em prática",
                      "Não tem comprometimento com a própria jornada",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-gray-700 leading-relaxed"
                      >
                        <span className="text-red-400 mt-1 flex-shrink-0">
                          ●
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ─────────── SEÇÃO LIBERDADE ─────────── */}
        <section className="w-full bg-[#faf5ef] flex flex-col items-center justify-center text-center px-6 sm:px-10 lg:px-20 py-20 sm:py-24">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#b26a26] mb-4 leading-tight">
                Se tu buscas uma profissão que traga liberdade financeira, de
                tempo e geográfica,
                <br className="hidden sm:block" /> ser Social Media é pra ti!
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-lg sm:text-xl text-gray-600 mb-14 max-w-2xl mx-auto">
                A Jornada Social Media te mostra como conquistar essa liberdade
                em todas as áreas da tua vida.
              </p>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  icon: "💰",
                  title: "Liberdade financeira",
                  text: "Tu és dona do teu negócio, decide quanto quer ganhar e ainda tem chance de escalar!",
                },
                {
                  icon: "⏰",
                  title: "Liberdade de tempo",
                  text: "Tu fazes o teu próprio horário, garantindo mais tempo com a família e pra ti mesma.",
                },
                {
                  icon: "🌎",
                  title: "Liberdade geográfica",
                  text: "Trabalha de onde quiser! Vai viajar? Pode continuar trabalhando!",
                },
              ].map((card, i) => (
                <Reveal key={i} delay={i * 120}>
                  <div className="bg-white rounded-2xl shadow-md hover:shadow-xl p-8 flex flex-col gap-4 hover:-translate-y-1 transition-all duration-300 border border-[#b26a26]/10 h-full">
                    <span className="text-4xl">{card.icon}</span>
                    <h3 className="text-xl font-bold text-[#b26a26]">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{card.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────── O QUE VAIS APRENDER ─────────── */}
        <section
          id="modulos"
          className="w-full bg-white text-[#2d2d2d] flex flex-col items-center justify-center px-4 sm:px-8 md:px-12 lg:px-20 py-20 sm:py-24 text-center gap-8"
        >
          <Reveal>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#b26a26] leading-snug">
              O que tu vais aprender:
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 max-w-6xl w-full mt-4">
            {[
              {
                num: "01",
                title: "Introdução à Profissão Social Media",
              },
              { num: "02", title: "Estruturas e Posicionamento" },
              {
                num: "03",
                title:
                  "Fundamentos e Estratégias do Marketing para Redes Sociais",
              },
              {
                num: "04",
                title: "Definindo a Estratégia para Cada Cliente",
              },
              { num: "05", title: "Análise de Métricas" },
              { num: "06", title: "Impulsionamento" },
              {
                num: "07",
                title: "Ferramentas Essenciais para o Social Media",
              },
              { num: "08", title: "Como Prospectar Clientes" },
              {
                num: "09",
                title: "Botando em Prática e Começando os Desafios!",
              },
              {
                num: "10",
                title: "Reencontro Online no Google Meet",
              },
            ].map((modulo, index) => (
              <Reveal key={index} delay={index * 60}>
                <div className="bg-gradient-to-br from-[#fef9f3] to-white border border-[#b26a26]/15 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-start gap-4 text-left h-full">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#b26a26]/20 leading-none flex-shrink-0 mt-0.5">
                    {modulo.num}
                  </span>
                  <p className="font-medium text-base sm:text-lg text-[#4a2a12] leading-snug">
                    {modulo.title}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ─────────── INTENSIVÃO ─────────── */}
        <section className="w-full bg-[#faf5ef] text-[#2d2d2d] flex flex-col items-center justify-center text-center px-4 sm:px-8 md:px-16 lg:px-24 py-20 sm:py-24">
          <div className="max-w-4xl flex flex-col gap-6 sm:gap-8">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#b26a26] leading-snug">
                Um intensivão pra transformar a tua trajetória 🚀
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-[#4a2a12]">
                Vai ser um{" "}
                <span className="font-semibold text-[#b26a26]">
                  intensivão de conteúdos práticos e valiosos{" "}
                </span>
                que vão expandir a tua visão e te deixar pronta pra conquistar
                os teus primeiros clientes.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-[#4a2a12]">
                Tudo o que nós aprendemos com muito esforço, erros e acertos,
                vamos entregar pra ti de forma leve, didática e aplicável.
                <br className="hidden sm:block" /> E diferente dos cursos
                on-line gravados,{" "}
                <span className="font-semibold text-[#b26a26]">
                  nossas aulas serão ao vivo
                </span>
                , entendendo tuas dificuldades e{" "}
                <span className="font-semibold text-[#b26a26]">
                  superando elas contigo!
                </span>
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-6">
                <a
                  href={SYMPLA_URL}
                  target="_blank"
                  className="inline-block px-8 sm:px-10 py-3 sm:py-4 bg-[#b26a26] text-white font-bold rounded-full text-base sm:text-lg shadow-lg hover:bg-orange-800 hover:scale-105 transition-all duration-300 animate-pulse-cta"
                >
                  Quero viver essa experiência ✨
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ─────────── MENTORAS ─────────── */}
        <section id="mentoras" className="w-full">
          {/* Título */}
          <div className="w-full bg-white text-center px-6 sm:px-16 pt-20 sm:pt-24 pb-10">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#b26a26]">
                Conheça Suas Mentoras
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-600">
                Duas histórias de paixão pelo digital, prontas para impulsionar
                a sua carreira e transformar seus resultados.
              </p>
            </Reveal>
          </div>

          {/* Ariane */}
          <div className="w-full bg-white text-[#2d2d2d] flex flex-col-reverse md:flex-row items-center justify-center gap-10 lg:gap-16 px-6 sm:px-16 lg:px-24 py-16 sm:py-20">
            <Reveal className="flex-1 flex flex-col gap-5 text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#b26a26]">
                Ariane Braz
              </h2>
              <p className="text-lg leading-relaxed text-gray-600">
                Desde pequena, Ariane sempre foi comunicativa e encontrou na
                fala e na arte a sua forma mais genuína de se expressar. Pintava
                telas, criava bijuterias para vender, comercializava produtos de
                revistas… sempre descobrindo um jeito criativo de empreender.
                Curiosamente, ela nasceu no Dia do Empreendedorismo Feminino,
                como se já estivesse destinada a trilhar esse caminho de{" "}
                <span className="font-semibold">inovação</span> e{" "}
                <span className="font-semibold">liderança.</span>
              </p>
              <p className="text-lg leading-relaxed text-gray-600">
                Esse espírito inventivo e determinado a acompanha até hoje.
                Atualmente, Ariane ajuda empresas e empreendedores a se
                posicionarem de forma estratégica e assertiva nas redes sociais,
                dominando a arte de comunicar com intenção através de textos,
                artes e vídeos.{" "}
                <span className="font-semibold text-[#b26a26]">
                  Há 4 anos
                </span>
                , ela fundou a{" "}
                <span className="font-semibold text-[#b26a26]">Socialize</span>{" "}
                junto com seu marido, Gabriel, e desde então já contribuiu para
                que{" "}
                <span className="font-semibold text-[#b26a26]">
                  dezenas de negócios
                </span>{" "}
                se destacassem online, transformando ideias em resultados
                concretos.
              </p>
            </Reveal>
            <Reveal
              delay={200}
              className="flex-1 flex items-center justify-center"
            >
              <img
                src="/Ari.png"
                alt="Ariane Braz - Fundadora da Socialize"
                className="rounded-2xl shadow-xl w-full max-w-sm lg:max-w-md object-cover hover:scale-[1.03] transition-transform duration-500"
              />
            </Reveal>
          </div>

          {/* Sara */}
          <div className="w-full bg-white text-[#2d2d2d] flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-16 px-6 sm:px-16 lg:px-24 py-16 sm:py-20">
            <Reveal className="flex-1 flex items-center justify-center">
              <img
                src="/Sara.png"
                alt="Sara Dias - Mentora Social Media"
                className="rounded-2xl shadow-xl w-full max-w-sm lg:max-w-md object-cover hover:scale-[1.03] transition-transform duration-500"
              />
            </Reveal>
            <Reveal
              delay={200}
              className="flex-1 flex flex-col gap-5 text-center md:text-left"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-[#b26a26]">
                Sara Dias
              </h2>
              <p className="text-lg leading-relaxed text-gray-600">
                Desde pequena, sempre teve envolvimento com arte — cantar, fazer
                teatro, fotografar em aniversários. Sempre ouviu:{" "}
                <span className="italic">
                  "A Sara faz a foto sorrindo!"
                </span>{" "}
                como se estivesse dentro da foto. Isso era prazer pra ela.
              </p>
              <p className="text-lg leading-relaxed text-gray-600">
                O que ela não sabia é que, com o tempo, iria se encontrar em uma
                profissão que uniria tudo isso. Hoje, ao editar um vídeo, se
                pega sorrindo… coincidência?{" "}
                <span className="font-semibold">Acho que não!</span>
              </p>
              <p className="text-lg leading-relaxed text-gray-600">
                A Sara é sócia-fundadora da Lion Comunicação Digital e atua como{" "}
                <span className="font-semibold text-[#b26a26]">
                  Social Media há mais de 4 anos
                </span>
                , atendendo clientes de diversos segmentos e adquirindo
                experiência não apenas em produção de conteúdo, mas também na
                rotina real da profissão. Na mentoria, ela vai compartilhar tudo
                o que aprendeu nesse período e mostrar o caminho pra tu te
                tornar uma{" "}
                <span className="font-semibold text-[#b26a26]">
                  Social Media de sucesso.
                </span>
              </p>
            </Reveal>
          </div>
        </section>

        {/* ─────────── FAQ ─────────── */}
        <section
          id="faq"
          className="w-full bg-[#faf5ef] py-20 sm:py-24 px-6 sm:px-16"
        >
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#b26a26] text-center mb-12">
                Perguntas Frequentes
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 border border-[#b26a26]/10">
                <FAQItem
                  question="Quais são as datas das aulas ao vivo?"
                  answer="Os 4 encontros 100% ao vivo acontecerão nos dias 25 de Novembro, 02 de Dezembro, 09 de Dezembro e 16 de Dezembro (todas às quartas-feiras). As inscrições encerram no dia 24 de Novembro!"
                  defaultOpen
                />
                <FAQItem
                  question="Preciso ter experiência com redes sociais?"
                  answer="Não! A mentoria foi criada justamente para quem está começando do zero. Vamos te guiar passo a passo, desde os fundamentos até a prática."
                />
                <FAQItem
                  question="As aulas são gravadas ou ao vivo?"
                  answer="100% ao vivo! São 4 encontros online ao vivo, onde você pode interagir, tirar dúvidas em tempo real e ter acompanhamento personalizado. É muito mais do que um curso gravado."
                />
                <FAQItem
                  question="Preciso de algum equipamento especial?"
                  answer="Apenas um celular com internet e um computador (ou tablet) para acompanhar as aulas. Nada de equipamento caro! Vamos te mostrar ferramentas gratuitas e acessíveis."
                />
                <FAQItem
                  question="Posso parcelar o investimento?"
                  answer="Sim! Você pode parcelar em até 12x no cartão de crédito. O investimento total é de R$ 997,00 — menos de R$ 84 por mês para transformar a sua carreira."
                />
                <FAQItem
                  question="Em quanto tempo consigo meus primeiros clientes?"
                  answer="Depende da sua dedicação, mas no Módulo 8 ensinamos exatamente como prospectar clientes. Muitos alunos conseguem seus primeiros clientes ainda durante a mentoria!"
                />
                <FAQItem
                  question="Terei suporte depois da mentoria?"
                  answer="Sim! Além dos encontros ao vivo, você terá acesso ao nosso grupo exclusivo para tirar dúvidas e trocar experiências com as mentoras e outros alunos."
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ─────────── INVESTIMENTO ─────────── */}
        <section
          id="investimento"
          className="w-full bg-gradient-to-br from-[#1a0d04] via-[#2a1608] to-[#1a0d04] text-white py-20 sm:py-28 px-6 sm:px-16"
        >
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-8">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Invista na sua nova profissão
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-lg sm:text-xl text-white/70 max-w-2xl leading-relaxed">
                Tudo o que você precisa para se tornar uma Social Media de
                sucesso, em um único programa:
              </p>
            </Reveal>

            {/* Card de preço */}
            <Reveal delay={200}>
              <div className="bg-white/[0.07] backdrop-blur-sm rounded-3xl p-8 sm:p-12 flex flex-col items-center gap-5 border border-white/10 max-w-lg w-full">
                {/* O que está incluso */}
                <ul className="text-left space-y-3 w-full mb-4">
                  {[
                    "4 encontros 100% ao vivo (25/11, 02/12, 09/12 e 16/12)",
                    "Prazo de inscrição até 24 de Novembro",
                    "10 módulos de conteúdo prático",
                    "Acompanhamento personalizado",
                    "Grupo exclusivo de alunos",
                    "Material de apoio completo",
                    "Certificado de conclusão",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-white/80"
                    >
                      <span className="text-yellow-300 flex-shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="w-full h-px bg-white/10" />

                {/* Ancoragem de preço */}
                <p className="text-white/50 text-lg line-through">
                  De R$ 2.497,00
                </p>
                <p className="text-5xl sm:text-6xl font-extrabold text-yellow-300">
                  R$ 997<span className="text-3xl sm:text-4xl">,00</span>
                </p>
                <p className="text-white/70 text-lg">
                  ou em até{" "}
                  <span className="font-bold text-yellow-300">
                    12x de R$ 83,08
                  </span>
                </p>

                <a
                  href={SYMPLA_URL}
                  target="_blank"
                  className="mt-4 w-full inline-block px-10 py-4 bg-[#b26a26] text-white font-bold rounded-full text-lg shadow-lg hover:bg-orange-700 hover:scale-105 transition-all duration-300 animate-pulse-cta text-center"
                >
                  Garantir minha vaga 🚀
                </a>

                <p className="text-white/40 text-xs mt-1">
                  Pagamento seguro via Sympla
                </p>
              </div>
            </Reveal>

            {/* Garantia */}
            <Reveal delay={300}>
              <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-6 py-5 max-w-lg mt-4">
                <span className="text-4xl flex-shrink-0">🛡️</span>
                <div className="text-left">
                  <p className="font-bold text-white text-sm sm:text-base">
                    Sua satisfação é a nossa prioridade
                  </p>
                  <p className="text-white/60 text-sm mt-1">
                    Acreditamos tanto no poder dessa mentoria que queremos que
                    você entre com total confiança. Se tiver dúvidas, fale
                    conosco antes de se inscrever!
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ─────────── CTA FINAL ─────────── */}
        <section className="w-full bg-[#b26a26] py-16 sm:py-20 px-6 text-center">
          <Reveal>
            <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                Pronta pra transformar tua carreira?
              </h2>
              <p className="text-lg sm:text-xl text-white/80 max-w-xl">
                Não deixe essa oportunidade passar. As vagas são limitadas e as
                inscrições podem encerrar a qualquer momento.
              </p>
              <a
                href={SYMPLA_URL}
                target="_blank"
                className="inline-block px-12 py-5 bg-white text-[#b26a26] font-bold rounded-full text-lg shadow-xl hover:bg-yellow-50 hover:scale-105 transition-all duration-300 animate-pulse-cta-white"
              >
                Sim, quero me inscrever! ✨
              </a>
            </div>
          </Reveal>
        </section>

        {/* ─────────── FOOTER ─────────── */}
        <footer className="w-full bg-[#0d0704] text-white flex flex-col items-center justify-center gap-4 py-10 px-6 text-center">
          <p className="text-sm sm:text-base font-light text-white/60">
            © {new Date().getFullYear()} Minha Jornada Social Media — Todos os
            direitos reservados.
          </p>
          <div className="flex items-center gap-3">
            <p className="text-sm font-light text-white/40">
              Desenvolvido por — Lion Comunicação Digital
            </p>
          </div>
        </footer>
      </main>

      {/* ══════════════════════════════════════════════════════
          MOBILE FIXED CTA BAR
      ══════════════════════════════════════════════════════ */}
      <div
        className={`fixed bottom-0 left-0 w-full z-50 sm:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] px-4 py-3 transition-all duration-300 ${mobileMenuOpen ? "opacity-0 pointer-events-none translate-y-full" : "opacity-100 translate-y-0"
          }`}
      >
        <a
          href={SYMPLA_URL}
          target="_blank"
          className="block w-full text-center px-6 py-3.5 bg-[#b26a26] text-white font-bold rounded-full text-base shadow-md active:scale-95 transition-transform"
        >
          Inscreva-se agora — 12x R$ 83,08
        </a>
      </div>
    </div>
  );
}
