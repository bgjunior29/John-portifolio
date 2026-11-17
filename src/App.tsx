import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  BookOpen,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  Cake,
  ChevronDown,
  Code2,
  Database,
  Download,
  FileDown,
  GraduationCap,
  HardDrive,
  HeartPulse,
  LayoutTemplate,
  ListChecks,
  LoaderCircle,
  Menu,
  MessageCircle,
  MessageSquare,
  Network,
  PartyPopper,
  Puzzle,
  RadioTower,
  Scissors,
  Send,
  Server,
  Sparkles,
  SquareTerminal,
  Stethoscope,
  Users,
  UtensilsCrossed,
  Workflow,
  Wrench,
  X,
} from "lucide-react";

const navItems = [
  { id: "sobre", label: "SOBRE" },
  { id: "experiencia", label: "EXPERIÊNCIA" },
  { id: "skills", label: "SKILLS" },
  { id: "ia", label: "IA" },
  { id: "projetos", label: "PROJETOS" },
  { id: "stats", label: "STATUS" },
  { id: "contato", label: "CONTATO" },
];

const marqueeItems = [
  "REACT",
  "TYPESCRIPT",
  "NODE.JS",
  "POSTGRESQL",
  "TAILWIND CSS",
  "PRISMA",
  "CLAUDE CODE",
  "GITHUB COPILOT",
  "ACTIVEPIECES",
  "REDES & INFRAESTRUTURA",
];

const experiences = [
  {
    period: "2026 — ATUAL",
    role: "Auxiliar Técnico Jr",
    company: "Avantia Tecnologia",
    tags: [
      "Infraestrutura",
      "Cabeamento estruturado",
      "Configuração de IP",
      "Instalação de câmeras",
      "Manutenção preventiva",
    ],
  },
  {
    period: "2024 — 2025",
    role: "Aprendiz Administrativo",
    company: "Hospital Municipal Dr. Francisco Moran",
    tags: [
      "Gestão documental",
      "Controle logístico",
      "Organização administrativa",
      "Controle de estoque",
      "Planilhas e indicadores",
    ],
  },
  {
    period: "2023 — 2024",
    role: "Estagiário de TI",
    company: "Prefeitura de Barueri",
    tags: [
      "Suporte técnico",
      "Help Desk",
      "Infraestrutura",
      "Manutenção de hardware",
      "Monitoramento de redes",
      "Atendimento aos usuários",
    ],
  },
];

const skillGroups: Array<{
  title: string;
  icon: LucideIcon;
  skills: string[];
  tools?: string[];
}> = [
  {
    title: "Front-end",
    icon: LayoutTemplate,
    skills: [
      "React",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
    ],
  },
  {
    title: "Back-end",
    icon: Database,
    skills: [
      "Node.js",
      "Express",
      "Prisma",
      "REST API",
      "JWT",
    ],
  },
  {
    title: "Banco de Dados",
    icon: HardDrive,
    skills: [
      "PostgreSQL",
      "SQL Server",
    ],
    tools: ["Git", "GitHub", "Railway", "Vercel", "Beekeeper Studio"],
  },
  {
    title: "Infraestrutura",
    icon: Network,
    skills: [
      "Redes",
      "Cabeamento estruturado",
      "Hardware",
      "Segurança eletrônica",
    ],
  },
];

const aiTools: Array<{
  name: string;
  kind: string;
  icon: LucideIcon;
  desc: string;
  uses: string[];
}> = [
  {
    name: "Claude Code",
    kind: "AGENTE DE CÓDIGO",
    icon: SquareTerminal,
    desc: "Agente de programação no terminal que trabalha direto no repositório: implementa features, refatora, corrige bugs e revisa código comigo.",
    uses: ["Refatoração", "Debugging", "Code review", "Deploy"],
  },
  {
    name: "Claude",
    kind: "ASSISTENTE DE IA",
    icon: Bot,
    desc: "Parceiro de raciocínio para planejar arquitetura, estudar novas tecnologias, escrever documentação e destravar problemas complexos.",
    uses: ["Arquitetura", "Pesquisa", "Documentação"],
  },
  {
    name: "GitHub Copilot",
    kind: "PAIR PROGRAMMING",
    icon: Code2,
    desc: "Sugestões de código em tempo real no editor, acelerando tarefas repetitivas, testes e boilerplate no dia a dia.",
    uses: ["Autocomplete", "Testes", "Produtividade"],
  },
  {
    name: "Activepieces",
    kind: "AUTOMAÇÃO · CLOUD",
    icon: Workflow,
    desc: "Automação de fluxos no Activepieces Cloud: integrações entre aplicativos, webhooks, notificações e processos que rodam sozinhos.",
    uses: ["Workflows", "Webhooks", "Integrações"],
  },
];

const aiPipeline = [
  { label: "Planejamento", tool: "Claude" },
  { label: "Código", tool: "Claude Code + Copilot" },
  { label: "Automação", tool: "Activepieces" },
  { label: "Deploy", tool: "Vercel + Railway" },
];

