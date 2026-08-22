import { useEffect, useMemo, useState } from "react";

const projects = [
  {
    name: "MedPay",
    desc: "Marketplace moderno para produtos de saúde, com catálogo dinâmico, checkout integrado e painel administrativo.",
    tech: ["React", "TypeScript", "Prisma", "PostgreSQL", "Railway", "Vercel"],
    status: "Em produção",
    category: ["fullstack", "backend"],
    icon: "stethoscope",
  },
  {
    name: "DioSalon",
    desc: "Landing page premium para barbearia com sistema de agendamentos online, venda de produtos e backend dedicado.",
    tech: ["Next.js", "TypeScript", "Node.js", "Railway", "Vercel"],
    status: "Em produção",
    category: ["fullstack", "landing"],
    icon: "scissors",
    repository: "https://github.com/bgjunior29/dioSal-o",
  },
  {
    name: "Judoces",
    desc: "Landing page premium para vendas de bolos, com pedidos pelo WhatsApp.",
    tech: ["TypeScript", "Node.js", "Railway", "Vercel"],
    status: "Concluído",
    category: ["fullstack", "landing"],
    icon: "cake",
    repository: "https://github.com/bgjunior29/ju-doces",
  },
  {
    name: "Vitrix Commerce",
    desc: "Protótipo de e-commerce futurista com estética HUD, carrinho, cupons e checkout via Mercado Pago.",
    tech: ["React", "Tailwind CSS", "Mercado Pago"],
    status: "Concluído",
    category: ["frontend", "landing"],
    icon: "shopping-cart",
  },
  {
    name: "Novo Projeto",
    desc: "Este espaço está reservado para o próximo produto — os projetos são carregados dinamicamente conforme novas entregas.",
    tech: ["Em breve"],
    status: "Em breve",
    category: ["fullstack"],
    icon: "sparkles",
  },
];

const softSkills = [
  { name: "Comunicação", icon: "message-square" },
  { name: "Trabalho em Equipe", icon: "users" },
  { name: "Capacidade Analítica", icon: "brain-circuit" },
  { name: "Facilidade de Aprendizado", icon: "book-open" },
  { name: "Resolução de Problemas", icon: "puzzle" },
  { name: "Organização", icon: "list-checks" },
];

