/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, FormEvent, useEffect } from "react";
import { 
  Shield, 
  UserCheck, 
  Trash2,
  Building2, 
  Users, 
  Phone, 
  MessageSquare,
  Wrench,
  ChevronRight,
  ChevronDown,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  ExternalLink,
  ConciergeBell,
  Eye,
  CheckCircle2,
  Sparkles,
  Menu,
  X,
  Send,
  FileText,
  Award,
  Briefcase,
  ThumbsUp,
  Check,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
// @ts-ignore
import poolImage from "./assets/images/condominio_piscina_1779811713273.png";

// Logo Component
const Logo = ({ className = "", invert = false }: { className?: string; invert?: boolean }) => {
  const [imgSrc, setImgSrc] = useState("/2.png");
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`flex-shrink-0 items-center flex gap-3 ${className}`}>
      {!hasError ? (
        <img 
          src={imgSrc} 
          alt="Porto Terceirização Logo" 
          className="h-11 md:h-14 w-auto object-contain transition-all duration-300 hover:scale-102"
          referrerPolicy="no-referrer"
          onError={() => {
            setHasError(true);
          }}
        />
      ) : (
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C5A059] to-[#9E7D3B] flex items-center justify-center font-bold text-white text-lg shadow-md border border-[#C5A059]/30">
            P
          </div>
          <div className="flex flex-col text-left">
            <span className="text-sm font-extrabold tracking-wider text-white">PORTO</span>
            <span className="text-[8px] tracking-widest font-bold text-[#C5A059] -mt-1 uppercase">Terceirização</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Resilient Image Component with polished fallback to prevent broken images
const SafeImage = ({ 
  src, 
  alt, 
  className = "", 
  fallbackIcon: FallbackIcon, 
  fallbackTitle = "Serviço Porto" 
}: { 
  src: string; 
  alt: string; 
  className?: string; 
  fallbackIcon: React.ComponentType<any>; 
  fallbackTitle?: string; 
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  return (
    <div className="relative w-full h-full bg-[#14283D] flex items-center justify-center overflow-hidden">
      {!hasError ? (
        <img 
          src={imgSrc} 
          alt={alt} 
          className={`${className} transition-opacity duration-300`}
          referrerPolicy="no-referrer"
          onError={() => {
            if (imgSrc !== "/@portoterceirização.png") {
              setImgSrc("/@portoterceirização.png");
            } else {
              setHasError(true);
            }
          }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#14283D] to-[#1E3B5C] flex flex-col items-center justify-center p-6 text-center text-white space-y-3">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-[#C5A059] shadow-inner border border-white/5 animate-pulse">
            <FallbackIcon className="w-8 h-8 stroke-[1.5]" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-sm tracking-wide text-white uppercase">{fallbackTitle}</h4>
            <p className="text-[11px] text-slate-350 leading-relaxed font-light max-w-[200px] mx-auto">
              Compromisso, rigor operacional e excelência Porto.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  // Navigation & Menu States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeServiceTab, setActiveServiceTab] = useState<string>("all");
  
  // Selected Service details modal
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<any | null>(null);

  // Track Page Views and Button Clicks using Meta Pixel (Pixel ID: 1514891233318621)
  useEffect(() => {
    console.log("Meta Pixel context tracking initialized.");

    // Global event listener for button and click tracking
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Find nearest button, link, or custom interactive element
      const interactiveEl = target.closest("button, a, [role='button']") as HTMLElement | null;
      if (!interactiveEl) return;

      // Retrieve identifying text or class or properties
      const text = interactiveEl.innerText?.trim() || interactiveEl.getAttribute("aria-label") || interactiveEl.title || "Interactive Element";
      const id = interactiveEl.id || "";
      const isLink = interactiveEl.tagName.toLowerCase() === "a";
      const href = interactiveEl.getAttribute("href") || "";

      // Call FBQ safely
      const fbq = (window as any).fbq;
      if (typeof fbq === "function") {
        // Track general click event as custom event
        fbq("trackCustom", "ButtonClick", {
          text: text,
          id: id,
          tag: interactiveEl.tagName,
          isLink: isLink,
          href: href,
          url: window.location.href,
          timestamp: new Date().toISOString()
        });

        // Trigger Standard Pixel events for specific user conversions
        const upperText = text.toUpperCase();
        if (
          upperText.includes("WHATSAPP") || 
          upperText.includes("ORÇAMENTO") || 
          upperText.includes("FALAR NO") ||
          upperText.includes("CONVERSAR") ||
          upperText.includes("CONTATO") ||
          upperText.includes("CHAMAR")
        ) {
          fbq("track", "Lead", {
            content_name: text,
            content_category: "Button Contact Click",
            value: 10.0,
            currency: "BRL"
          });
        } else if (
          upperText.includes("CALCULAR") || 
          upperText.includes("SIMULAR") || 
          upperText.includes("SIMULAÇÃO") ||
          upperText.includes("ENVIAR SOLICITAÇÃO")
        ) {
          fbq("track", "CustomizeProduct", {
            content_name: text,
            content_category: "Calculator Click"
          });
        }
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  // Quote Calculator states
  const [calcPropertyType, setCalcPropertyType] = useState<string>("condominio");
  const [calcServices, setCalcServices] = useState<string[]>(["portaria"]);
  const [calcShift, setCalcShift] = useState<string>("12x36_diurno");
  const [calcName, setCalcName] = useState<string>("");
  const [calcPhone, setCalcPhone] = useState<string>("");
  const [calcEmail, setCalcEmail] = useState<string>("");
  const [calcMessage, setCalcMessage] = useState<string>("");
  const [calcEstimated, setCalcEstimated] = useState<boolean>(false);

  // General Form Submission states
  const [contactName, setContactName] = useState<string>("");
  const [contactEmail, setContactEmail] = useState<string>("");
  const [contactPhone, setContactPhone] = useState<string>("");
  const [contactMessage, setContactMessage] = useState<string>("");
  const [contactService, setContactService] = useState<string>("portaria");
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  // New Quick Contact Form states (replacing Sobre Nós)
  const [quickContactName, setQuickContactName] = useState<string>("");
  const [quickContactCompany, setQuickContactCompany] = useState<string>("");
  const [quickContactPhone, setQuickContactPhone] = useState<string>("");
  const [quickContactCity, setQuickContactCity] = useState<string>("");
  const [quickContactService, setQuickContactService] = useState<string>("portaria");
  const [quickContactMessage, setQuickContactMessage] = useState<string>("");
  const [quickFormSubmitted, setQuickFormSubmitted] = useState<boolean>(false);

  // FAQ Accordion states
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Hover state for floating WhatsApp banner
  const [isWhatsappHovered, setIsWhatsappHovered] = useState<boolean>(false);

  // Services detailed configuration
  const services = [
    {
      id: "portaria",
      title: "Portaria Controlada 24h",
      badge: "Segurança & Controle",
      shortDesc: "Controle de acesso rigoroso e profissional para condomínios e empresas de alto padrão.",
      description: "Nossa equipe de portaria é treinada exaustivamente em gestão de acessos, triagem de prestadores de serviço, identificação documental e operação de sistemas modernos de clausura. Garantimos um ambiente seguro com cortesia e alto nível de procedimentos preventivos.",
      features: [
        "Identificação eletrônica de visitantes",
        "Protocolos de segurança antissequestro",
        "Procedimentos específicos para recebimento de encomendas",
        "Suporte técnico operacional 24 horas",
        "Sustituição ágil de equipe sem custo adicional"
      ],
      icon: <Shield className="w-6 h-6" />
    },
    {
      id: "vigia",
      title: "Ronda e Vigia Patrimonial",
      badge: "Vigilância Ativa",
      shortDesc: "Monitoramento constante com foco em prevenção de invasões, perdas e danos.",
      description: "Profissionais capacitados para monitorar pontos estratégicos do seu condomínio ou empresa. Com rondas preventivas programadas e postura dissuasiva rigorosa, nossos vigias são o elo vital para neutralizar pontos de vulnerabilidade antes que se tornem problemas.",
      features: [
        "Rondas com bastão de controle eletrônico",
        "Relatórios diários de ocorrências",
        "Postura alerta e comunicação integrada via rádio",
        "Integração direta com o centro de apoio Porto",
        "Vistoria minuciosa de perímetros e portões"
      ],
      icon: <Eye className="w-6 h-6" />
    },
    {
      id: "limpeza",
      title: "Limpeza Profissional Corporativa",
      badge: "Higiene & Conservação",
      shortDesc: "Manutenção higiênica de áreas comuns com cronograma técnico personalizado.",
      description: "Oferecemos limpeza de alto rendimento com maquinário profissional e cronograma rígido. Nossos agentes de limpeza aplicam técnicas setoriais apropriadas para cada tipo de piso e superfície, mantendo o condomínio ou empresa com visual impecável e aroma agradável.",
      features: [
        "Cronograma quinzenal e diário sob medida",
        "Equipamentos e EPIs de última geração",
        "Uso racional e ecológico de produtos concentrados",
        "Higienização profunda de áreas de alto tráfego",
        "Equipe treinada para atuar sem interferir no fluxo normal"
      ],
      icon: <Sparkles className="w-6 h-6" />
    },
    {
      id: "asg",
      title: "Auxiliar de Serviços Gerais (ASG)",
      badge: "Produtividade Completa",
      shortDesc: "Apoio operacional polivalente para o perfeito funcionamento diário das suas instalações.",
      description: "O suporte essencial para pequenos reparos, movimentação de insumos, carregamento, pequenas manutenções de áreas comuns e apoio operacional direto à gerência predial ou síndico. Máxima versatilidade com eficiência e rapidez.",
      features: [
        "Polivalência para demandas cotidianas",
        "Organização de depósitos e lixeiras prediais",
        "Apoio para eventos e mudanças internas",
        "Atendimento imediato a solicitações do zelador",
        "Perfil pró-ativo e focado em soluções"
      ],
      icon: <Users className="w-6 h-6" />
    },
    {
      id: "pos-obra",
      title: "Limpeza Pós-Obra Ultra Especializada",
      badge: "Calibração Final do Espaço",
      shortDesc: "Remoção crítica de resíduos de construção, cimento e poeira fina com polimento fino.",
      description: "A limpeza mais especializada do mercado. Retiramos restos de argamassa, tintas, rejunte e silicone de vidros, esquadrias, pisos nobres e revestimentos, entregando o imóvel pronto e reluzente para decoração ou habitação definitiva.",
      features: [
        "Remoção química ecológica de restos de cimento",
        "Polimento ultrassônico de metais e vidros",
        "Aspiração cirúrgica de poeira ultrafina (gesso)",
        "Equipe blindada e treinada para não riscar revestimentos nobres",
        "Vistoria de qualidade Porto com entrega garantida"
      ],
      icon: <Trash2 className="w-6 h-6" />
    },
    {
      id: "manutencao",
      title: "Manutenção Preventiva Predial",
      badge: "Conservação Estrutural",
      shortDesc: "Técnicos residentes ou volantes para pequenos reparos elétricos, hidráulicos e civis.",
      description: "Garantia de que a infraestrutura predial estará sempre funcionando plenamente. Realizamos vistorias periódicas na iluminação das garagens, bombas de água, portões eletrônicos e encanamentos primários, evitando custos catastróficos de quebra inesperada.",
      features: [
        "Inspeções preventivas semanais documentadas",
        "Reparo rápido de iluminação comum e sensores",
        "Checklist rigoroso de bombas e geradores de emergência",
        "Apoio imediato em emergências hidráulicas comuns",
        "Preserva o valor de mercado do seu patrimônio predial"
      ],
      icon: <Wrench className="w-6 h-6" />
    }
  ];

  const benefits = [
    {
      title: "Risco Trabalhista Zero",
      desc: "Nós assumimos 100% dos encargos sociais, trabalhistas e previdenciários. Sua empresa ou condomínio tem total blindagem jurídica.",
      icon: <UserCheck className="w-10 h-10 text-porto-gold" />
    },
    {
      title: "Supervisão Ativa e Frequente",
      desc: "Supervisores efetuam visitas técnicas de surpresa frequentes para auditar o padrão de serviço e garantir o cumprimento de regulamentos.",
      icon: <Award className="w-10 h-10 text-porto-gold" />
    },
    {
      title: "Substituição Instantânea (Backup)",
      desc: "Se houver falta ou licenças médicas de qualquer funcionário terceirizado, nossos agentes reserva entram em ação em tempo recorde.",
      icon: <Clock className="w-10 h-10 text-porto-gold" />
    },
    {
      title: "Treinamento Constante (Porto Academy)",
      desc: "Nossos profissionais são capacitados constantemente em relacionamento com o público, postura pessoal, ética profissional e tecnologia preventiva.",
      icon: <Briefcase className="w-10 h-10 text-porto-gold" />
    }
  ];

  const faqs = [
    {
      question: "Como funciona a contratação e quanto tempo leva para iniciar?",
      answer: "Após o fechamento do contrato comercial, realizamos uma vistoria técnica minuciosa detalhando as rotinas. O tempo de Setup operacional e alocação da equipe varia entre 5 a 10 dias úteis, garantindo o processo de seleção rigorosa."
    },
    {
      question: "O que acontece se um funcionário faltar ou adoecer?",
      answer: "A Porto possui uma equipe de reserva técnica ativa (plantonistas). Caso um funcionário falte por motivos de saúde ou transporte, nosso sistema interno de controle operacional é acionado, enviando o backup para o posto antes do início do turno de trabalho."
    },
    {
      question: "Quais são as certidões e garantias de conformidade legal que vocês oferecem?",
      answer: "Disponibilizamos mensalmente ao cliente todas as certidões negativas de débitos federais, tributários, de FGTS, certidões trabalhistas conjuntas e comprovantes individuais de recolhimento dos encargos previdenciários de cada trabalhador alocado no seu posto."
    },
    {
      question: "Vocês atendem quais cidades além de João Pessoa?",
      answer: "Nossa sede principal é em João Pessoa, Paraíba, onde concentramos nosso fluxo de suporte logístico. Atendemos prioritariamente a região metropolitana de João Pessoa (Cabedelo, Santa Rita, Bayeux, Conde e arredores), garantindo proximidade e velocidade crítica de suporte."
    },
    {
      question: "Os materiais de limpeza e ferramentas estão inclusos nos pacotes?",
      answer: "Os contratos podem ser moldados 'Com Fornecimento de Materiais' ou 'Apenas Mão de Obra'. Na modalidade completa, a Porto assume todos os insumos, produtos concentrados biodegradáveis, carrinhos multifunção e maquinários especializados."
    }
  ];

  const handleCalcServiceToggle = (id: string) => {
    if (calcServices.includes(id)) {
      setCalcServices(calcServices.filter(s => s !== id));
    } else {
      setCalcServices([...calcServices, id]);
    }
  };

  const handleCalculatorSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!calcName || !calcPhone) {
      alert("Por favor, preencha Nome e WhatsApp para enviar sua solicitação de orçamento.");
      return;
    }
    // Meta Pixel Lead tracking
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead", {
        content_name: "Simulador de Orçamento",
        content_category: "Calculador de Custos",
        value: 15.0,
        currency: "BRL"
      });
    }
    setCalcEstimated(true);
    triggerWhatsAppWithCalculator();
  };

  const handleGeneralFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactPhone || !contactEmail) {
      alert("Por favor, preencha os campos obrigatórios (Nome, E-mail e Telefone).");
      return;
    }
    // Meta Pixel Lead tracking
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead", {
        content_name: "Contato Geral",
        content_category: "Formulário de Contato",
        value: 10.0,
        currency: "BRL"
      });
    }
    setFormSubmitted(true);
    triggerWhatsAppGeneral();
  };

  // Prepares personalized WhatsApp message
  const triggerWhatsAppWithCalculator = () => {
    const propertyLabel = calcPropertyType === "condominio" ? "Condomínio" : calcPropertyType === "empresa" ? "Empresa" : "Outro";
    const selectedSrvNames = calcServices.map(sid => services.find(s => s.id === sid)?.title || sid).join(", ");
    const shiftLabel = calcShift.replace("_", " ");
    
    let text = `Olá Porto! Gostaria de um orçamento detalhado.\n\n*Formulário de Orçamento Rápido*\n- *Nome:* ${calcName}\n- *WhatsApp:* ${calcPhone}`;
    if (calcEmail) {
      text += `\n- *E-mail:* ${calcEmail}`;
    }
    text += `\n- *Tipo de Estabelecimento:* ${propertyLabel}\n- *Serviços Selecionados:* ${selectedSrvNames}\n- *Escala Desejada:* ${shiftLabel}`;
    if (calcMessage) {
      text += `\n- *Observações:* ${calcMessage}`;
    }
    const url = `https://wa.me/5583987417032?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const triggerWhatsAppGeneral = () => {
    const text = `Olá Porto! Meu nome é ${contactName}. Gostaria de solicitar informações comerciais para o serviço de ${contactService}.\n\n*Detalhes:* ${contactMessage || "Nenhum detalhe adicional"}\n*Contato:* ${contactPhone} | ${contactEmail}`;
    const url = `https://wa.me/5583987417032?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const triggerWhatsAppQuickContact = () => {
    const srvName = services.find(s => s.id === quickContactService)?.title || quickContactService;
    const text = `Olá Porto! Me chamo ${quickContactName} e gostaria de solicitar uma proposta comercial.\n\n*Informações do Contato:*\n- *Empresa/Condomínio:* ${quickContactCompany || 'Não informado'}\n- *Cidade:* ${quickContactCity || 'João Pessoa, PB'}\n- *Serviço de Interesse:* ${srvName}\n- *WhatsApp:* ${quickContactPhone}\n- *Mensagem:* ${quickContactMessage || 'Nenhuma'}`;
    const url = `https://wa.me/5583987417032?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const handleQuickFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!quickContactName || !quickContactPhone) {
      alert("Por favor, preencha os campos obrigatórios (Nome e WhatsApp).");
      return;
    }
    // Meta Pixel Lead tracking
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead", {
        content_name: "Contato Rápido",
        content_category: "Formulário Rápido",
        value: 10.0,
        currency: "BRL"
      });
    }
    setQuickFormSubmitted(true);
    triggerWhatsAppQuickContact();
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1E293B] font-sans antialiased selection:bg-porto-gold selection:text-white">
      
      {/* Sticky Top Navbar */}
      <nav className="sticky top-0 z-[100] bg-[#14283D]/95 backdrop-blur-md border-b border-[#14283D]/30 shadow-md transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 md:h-24">
            
            {/* Logo */}
            <div className="cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <Logo invert />
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-10">
              <button onClick={() => scrollToSection("sobre")} className="text-sm font-semibold text-slate-200 hover:text-[#C5A059] transition-colors">Sobre Nós</button>
              <button onClick={() => scrollToSection("servicos")} className="text-sm font-semibold text-slate-200 hover:text-[#C5A059] transition-colors">Serviços</button>
              <button onClick={() => scrollToSection("diferenciais")} className="text-sm font-semibold text-slate-200 hover:text-[#C5A059] transition-colors">Diferenciais</button>
              <button onClick={() => scrollToSection("simulador")} className="text-sm font-semibold text-slate-200 hover:text-[#C5A059] transition-colors">Simulador</button>
              <button onClick={() => scrollToSection("faq")} className="text-sm font-semibold text-slate-200 hover:text-[#C5A059] transition-colors">Dúvidas</button>
            </div>

            {/* CTA action */}
            <div className="hidden md:flex items-center">
              <button 
                onClick={() => window.open("https://wa.me/5583987417032?text=Olá%20Porto!%20Gostaria%20de%20solicitar%20um%20orçamento%20para%20terceirização.", "_blank")}
                className="bg-[#C5A059] hover:bg-[#C5A059]/90 text-[#14283D] font-bold text-sm px-6 py-3.5 rounded-lg flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                Solicitar Orçamento
                <ChevronRight className="w-4 h-4 text-[#14283D]" />
              </button>
            </div>

            {/* Mobile menu trigger button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Toggle Mobile Menu"
              >
                {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-white/10 bg-[#14283D] shadow-inner overflow-hidden"
            >
              <div className="px-4 pt-4 pb-8 space-y-4 flex flex-col">
                <button onClick={() => scrollToSection("sobre")} className="text-left font-semibold text-slate-200 py-2 border-b border-white/5">Sobre Nós</button>
                <button onClick={() => scrollToSection("servicos")} className="text-left font-semibold text-slate-200 py-2 border-b border-white/5">Serviços Terceirizados</button>
                <button onClick={() => scrollToSection("diferenciais")} className="text-left font-semibold text-slate-200 py-2 border-b border-white/5">Nossos Diferenciais</button>
                <button onClick={() => scrollToSection("simulador")} className="text-left font-semibold text-slate-200 py-2 border-b border-white/5">Simulador de Custos</button>
                <button onClick={() => scrollToSection("faq")} className="text-left font-semibold text-slate-200 py-2 border-b border-white/5">Perguntas Frequentes</button>
                
                <button 
                  onClick={() => window.open("https://wa.me/5583987417032?text=Olá%20Porto!%20Gostaria%20de%20solicitar%20um%20orçamento%20para%20terceirização.", "_blank")}
                  className="bg-[#C5A059] text-[#14283D] text-center font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 mt-4"
                >
                  <MessageSquare className="w-5 h-5 text-[#14283D] fill-current" />
                  Falar no WhatsApp
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Modern, Clean & High-converting Hero Section */}
      <section className="relative bg-porto-navy text-white pt-20 pb-28 md:pt-28 md:pb-36 overflow-hidden">
        
        {/* Underlay Grid Layer */}
        <div className="absolute inset-0 bg-[radial-gradient(#C5A05915_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-60"></div>
        
        {/* Soft background light */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-porto-gold/10 rounded-full blur-[160px] pointer-events-none"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-blue-900/40 rounded-full blur-[180px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Core Value Prop & CTA */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 bg-porto-gold/10 border border-porto-gold/20 px-3.5 py-1.5 rounded-full">
                <Award className="w-4.5 h-4.5 text-porto-gold" />
                <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-porto-gold">Controle, Segurança e Eficiência</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight md:leading-[1.125]">
                Terceirização de Alta Performance para <span className="text-porto-gold">Condomínios e Empresas</span>
              </h1>

              <p className="text-lg md:text-xl text-slate-350 font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Reduza custos trabalhistas e garanta excelência operacional diária com profissionais altamente qualificados em portaria, recepção, limpeza profissional corporativa e segurança operacional em João Pessoa.
              </p>

              {/* Instant benefits bullet points for fast trust */}
              <div className="grid sm:grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left pt-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 bg-porto-gold/20 rounded-full flex items-center justify-center text-porto-gold">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-sm font-semibold text-slate-300">Risco Trabalhista Zero</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 bg-porto-gold/20 rounded-full flex items-center justify-center text-porto-gold">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-sm font-semibold text-slate-300">Reserva Ativa 24h</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 bg-porto-gold/20 rounded-full flex items-center justify-center text-porto-gold">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-sm font-semibold text-slate-300">Supervisão de Campo</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <button 
                  onClick={() => scrollToSection("simulador")}
                  className="bg-porto-gold hover:bg-porto-gold/90 text-porto-navy font-extrabold text-base px-8 py-4.5 rounded-xl transition-all shadow-lg shadow-porto-gold/25 hover:shadow-xl hover:-translate-y-0.5 transform duration-200"
                >
                  Simulador de Custos
                </button>
                <button 
                  onClick={() => scrollToSection("servicos")}
                  className="bg-white/10 hover:bg-white/15 text-white font-extrabold text-base px-8 py-4.5 rounded-xl transition-all border border-white/10 flex items-center justify-center gap-2 hover:-translate-y-0.5 transform duration-200"
                >
                  Ver Nossos Serviços
                  <ChevronRight className="w-4 h-4 text-porto-gold" />
                </button>
              </div>

            </div>

            {/* Right Column: Interactive Simulator Form */}
            <div id="simulador" className="lg:col-span-5 relative mt-10 lg:mt-0">
              <div className="relative z-10 p-6 sm:p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/15 shadow-2xl text-white">
                
                {calcEstimated ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    className="text-center py-8 space-y-6"
                  >
                    <div className="w-16 h-16 bg-[#C5A059]/10 rounded-full flex items-center justify-center text-[#C5A059] mx-auto border border-[#C5A059]/30">
                      <Check className="w-8 h-8 stroke-[3]" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-black text-[#C5A059]">Solicitação Enviada!</h3>
                      <p className="text-xs text-slate-330 font-light leading-relaxed max-w-sm mx-auto">
                        Olá <strong>{calcName}</strong>! Iniciamos seu atendimento prioritário de <strong>{calcPropertyType === "condominio" ? "Condomínio" : "Empresa"}</strong> contendo os <strong>{calcServices.length}</strong> serviço(s) selecionado(s).
                      </p>
                      <p className="text-xs text-slate-400 font-light italic leading-normal pt-2">
                        Preparamos uma proposta comercial personalizada com risco trabalhista zero. Clique abaixo para enviar as informações diretamente no WhatsApp do nosso diretor comercial.
                      </p>
                    </div>
                    <button 
                      onClick={triggerWhatsAppWithCalculator}
                      className="w-full inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold text-xs uppercase tracking-widest py-4 rounded-xl transition-all shadow-md mt-2 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 fill-current" />
                      Prosseguir para o WhatsApp
                    </button>
                    <div>
                      <button 
                        onClick={() => setCalcEstimated(false)}
                        className="text-[10px] uppercase tracking-widest text-slate-400 hover:text-[#C5A059] font-bold cursor-pointer"
                      >
                        Enviar Novamente
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleCalculatorSubmit} className="space-y-5 text-left">
                    <div>
                      <span className="text-[10px] font-extrabold text-[#C5A059] uppercase tracking-widest block mb-1">Cotação Rápida</span>
                      <h3 className="text-lg font-black tracking-tight text-white">Solicite seu Orçamento</h3>
                      <p className="text-[11px] text-slate-300 font-light mt-0.5">Retorno com proposta detalhada em menos de 1 hora.</p>
                    </div>

                    {/* Step 1: Property Type */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-extrabold text-slate-300 uppercase tracking-widest block">Tipo de Estabelecimento</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setCalcPropertyType("condominio")}
                          className={`py-2 px-3 rounded-lg border text-xs font-bold text-center transition-all cursor-pointer ${calcPropertyType === "condominio" ? "border-[#C5A059] bg-[#C5A059]/15 text-[#C5A059]" : "border-white/10 bg-white/5 hover:bg-white/10 text-white"}`}
                        >
                          Condomínio
                        </button>
                        <button
                          type="button"
                          onClick={() => setCalcPropertyType("empresa")}
                          className={`py-2 px-3 rounded-lg border text-xs font-bold text-center transition-all cursor-pointer ${calcPropertyType === "empresa" ? "border-[#C5A059] bg-[#C5A059]/15 text-[#C5A059]" : "border-white/10 bg-white/5 hover:bg-white/10 text-white"}`}
                        >
                          Empresa / Sede
                        </button>
                      </div>
                    </div>

                    {/* Step 2: Services needed */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-extrabold text-slate-300 uppercase tracking-widest block">Selecione os Serviços</label>
                      <div className="flex flex-wrap gap-1.5">
                        {services.map((srv) => {
                          const isSelected = calcServices.includes(srv.id);
                          return (
                            <button
                              key={srv.id}
                              type="button"
                              onClick={() => handleCalcServiceToggle(srv.id)}
                              className={`py-1.5 px-2.5 rounded-md border text-[10px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${isSelected ? "border-[#C5A059] bg-[#C5A059] text-porto-navy" : "border-white/10 bg-white/5 hover:bg-white/10 text-slate-300"}`}
                            >
                              {srv.title.split(" ")[0]}
                              {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Step 3: Shift / scale with select dropdown */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-extrabold text-slate-300 uppercase tracking-widest block">Escala de Atendimento</label>
                      <select 
                        value={calcShift}
                        onChange={(e) => setCalcShift(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-white/10 bg-slate-900 focus:outline-none focus:border-[#C5A059] text-xs font-semibold text-white"
                      >
                        <option value="12x36_diurno">Escala 12x36 (Diurno)</option>
                        <option value="12x36_noturno">Escala 12x36 (Noturno)</option>
                        <option value="24h_ininterrupto">Escala Plantão 24h / 7 dias</option>
                      </select>
                    </div>

                    {/* Contact details */}
                    <div className="space-y-2 pt-1 border-t border-white/10">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[8px] font-extrabold text-slate-400 uppercase tracking-widest block mb-1">Seu Nome *</label>
                          <input 
                            type="text" 
                            placeholder="Nome completo"
                            value={calcName}
                            onChange={(e) => setCalcName(e.target.value)}
                            required
                            className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] text-xs text-white placeholder-slate-400"
                          />
                        </div>
                        <div>
                          <label className="text-[8px] font-extrabold text-slate-400 uppercase tracking-widest block mb-1">WhatsApp *</label>
                          <input 
                            type="tel" 
                            placeholder="(83) 99999-9999"
                            value={calcPhone}
                            onChange={(e) => setCalcPhone(e.target.value)}
                            required
                            className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] text-xs text-white placeholder-slate-400"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Observation message */}
                    <div>
                      <label className="text-[8px] font-extrabold text-slate-400 uppercase tracking-widest block mb-1">Mensagem ou Observação (Opcional)</label>
                      <textarea 
                        placeholder="Ex: Preciso de 2 porteiros e 1 auxiliar de serviços gerais."
                        value={calcMessage}
                        onChange={(e) => setCalcMessage(e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] text-xs text-white placeholder-slate-400 resize-none"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-[#C5A059] hover:bg-white text-porto-navy font-extrabold uppercase tracking-widest text-[11px] py-4 rounded-xl shadow-lg transition-all duration-300 transform cursor-pointer"
                    >
                      Solicitar Orçamento via WhatsApp
                    </button>

                    <div className="text-center">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Estudo de cotação gratuito sem compromisso</span>
                    </div>

                  </form>
                )}

              </div>
              
              {/* Background accent decor glow */}
              <div className="absolute -inset-4 bg-gradient-to-br from-porto-gold/10 to-transparent rounded-3xl blur-xl -z-10"></div>
            </div>

          </div>
        </div>
      </section>

      {/* Under-hero Badges (João Pessoa Coverage trust highlights) */}
      <section className="bg-slate-50 py-10 border-b border-slate-200 text-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap lg:grid lg:grid-cols-4 gap-6 items-center justify-center text-center lg:text-left">
            <div className="max-w-xs flex gap-3.5 items-center">
              <div className="w-12 h-12 rounded-xl bg-porto-gold/10 flex items-center justify-center text-porto-gold">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-extrabold text-sm uppercase tracking-wide text-porto-navy">João Pessoa & Grande JP</h4>
                <p className="text-xs text-slate-500 font-medium">Sede local com prontidão logística rápida.</p>
              </div>
            </div>

            <div className="max-w-xs flex gap-3.5 items-center">
              <div className="w-12 h-12 rounded-xl bg-porto-gold/10 flex items-center justify-center text-porto-gold">
                <Shield className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-extrabold text-sm uppercase tracking-wide text-porto-navy">Certidão Negativa Mensal</h4>
                <p className="text-xs text-slate-500 font-medium">Transparência jurídica absoluta em sua mesa.</p>
              </div>
            </div>

            <div className="max-w-xs flex gap-3.5 items-center">
              <div className="w-12 h-12 rounded-xl bg-porto-gold/10 flex items-center justify-center text-porto-gold">
                <Clock className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-extrabold text-sm uppercase tracking-wide text-porto-navy">Plantão Ativo 24h / 7d</h4>
                <p className="text-xs text-slate-500 font-medium">Central de atendimento pronta para imprevistos.</p>
              </div>
            </div>

            <div className="max-w-xs flex gap-3.5 items-center">
              <div className="w-12 h-12 rounded-xl bg-porto-gold/10 flex items-center justify-center text-porto-gold">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-extrabold text-sm uppercase tracking-wide text-porto-navy">Limpeza Remasterizada</h4>
                <p className="text-xs text-slate-500 font-medium">Equipamento industrial de alto rendimiento.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre Nós Section - Premium, Modern, and Informative */}
      <section id="sobre" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-sm font-extrabold uppercase tracking-widest text-[#C5A059] block">Quem Somos</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-porto-navy tracking-tight leading-tight">
              Excelência Operacional & Compromisso Integral
            </h2>
            <p className="text-base text-slate-600 font-light max-w-2xl mx-auto">
              A Porto une gestão tática e supervisão rigorosa para entregar serviços excepcionais de portaria, limpeza e conservação em João Pessoa.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Premium Image Slot */}
            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative border border-slate-100">
                <SafeImage 
                  src="/@portoterceirização.png" 
                  alt="Porto Terceirização Operacional" 
                  className="w-full h-full object-cover brightness-95"
                  fallbackIcon={Shield}
                  fallbackTitle="Excelência Operacional"
                />
                
                {/* Floating trust banner on image */}
                <div className="absolute bottom-6 left-6 right-6 p-6 rounded-xl bg-porto-navy/95 backdrop-blur-sm border border-white/10 text-white text-left space-y-3">
                  <p className="text-xs text-porto-gold font-extrabold uppercase tracking-widest">Compromisso Porto</p>
                  <p className="text-sm text-slate-200 font-light leading-relaxed">
                    "Garantimos atendimento presencial de qualidade, supervisores ativos de surpresa e 100% de blindagem jurídica trabalhista para seu condomínio ou empresa."
                  </p>
                  <div className="flex items-center gap-2 pt-1 border-t border-white/10">
                    <Check className="w-4 h-4 text-porto-gold stroke-[3]" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Risco Trabalhista Zero</span>
                  </div>
                </div>
              </div>
              
              {/* Decorative square */}
              <div className="absolute -top-6 -left-6 w-36 h-36 bg-porto-gold/10 rounded-2xl -z-10"></div>
            </div>

            {/* Right Column: Key Operational Pillars or Guarantees */}
            <div className="lg:col-span-7 bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-200/60 shadow-xl text-slate-800 text-left space-y-8">
              <div>
                <span className="text-[10px] font-extrabold text-[#C5A059] uppercase tracking-widest block mb-1">Diferencial Corporativo</span>
                <h3 className="text-xl font-black text-porto-navy">Estrutura Operacional Completa</h3>
                <p className="text-[12px] text-slate-500 font-light mt-0.5">Gestão profissional que liberta síndicos e gestores de preocupações trabalhistas e operacionais.</p>
              </div>

              <div className="space-y-6">
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#14283D] flex items-center justify-center flex-shrink-0 border border-white/10 shadow-sm">
                    <Shield className="w-5 h-5 text-[#C5A059]" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-sm text-[#14283D]">Blindagem Trabalhista Ativa</h4>
                    <p className="text-xs text-slate-500 font-light leading-relaxed">
                      Sua empresa ou condomínio 100% blindado. Emitimos certidão negativa mensal com comprovação física de todos os recolhimentos tributários e previdenciários dos nossos colaboradores.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#14283D] flex items-center justify-center flex-shrink-0 border border-white/10 shadow-sm">
                    <Clock className="w-5 h-5 text-[#C5A059]" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-sm text-[#14283D]">Supervisão Surpresa 24h</h4>
                    <p className="text-xs text-slate-500 font-light leading-relaxed">
                      Não dependemos da sorte. Nosso corpo de inspetores realiza vistorias físicas surpresa nos postos durante o dia, noite e madrugadas, mantendo o padrão porto permanentemente elevado.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#14283D] flex items-center justify-center flex-shrink-0 border border-white/10 shadow-sm">
                    <Users className="w-5 h-5 text-[#C5A059]" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-sm text-[#14283D]">Banco de Reserva Treinado</h4>
                    <p className="text-xs text-slate-500 font-light leading-relaxed">
                      Sem faltas ou surpresas desagradáveis. Dispomos de um banco de profissionais previamente integrados e fardados pronto para cobrir qualquer absenteísmo ou licença em tempo recorde.
                    </p>
                  </div>
                </div>

              </div>

              <div className="pt-6 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-left">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Deseja simular custos agora?</span>
                  <span className="text-[11px] text-slate-550 font-light">Dispomos de cotador instantâneo com envio via WhatsApp.</span>
                </div>
                <button 
                  onClick={() => scrollToSection("simulador")}
                  className="bg-[#14283D] hover:bg-[#C5A059] hover:text-[#14283D] text-white text-[11px] font-extrabold uppercase tracking-widest px-6 py-3.5 rounded-xl shadow-md transition-all self-stretch sm:self-auto text-center cursor-pointer"
                >
                  Ir para Simulador
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Services Section - Beautiful, intuitive Grid layout with filter controls */}
      <section id="servicos" className="py-24 bg-slate-100 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-sm font-extrabold uppercase tracking-widest text-porto-gold block">Portfólio Estratégico</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-porto-navy tracking-tight leading-tight">
              Soluções Modulares de Facilities para Todas as Suas Necessidades
            </h2>
            <p className="text-lg text-slate-600 font-light">
              Seja para grandes condomínios residenciais ou sedes empresariais corporativas, oferecemos mão de obra treinada sob medida. Escolha um serviço para ver os detalhes.
            </p>
          </div>

          {/* Quick tab filters */}
          <div className="flex flex-wrap gap-2.5 justify-center mb-12">
            <button 
              onClick={() => setActiveServiceTab("all")}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeServiceTab === "all" ? "bg-porto-navy text-white shadow-md" : "bg-white text-slate-600 hover:bg-slate-200 border border-slate-200/60"}`}
            >
              Todos os Serviços
            </button>
            <button 
              onClick={() => setActiveServiceTab("seguranca")}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeServiceTab === "seguranca" ? "bg-porto-navy text-white shadow-md" : "bg-white text-slate-600 hover:bg-slate-200 border border-slate-200/60"}`}
            >
              Portaria & Ronda
            </button>
            <button 
              onClick={() => setActiveServiceTab("limpeza")}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeServiceTab === "limpeza" ? "bg-porto-navy text-white shadow-md" : "bg-white text-slate-600 hover:bg-slate-200 border border-slate-200/60"}`}
            >
              Higiene & Conservação
            </button>
          </div>

          {/* Core Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services
              .filter(s => {
                if (activeServiceTab === "all") return true;
                if (activeServiceTab === "seguranca") return s.id === "portaria" || s.id === "vigia";
                if (activeServiceTab === "limpeza") return s.id === "limpeza" || s.id === "asg" || s.id === "pos-obra";
                return true;
              })
              .map((service) => (
                <div 
                  key={service.id} 
                  className="bg-white rounded-xl border border-slate-200/60 p-7 hover:border-porto-gold/70 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
                >
                  <div className="space-y-6">
                    {/* Header top row */}
                    <div className="flex justify-between items-start">
                      <div className="w-14 h-14 rounded-xl bg-[#14283D]/5 text-porto-navy group-hover:bg-porto-gold group-hover:text-porto-navy transition-all duration-300 flex items-center justify-center">
                        {service.icon}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-porto-gold bg-porto-gold/10 px-2.5 py-1 rounded-full">
                        {service.badge}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-porto-navy group-hover:text-porto-gold transition-colors duration-200 text-left">
                        {service.title}
                      </h3>
                      <p className="text-slate-500 font-light text-sm leading-relaxed text-left">
                        {service.shortDesc}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
                    <button 
                      onClick={() => setSelectedServiceDetail(service)}
                      className="text-xs font-bold text-porto-navy group-hover:text-porto-gold transition-colors flex items-center gap-1.5"
                    >
                      Ver Detalhes do Escopo
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    
                    <button 
                      onClick={() => {
                        const message = encodeURIComponent(`Olá Porto! Gostaria de solicitar um orçamento para o serviço de ${service.title}.`);
                        window.open(`https://wa.me/5583987417032?text=${message}`, "_blank");
                      }}
                      className="opacity-0 group-hover:opacity-100 bg-porto-navy text-white text-[10px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-md transition-all hover:bg-porto-gold hover:text-porto-navy"
                    >
                      Cotar
                    </button>
                  </div>
                </div>
            ))}
          </div>

          {/* Specialized Highlight for "Limpeza Pós Obra" (Remastered approach) */}
          <div className="mt-16 p-6 md:p-10 rounded-2xl bg-[#14283D] text-white border border-porto-gold/20 relative overflow-hidden text-left">
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-porto-gold/5 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 bg-porto-gold/20 text-porto-gold text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border border-porto-gold/30">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  Especialidade Porto
                </div>
                <h3 className="text-2xl md:text-3xl font-black">Limpeza pós-obra de alto padrão técnica para arquitetos e construtoras</h3>
                <p className="text-slate-300 font-light leading-relaxed text-sm md:text-base max-w-2xl">
                  Dispomos de equipamentos industriais avançados (lavadoras de pressão, aspiradores industriais de filtro HEPA para poeira fina de gesso) e equipe treinada para realizar a transição perfeita do fim da obra para a entrega das chaves, sem riscos de arranhões em vidros acústicos ou pedras nobres.
                </p>
              </div>
              <div className="lg:col-span-4 flex justify-start lg:justify-end">
                <button 
                  onClick={() => {
                    const message = encodeURIComponent("Olá Porto! Gostaria de agendar uma vistoria técnica sobre o serviço de Limpeza pós-obra de alto padrão.");
                    window.open(`https://wa.me/5583987417032?text=${message}`, "_blank");
                  }}
                  className="bg-porto-gold hover:bg-porto-gold/90 text-porto-navy font-bold px-8 py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 duration-200 whitespace-nowrap"
                >
                  Agendar Vistoria da Obra
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Trust & Differentiation Section */}
      <section id="diferenciais" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left text column */}
            <div className="space-y-8 text-left">
              <div className="space-y-3">
                <span className="text-sm font-extrabold uppercase tracking-widest text-porto-gold block">Diferenciais Porto</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-porto-navy tracking-tight leading-tight">
                  Por Que Grandes Administradoras de Condomínios Escolhem a Porto?
                </h2>
              </div>
              
              <p className="text-lg text-slate-600 font-light leading-relaxed">
                Nós não somos uma empresa que apenas aloca pessoas. Nós somos uma empresa de gestão operacional ativa. Entendemos que a tranquilidade do síndico e o andamento perfeito da operação dependem de atenção obsessiva aos detalhes administrativos e logísticos.
              </p>

              {/* Grid of core differentiators */}
              <div className="grid sm:grid-cols-2 gap-8">
                {benefits.map((b, i) => (
                  <div key={i} className="space-y-3">
                    <div className="w-12 h-12 bg-porto-gold/10 rounded-xl flex items-center justify-center">
                      {b.icon}
                    </div>
                    <h4 className="font-extrabold text-base text-porto-navy">{b.title}</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{b.desc}</p>
                  </div>
                ))}
              </div>

            </div>

            {/* Right visuals of facilities setup */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-md">
                    <SafeImage 
                      src={poolImage} 
                      alt="Rigor Operacional" 
                      className="w-full h-full object-cover"
                      fallbackIcon={Award}
                      fallbackTitle="Rigor Operacional"
                    />
                  </div>
                  <div className="aspect-square bg-porto-navy rounded-2xl p-6 flex flex-col justify-between text-white text-left">
                    <Award className="w-10 h-10 text-porto-gold" />
                    <div className="space-y-1">
                      <span className="text-3xl font-black text-porto-gold block">100%</span>
                      <span className="text-xs font-bold text-slate-350 tracking-wide uppercase">De Equipes Registradas de acordo com a CLT</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 pt-12">
                  <div className="aspect-square bg-slate-150 rounded-2xl p-6 flex flex-col justify-between text-porto-navy text-left border border-slate-200">
                    <Users className="w-10 h-10 text-porto-navy" />
                    <div className="space-y-1">
                      <span className="text-3xl font-black block">Reserva</span>
                      <span className="text-xs font-extrabold text-slate-500 tracking-wide uppercase block">Pronta pra Alocação Imediata</span>
                    </div>
                  </div>
                  <div className="aspect-[4/5] bg-[#14283D] text-white rounded-2xl p-6 flex flex-col justify-between shadow-lg border border-white/5">
                    <Sparkles className="w-8 h-8 text-[#C5A059]" />
                    <div className="space-y-4 text-left flex-grow flex flex-col justify-center">
                      <span className="text-[10px] font-black uppercase text-[#C5A059] tracking-widest block">Conservação Premium</span>
                      <h4 className="font-extrabold text-sm text-white leading-snug">Padrão Porto de Zeladoria</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                          <span className="text-[11px] font-light text-slate-300 leading-tight">Rotinas diárias rigorosas de asseio, conservação e desinfecção predial</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                          <span className="text-[11px] font-light text-slate-300 leading-tight">Uso exclusivo de sanitizantes bactericidas certificados de nível profissional</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                          <span className="text-[11px] font-light text-slate-300 leading-tight">Checklists eletrônicos auditados diariamente pela nossa equipe de supervisão</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Accordion Section for trust-building */}
      <section id="faq" className="py-24 bg-white relative text-left">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <span className="text-sm font-extrabold uppercase tracking-widest text-porto-gold block">Dúvidas Frequentes</span>
            <h2 className="text-3xl sm:text-4xl font-black text-porto-navy tracking-tight">
              Tudo o que Você Precisa Saber Antes de Assinar Conosco
            </h2>
            <p className="text-base text-slate-500 font-light max-w-xl mx-auto">
              Comprometimento com transparência em cada cláusula contratual e rotina operacional.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx} 
                  className={`rounded-xl border transition-all duration-300 ${isOpen ? "bg-slate-50 border-porto-gold/50 shadow-sm" : "border-slate-200 bg-white"}`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-5 flex justify-between items-center text-left"
                  >
                    <span className="font-extrabold text-[#14283D] text-sm md:text-base leading-snug">
                      {faq.question}
                    </span>
                    <div className={`w-8 h-8 flex-shrink-0 rounded-full border border-slate-200 flex items-center justify-center transition-transform duration-300 ${isOpen ? "bg-porto-gold border-porto-gold text-[#14283D] rotate-180" : "bg-white text-slate-400"}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-6 pb-6 text-xs md:text-sm text-slate-600 font-light leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Consultative Lead Acquisition / Contact Section */}
      <section id="contato" className="py-24 bg-porto-navy text-white text-left relative overflow-hidden">
        
        {/* Soft backdrop decorations */}
        <div className="absolute inset-0 bg-[#C5A059]/5 opacity-[0.14] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-porto-gold/10 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            {/* Left promo col (5 columns) */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="text-sm font-extrabold uppercase tracking-widest text-[#C5A059] block font-bold">Solicitação de Visitação</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
                  Pronto para Proteger Seu Patrimônio?
                </h2>
              </div>

              <p className="text-[#94A3B8] font-light leading-relaxed max-w-md text-sm md:text-base">
                Solicite uma vistoria técnica operacional sem qualquer custo. Nosso time comercial irá analisar as vulnerabilidades físicas de sua entrada, propor melhorias contratuais e apresentar uma cotação justa com o melhor custo-benefício de João Pessoa.
              </p>

              {/* Direct support values */}
              <div className="space-y-4 border-t border-white/10 pt-8 max-w-sm">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-full bg-porto-gold/10 flex items-center justify-center text-porto-gold flex-shrink-0">
                    <Phone className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Telefone Comercial</span>
                    <span className="text-xl font-extrabold text-white">(83) 98741-7032</span>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-full bg-porto-gold/10 flex items-center justify-center text-porto-gold flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Localização</span>
                    <span className="text-sm font-semibold text-white">Av. Pres. Epitácio Pessoa, 955 - Estados, João Pessoa - PB, 58030-000</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right lead capture form col (7 columns) */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-2xl text-slate-800">
              
              {formSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  className="text-center py-10 space-y-6"
                >
                  <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 mx-auto">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-porto-navy">Mensagem Enviada!</h3>
                    <p className="text-sm text-slate-500 font-light max-w-md mx-auto leading-relaxed">
                      Agradecemos o seu contato. Para agilizar o atendimento de forma prioritária, clique abaixo para abrir diretamente uma conversa com nossa gerência no WhatsApp comercial.
                    </p>
                  </div>
                  <button 
                    onClick={triggerWhatsAppGeneral}
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold text-xs uppercase tracking-widest px-8 py-4.5 rounded-xl transition-all shadow-md mt-2"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    Abrir no WhatsApp Ativo
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleGeneralFormSubmit} className="space-y-6">
                  
                  <div className="space-y-1">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-porto-navy">Proposta sob Medida</h3>
                    <p className="text-xs text-slate-500 font-light leading-normal">Preencha o formulário abaixo para receber nossa ligação comercial em menos de 1 hora.</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-1">Seu Nome *</label>
                      <input 
                        type="text" 
                        placeholder="Nome completo"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#14283D] text-xs font-semibold text-[#1E293B]"
                      />
                    </div>
                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-1">Seu WhatsApp *</label>
                      <input 
                        type="tel" 
                        placeholder="(83) 99999-9999"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#14283D] text-xs font-semibold text-[#1E293B]"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-1">E-mail Corporativo *</label>
                      <input 
                        type="email" 
                        placeholder="E-mail de contato"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#14283D] text-xs font-semibold text-[#1E293B]"
                      />
                    </div>
                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-1">Qual é o Serviço de Interesse? *</label>
                      <select 
                        value={contactService}
                        onChange={(e) => setContactService(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#14283D] text-xs font-semibold text-[#1E293B]"
                      >
                        <option value="portaria">Portaria Controlada 24h</option>
                        <option value="vigia">Vigia Patrimonial</option>
                        <option value="limpeza">Limpeza Profissional Corporativa</option>
                        <option value="asg">Auxiliar de Serviços Gerais (ASG)</option>
                        <option value="pos-obra">Limpeza Pós-Obra Especializada</option>
                        <option value="manutencao">Manutenção Preventiva Predial</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-1">Mensagem ou Particularidades de Sua Demanda</label>
                    <textarea 
                      placeholder="Ex: Condomínio residencial com 2 dezenas de apartamentos, demanda de portaria noturna e ASG diurno de segunda a sábado."
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#14283D] text-xs font-semibold text-[#1E293B] resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#14283D] hover:bg-porto-gold hover:text-porto-navy text-white font-extrabold uppercase tracking-widest text-xs py-4 rounded-xl shadow-md transition-all duration-300"
                  >
                    Solicitar Estudo de Viabilidade Gratuito
                  </button>

                  <div className="text-center pt-2">
                    <span className="text-[10px] font-medium text-slate-400">Promessa Porto: Risco trabalhista zero garantido contratualmente.</span>
                  </div>

                </form>
              )}

            </div>

          </div>
        </div>
      </section>

      {/* Modern High-End Footer with Complete Information block */}
      <footer className="bg-porto-navy text-[#94A3B8] border-t border-white/5 pt-20 pb-12 relative text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16 border-b border-white/5">
            
            {/* Column 1: Intro info */}
            <div className="space-y-6">
              <Logo invert />
              <p className="text-slate-400 font-light text-xs md:text-sm leading-relaxed max-w-xs">
                Empresa especializada em terceirização inteligente de facilities de alto escalão para condomínios comerciais, industriais e residenciais de grande porte.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-porto-gold/20 flex items-center justify-center text-white hover:text-porto-gold transition-colors">
                  <Instagram className="w-4.5 h-4.5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-porto-gold/20 flex items-center justify-center text-white hover:text-porto-gold transition-colors">
                  <Facebook className="w-4.5 h-4.5" />
                </a>
              </div>
            </div>

            {/* Column 2: Quick links */}
            <div className="space-y-6">
              <h5 className="text-[10px] uppercase tracking-widest font-extrabold text-porto-gold">Facilities</h5>
              <ul className="space-y-4 text-xs md:text-sm">
                {services.map(s => (
                  <li key={s.id}>
                    <button 
                      onClick={() => {
                        setSelectedServiceDetail(s);
                      }} 
                      className="hover:text-white transition-colors"
                    >
                      {s.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Corporate security values */}
            <div className="space-y-6">
              <h5 className="text-[10px] uppercase tracking-widest font-extrabold text-porto-gold">Auditoria & Segurança</h5>
              <ul className="space-y-4 text-xs md:text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-porto-gold" />
                  Certidão Negativa Mensal (CND)
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-porto-gold" />
                  Garantia Operacional Trabalhista
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-porto-gold" />
                  Plantão de Suporte Volante 24h
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-porto-gold" />
                  Regristro em Acordo de Nível de Serviço
                </li>
              </ul>
            </div>

            {/* Column 4: Location details */}
            <div className="space-y-6">
              <h5 className="text-[10px] uppercase tracking-widest font-extrabold text-porto-gold">Atendimento Local</h5>
              <div className="space-y-4 text-xs md:text-sm">
                <div className="flex gap-2.5 items-start">
                  <MapPin className="w-4 h-4 text-porto-gold flex-shrink-0 mt-0.5" />
                  <span className="text-slate-400">Sede Administrativa:<br/> Av. Pres. Epitácio Pessoa, 955 - Estados, João Pessoa - PB, 58030-000</span>
                </div>
                <div className="pt-2">
                  <span className="text-[9px] font-black uppercase text-porto-gold block tracking-wider">Filosofia Corporativa:</span>
                  <p className="text-xs italic text-slate-400 mt-1 font-light leading-relaxed">
                    "Trabalhar duro, agir com ética inabalável e servir ao cliente com elegância e eficiência operacional absoluta."
                  </p>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-10 flex flex-col sm:flex-row justify-between items-center text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-widest gap-4 text-center">
            <span>© Porto Terceirização 2026</span>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Termos Contratuais</a>
              <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating high-converting WhatsApp trigger bubble with active simulated alert message */}
      <div className="fixed bottom-6 right-6 z-[160] flex flex-col items-end gap-3 pointer-events-none">
        
        {/* Animated Support bubble */}
        <AnimatePresence>
          {isWhatsappHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-white text-slate-800 p-3.5 rounded-2xl border border-slate-200 shadow-xl max-w-xs text-left text-xs font-semibold relative pointer-events-auto flex items-start gap-2.5"
            >
              <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0 mt-1.5 animate-pulse"></div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-porto-navy block mb-0.5">Operações Porto</span>
                <span className="text-slate-500 font-light block leading-normal">Orçamento imediato para João Pessoa e Região? Clique abaixo para cotar rápido pelo WhatsApp.</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.a 
          onMouseEnter={() => setIsWhatsappHovered(true)}
          onMouseLeave={() => setIsWhatsappHovered(false)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          animate={{ 
            boxShadow: ["0 10px 30px rgba(197,160,89,0.3)", "0 10px 40px rgba(197,160,89,0.5)", "0 10px 30px rgba(197,160,89,0.3)"]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          href="https://wa.me/5583987417032" 
          target="_blank"
          rel="noopener noreferrer"
          className="w-16 h-16 bg-[#25D366] text-white flex items-center justify-center rounded-2xl pointer-events-auto shadow-2xl transition-all cursor-pointer"
          aria-label="Contact directly on WhatsApp"
        >
          <MessageSquare className="w-7 h-7 fill-current" />
        </motion.a>
      </div>

      {/* Dialog Modal for individual services detail to promote rich interaction */}
      <AnimatePresence>
        {selectedServiceDetail && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 sm:px-6 relative">
            
            {/* Backdrop lock */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedServiceDetail(null)}
              className="absolute inset-0 bg-[#14283D]/80 backdrop-blur-sm"
            ></motion.div>

            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl overflow-hidden relative z-10 max-w-2xl w-full border border-slate-100 shadow-2xl text-left"
            >
              
              {/* Header block with solid brand colors */}
              <div className="bg-[#14283D] text-white p-6 sm:p-10 relative">
                <button 
                  type="button"
                  onClick={() => setSelectedServiceDetail(null)}
                  className="absolute top-6 right-6 text-white/70 hover:text-white p-2 bg-white/5 rounded-full"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-4">
                  <span className="text-xs font-bold text-porto-gold uppercase tracking-widest block">{selectedServiceDetail.badge}</span>
                  <h3 className="text-2xl sm:text-3xl font-black">{selectedServiceDetail.title}</h3>
                </div>
              </div>

              {/* Scope details */}
              <div className="p-6 sm:p-10 space-y-6">
                
                <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
                  {selectedServiceDetail.description}
                </p>

                {/* Scope features bullet list */}
                <div className="space-y-4">
                  <h5 className="text-[10px] font-extrabold uppercase text-[#14283D] tracking-widest">Escopo Completo Inclusivo:</h5>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {selectedServiceDetail.features.map((feat: string, idx: number) => (
                      <li key={idx} className="flex gap-2.5 items-start text-xs font-semibold text-slate-700 leading-normal">
                        <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5 stroke-[3]" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions row inside modal */}
                <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
                  <button 
                    type="button"
                    onClick={() => setSelectedServiceDetail(null)}
                    className="px-6 py-3.5 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-xs uppercase tracking-widest rounded-lg transition-colors text-center"
                  >
                    Voltar ao Site
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      setContactService(selectedServiceDetail.id);
                      setSelectedServiceDetail(null);
                      scrollToSection("contato");
                    }}
                    className="bg-[#14283D] hover:bg-porto-gold hover:text-porto-navy text-white text-center font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-lg shadow-md transition-colors"
                  >
                    Cotar {selectedServiceDetail.title.split(" ")[0]}
                  </button>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