const projects: Array<{
  name: string;
  desc: string;
  tech: string[];
  status: string;
  category: string[];
  icon: LucideIcon;
  url?: string;
  repository?: string;
}> = [
  {
    name: "MedPay",
    desc: "Marketplace moderno para produtos de saúde, com catálogo dinâmico, checkout integrado e painel administrativo.",
    tech: ["React", "TypeScript", "Prisma", "PostgreSQL", "Railway", "Vercel"],
    status: "Em produção",
    category: ["fullstack", "backend"],
    icon: Stethoscope,
    url: "https://medpayshopthree.vercel.app",
  },
  {
    name: "DioSalon",
    desc: "Landing page premium para barbearia com sistema de agendamentos online, venda de produtos e backend dedicado.",
    tech: ["Next.js", "TypeScript", "Node.js", "Railway", "Vercel"],
    status: "Em produção",
    category: ["fullstack", "landing"],
    icon: Scissors,
    url: "https://dio-salaon-static.vercel.app",
    repository: "https://github.com/bgjunior29/dioSal-o",
  },
  {
    name: "Judoces",
    desc: "Landing page premium para vendas de bolos, com pedidos pelo WhatsApp.",
    tech: ["TypeScript", "Node.js", "Railway", "Vercel"],
    status: "Concluído",
    category: ["fullstack", "landing"],
    icon: Cake,
    url: "https://ju-doces-two.vercel.app",
    repository: "https://github.com/bgjunior29/ju-doces",
  },
  {
    name: "Sabor do Bairro",
    desc: "Sistema integrado de delivery para restaurante: cardápio por categorias, carrinho, pedidos online, cadastro de clientes e entrega por região.",
    tech: ["React", "Vite", "Vercel"],
    status: "Em produção",
    category: ["fullstack", "frontend"],
    icon: UtensilsCrossed,
    url: "https://frontend-alpha-one-yvyt7h3r58.vercel.app",
  },
  {
    name: "Emagrecimento 30+",
    desc: "Landing page de vendas para e-book voltado a mulheres 30+, com copy persuasiva, seções de dor e solução e chamadas para conversão.",
    tech: ["React", "Vite", "Vercel"],
    status: "Em produção",
    category: ["frontend", "landing"],
    icon: HeartPulse,
    url: "https://emagrecimento-30.vercel.app",
  },
  {
    name: "Balada",
    desc: "Plataforma para descobrir eventos e baladas, com busca por clima, filtros de data e orçamento, casas em destaque e cadastro de usuários.",
    tech: ["React", "Vite", "Vercel"],
    status: "Em produção",
    category: ["frontend", "fullstack"],
    icon: PartyPopper,
    url: "https://balada-cd7s.vercel.app",
  },
  {
    name: "Novo Projeto",
    desc: "Próximo projeto em desenvolvimento. Tem uma ideia parecida? Vamos conversar sobre ela.",
    tech: ["Em breve"],
    status: "Em breve",
    category: ["fullstack"],
    icon: Sparkles,
  },
];

// Conta só projetos publicados (ignora o card "Em breve")
const publishedProjects = projects.filter(
  (project) => project.status !== "Em breve",
).length;

const projectFilters = ["todos", "frontend", "backend", "fullstack", "landing"];

// Só métricas verificáveis: projetos contados dos dados acima, anos e formações
// do histórico profissional/acadêmico, e repositórios públicos no GitHub.
const stats = [
  { target: publishedProjects, label: "PROJETOS ENTREGUES" },
  { target: 3, label: "ANOS DE EXPERIÊNCIA" },
  { target: 2, label: "FORMAÇÕES TÉCNICAS" },
  { target: 10, label: "REPOSITÓRIOS PÚBLICOS" },
];

const softSkills: Array<{ name: string; icon: LucideIcon }> = [
  { name: "Comunicação", icon: MessageSquare },
  { name: "Trabalho em Equipe", icon: Users },
  { name: "Capacidade Analítica", icon: BrainCircuit },
  { name: "Facilidade de Aprendizado", icon: BookOpen },
  { name: "Resolução de Problemas", icon: Puzzle },
  { name: "Organização", icon: ListChecks },
];

const WHATSAPP_URL =
  "https://wa.me/5511968363530?text=ol%C3%A1%20%2C%20Tudo%20Bem%20%3F";
const GITHUB_URL = "https://github.com/bgjunior29";
const LINKEDIN_URL = "https://www.linkedin.com/in/john-w-144763242/";
const RESUME_URL = "/curriculo-john-wesley-2026.pdf";

const inputClass =
  "w-full mt-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600";

