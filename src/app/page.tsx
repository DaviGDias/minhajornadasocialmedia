'use client'

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date("2025-11-15T00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  //className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
  return (
    <div className="font-sans flex flex-col min-h-screen">
      {/* HEADER FIXO */}
      <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white text-center py-2 shadow-md z-50 px-2">
        <p className="text-sm sm:text-base font-semibold leading-tight">
          ⏳ Faltam{" "}
          <span className="font-bold">
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
          </span>{" "}
          para o grande evento! 🚀
        </p>
      </header>

      <main className="mt-12 w-full flex flex-col items-center justify-center overflow-x-hidden">
        {/* SEÇÃO HERO */}
        <section className="w-full flex flex-col-reverse md:flex-row items-center justify-center gap-10 px-6 md:px-20 py-24">
          <div className="flex-1 flex flex-col gap-6 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl font-bold text-[#b26a26] leading-tight">
              Minha Jornada Social Media:<br /> do zero à profissão
            </h1>

            <p className="text-lg sm:text-2xl text-gray-800 leading-relaxed">
              Se tu já tentou de tudo e ainda não te encontrou profissionalmente,<br></br> essa é a tua oportunidade!
            </p>

            <a
              href="https://www.sympla.com.br/evento/minha-jornada-social-media/3160774"
              target="_blank"
              className="
    inline-block
    px-10 py-4 
    bg-[#b26a26] 
    text-white 
    font-semibold 
    rounded-full 
    text-lg 
    shadow-lg 
    hover:bg-orange-800 
    hover:scale-105 
    transition-all 
    duration-300
    w-100  text-center
  "
            >
              Quero viver essa experiência ✨
            </a>

          </div>

          <div className="relative w-full max-w-md mx-auto">
            <Image
              width={400}
              height={200}
              src="/section1.png"
              alt="Sara Dias"
              className="w-full h-auto object-cover [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]"
            />
          </div>
        </section>

        {/* SEÇÃO MAPA */}
        <section className="relative w-full flex flex-col items-center justify-center text-center px-6 sm:px-20 py-24 bg-[#b26a26] overflow-hidden">
          <div
            className="absolute inset-0 bg-[url('/Earth.png')] bg-center bg-no-repeat bg-contain opacity-10 pointer-events-none"
            aria-hidden="true"
          ></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
              Jornada Social Media
            </h2>
            <p className="text-lg sm:text-xl text-white leading-relaxed">
              Uma mentoria com <span className="font-semibold text-yellow-200">8 horas de imersão presencial</span> no dia <span className="font-semibold">15/11</span>,
              das <span className="font-semibold">9:00 às 12:30</span> e das <span className="font-semibold">13:30 às 18:00</span>, além de encontros online e individuais.
            </p>
            <p className="mt-4 text-lg sm:text-xl text-white/90">
              Criada para quem deseja algo novo, busca reconhecimento profissional
              e quer ser <span className="font-semibold text-yellow-200">bem remunerado pelo seu trabalho.</span>
            </p>
          </div>

          <div className="relative z-10 mt-10">
            <a
              href="https://www.sympla.com.br/evento/minha-jornada-social-media/3160774"
              className="inline-block px-10 py-4 bg-white text-[#b26a26] font-semibold rounded-full text-lg shadow-lg hover:bg-yellow-100 hover:scale-105 transition-all duration-300"
            >
              Garantir minha vaga 🚀
            </a>
          </div>
        </section>

        {/* SEÇÃO LIBERDADE */}
        <section className="w-full bg-white flex flex-col items-center justify-center text-center px-6 sm:px-10 lg:px-20 py-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#b26a26] mb-6 leading-tight">
              Se tu busca uma profissão que traga liberdade financeira, de tempo e geográfica,<br className="hidden sm:block" /> ser Social Media é pra ti!
            </h2>

            <p className="text-lg sm:text-xl text-gray-700 mb-12 max-w-2xl mx-auto">
              A Jornada Social Media te mostra como conquistar essa liberdade em todas as áreas da tua vida.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "💰 Liberdade financeira",
                  text: "Tu é dona do teu negócio, decide quanto quer ganhar e ainda tem chance de escalar!",
                },
                {
                  title: "⏰ Liberdade de tempo",
                  text: "Tu faz o teu próprio horário, garantindo mais tempo com a família e pra ti mesma.",
                },
                {
                  title: "🌎 Liberdade geográfica",
                  text: "Trabalha de onde quiser! Vai viajar? Pode continuar trabalhando!",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="bg-[#b26a26]/10 rounded-2xl shadow-md p-8 flex flex-col gap-3 hover:shadow-lg transition-all duration-300"
                >
                  <h3 className="text-2xl font-semibold text-[#b26a26]">{card.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full bg-[#fff3e5] text-[#2d2d2d] flex flex-col items-center justify-center px-4 sm:px-8 md:px-12 lg:px-20 py-16 sm:py-20 lg:py-24 text-center gap-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#b26a26] leading-snug">
            O que tu vais aprender:
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl w-full mt-6 sm:mt-10">
            {[
              "Módulo 1: Introdução à Profissão Social Media",
              "Módulo 2: Estruturas e Posicionamento",
              "Módulo 3: Fundamentos e Estratégias do Marketing para Redes Sociais",
              "Módulo 4: Definindo a Estratégia para Cada Cliente",
              "Módulo 5: Análise de Métricas",
              "Módulo 6: Impulsionamento",
              "Módulo 7: Ferramentas Essenciais para o Social Media",
              "Módulo 8: Como Prospectar Clientes",
              "Módulo 9: Botando em Prática e Começando os Desafios!",
              "Módulo 10: Reencontro Online no Google Meet",
            ].map((modulo, index) => (
              <div
                key={index}
                className="bg-white border border-[#b26a26]/20 rounded-2xl p-5 sm:p-6 lg:p-8 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center justify-center text-center"
              >
                <p className="font-medium text-base sm:text-lg lg:text-xl text-[#4a2a12] leading-relaxed">
                  {modulo}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section className="w-full bg-[#fff] text-[#2d2d2d] flex flex-col items-center justify-center text-center px-4 sm:px-8 md:px-16 lg:px-24 py-16 sm:py-20 lg:py-28">
          <div className="max-w-4xl flex flex-col gap-6 sm:gap-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#b26a26] leading-snug">
              Um intensivão pra transformar a tua trajetória 🚀
            </h2>

            <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-[#4a2a12]">
              Vai ser um <span className="font-semibold text-[#b26a26]">intensivão de conteúdos práticos e valiosos </span>
               que vão expandir a tua visão e te deixar pronta pra conquistar os teus primeiros clientes.
            </p>

            <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-[#4a2a12]">
              Tudo o que nós aprendemos com muito esforço, erros e acertos, vamos entregar pra ti
              de forma leve, didática e aplicável.&ensp; 
              <br className="hidden sm:block" />
              E diferente dos cursos on-line, <span className="font-semibold text-[#b26a26]">
                vai ser de perto</span>, entendendo tuas dificuldades e <span className="font-semibold text-[#b26a26]">
                superando elas contigo!</span>
            </p>

            <div className="mt-8 sm:mt-10">
              <a
                href="https://www.sympla.com.br/evento/minha-jornada-social-media/3160774"
                className="inline-block px-8 sm:px-10 py-3 sm:py-4 bg-[#b26a26] text-white font-semibold rounded-full text-base sm:text-lg shadow-lg hover:bg-orange-800 hover:scale-105 transition-all duration-300"
              >
                Quero viver essa experiência ✨
              </a>
            </div>
          </div>
        </section>
        {/* ======================= TÍTULO DA SEÇÃO DE MENTORAS ======================= */}
    {/* ======================= SEÇÃO ÚNICA DAS MENTORAS ======================= */}


  {/* ======================= SEÇÃO ÚNICA DAS MENTORAS (COM FUNDO AJUSTADO) ======================= */}
<section className="w-full">

  {/* Bloco do Título */}
  <div className="w-full bg-[#fff7ef] text-center px-6 sm:px-16 py-16"> {/* <-- COR DO FUNDO ALTERADA AQUI */}
    <h2 className="text-4xl md:text-5xl font-bold text-[#b26a26]">
      Conheça Suas Mentoras
    </h2>
    <p className="mt-4 text-lg max-w-3xl mx-auto text-[#4a2a12]">
      Duas histórias de paixão pelo digital, prontas para impulsionar a sua carreira e transformar seus resultados.
    </p>
  </div>

  {/* Bloco da Mentora Ariane */}
  <div className="w-full bg-[#fff7ef] text-[#2d2d2d] flex flex-col-reverse md:flex-row items-center justify-center gap-12 px-6 sm:px-16 py-24">
    {/* Texto */}
    <div className="flex-1 flex flex-col gap-6 text-center md:text-left">
      <h2 className="text-3xl sm:text-4xl font-bold text-[#b26a26]">
        Ariane
      </h2>
      <p className="text-lg leading-relaxed text-[#4a2a12]">
        Desde pequena, Ariane sempre foi comunicativa e encontrou na fala e na arte
        a sua forma mais genuína de se expressar. Pintava telas, criava bijuterias para vender,
        comercializava produtos de revistas… sempre descobrindo um jeito criativo de empreender.
        Curiosamente, ela nasceu no Dia do Empreendedorismo Feminino, como se já estivesse destinada
        a trilhar esse caminho de  <span className="font-semibold text-[#b26a26]"> inovação</span> e <span className="font-semibold text-[#b26a26]">liderança.</span> 
      </p>
      <p className="text-lg leading-relaxed text-[#4a2a12]">
        Esse espírito inventivo e determinado a acompanha até hoje. Atualmente, Ariane ajuda
        empresas e empreendedores a se posicionarem de forma estratégica e assertiva nas redes
        sociais, dominando a arte de comunicar com intenção através de textos, artes e vídeos.
        Há 4 anos, ela fundou a <span className="font-semibold text-[#b26a26]">Socialize</span> junto com seu marido, Gabriel,
        e desde então já contribuiu para que dezenas de negócios se destacassem online,
        transformando ideias em resultados concretos.
      </p>
    </div>
    {/* Imagem */}
    <div className="flex-1 flex items-center justify-center">
      <img
        src="/Ari.png"
        alt="Ariane - Fundadora da Socialize"
        className="rounded-2xl shadow-lg w-full max-w-md object-cover hover:scale-105 transition-transform duration-500"
      />
    </div>
  </div>

  {/* Bloco da Mentora Sara */}
  <div className="w-full bg-[#fff7ef] text-[#2d2d2d] flex flex-col md:flex-row items-center justify-center gap-12 px-6 sm:px-16 py-24">
    {/* Imagem */}
    <div className="flex-1 flex items-center justify-center" >
      <img
        src="/Sara.png"
        alt="Sara Dias - Mentora Social Media"
        className="rounded-2xl shadow-lg w-full max-w-md object-cover hover:scale-105 transition-transform duration-500 bg-white"
      />
    </div>
    {/* Texto */}
    <div className="flex-1 flex flex-col gap-6 text-center md:text-left">
      <h2 className="text-3xl sm:text-4xl font-bold text-[#b26a26]">
        Sara Dias
      </h2>
      <p className="text-lg leading-relaxed text-[#4a2a12]">
        Desde pequena, sempre teve envolvimento com arte — cantar, fazer teatro, fotografar em aniversários.
        Sempre ouviu: <span className="italic">“A Sara faz a foto sorrindo!”</span> como se estivesse dentro da foto.
        Isso era prazer pra ela.
      </p>
      <p className="text-lg leading-relaxed text-[#4a2a12]">
        O que ela não sabia é que, com o tempo, iria se encontrar em uma profissão que uniria tudo isso.
        Hoje, ao editar um vídeo, se pega sorrindo… coincidência? <span className="font-semibold">Acho que não!</span>
      </p>
      <p className="text-lg leading-relaxed text-[#4a2a12]">
        A Sara é sócia-fundadora da Lion Comunicação Digital e atua como <span className="font-semibold text-[#b26a26]">Social Media há mais de 4 anos</span>,
        atendendo clientes de diversos segmentos e adquirindo experiência não apenas em produção de conteúdo,
        mas também na rotina real da profissão.
        Na mentoria, ela vai compartilhar tudo o que aprendeu nesse período e mostrar o caminho pra tu te tornar
        uma <span className="font-semibold text-[#b26a26]">Social Media de sucesso.</span>
      </p>
    </div>
  </div>
  
</section>
{/* ============================================================================== */}
        <footer className="w-full bg-black text-white flex flex-col items-center justify-center gap-4 py-10 px-6 text-center">
          <p className="text-sm sm:text-base font-light">
            © {new Date().getFullYear()} Minha Jornada Social Media — Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-3">
            <p className="text-sm font-light">Desenvolvido por - Lion Comunicação Digital</p>

          </div>
        </footer>
      </main>
    </div>
  );
}