function App() {
  const [activeFilter, setActiveFilter] = useState("todos");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const submittedForm = event.currentTarget;
    setIsSubmitting(true);
    setFormStatus({ type: "", message: "" });

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/movitechsuporterdev@gmail.com",
        {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(submittedForm),
        },
      );
      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.success === false) {
        throw new Error(
          result.message || "Não foi possível enviar a mensagem.",
        );
      }

      submittedForm.reset();
      setFormStatus({
        type: "success",
        message: "E-mail enviado com sucesso. Obrigado pelo contato!",
      });
    } catch (error) {
      setFormStatus({
        type: "error",
        message:
          error.message ||
          "Não foi possível enviar agora. Tente novamente em instantes.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (window.lucide) window.lucide.createIcons();

    const loader = document.getElementById("loader");
    const nav = document.getElementById("navbar");
    const backToTop = document.getElementById("backToTop");

    const revealEls = document.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right, .reveal-scale",
    );
    const counters = document.querySelectorAll(".counter");

    const updateNav = () => {
      nav?.classList.toggle("scrolled", window.scrollY > 40);
      backToTop?.parentElement?.classList.toggle(
        "opacity-100",
        window.scrollY > 400,
      );
    };

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            entry.target
              .querySelectorAll<HTMLElement>(".skill")
              ?.forEach((skill) => {
                const fill =
                  skill.querySelector<HTMLElement>(".skill-bar-fill");
                if (fill) fill.style.width = skill.dataset.level + "%";
              });
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    revealEls.forEach((el) => revealObserver.observe(el));

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const target = Number(el.dataset.target);
            let current = 0;
            const step = Math.max(1, target / 60);
            const tick = () => {
              current += step;
              if (current >= target) {
                el.textContent = String(target);
                return;
              }
              el.textContent = String(Math.floor(current));
              requestAnimationFrame(tick);
            };
            tick();
            counterObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.5 },
    );

    counters.forEach((counter) => counterObserver.observe(counter));

    const dot = document.getElementById("cursorDot");
    const ring = document.getElementById("cursorRing");
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const pointerMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (dot) {
        dot.style.left = mouseX + "px";
        dot.style.top = mouseY + "px";
      }
    };

    const loopRing = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      if (ring) {
        ring.style.left = ringX + "px";
        ring.style.top = ringY + "px";
      }
      requestAnimationFrame(loopRing);
    };

    loopRing();
    window.addEventListener("mousemove", pointerMove);

    document
      .querySelectorAll<HTMLElement>("a, button, input, textarea")
      .forEach((el) => {
        el.addEventListener("mouseenter", () => ring?.classList.add("active"));
        el.addEventListener("mouseleave", () =>
          ring?.classList.remove("active"),
        );
      });

    document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((btn) => {
      btn.addEventListener("mousemove", (event) => {
        const rect = btn.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.35}px)`;
        btn.style.setProperty("--x", event.clientX - rect.left + "px");
        btn.style.setProperty("--y", event.clientY - rect.top + "px");
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate(0,0)";
      });
    });

    document.querySelectorAll<HTMLElement>(".ripple").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        const rect = btn.getBoundingClientRect();
        const span = document.createElement("span");
        span.className = "ripple-el";
        span.style.left = event.clientX - rect.left + "px";
        span.style.top = event.clientY - rect.top + "px";
        btn.appendChild(span);
        setTimeout(() => span.remove(), 650);
      });
    });

    document.querySelectorAll<HTMLElement>(".tilt-card").forEach((el) => {
      el.addEventListener("mousemove", (event) => {
        const rect = el.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = `perspective(700px) rotateX(${-py * 8}deg) rotateY(${px * 8}deg) scale(1.02)`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform =
          "perspective(700px) rotateX(0) rotateY(0) scale(1)";
      });
    });

    const canvas = document.getElementById(
      "particles",
    ) as HTMLCanvasElement | null;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      let particles: Array<{
        x: number;
        y: number;
        vx: number;
        vy: number;
        r: number;
      }> = [];

      const resizeCanvas = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      };

      const initParticles = () => {
        resizeCanvas();
        const count = Math.min(70, Math.floor(canvas.width / 22));
        particles = Array.from({ length: count }, () => ({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 1.6 + 0.6,
        }));
      };

      const drawParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(96,165,250,0.75)";
          ctx.fill();
        });
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i];
            const b = particles[j];
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d < 130) {
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = `rgba(59,130,246,${0.18 * (1 - d / 130)})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }
        requestAnimationFrame(drawParticles);
      };

      initParticles();
      drawParticles();
      window.addEventListener("resize", initParticles);
    }

    window.addEventListener("scroll", updateNav);
    updateNav();
    window.addEventListener("load", () => {
      setTimeout(() => loader?.classList.add("hide"), 900);
    });

    return () => {
      window.removeEventListener("mousemove", pointerMove);
      window.removeEventListener("scroll", updateNav);
      revealObserver.disconnect();
      counterObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    window.lucide?.createIcons();
  }, [activeFilter]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "todos") return projects;
    return projects.filter((project) =>
      project.category.includes(activeFilter),
    );
  }, [activeFilter]);

  return (
    <>
      <div id="loader">
        <div className="loader-ring" />
        <div className="mono text-xs tracking-[0.3em] text-blue-300">
          CARREGANDO PORTFÓLIO
        </div>
        <div className="loader-bar">
          <span />
        </div>
      </div>

      <div className="cursor-dot" id="cursorDot" />
      <div className="cursor-ring" id="cursorRing" />

      <header
        id="navbar"
        className="fixed top-0 inset-x-0 z-50 px-6 md:px-10 py-4"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a
            href="#top"
            className="display font-semibold text-lg tracking-wide flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 pulse-dot" />
            JOHN<span className="text-blue-500">WESLEY</span>
          </a>
          <nav className="hidden lg:flex items-center gap-9 mono text-[13px] tracking-wide text-gray-300">
            <a
              href="#sobre"
              className="nav-link hover:text-white transition-colors"
            >
              SOBRE
            </a>
            <a
              href="#experiencia"
              className="nav-link hover:text-white transition-colors"
            >
              EXPERIÊNCIA
            </a>
            <a
              href="#skills"
              className="nav-link hover:text-white transition-colors"
            >
              SKILLS
            </a>
            <a
              href="#projetos"
              className="nav-link hover:text-white transition-colors"
            >
              PROJETOS
            </a>
            <a
              href="#stats"
              className="nav-link hover:text-white transition-colors"
            >
              STATUS
            </a>
            <a
              href="#contato"
              className="nav-link hover:text-white transition-colors"
            >
              CONTATO
            </a>
          </nav>
          <a
            href="#contato"
            data-magnetic
            className="btn-primary hidden lg:inline-flex items-center gap-2 text-white text-sm font-medium px-5 py-2.5 rounded-full"
          >
            Vamos conversar
            <i data-lucide="arrow-up-right" className="w-4 h-4" />
          </a>
          <button
            id="menuBtn"
            type="button"
            className="lg:hidden text-white"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobileMenu"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          >
            <i data-lucide={mobileOpen ? "x" : "menu"} className="w-7 h-7" />
          </button>
        </div>

        <div
          id="mobileMenu"
          className={`lg:hidden ${mobileOpen ? "" : "hidden"} mt-4 glass-strong rounded-2xl p-6 flex flex-col gap-5 mono text-sm`}
        >
          <a
            href="#sobre"
            className="mobile-link"
            onClick={() => setMobileOpen(false)}
          >
            SOBRE
          </a>
          <a
            href="#experiencia"
            className="mobile-link"
            onClick={() => setMobileOpen(false)}
          >
            EXPERIÊNCIA
          </a>
          <a
            href="#skills"
            className="mobile-link"
            onClick={() => setMobileOpen(false)}
          >
            SKILLS
          </a>
          <a
            href="#projetos"
            className="mobile-link"
            onClick={() => setMobileOpen(false)}
          >
            PROJETOS
          </a>
          <a
            href="#stats"
            className="mobile-link"
            onClick={() => setMobileOpen(false)}
          >
            STATUS
          </a>
          <a
            href="#contato"
            className="mobile-link"
            onClick={() => setMobileOpen(false)}
          >
            CONTATO
          </a>
        </div>
      </header>

      <section
        id="top"
        className="relative min-h-[100svh] flex items-center overflow-hidden pt-28 pb-16"
      >
        <div className="absolute inset-0 tech-grid" />
        <canvas id="particles" className="absolute inset-0" />
        <div className="glow-orb w-[520px] h-[520px] bg-blue-600/30 -top-40 -left-32" />
        <div className="glow-orb w-[420px] h-[420px] bg-cyan-400/20 top-1/3 -right-20" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-[1.15fr_0.85fr] gap-16 items-center w-full">
          <div>
            <div className="eyebrow mb-6 reveal in">
              status: 200 // disponível para novos projetos
            </div>
            <h1
              className="display font-semibold leading-[1.05] text-4xl sm:text-5xl md:text-6xl reveal in"
              style={{ transitionDelay: "0.05s" }}
            >
              Olá, eu sou
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-300 bg-clip-text text-transparent">
                John Wesley
              </span>
              <span className="type-cursor" />
            </h1>
            <p
              className="mono text-blue-300 text-sm md:text-base mt-6 tracking-wide reveal in"
              style={{ transitionDelay: "0.15s" }}
            >
              Desenvolvedor Full Stack · Designer · Profissional de TI
            </p>
            <p
              className="text-gray-400 text-base md:text-lg leading-relaxed mt-6 max-w-xl reveal in"
              style={{ transitionDelay: "0.25s" }}
            >
              Transformo ideias em experiências digitais modernas, criando
              aplicações escaláveis, interfaces elegantes e soluções
              tecnológicas que unem design, desempenho e inovação.
            </p>
            <div
              className="flex flex-wrap gap-4 mt-10 reveal in"
              style={{ transitionDelay: "0.35s" }}
            >
              <a
                href="#projetos"
                data-magnetic
                className="btn-primary text-white font-medium px-7 py-3.5 rounded-full inline-flex items-center gap-2"
              >
                Conheça meus projetos
                <i data-lucide="arrow-right" className="w-4 h-4" />
              </a>
              <a
                href="#sobre"
                data-magnetic
                className="btn-ghost text-white font-medium px-7 py-3.5 rounded-full"
              >
                Sobre mim
              </a>
              <a
                href="/curriculo-john-wesley-2026.pdf"
                download
                data-magnetic
                className="btn-ghost text-white font-medium px-7 py-3.5 rounded-full inline-flex items-center gap-2"
              >
                <i data-lucide="download" className="w-4 h-4" /> Currículo
              </a>
              <a
                href="#contato"
                data-magnetic
                className="btn-ghost text-white font-medium px-7 py-3.5 rounded-full"
              >
                Contato
              </a>
            </div>
            <div
              className="flex items-center gap-8 mt-14 reveal in"
              style={{ transitionDelay: "0.45s" }}
            >
              <div>
                <p className="display text-2xl font-semibold text-white">3+</p>
                <p className="mono text-[11px] text-gray-500 tracking-wide">
                  ANOS DE EXPERIÊNCIA
                </p>
              </div>
              <div className="w-px h-10 bg-blue-500/20" />
              <div>
                <p className="display text-2xl font-semibold text-white">12+</p>
                <p className="mono text-[11px] text-gray-500 tracking-wide">
                  PROJETOS ENTREGUES
                </p>
              </div>
              <div className="w-px h-10 bg-blue-500/20" />
              <div>
                <p className="display text-2xl font-semibold text-white">2</p>
                <p className="mono text-[11px] text-gray-500 tracking-wide">
                  FORMAÇÕES TÉCNICAS
                </p>
              </div>
            </div>
          </div>

          <div
            className="relative reveal-scale in mx-auto"
            style={{ transitionDelay: "0.2s" }}
          >
            <div className="relative w-[280px] h-[340px] sm:w-[340px] sm:h-[400px] mx-auto float-slow">
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-blue-600/40 to-cyan-400/20 blur-2xl" />
              <div className="relative w-full h-full rounded-[2rem] glass-strong overflow-hidden flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-2/3 h-2/3 opacity-90">
                  <defs>
                    <linearGradient id="avatarGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#22D3EE" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="100"
                    cy="72"
                    r="38"
                    fill="none"
                    stroke="url(#avatarGrad)"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M40 175 C40 125 65 105 100 105 C135 105 160 125 160 175"
                    fill="none"
                    stroke="url(#avatarGrad)"
                    strokeWidth="2.5"
                  />
                </svg>
                <div className="absolute inset-0 tech-grid opacity-40" />
                <img
                  src="WhatsApp Image 2026-08-08 at 17.36.02.jpeg"
                  alt="Retrato de John Wesley"
                />
                <div className="absolute top-4 left-4 mono text-[10px] text-cyan-300/80">
                  JW_DEV
                </div>
                <div className="absolute bottom-4 right-4 mono text-[10px] text-blue-300/80">
                  v2026
                </div>
              </div>
              <span className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-cyan-400/70 rounded-tl-xl" />
              <span className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-cyan-400/70 rounded-br-xl" />
            </div>
            <div
              className="glass rounded-2xl px-5 py-3 absolute -bottom-6 -left-4 sm:-left-10 flex items-center gap-3 reveal in"
              style={{ transitionDelay: "0.55s" }}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 pulse-dot" />
              <p className="mono text-xs text-gray-200">
                Disponível para freelas
              </p>
            </div>
          </div>
        </div>

        <a
          href="#sobre"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 hover:text-cyan-300 transition-colors"
        >
          <span className="mono text-[10px] tracking-[0.3em]">SCROLL</span>
          <i data-lucide="chevron-down" className="w-4 h-4 animate-bounce" />
        </a>
      </section>

      <div className="relative border-y border-blue-500/10 bg-[#070A10] py-5 overflow-hidden">
        <div className="marquee-track mono text-sm text-gray-500 tracking-wider">
          <span>REACT</span>
          <span>·</span>
          <span>TYPESCRIPT</span>
          <span>·</span>
          <span>NODE.JS</span>
          <span>·</span>
          <span>POSTGRESQL</span>
          <span>·</span>
          <span>TAILWIND CSS</span>
          <span>·</span>
          <span>PRISMA</span>
          <span>·</span>
          <span>REDES &amp; INFRAESTRUTURA</span>
          <span>·</span>
          <span>REACT</span>
          <span>·</span>
          <span>TYPESCRIPT</span>
          <span>·</span>
          <span>NODE.JS</span>
          <span>·</span>
          <span>POSTGRESQL</span>
          <span>·</span>
          <span>TAILWIND CSS</span>
          <span>·</span>
          <span>PRISMA</span>
          <span>·</span>
          <span>REDES &amp; INFRAESTRUTURA</span>
          <span>·</span>
        </div>
      </div>

      <section
        id="sobre"
        className="relative py-28 px-6 md:px-10 overflow-hidden"
      >
        <div className="glow-orb w-[400px] h-[400px] bg-blue-600/15 top-0 right-0" />
        <div className="max-w-7xl mx-auto relative grid lg:grid-cols-[0.9fr_1.1fr] gap-16 items-start">
          <div className="reveal-left">
            <span className="eyebrow">192.168.00.01 // sobre mim</span>
            <h2 className="display text-3xl md:text-4xl font-semibold mt-5 leading-tight">
              Da infraestrutura ao código: uma trajetória construída camada por
              camada.
            </h2>
          </div>
          <div className="reveal-right space-y-6 text-gray-400 leading-relaxed text-[15px] md:text-base">
            <p>
              Meu nome é John Wesley e sou apaixonado por tecnologia desde
              pequeno. Ao longo da minha trajetória, desenvolvi experiência em
              infraestrutura de TI, suporte técnico, manutenção de hardware e
              automação, sempre buscando aprender novas tecnologias e evoluir
              profissionalmente.
            </p>
            <p>
              Atualmente atuo como{" "}
              <span className="text-white font-medium">
                Auxiliar Técnico Jr na Avantia Tecnologia
              </span>
              , onde trabalho com infraestrutura, manutenção preventiva e
              corretiva, instalação e configuração de equipamentos, alarme e
              sistemas de segurança.
            </p>
            <p>
              Além da experiência em infraestrutura, venho expandindo minha
              atuação para o desenvolvimento de software, criando aplicações web
              e mobile modernas utilizando tecnologias como{" "}
              <span className="text-white font-medium">
                React, TypeScript, Node.js, Prisma e PostgreSQL
              </span>
              .
            </p>
            <p>
              Meu objetivo é unir conhecimento técnico, design e inovação para
              desenvolver soluções digitais que entreguem valor real às pessoas
              e empresas.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="glass rounded-2xl p-5">
                <i
                  data-lucide="server"
                  className="w-5 h-5 text-cyan-300 mb-2"
                />
                <p className="text-white text-sm font-medium">Infraestrutura</p>
                <p className="text-gray-500 text-xs mt-1">
                  Redes, hardware e automação
                </p>
              </div>
              <div className="glass rounded-2xl p-5">
                <i
                  data-lucide="code-2"
                  className="w-5 h-5 text-cyan-300 mb-2"
                />
                <p className="text-white text-sm font-medium">
                  Desenvolvimento
                </p>
                <p className="text-gray-500 text-xs mt-1">Web e full stack</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="experiencia"
        className="relative py-28 px-6 md:px-10 bg-[#070A10]"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20 reveal">
            <span className="eyebrow justify-center">
              registro de execução // carreira
            </span>
            <h2 className="display text-3xl md:text-4xl font-semibold mt-5">
              Experiência Profissional
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              Cada etapa somou uma nova competência — do suporte técnico à
              engenharia de software.
            </p>
          </div>
          <div className="relative pl-10 md:pl-0">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px timeline-line md:-translate-x-1/2" />
            <div className="relative mb-16 md:grid md:grid-cols-2 md:gap-12 reveal-left">
              <span className="absolute left-4 md:left-1/2 top-1.5 w-3 h-3 -translate-x-1/2 rounded-full bg-cyan-300 timeline-dot" />
              <div className="md:text-right md:pr-4">
                <span className="mono text-xs text-cyan-300">2026 — ATUAL</span>
                <h3 className="display text-xl font-semibold text-white mt-2">
                  Auxiliar Técnico Jr
                </h3>
                <p className="text-blue-400 text-sm mt-1">Avantia Tecnologia</p>
              </div>
              <div className="glass rounded-2xl p-6 mt-4 md:mt-0">
                <div className="flex flex-wrap gap-2">
                  <span className="tag">Infraestrutura</span>
                  <span className="tag">Cabeamento estruturado</span>
                  <span className="tag">Configuração de IP</span>
                  <span className="tag">Instalação de câmeras</span>
                  <span className="tag">Manutenção preventiva</span>
                </div>
              </div>
            </div>
            <div className="relative mb-16 md:grid md:grid-cols-2 md:gap-12 reveal-right">
              <span className="absolute left-4 md:left-1/2 top-1.5 w-3 h-3 -translate-x-1/2 rounded-full bg-blue-400 timeline-dot" />
              <div className="md:col-start-2 md:pl-4 md:order-2">
                <span className="mono text-xs text-cyan-300">2023 — 2024</span>
                <h3 className="display text-xl font-semibold text-white mt-2">
                  Estagiário de TI
                </h3>
                <p className="text-blue-400 text-sm mt-1">
                  Prefeitura de Barueri
                </p>
              </div>
              <div className="glass rounded-2xl p-6 mt-4 md:mt-0 md:order-1">
                <div className="flex flex-wrap gap-2 md:justify-end">
                  <span className="tag">Suporte técnico</span>
                  <span className="tag">Help Desk</span>
                  <span className="tag">Infraestrutura</span>
                  <span className="tag">Manutenção de hardware</span>
                  <span className="tag">Monitoramento de redes</span>
                  <span className="tag">Atendimento aos usuários</span>
                </div>
              </div>
            </div>
            <div className="relative md:grid md:grid-cols-2 md:gap-12 reveal-left">
              <span className="absolute left-4 md:left-1/2 top-1.5 w-3 h-3 -translate-x-1/2 rounded-full bg-cyan-300 timeline-dot" />
              <div className="md:text-right md:pr-4">
                <span className="mono text-xs text-cyan-300">2024 — 2025</span>
                <h3 className="display text-xl font-semibold text-white mt-2">
                  Aprendiz Administrativo
                </h3>
                <p className="text-blue-400 text-sm mt-1">
                  Hospital Municipal Dr. Francisco Moran
                </p>
              </div>
              <div className="glass rounded-2xl p-6 mt-4 md:mt-0">
                <div className="flex flex-wrap gap-2">
                  <span className="tag">Gestão documental</span>
                  <span className="tag">Controle logístico</span>
                  <span className="tag">Organização administrativa</span>
                  <span className="tag">Controle de estoque</span>
                  <span className="tag">Planilhas e indicadores</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="formacao" className="relative py-24 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 reveal">
            <span className="eyebrow justify-center">
              certificados // formação acadêmica
            </span>
            <h2 className="display text-3xl md:text-4xl font-semibold mt-5">
              Formação Acadêmica
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass rounded-2xl p-8 reveal-left tilt-card card-glow">
              <i
                data-lucide="graduation-cap"
                className="w-7 h-7 text-cyan-300 mb-4"
              />
              <h3 className="display text-lg font-semibold text-white">
                Curso Técnico em Informática
              </h3>
              <p className="text-gray-400 text-sm mt-2">
                ITB Brasílio Flores de Azevedo (FIEB)
              </p>
              <p className="mono text-xs text-blue-400 mt-4">
                CONCLUSÃO EM 2024
              </p>
            </div>
            <div className="glass rounded-2xl p-8 reveal-right tilt-card card-glow">
              <i
                data-lucide="radio-tower"
                className="w-7 h-7 text-cyan-300 mb-4"
              />
              <h3 className="display text-lg font-semibold text-white">
                Curso Técnico em Telecomunicações
              </h3>
              <p className="text-gray-400 text-sm mt-2">
                ITB Brasílio Flores de Azevedo (FIEB)
              </p>
              <p className="mono text-xs text-blue-400 mt-4">
                CONCLUSÃO EM 2023
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="skills"
        className="relative py-28 px-6 md:px-10 bg-[#070A10] overflow-hidden"
      >
        <div className="glow-orb w-[420px] h-[420px] bg-cyan-400/10 bottom-0 left-0" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16 reveal">
            <span className="eyebrow justify-center">stack.json</span>
            <h2 className="display text-3xl md:text-4xl font-semibold mt-5">
              Competências Técnicas
            </h2>
          </div>
          <div
            className="grid md:grid-cols-2 xl:grid-cols-4 gap-6"
            id="skillsGrid"
          >
            <div className="glass rounded-2xl p-6 reveal">
              <div className="flex items-center gap-2 mb-5">
                <i
                  data-lucide="layout-template"
                  className="w-5 h-5 text-blue-400"
                />
                <h3 className="display font-semibold text-white">Front-end</h3>
              </div>
              <div className="space-y-4">
                <div className="skill" data-level="90">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span>React</span>
                    <span className="mono text-cyan-300">90%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full">
                    <div className="skill-bar-fill h-full rounded-full" />
                  </div>
                </div>
                <div className="skill" data-level="85">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span>TypeScript</span>
                    <span className="mono text-cyan-300">85%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full">
                    <div className="skill-bar-fill h-full rounded-full" />
                  </div>
                </div>
                <div className="skill" data-level="92">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span>JavaScript</span>
                    <span className="mono text-cyan-300">92%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full">
                    <div className="skill-bar-fill h-full rounded-full" />
                  </div>
                </div>
                <div className="skill" data-level="88">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span>Tailwind CSS</span>
                    <span className="mono text-cyan-300">88%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full">
                    <div className="skill-bar-fill h-full rounded-full" />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="glass rounded-2xl p-6 reveal"
              style={{ transitionDelay: "0.08s" }}
            >
              <div className="flex items-center gap-2 mb-5">
                <i data-lucide="database" className="w-5 h-5 text-blue-400" />
                <h3 className="display font-semibold text-white">Back-end</h3>
              </div>
              <div className="space-y-4">
                <div className="skill" data-level="88">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span>Node.js</span>
                    <span className="mono text-cyan-300">88%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full">
                    <div className="skill-bar-fill h-full rounded-full" />
                  </div>
                </div>
                <div className="skill" data-level="80">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span>Express</span>
                    <span className="mono text-cyan-300">80%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full">
                    <div className="skill-bar-fill h-full rounded-full" />
                  </div>
                </div>
                <div className="skill" data-level="82">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span>Prisma</span>
                    <span className="mono text-cyan-300">82%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full">
                    <div className="skill-bar-fill h-full rounded-full" />
                  </div>
                </div>
                <div className="skill" data-level="85">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span>REST API</span>
                    <span className="mono text-cyan-300">85%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full">
                    <div className="skill-bar-fill h-full rounded-full" />
                  </div>
                </div>
                <div className="skill" data-level="78">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span>JWT</span>
                    <span className="mono text-cyan-300">78%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full">
                    <div className="skill-bar-fill h-full rounded-full" />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="glass rounded-2xl p-6 reveal"
              style={{ transitionDelay: "0.16s" }}
            >
              <div className="flex items-center gap-2 mb-5">
                <i data-lucide="hard-drive" className="w-5 h-5 text-blue-400" />
                <h3 className="display font-semibold text-white">
                  Banco de Dados
                </h3>
              </div>
              <div className="space-y-4">
                <div className="skill" data-level="86">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span>PostgreSQL</span>
                    <span className="mono text-cyan-300">86%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full">
                    <div className="skill-bar-fill h-full rounded-full" />
                  </div>
                </div>
                <div className="skill" data-level="75">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span>SQL Server</span>
                    <span className="mono text-cyan-300">75%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full">
                    <div className="skill-bar-fill h-full rounded-full" />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-5 mt-8">
                <i data-lucide="wrench" className="w-5 h-5 text-blue-400" />
                <h3 className="display font-semibold text-white">
                  Ferramentas
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="tool-chip">Git</span>
                <span className="tool-chip">GitHub</span>
                <span className="tool-chip">Railway</span>
                <span className="tool-chip">Vercel</span>
                <span className="tool-chip">Beekeeper Studio</span>
              </div>
            </div>
            <div
              className="glass rounded-2xl p-6 reveal"
              style={{ transitionDelay: "0.24s" }}
            >
              <div className="flex items-center gap-2 mb-5">
                <i data-lucide="network" className="w-5 h-5 text-blue-400" />
                <h3 className="display font-semibold text-white">
                  Infraestrutura
                </h3>
              </div>
              <div className="space-y-4">
                <div className="skill" data-level="90">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span>Redes</span>
                    <span className="mono text-cyan-300">90%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full">
                    <div className="skill-bar-fill h-full rounded-full" />
                  </div>
                </div>
                <div className="skill" data-level="88">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span>Cabeamento estruturado</span>
                    <span className="mono text-cyan-300">88%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full">
                    <div className="skill-bar-fill h-full rounded-full" />
                  </div>
                </div>
                <div className="skill" data-level="85">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span>Hardware</span>
                    <span className="mono text-cyan-300">85%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full">
                    <div className="skill-bar-fill h-full rounded-full" />
                  </div>
                </div>
                <div className="skill" data-level="82">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span>Segurança eletrônica</span>
                    <span className="mono text-cyan-300">82%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full">
                    <div className="skill-bar-fill h-full rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projetos" className="relative py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 reveal">
            <span className="eyebrow justify-center">
              deploy // vitrine de produtos
            </span>
            <h2 className="display text-3xl md:text-4xl font-semibold mt-5">
              Projetos
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              Uma seleção das páginas e aplicações que desenvolvi, do front ao
              deploy.
            </p>
          </div>
          <div
            className="flex flex-wrap justify-center gap-3 mb-14 reveal"
            id="filterBar"
          >
            {["todos", "frontend", "backend", "fullstack", "landing"].map(
              (filter) => (
                <button
                  key={filter}
                  type="button"
                  className={`filter-btn mono text-xs px-4 py-2 rounded-full border border-blue-500/25 ${activeFilter === filter ? "active" : ""}`}
                  data-filter={filter}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter === "todos" ? "TODOS" : filter.toUpperCase()}
                </button>
              ),
            )}
          </div>
          <div
            className="grid md:grid-cols-2 xl:grid-cols-3 gap-8"
            id="projectsGrid"
          >
            {filteredProjects.map((project, index) => (
              <div
                key={project.name}
                className="project-card glass rounded-3xl p-7 tilt-card card-glow"
                data-cat={project.category.join(",")}
                style={{ transitionDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center">
                    <i
                      data-lucide={project.icon}
                      className="w-6 h-6 text-cyan-300"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="mono text-[10px] px-3 py-1 rounded-full border border-emerald-400/30 text-emerald-300">
                    {project.status}
                  </span>
                </div>
                <h3 className="display text-xl font-semibold text-white">
                  {project.name}
                </h3>
                <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2 mt-5">
                  {project.tech.map((tech) => (
                    <span key={tech} className="tool-chip">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-7 pt-5 border-t border-white/5">
                  {project.repository && (
                    <a
                      href={project.repository}
                      target="_blank"
                      rel="noreferrer"
                      className="mono text-xs text-gray-300 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
                      aria-label={`Abrir código do projeto ${project.name} no GitHub`}
                    >
                      <i
                        data-lucide="code-2"
                        className="w-3.5 h-3.5"
                        aria-hidden="true"
                      />
                      Código
                    </a>
                  )}
                  <a
                    href="#contato"
                    className="mono text-xs text-gray-300 hover:text-cyan-300 flex items-center gap-1.5 transition-colors ml-auto"
                  >
                    <i
                      data-lucide="arrow-up-right"
                      className="w-3.5 h-3.5"
                      aria-hidden="true"
                    />{" "}
                    Saiba mais
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="stats"
        className="relative py-28 px-6 md:px-10 bg-[#070A10] overflow-hidden"
      >
        <div className="tech-grid absolute inset-0 opacity-60" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16 reveal">
            <span className="eyebrow justify-center">git log --stat</span>
            <h2 className="display text-3xl md:text-4xl font-semibold mt-5">
              Painel de Estatísticas
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { target: 12, label: "PROJETOS DESENVOLVIDOS" },
              { target: 18, label: "TECNOLOGIAS UTILIZADAS" },
              { target: 3, label: "ANOS DE EXPERIÊNCIA" },
              { target: 900, label: "HORAS DE DESENVOLVIMENTO" },
              { target: 640, label: "COMMITS" },
              { target: 45, suffix: "k+", label: "LINHAS DE CÓDIGO" },
              { target: 8, label: "CLIENTES ATENDIDOS" },
              { target: 100, suffix: "%", label: "DEDICAÇÃO EM CADA ENTREGA" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="glass rounded-2xl p-8 text-center reveal-scale"
                style={{ transitionDelay: `${index * 0.06}s` }}
              >
                <p className="display text-4xl font-bold text-white">
                  <span className="counter" data-target={stat.target}>
                    0
                  </span>
                  {stat.suffix || ""}
                </p>
                <p className="mono text-xs text-gray-500 mt-2 tracking-wide">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="soft-skills" className="relative py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <span className="eyebrow justify-center">protocolo humano</span>
            <h2 className="display text-3xl md:text-4xl font-semibold mt-5">
              Soft Skills
            </h2>
          </div>
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            id="softSkillsGrid"
          >
            {softSkills.map((skill, index) => (
              <div
                key={skill.name}
                className="glass rounded-2xl p-6 text-center reveal-scale tilt-card card-glow"
                style={{ transitionDelay: `${index * 0.05}s` }}
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center mb-4">
                  <i
                    data-lucide={skill.icon}
                    className="w-5 h-5 text-cyan-300"
                  />
                </div>
                <p className="text-white text-sm font-medium">{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contato"
        className="relative py-28 px-6 md:px-10 bg-[#070A10] overflow-hidden"
      >
        <div className="glow-orb w-[460px] h-[460px] bg-blue-600/20 top-0 left-1/3" />
        <div className="max-w-7xl mx-auto relative grid lg:grid-cols-[0.9fr_1.1fr] gap-14">
          <div className="reveal-left">
            <span className="eyebrow">porta 443 // aberta</span>
            <h2 className="display text-3xl md:text-4xl font-semibold mt-5 leading-tight">
              Vamos construir algo excelente juntos.
            </h2>
            <p className="text-gray-400 mt-5 leading-relaxed">
              Estou disponível para novos projetos, parcerias e oportunidades.
              Envie uma mensagem ou me encontre nos canais abaixo.
            </p>
            <div className="space-y-4 mt-10">
              <a href="https://github.com/bgjunior29" className="contact-link">
                <i data-lucide="code-2" className="w-5 h-5" />{" "}
                github.com/bgjunior29
              </a>
              <a
                href="https://www.linkedin.com/in/john-w-144763242/"
                className="contact-link"
              >
                <i data-lucide="briefcase-business" className="w-5 h-5" />{" "}
                linkedin.com/in/john-w-144763242
              </a>
              <a
                href="/curriculo-john-wesley-2026.pdf"
                download
                className="contact-link"
              >
                <i data-lucide="mail" className="w-5 h-5" /> Enviar mensagem
                pelo formulário
              </a>
              <a
                href="https://wa.me/5511968363530?text=ol%C3%A1%20%2C%20Tudo%20Bem%20%3F"
                className="contact-link"
              >
                <i data-lucide="message-circle" className="w-5 h-5" /> WhatsApp
              </a>
              <a href="#contato" className="contact-link">
                <i data-lucide="file-down" className="w-5 h-5" /> Baixar
                currículo (PDF)
              </a>
            </div>
          </div>
          <form
            id="contactForm"
            onSubmit={handleFormSubmit}
            acceptCharset="UTF-8"
            className="glass-strong rounded-3xl p-8 md:p-10 reveal-right space-y-5"
          >
            <input
              type="hidden"
              name="_subject"
              value="Novo contato pelo portfólio"
            />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />
            <input
              type="hidden"
              name="_autoresponse"
              value="Recebi sua mensagem e entrarei em contato em breve."
            />
            <input
              type="text"
              name="_honey"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
            />
            <input
              type="hidden"
              name="_next"
              value={`${window.location.origin}${window.location.pathname}`}
            />
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="mono text-xs text-gray-400">
                  NOME
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  className="w-full mt-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label htmlFor="email" className="mono text-xs text-gray-400">
                  E-MAIL
                </label>
                <input
                  required
                  type="email"
                  name="_replyto"
                  id="email"
                  autoComplete="email"
                  className="w-full mt-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600"
                  placeholder="voce@email.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="mono text-xs text-gray-400">
                ASSUNTO
              </label>
              <input
                required
                type="text"
                name="subject"
                id="subject"
                className="w-full mt-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600"
                placeholder="Sobre o que vamos falar?"
              />
            </div>
            <div>
              <label htmlFor="message" className="mono text-xs text-gray-400">
                MENSAGEM
              </label>
              <textarea
                required
                rows={5}
                name="message"
                id="message"
                className="w-full mt-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 resize-none"
                placeholder="Conte um pouco sobre o seu projeto..."
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary ripple w-full text-white font-medium py-3.5 rounded-xl inline-flex items-center justify-center gap-2"
            >
              {isSubmitting ? "Enviando..." : "Enviar mensagem"}{" "}
              <i
                data-lucide={isSubmitting ? "loader-circle" : "send"}
                className={`w-4 h-4 ${isSubmitting ? "animate-spin" : ""}`}
              />
            </button>
            <p
              className={`mono text-xs text-center ${formStatus.type === "success" ? "text-emerald-300" : "text-rose-300"} ${formStatus.message ? "" : "hidden"}`}
              role="status"
              aria-live="polite"
            >
              {formStatus.message}
            </p>
          </form>
        </div>
      </section>

      <footer className="relative border-t border-blue-500/10 pt-16 pb-8 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
          <div>
            <p className="display font-semibold text-lg">
              JOHN<span className="text-blue-500">WESLEY</span>
            </p>
            <p className="text-gray-500 text-sm mt-3 leading-relaxed">
              Desenvolvedor Full Stack, Designer e Profissional de Tecnologia da
              Informação.
            </p>
          </div>
          <div>
            <p className="mono text-xs text-gray-500 tracking-widest mb-4">
              LINKS RÁPIDOS
            </p>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <a
                href="#sobre"
                className="hover:text-cyan-300 transition-colors w-fit"
              >
                Sobre
              </a>
              <a
                href="#projetos"
                className="hover:text-cyan-300 transition-colors w-fit"
              >
                Projetos
              </a>
              <a
                href="#skills"
                className="hover:text-cyan-300 transition-colors w-fit"
              >
                Skills
              </a>
              <a
                href="#contato"
                className="hover:text-cyan-300 transition-colors w-fit"
              >
                Contato
              </a>
            </div>
          </div>
          <div>
            <p className="mono text-xs text-gray-500 tracking-widest mb-4">
              REDES SOCIAIS
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com/bgjunior29"
                target="_blank"
                rel="noreferrer"
                className="social-icon"
                aria-label="GitHub de John Wesley"
                title="GitHub"
              >
                <i
                  data-lucide="code-2"
                  className="w-4 h-4"
                  aria-hidden="true"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/john-w-144763242/"
                target="_blank"
                rel="noreferrer"
                className="social-icon"
                aria-label="LinkedIn de John Wesley"
                title="LinkedIn"
              >
                <i
                  data-lucide="briefcase-business"
                  className="w-4 h-4"
                  aria-hidden="true"
                />
              </a>
              <a
                href="https://wa.me/5511968363530"
                target="_blank"
                rel="noreferrer"
                className="social-icon"
                aria-label="WhatsApp de John Wesley"
                title="WhatsApp"
              >
                <i
                  data-lucide="message-circle"
                  className="w-4 h-4"
                  aria-hidden="true"
                />
              </a>
              <a
                href="#contato"
                className="social-icon"
                aria-label="Enviar e-mail para John Wesley"
                title="E-mail"
              >
                <i data-lucide="mail" className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 mt-14 pt-6 border-t border-white/5">
          <p className="mono text-xs text-gray-600">
            © {new Date().getFullYear()} John Wesley. Todos os direitos
            reservados.
          </p>
          <button
            id="backToTop"
            type="button"
            className="mono text-xs text-gray-400 hover:text-cyan-300 flex items-center gap-2 transition-colors"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Voltar ao topo <i data-lucide="arrow-up" className="w-3.5 h-3.5" />
          </button>
        </div>
      </footer>
    </>
  );
}

export default App;