function App() {
  const [activeFilter, setActiveFilter] = useState("todos");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const toTopRef = useRef<HTMLButtonElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submittedForm = event.currentTarget;

    const formData = new FormData(submittedForm);
    const values = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      subject: String(formData.get("subject") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      website: String(formData.get("website") || ""),
    };
    const errors: Record<string, string> = {};

    if (values.name.length < 2) {
      errors.name = "Digite seu nome (mínimo de 2 caracteres)";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "Digite um e-mail válido";
    }
    if (!values.subject) {
      errors.subject = "Digite um assunto";
    }
    if (values.message.length < 10) {
      errors.message = "A mensagem deve ter pelo menos 10 caracteres";
    }

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      submittedForm
        .querySelector<HTMLElement>(`[name="${Object.keys(errors)[0]}"]`)
        ?.focus();
      return;
    }

    setIsSubmitting(true);
    setFormStatus({ type: "", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.success === false) {
        throw new Error(
          response.status === 429 && result.error
            ? result.error
            : "Não foi possível enviar sua mensagem. Tente novamente ou fale comigo pelo WhatsApp.",
        );
      }

      submittedForm.reset();
      setFormErrors({});
      setFormStatus({
        type: "success",
        message: "Mensagem enviada com sucesso! Entrarei em contato em breve.",
      });
    } catch (error) {
      setFormStatus({ type: "error", message: (error as Error).message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearFieldError = (event: FormEvent<HTMLFormElement>) => {
    const field = (event.target as HTMLInputElement).name;
    if (formErrors[field]) {
      setFormErrors(({ [field]: _removed, ...rest }) => rest);
    }
  };

  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const cleanups: Array<() => void> = [];

    // Navbar e botão "voltar ao topo" (throttle por frame)
    let scrollQueued = false;
    const updateScroll = () => {
      scrollQueued = false;
      const y = window.scrollY;
      navRef.current?.classList.toggle("scrolled", y > 40);
      toTopRef.current?.classList.toggle("show", y > 600);
    };
    const onScroll = () => {
      if (scrollQueued) return;
      scrollQueued = true;
      requestAnimationFrame(updateScroll);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    updateScroll();
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    // Animações de entrada
    const revealEls = document.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right, .reveal-scale",
    );
    if (reduceMotion) {
      revealEls.forEach((el) => {
        el.classList.add("in");
      });
    } else {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("in");
            revealObserver.unobserve(entry.target);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
      );
      revealEls.forEach((el) => revealObserver.observe(el));
      cleanups.push(() => revealObserver.disconnect());
    }

    // Contadores
    const runCounter = (el: HTMLElement) => {
      const target = Number(el.dataset.target);
      if (reduceMotion) {
        el.textContent = String(target);
        return;
      }
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / 1400);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = String(Math.round(target * eased));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          runCounter(entry.target as HTMLElement);
          counterObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.5 },
    );
    document
      .querySelectorAll(".counter")
      .forEach((counter) => counterObserver.observe(counter));
    cleanups.push(() => counterObserver.disconnect());

    // Destaque do link ativo na navbar
    const navLinks = document.querySelectorAll<HTMLElement>("[data-nav]");
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) =>
            link.classList.toggle(
              "active",
              link.dataset.nav === entry.target.id,
            ),
          );
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navItems.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) sectionObserver.observe(section);
    });
    cleanups.push(() => sectionObserver.disconnect());

    // Ripple nos botões (delegação: funciona para elementos renderizados depois)
    const onClick = (event: MouseEvent) => {
      if (reduceMotion) return;
      const btn = (event.target as Element).closest?.<HTMLElement>(".ripple");
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const span = document.createElement("span");
      span.className = "ripple-el";
      span.style.left = `${event.clientX - rect.left}px`;
      span.style.top = `${event.clientY - rect.top}px`;
      btn.appendChild(span);
      window.setTimeout(() => span.remove(), 650);
    };
    document.addEventListener("click", onClick);
    cleanups.push(() => document.removeEventListener("click", onClick));

    // Cursor customizado, tilt e botões magnéticos (somente mouse)
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (finePointer && !reduceMotion && dot && ring) {
      root.classList.add("has-cursor");
      let mouseX = -100;
      let mouseY = -100;
      let ringX = -100;
      let ringY = -100;
      let ringFrame = 0;
      let tiltEl: HTMLElement | null = null;
      let magneticEl: HTMLElement | null = null;

      const place = (el: HTMLElement, x: number, y: number) => {
        el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      };
      const moveRing = () => {
        ringX += (mouseX - ringX) * 0.2;
        ringY += (mouseY - ringY) * 0.2;
        place(ring, ringX, ringY);
        ringFrame =
          Math.abs(mouseX - ringX) > 0.2 || Math.abs(mouseY - ringY) > 0.2
            ? requestAnimationFrame(moveRing)
            : 0;
      };

      const onPointerMove = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        mouseX = event.clientX;
        mouseY = event.clientY;
        root.classList.remove("cursor-out");
        place(dot, mouseX, mouseY);
        if (!ringFrame) ringFrame = requestAnimationFrame(moveRing);

        const target = event.target as Element;
        ring.classList.toggle(
          "active",
          !!target.closest?.("a, button, input, textarea, label"),
        );

        const nextTilt = target.closest?.<HTMLElement>(".tilt-card") ?? null;
        if (tiltEl && tiltEl !== nextTilt) tiltEl.style.transform = "";
        tiltEl = nextTilt;
        if (tiltEl) {
          const rect = tiltEl.getBoundingClientRect();
          const px = (event.clientX - rect.left) / rect.width - 0.5;
          const py = (event.clientY - rect.top) / rect.height - 0.5;
          tiltEl.style.transform = `perspective(700px) rotateX(${-py * 8}deg) rotateY(${px * 8}deg) scale(1.02)`;
        }

        const nextMagnetic =
          target.closest?.<HTMLElement>("[data-magnetic]") ?? null;
        if (magneticEl && magneticEl !== nextMagnetic)
          magneticEl.style.transform = "";
        magneticEl = nextMagnetic;
        if (magneticEl) {
          const rect = magneticEl.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          magneticEl.style.transform = `translate(${(x - rect.width / 2) * 0.18}px, ${(y - rect.height / 2) * 0.35}px)`;
          magneticEl.style.setProperty("--x", `${x}px`);
          magneticEl.style.setProperty("--y", `${y}px`);
        }
      };
      const onLeave = () => root.classList.add("cursor-out");

      document.addEventListener("pointermove", onPointerMove, {
        passive: true,
      });
      root.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        document.removeEventListener("pointermove", onPointerMove);
        root.removeEventListener("mouseleave", onLeave);
        cancelAnimationFrame(ringFrame);
        root.classList.remove("has-cursor");
      });
    }

    // Partículas do hero: pausam fora da tela / aba oculta
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx && !reduceMotion) {
      const LINK_DISTANCE = 130;
      let particles: Array<{
        x: number;
        y: number;
        vx: number;
        vy: number;
        r: number;
      }> = [];
      let frame = 0;
      let visible = true;
      let lastWidth = 0;

      const init = () => {
        const width = canvas.offsetWidth;
        const height = canvas.offsetHeight;
        canvas.width = width;
        canvas.height = height;
        lastWidth = width;
        const count = Math.min(
          width < 768 ? 28 : 60,
          Math.floor(width / 22),
        );
        particles = Array.from({ length: count }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 1.6 + 0.6,
        }));
      };

      const draw = () => {
        const { width, height } = canvas;
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
          ctx.moveTo(p.x + p.r, p.y);
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        });
        ctx.fillStyle = "rgba(96,165,250,0.75)";
        ctx.fill();

        ctx.lineWidth = 1;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i];
            const b = particles[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < LINK_DISTANCE * LINK_DISTANCE) {
              const d = Math.sqrt(distSq);
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = `rgba(59,130,246,${0.18 * (1 - d / LINK_DISTANCE)})`;
              ctx.stroke();
            }
          }
        }
        frame = requestAnimationFrame(draw);
      };

      const start = () => {
        if (!frame && visible && !document.hidden)
          frame = requestAnimationFrame(draw);
      };
      const stop = () => {
        cancelAnimationFrame(frame);
        frame = 0;
      };

      let resizeTimer = 0;
      const onResize = () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => {
          // Ignora resize só de altura (barra de endereço no mobile)
          if (canvas.offsetWidth !== lastWidth) init();
        }, 150);
      };
      const onVisibility = () => (document.hidden ? stop() : start());
      const canvasObserver = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      });

      init();
      start();
      canvasObserver.observe(canvas);
      window.addEventListener("resize", onResize);
      document.addEventListener("visibilitychange", onVisibility);
      cleanups.push(() => {
        stop();
        window.clearTimeout(resizeTimer);
        canvasObserver.disconnect();
        window.removeEventListener("resize", onResize);
        document.removeEventListener("visibilitychange", onVisibility);
      });
    }

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "todos") return projects;
    return projects.filter((project) =>
      project.category.includes(activeFilter),
    );
  }, [activeFilter]);

  return (
    <>
      <a href="#sobre" className="skip-link">
        Pular para o conteúdo
      </a>

      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
      <div className="cursor-ring" ref={ringRef} aria-hidden="true" />

      <header
        id="navbar"
        ref={navRef}
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
          <nav
            aria-label="Navegação principal"
            className="hidden lg:flex items-center gap-8 mono text-[13px] tracking-wide text-gray-300"
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                data-nav={item.id}
                className="nav-link hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="#contato"
            data-magnetic
            className="btn-primary hidden lg:inline-flex items-center gap-2 text-white text-sm font-medium px-5 py-2.5 rounded-full"
          >
            Vamos conversar
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </a>
          <button
            type="button"
            className="lg:hidden text-white p-1 -m-1"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobileMenu"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileOpen ? (
              <X className="w-7 h-7" aria-hidden="true" />
            ) : (
              <Menu className="w-7 h-7" aria-hidden="true" />
            )}
          </button>
        </div>

        <div
          id="mobileMenu"
          className={`lg:hidden ${mobileOpen ? "" : "hidden"} mt-4 glass-strong rounded-2xl p-6 flex flex-col gap-5 mono text-sm`}
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="mobile-link"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </header>

      <main>
        <section
          id="top"
          className="relative min-h-[100svh] flex items-center overflow-hidden pt-28 pb-16"
        >
          <div className="absolute inset-0 tech-grid" />
          <canvas ref={canvasRef} id="particles" aria-hidden="true" />
          <div className="glow-orb w-[520px] h-[520px] bg-blue-600/30 -top-40 -left-32" />
          <div className="glow-orb w-[420px] h-[420px] bg-cyan-400/20 top-1/3 -right-20" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-[1.15fr_0.85fr] gap-16 items-center w-full">
            <div>
              <div className="eyebrow mb-6 hero-in">
                status: 200 // disponível para novos projetos
              </div>
              <h1
                className="display font-semibold leading-[1.05] text-4xl sm:text-5xl md:text-6xl hero-in"
                style={{ animationDelay: "0.05s" }}
              >
                Olá, eu sou
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-300 bg-clip-text text-transparent">
                  John Wesley
                </span>
                <span className="type-cursor" />
              </h1>
              <p
                className="mono text-blue-300 text-sm md:text-base mt-6 tracking-wide hero-in"
                style={{ animationDelay: "0.12s" }}
              >
                Desenvolvedor Full Stack
              </p>
              <p
                className="text-gray-400 text-base md:text-lg leading-relaxed mt-6 max-w-xl hero-in"
                style={{ animationDelay: "0.18s" }}
              >
                Crio aplicações web completas com React, TypeScript e Node.js.
                Também trabalho com redes, hardware e infraestrutura de TI, e
                essa base me ajuda a entregar software com atenção a
                desempenho, segurança e operação.
              </p>
              <div
                className="flex flex-wrap gap-4 mt-10 hero-in"
                style={{ animationDelay: "0.24s" }}
              >
                <a
                  href="#projetos"
                  data-magnetic
                  className="btn-primary text-white font-medium px-7 py-3.5 rounded-full inline-flex items-center gap-2"
                >
                  Conheça meus projetos
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href="#sobre"
                  data-magnetic
                  className="btn-ghost text-white font-medium px-7 py-3.5 rounded-full"
                >
                  Sobre mim
                </a>
                <a
                  href={RESUME_URL}
                  download
                  data-magnetic
                  className="btn-ghost text-white font-medium px-7 py-3.5 rounded-full inline-flex items-center gap-2"
                >
                  <Download className="w-4 h-4" aria-hidden="true" /> Currículo
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
                className="flex items-center gap-6 sm:gap-8 mt-14 hero-in"
                style={{ animationDelay: "0.3s" }}
              >
                {[
                  { value: "3+", label: "ANOS DE EXPERIÊNCIA" },
                  { value: String(publishedProjects), label: "PROJETOS ENTREGUES" },
                  { value: "2", label: "FORMAÇÕES TÉCNICAS" },
                ].map((item, index) => (
                  <div key={item.label} className="flex items-center gap-6 sm:gap-8">
                    {index > 0 && (
                      <div className="w-px h-10 bg-blue-500/20" />
                    )}
                    <div>
                      <p className="display text-2xl font-semibold text-white">
                        {item.value}
                      </p>
                      <p className="mono text-[11px] text-gray-500 tracking-wide">
                        {item.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="relative mx-auto hero-in-scale"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="relative w-[280px] h-[340px] sm:w-[340px] sm:h-[400px] mx-auto float-slow">
                <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-blue-600/40 to-cyan-400/20 blur-2xl" />
                <div className="relative w-full h-full rounded-[2rem] glass-strong overflow-hidden">
                  <img
                    src="/profile.jpeg"
                    alt="Retrato de John Wesley"
                    width={589}
                    height={998}
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover object-[center_20%]"
                  />
                  <div className="absolute inset-0 tech-grid opacity-30" />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
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
              <div className="glass rounded-2xl px-5 py-3 absolute -bottom-6 -left-4 sm:-left-10 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 pulse-dot" />
                <p className="mono text-xs text-gray-200">
                  Disponível para freelas
                </p>
              </div>
            </div>
          </div>

          <a
            href="#sobre"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-gray-500 hover:text-cyan-300 transition-colors"
            aria-label="Rolar para a seção Sobre"
          >
            <span className="mono text-[10px] tracking-[0.3em]">SCROLL</span>
            <ChevronDown
              className="w-4 h-4 animate-bounce"
              aria-hidden="true"
            />
          </a>
        </section>

        <div
          className="relative border-y border-blue-500/10 bg-[#070A10] py-5 overflow-hidden"
          aria-hidden="true"
        >
          <div className="marquee-track mono text-sm text-gray-500 tracking-wider">
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <span key={index} className="flex items-center gap-12">
                {item}
                <span>·</span>
              </span>
            ))}
          </div>
        </div>

        <section
          id="sobre"
          className="relative py-28 px-6 md:px-10 overflow-hidden"
        >
          <div className="glow-orb w-[400px] h-[400px] bg-blue-600/15 top-0 right-0" />
          <div className="max-w-7xl mx-auto relative grid lg:grid-cols-[0.9fr_1.1fr] gap-16 items-start">
            <div className="reveal-left">
              <span className="eyebrow">192.168.0.1 // sobre mim</span>
              <h2 className="display text-3xl md:text-4xl font-semibold mt-5 leading-tight">
                Da infraestrutura ao código: uma trajetória construída camada
                por camada.
              </h2>
            </div>
            <div className="reveal-right space-y-6 text-gray-400 leading-relaxed text-[15px] md:text-base">
              <p>
                Meu nome é John Wesley e sou apaixonado por tecnologia desde
                pequeno. Ao longo da minha trajetória, desenvolvi experiência
                em infraestrutura de TI, suporte técnico, manutenção de
                hardware e automação, sempre buscando aprender novas
                tecnologias e evoluir profissionalmente.
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
                atuação para o desenvolvimento de software, criando aplicações
                web e mobile modernas utilizando tecnologias como{" "}
                <span className="text-white font-medium">
                  React, TypeScript, Node.js, Prisma e PostgreSQL
                </span>
                .
              </p>
              <p>
                No dia a dia, trabalho com ferramentas de IA como{" "}
                <span className="text-white font-medium">
                  Claude, Claude Code e GitHub Copilot
                </span>{" "}
                para acelerar o desenvolvimento, e com o{" "}
                <span className="text-white font-medium">Activepieces</span>{" "}
                para automatizar fluxos e integrações.
              </p>
              <p>
                Meu objetivo é unir conhecimento técnico, design e inovação
                para desenvolver soluções digitais que entreguem valor real às
                pessoas e empresas.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                <div className="glass rounded-2xl p-5">
                  <Server
                    className="w-5 h-5 text-cyan-300 mb-2"
                    aria-hidden="true"
                  />
                  <p className="text-white text-sm font-medium">
                    Infraestrutura
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    Redes, hardware e automação
                  </p>
                </div>
                <div className="glass rounded-2xl p-5">
                  <Code2
                    className="w-5 h-5 text-cyan-300 mb-2"
                    aria-hidden="true"
                  />
                  <p className="text-white text-sm font-medium">
                    Desenvolvimento
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    Web e full stack
                  </p>
                </div>
                <div className="glass rounded-2xl p-5 col-span-2 sm:col-span-1">
                  <Sparkles
                    className="w-5 h-5 text-cyan-300 mb-2"
                    aria-hidden="true"
                  />
                  <p className="text-white text-sm font-medium">
                    IA &amp; Automação
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    Claude, Copilot e Activepieces
                  </p>
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
            <ol className="relative pl-10 md:pl-0">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px timeline-line md:-translate-x-1/2" />
              {experiences.map((exp, index) => {
                const flipped = index % 2 === 1;
                return (
                  <li
                    key={exp.role}
                    className={`relative md:grid md:grid-cols-2 md:gap-12 ${index < experiences.length - 1 ? "mb-16" : ""} ${flipped ? "reveal-right" : "reveal-left"}`}
                  >
                    <span
                      className={`absolute left-4 md:left-1/2 top-1.5 w-3 h-3 -translate-x-1/2 rounded-full timeline-dot ${flipped ? "bg-blue-400" : "bg-cyan-300"}`}
                    />
                    <div
                      className={
                        flipped
                          ? "md:col-start-2 md:pl-4 md:order-2"
                          : "md:text-right md:pr-4"
                      }
                    >
                      <span className="mono text-xs text-cyan-300">
                        {exp.period}
                      </span>
                      <h3 className="display text-xl font-semibold text-white mt-2">
                        {exp.role}
                      </h3>
                      <p className="text-blue-400 text-sm mt-1">
                        {exp.company}
                      </p>
                    </div>
                    <div
                      className={`glass rounded-2xl p-6 mt-4 md:mt-0 ${flipped ? "md:order-1" : ""}`}
                    >
                      <div
                        className={`flex flex-wrap gap-2 ${flipped ? "md:justify-end" : ""}`}
                      >
                        {exp.tags.map((tag) => (
                          <span key={tag} className="tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
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
              {[
                {
                  title: "Curso Técnico em Informática",
                  year: "2024",
                  icon: GraduationCap,
                  reveal: "reveal-left",
                },
                {
                  title: "Curso Técnico em Telecomunicações",
                  year: "2023",
                  icon: RadioTower,
                  reveal: "reveal-right",
                },
              ].map((course) => (
                <div key={course.title} className={course.reveal}>
                  <div className="glass rounded-2xl p-8 tilt-card card-glow h-full">
                    <course.icon
                      className="w-7 h-7 text-cyan-300 mb-4"
                      aria-hidden="true"
                    />
                    <h3 className="display text-lg font-semibold text-white">
                      {course.title}
                    </h3>
                    <p className="text-gray-400 text-sm mt-2">
                      ITB Brasílio Flores de Azevedo (FIEB)
                    </p>
                    <p className="mono text-xs text-blue-400 mt-4">
                      CONCLUSÃO EM {course.year}
                    </p>
                  </div>
                </div>
              ))}
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
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
              {skillGroups.map((group, index) => (
                <div
                  key={group.title}
                  className="glass rounded-2xl p-6 reveal"
                  style={{ transitionDelay: `${index * 0.08}s` }}
                >
                  <div className="flex items-center gap-2 mb-5">
                    <group.icon
                      className="w-5 h-5 text-blue-400"
                      aria-hidden="true"
                    />
                    <h3 className="display font-semibold text-white">
                      {group.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span key={skill} className="tool-chip">
                        {skill}
                      </span>
                    ))}
                  </div>
                  {group.tools && (
                    <>
                      <div className="flex items-center gap-2 mb-5 mt-8">
                        <Wrench
                          className="w-5 h-5 text-blue-400"
                          aria-hidden="true"
                        />
                        <h3 className="display font-semibold text-white">
                          Ferramentas
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {group.tools.map((tool) => (
                          <span key={tool} className="tool-chip">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="ia" className="relative py-28 px-6 md:px-10 overflow-hidden">
          <div className="glow-orb w-[460px] h-[460px] bg-blue-600/15 -top-20 right-0" />
          <div className="max-w-7xl mx-auto relative">
            <div className="text-center mb-14 reveal">
              <span className="eyebrow justify-center">
                ai.config // fluxo de trabalho
              </span>
              <h2 className="display text-3xl md:text-4xl font-semibold mt-5">
                IA &amp; Automação
              </h2>
              <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                Ferramentas que uso para trabalhar todos os dias — IA para
                construir mais rápido e com mais qualidade, automação para
                tirar o trabalho repetitivo do caminho. Sempre com revisão
                humana em cada entrega.
              </p>
            </div>

            <ol
              className="flex flex-wrap items-center justify-center gap-3 mb-14 reveal"
              aria-label="Meu fluxo de trabalho com IA"
            >
              {aiPipeline.map((step, index) => (
                <li key={step.label} className="flex items-center gap-3">
                  <div className="glass rounded-xl px-4 py-2.5 text-center">
                    <p className="mono text-[10px] text-cyan-300 tracking-widest">
                      {String(index + 1).padStart(2, "0")} ·{" "}
                      {step.label.toUpperCase()}
                    </p>
                    <p className="text-white text-xs font-medium mt-0.5">
                      {step.tool}
                    </p>
                  </div>
                  {index < aiPipeline.length - 1 && (
                    <ArrowRight
                      className="w-4 h-4 text-blue-500/60 hidden sm:block"
                      aria-hidden="true"
                    />
                  )}
                </li>
              ))}
            </ol>

            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {aiTools.map((tool, index) => (
                <div
                  key={tool.name}
                  className="reveal"
                  style={{ transitionDelay: `${index * 0.08}s` }}
                >
                  <article className="glass rounded-2xl p-6 tilt-card card-glow h-full flex flex-col">
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center">
                        <tool.icon
                          className="w-6 h-6 text-cyan-300"
                          aria-hidden="true"
                        />
                      </div>
                      <span className="mono text-[10px] text-blue-300/80 tracking-wider text-right">
                        {tool.kind}
                      </span>
                    </div>
                    <h3 className="display text-lg font-semibold text-white">
                      {tool.name}
                    </h3>
                    <p className="text-gray-400 text-sm mt-3 leading-relaxed flex-1">
                      {tool.desc}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-5">
                      {tool.uses.map((use) => (
                        <span key={use} className="tag">
                          {use}
                        </span>
                      ))}
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="projetos"
          className="relative py-28 px-6 md:px-10 bg-[#070A10]"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 reveal">
              <span className="eyebrow justify-center">
                deploy // vitrine de produtos
              </span>
              <h2 className="display text-3xl md:text-4xl font-semibold mt-5">
                Projetos
              </h2>
              <p className="text-gray-500 mt-4 max-w-xl mx-auto">
                Uma seleção das páginas e aplicações que desenvolvi, do front
                ao deploy.
              </p>
            </div>
            <div
              className="flex flex-wrap justify-center gap-3 mb-14 reveal"
              role="group"
              aria-label="Filtrar projetos por categoria"
            >
              {projectFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={`filter-btn mono text-xs px-4 py-2 rounded-full border border-blue-500/25 ${activeFilter === filter ? "active" : ""}`}
                  aria-pressed={activeFilter === filter}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => {
                const upcoming = project.status === "Em breve";
                return (
                  <article
                    key={project.name}
                    className={`project-card glass rounded-3xl p-7 flex flex-col tilt-card card-glow ${upcoming ? "upcoming" : ""} ${project.url ? "has-link" : ""}`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center">
                        <project.icon
                          className="w-6 h-6 text-cyan-300"
                          aria-hidden="true"
                        />
                      </div>
                      <span
                        className={`mono text-[10px] px-3 py-1 rounded-full border ${upcoming ? "border-gray-500/40 text-gray-400" : "border-emerald-400/30 text-emerald-300"}`}
                      >
                        {project.status}
                      </span>
                    </div>
                    <h3 className="display text-xl font-semibold text-white">
                      {project.url ? (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="card-link"
                          aria-label={`Abrir o projeto ${project.name} em uma nova aba`}
                        >
                          {project.name}
                        </a>
                      ) : (
                        project.name
                      )}
                    </h3>
                    <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                      {project.desc}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-5 mb-7">
                      {project.tech.map((tech) => (
                        <span key={tech} className="tool-chip">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 mt-auto pt-5 border-t border-white/5">
                      {project.repository && (
                        <a
                          href={project.repository}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative z-10 mono text-xs text-gray-300 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
                          aria-label={`Abrir código do projeto ${project.name} no GitHub`}
                        >
                          <Code2 className="w-3.5 h-3.5" aria-hidden="true" />
                          Código
                        </a>
                      )}
                      {project.url ? (
                        <span
                          className="project-visit mono text-xs text-cyan-300 flex items-center gap-1.5 ml-auto"
                          aria-hidden="true"
                        >
                          Ver projeto
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      ) : (
                        <a
                          href="#contato"
                          className="relative z-10 mono text-xs text-gray-300 hover:text-cyan-300 flex items-center gap-1.5 transition-colors ml-auto"
                        >
                          <ArrowUpRight
                            className="w-3.5 h-3.5"
                            aria-hidden="true"
                          />
                          {upcoming ? "Quero um projeto assim" : "Saiba mais"}
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="stats" className="relative py-28 px-6 md:px-10 overflow-hidden">
          <div className="tech-grid absolute inset-0 opacity-60" />
          <div className="max-w-7xl mx-auto relative">
            <div className="text-center mb-16 reveal">
              <span className="eyebrow justify-center">git log --stat</span>
              <h2 className="display text-3xl md:text-4xl font-semibold mt-5">
                Painel de Estatísticas
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="stat-card glass rounded-2xl p-6 md:p-8 text-center reveal-scale"
                  style={{ transitionDelay: `${index * 0.06}s` }}
                >
                  <p className="display text-3xl md:text-4xl font-bold text-white">
                    <span className="counter" data-target={stat.target}>
                      0
                    </span>
                  </p>
                  <p className="mono text-[11px] md:text-xs text-gray-500 mt-2 tracking-wide">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="soft-skills"
          className="relative py-28 px-6 md:px-10 bg-[#070A10]"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 reveal">
              <span className="eyebrow justify-center">protocolo humano</span>
              <h2 className="display text-3xl md:text-4xl font-semibold mt-5">
                Soft Skills
              </h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {softSkills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="reveal-scale"
                  style={{ transitionDelay: `${index * 0.05}s` }}
                >
                  <div className="glass rounded-2xl p-6 text-center tilt-card card-glow h-full">
                    <div className="w-12 h-12 mx-auto rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center mb-4">
                      <skill.icon
                        className="w-5 h-5 text-cyan-300"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="text-white text-sm font-medium">
                      {skill.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contato"
          className="relative py-28 px-6 md:px-10 overflow-hidden"
        >
          <div className="glow-orb w-[460px] h-[460px] bg-blue-600/20 top-0 left-1/3" />
          <div className="max-w-7xl mx-auto relative grid lg:grid-cols-[0.9fr_1.1fr] gap-14">
            <div className="reveal-left">
              <span className="eyebrow">porta 443 // aberta</span>
              <h2 className="display text-3xl md:text-4xl font-semibold mt-5 leading-tight">
                Vamos construir algo excelente juntos.
              </h2>
              <p className="text-gray-400 mt-5 leading-relaxed">
                Estou disponível para novos projetos, parcerias e
                oportunidades. Envie uma mensagem ou me encontre nos canais
                abaixo.
              </p>
              <div className="space-y-4 mt-10">
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  <Code2 className="w-5 h-5" aria-hidden="true" />
                  github.com/bgjunior29
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  <BriefcaseBusiness className="w-5 h-5" aria-hidden="true" />
                  linkedin.com/in/john-w-144763242
                </a>
                <a href={RESUME_URL} download className="contact-link">
                  <FileDown className="w-5 h-5" aria-hidden="true" />
                  Baixar currículo (PDF)
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                  WhatsApp
                </a>
              </div>
            </div>
            <form
              id="contactForm"
              onSubmit={handleFormSubmit}
              onInput={clearFieldError}
              noValidate
              acceptCharset="UTF-8"
              className="glass-strong rounded-3xl p-8 md:p-10 reveal-right space-y-5"
            >
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Não preencha este campo</label>
                <input
                  type="text"
                  name="website"
                  id="website"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
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
                    maxLength={120}
                    autoComplete="name"
                    aria-invalid={!!formErrors.name}
                    aria-describedby={formErrors.name ? "name-error" : undefined}
                    className={inputClass}
                    placeholder="Seu nome"
                  />
                  {formErrors.name && (
                    <p id="name-error" className="text-rose-300 text-xs mt-2">
                      {formErrors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mono text-xs text-gray-400"
                  >
                    E-MAIL
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    id="email"
                    maxLength={254}
                    autoComplete="email"
                    inputMode="email"
                    aria-invalid={!!formErrors.email}
                    aria-describedby={
                      formErrors.email ? "email-error" : undefined
                    }
                    className={inputClass}
                    placeholder="voce@email.com"
                  />
                  {formErrors.email && (
                    <p id="email-error" className="text-rose-300 text-xs mt-2">
                      {formErrors.email}
                    </p>
                  )}
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
                  maxLength={160}
                  aria-invalid={!!formErrors.subject}
                  aria-describedby={
                    formErrors.subject ? "subject-error" : undefined
                  }
                  className={inputClass}
                  placeholder="Sobre o que vamos falar?"
                />
                {formErrors.subject && (
                  <p id="subject-error" className="text-rose-300 text-xs mt-2">
                    {formErrors.subject}
                  </p>
                )}
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
                  maxLength={5000}
                  aria-invalid={!!formErrors.message}
                  aria-describedby={
                    formErrors.message ? "message-error" : undefined
                  }
                  className={`${inputClass} resize-none`}
                  placeholder="Conte um pouco sobre o seu projeto..."
                />
                {formErrors.message && (
                  <p id="message-error" className="text-rose-300 text-xs mt-2">
                    {formErrors.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary ripple w-full text-white font-medium py-3.5 rounded-xl inline-flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
              >
                {isSubmitting ? "Enviando..." : "Enviar mensagem"}
                {isSubmitting ? (
                  <LoaderCircle
                    className="w-4 h-4 animate-spin"
                    aria-hidden="true"
                  />
                ) : (
                  <Send className="w-4 h-4" aria-hidden="true" />
                )}
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
      </main>

      <footer className="relative border-t border-blue-500/10 pt-16 pb-8 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
          <div>
            <p className="display font-semibold text-lg">
              JOHN<span className="text-blue-500">WESLEY</span>
            </p>
            <p className="text-gray-500 text-sm mt-3 leading-relaxed">
              Desenvolvedor Full Stack, Designer e Profissional de Tecnologia
              da Informação.
            </p>
          </div>
          <div>
            <p className="mono text-xs text-gray-500 tracking-widest mb-4">
              LINKS RÁPIDOS
            </p>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              {[
                { href: "#sobre", label: "Sobre" },
                { href: "#projetos", label: "Projetos" },
                { href: "#skills", label: "Skills" },
                { href: "#ia", label: "IA & Automação" },
                { href: "#contato", label: "Contato" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-cyan-300 transition-colors w-fit"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="mono text-xs text-gray-500 tracking-widest mb-4">
              REDES SOCIAIS
            </p>
            <div className="flex gap-3">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="GitHub de John Wesley"
                title="GitHub"
              >
                <Code2 className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="LinkedIn de John Wesley"
                title="LinkedIn"
              >
                <BriefcaseBusiness className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="WhatsApp de John Wesley"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="#contato"
                className="social-icon"
                aria-label="Enviar mensagem para John Wesley"
                title="Mensagem"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 mt-14 pt-6 border-t border-white/5">
          <p className="mono text-xs text-gray-600">
            © {new Date().getFullYear()} John Wesley. Todos os direitos
            reservados.
          </p>
        </div>
      </footer>

      <button
        ref={toTopRef}
        type="button"
        className="to-top"
        aria-label="Voltar ao topo"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUp className="w-5 h-5" aria-hidden="true" />
      </button>
    </>
  );
}

export default App;
