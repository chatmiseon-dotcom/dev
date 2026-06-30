"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

// Translation dictionary
const i18n = {
  kr: {
    "nav.services": "서비스",
    "nav.process": "프로세스",
    "nav.portfolio": "포트폴리오",
    "nav.contact": "문의하기",
    "hero.badge": "✦ 소프트웨어부터 펌웨어까지",
    "hero.title1": "당신의 아이디어를",
    "hero.title2": "현실로 만듭니다",
    "hero.desc": "웹·앱 개발부터 임베디드 펌웨어까지 — A&N Dev가 기획부터 납품까지 전문적으로 지원합니다.",
    "hero.cta1": "지금 문의하기",
    "hero.cta2": "서비스 보기",
    "stat.projects": "완료 프로젝트",
    "stat.satisfaction": "고객 만족도",
    "stat.years": "년 경력",
    "scroll": "스크롤",
    "services.tag": "SERVICES",
    "services.title": "무엇이든 개발합니다",
    "services.desc": "소프트웨어와 하드웨어의 경계를 넘어, 다양한 분야의 개발을 지원합니다.",
    "svc1.title": "웹 개발",
    "svc1.desc": "반응형 웹사이트, 관리자 대시보드, 쇼핑몰, SaaS 플랫폼 등 다양한 웹 솔루션을 구축합니다.",
    "svc.featured": "인기",
    "svc2.title": "앱 개발",
    "svc2.desc": "iOS / Android 네이티브 앱 및 크로스플랫폼 앱을 전문적으로 개발합니다.",
    "svc.firmware": "펌웨어",
    "svc3.title": "펌웨어 / 임베디드",
    "svc3.desc": "MCU 펌웨어, RTOS, 드라이버 개발 등 임베디드 소프트웨어 전 분야를 지원합니다.",
    "svc4.title": "유지보수 & 기술지원",
    "svc4.desc": "기존 시스템 유지보수, 버그 수정, 성능 최적화, 지속적인 기술 지원 서비스를 제공합니다.",
    "process.tag": "HOW WE WORK",
    "process.title": "개발 프로세스",
    "process.desc": "체계적인 단계별 프로세스로 프로젝트를 성공적으로 완수합니다.",
    "step1.title": "상담 & 분석",
    "step1.desc": "요구사항 파악, 기술 검토, 프로젝트 범위 정의",
    "step2.title": "기획 & 설계",
    "step2.desc": "아키텍처 설계, 일정 수립, 견적 제안",
    "step3.title": "개발 & 구현",
    "step3.desc": "단계별 개발, 코드 리뷰, 중간 보고",
    "step4.title": "테스트 & 납품",
    "step4.desc": "품질 검증, 문서화, 최종 납품 및 사후 지원",
    "portfolio.tag": "PORTFOLIO",
    "portfolio.title": "주요 프로젝트",
    "portfolio.desc": "다양한 분야에서 축적된 개발 경험",
    "badge.firmware": "펌웨어",
    "badge.web": "웹",
    "badge.app": "앱",
    "port1.title": "IoT 센서 모듈 펌웨어",
    "port1.desc": "STM32 기반 다채널 센서 데이터 수집 및 무선 전송 시스템",
    "port2.title": "물류 관리 대시보드",
    "port2.desc": "실시간 재고 추적 및 배송 현황 통합 관리 웹 플랫폼",
    "port3.title": "헬스케어 모바일 앱",
    "port3.desc": "웨어러블 기기 연동 건강 데이터 모니터링 iOS/Android 앱",
    "contact.tag": "CONTACT",
    "contact.title": "프로젝트를 시작해봅시다",
    "contact.desc": "아이디어가 있으신가요? 어떤 분야든 먼저 문의해 주세요. 빠르게 검토 후 연락드립니다.",
    "contact.ceo": "대표자",
    "contact.company": "회사명",
    "contact.note": "✦ 펌웨어 / 임베디드 개발 문의도 환영합니다",
    "form.name": "이름 / 회사명",
    "form.email": "이메일",
    "form.type": "개발 분야",
    "form.type.placeholder": "분야를 선택하세요",
    "form.type.web": "웹 개발",
    "form.type.app": "앱 개발",
    "form.type.firmware": "펌웨어 / 임베디드",
    "form.type.maintenance": "유지보수 & 기술지원",
    "form.type.other": "기타",
    "form.budget": "예상 예산 (선택)",
    "form.budget.placeholder": "예산 범위를 선택하세요",
    "form.budget.1": "100만원 미만",
    "form.budget.2": "100~300만원",
    "form.budget.3": "300~500만원",
    "form.budget.4": "500만~1000만원",
    "form.budget.5": "1000만원 이상",
    "form.message": "프로젝트 내용",
    "form.submit": "문의 보내기",
    "form.submitting": "전송 중...",
    "form.success": "문의가 접수되었습니다! 빠른 시일 내에 연락드리겠습니다.",
    "err.name": "이름을 입력해 주세요.",
    "err.email": "올바른 이메일을 입력해 주세요.",
    "err.type": "분야를 선택해 주세요.",
    "err.message": "내용을 입력해 주세요.",
    "footer.desc": "소프트웨어부터 펌웨어까지, 전문 개발팀이 함께합니다.",
    "footer.services": "서비스",
    "footer.web": "웹 개발",
    "footer.app": "앱 개발",
    "footer.firmware": "펌웨어 개발",
    "footer.maintenance": "유지보수",
    "footer.company": "회사",
    "footer.process": "개발 프로세스",
    "footer.portfolio": "포트폴리오",
    "footer.contact": "문의",
    "footer.rights": "All rights reserved.",
    "footer.ceo.label": "대표 노미선"
  },
  en: {
    "nav.services": "Services",
    "nav.process": "Process",
    "nav.portfolio": "Portfolio",
    "nav.contact": "Contact",
    "hero.badge": "✦ From Software to Firmware",
    "hero.title1": "We Turn Your Ideas",
    "hero.title2": "Into Reality",
    "hero.desc": "From web & app development to embedded firmware — A&N Dev delivers end-to-end professional development solutions.",
    "hero.cta1": "Get in Touch",
    "hero.cta2": "Our Services",
    "stat.projects": "Projects Done",
    "stat.satisfaction": "Satisfaction",
    "stat.years": "Yrs Experience",
    "scroll": "SCROLL",
    "services.tag": "SERVICES",
    "services.title": "We Build Everything",
    "services.desc": "Bridging the gap between software and hardware across diverse development domains.",
    "svc1.title": "Web Development",
    "svc1.desc": "Responsive websites, admin dashboards, e-commerce, SaaS platforms, and more.",
    "svc.featured": "Popular",
    "svc2.title": "App Development",
    "svc2.desc": "Native iOS / Android apps and cross-platform mobile solutions.",
    "svc.firmware": "Firmware",
    "svc3.title": "Firmware / Embedded",
    "svc3.desc": "MCU firmware, RTOS, driver development — full embedded software support.",
    "svc4.title": "Maintenance & Support",
    "svc4.desc": "System maintenance, bug fixes, performance tuning, and ongoing technical support.",
    "process.tag": "HOW WE WORK",
    "process.title": "Our Process",
    "process.desc": "A structured, step-by-step approach to deliver successful projects every time.",
    "step1.title": "Consult & Analyze",
    "step1.desc": "Requirements gathering, technical review, project scoping",
    "step2.title": "Plan & Design",
    "step2.desc": "Architecture design, timeline planning, proposal",
    "step3.title": "Develop & Implement",
    "step3.desc": "Phased development, code reviews, progress reports",
    "step4.title": "Test & Deliver",
    "step4.desc": "QA testing, documentation, delivery & post-launch support",
    "portfolio.tag": "PORTFOLIO",
    "portfolio.title": "Featured Projects",
    "portfolio.desc": "Development experience across diverse industries",
    "badge.firmware": "Firmware",
    "badge.web": "Web",
    "badge.app": "App",
    "port1.title": "IoT Sensor Module Firmware",
    "port1.desc": "STM32-based multi-channel sensor data collection and wireless transmission system",
    "port2.title": "Logistics Management Dashboard",
    "port2.desc": "Real-time inventory tracking and delivery status integrated web platform",
    "port3.title": "Healthcare Mobile App",
    "port3.desc": "Wearable device integration health data monitoring iOS/Android app",
    "contact.tag": "CONTACT",
    "contact.title": "Let's Start Your Project",
    "contact.desc": "Have an idea? Contact us in any field. We'll review and get back to you quickly.",
    "contact.ceo": "CEO",
    "contact.company": "Company",
    "contact.note": "✦ Firmware / Embedded development inquiries welcome",
    "form.name": "Name / Company",
    "form.email": "Email",
    "form.type": "Development Type",
    "form.type.placeholder": "Select a type",
    "form.type.web": "Web Development",
    "form.type.app": "App Development",
    "form.type.firmware": "Firmware / Embedded",
    "form.type.maintenance": "Maintenance & Support",
    "form.type.other": "Other",
    "form.budget": "Estimated Budget (optional)",
    "form.budget.placeholder": "Select a budget range",
    "form.budget.1": "Under ₩1M",
    "form.budget.2": "₩1M – ₩3M",
    "form.budget.3": "₩3M – ₩5M",
    "form.budget.4": "₩5M – ₩10M",
    "form.budget.5": "Over ₩10M",
    "form.message": "Project Details",
    "form.submit": "Send Inquiry",
    "form.submitting": "Sending...",
    "form.success": "Your inquiry has been received! We'll get back to you shortly.",
    "err.name": "Please enter your name.",
    "err.email": "Please enter a valid email.",
    "err.type": "Please select a type.",
    "err.message": "Please enter a message.",
    "footer.desc": "From software to firmware, our expert team has you covered.",
    "footer.services": "Services",
    "footer.web": "Web Dev",
    "footer.app": "App Dev",
    "footer.firmware": "Firmware Dev",
    "footer.maintenance": "Maintenance",
    "footer.company": "Company",
    "footer.process": "Process",
    "footer.portfolio": "Portfolio",
    "footer.contact": "Contact",
    "footer.rights": "All rights reserved.",
    "footer.ceo.label": "CEO: Roh Mi-seon"
  }
};

// Custom Hook to animate counting stats
function Counter({ value, trigger }: { value: number; trigger: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const duration = 1600;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.floor(eased * value));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(step);
  }, [value, trigger]);

  return <>{count}</>;
}

export default function Home() {
  const [lang, setLang] = useState<"kr" | "en">("kr");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  
  const [errors, setErrors] = useState<{
    name?: boolean;
    email?: boolean;
    type?: boolean;
    message?: boolean;
  }>({});
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const t = (key: keyof typeof i18n["kr"]) => {
    return i18n[lang][key] || i18n["kr"][key] || key;
  };

  // Stats visibility state for counter animation trigger
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger counting animation on mount
    const timer = setTimeout(() => setStatsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Monitor scroll for Navbar transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for Reveal items
  useEffect(() => {
    const observerOptions = { threshold: 0.15 };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);
    
    const revealItems = document.querySelectorAll(".reveal-item");
    revealItems.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
    };
  }, []);

  // Handle inquiry form validation and submission
  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = {
      name: !name.trim(),
      email: !validateEmail(email),
      type: !type,
      message: !message.trim(),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(val => val)) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (supabase) {
        const { error } = await supabase.from("inquiries").insert([
          {
            name,
            email,
            development_type: type,
            budget: budget || null,
            message,
          },
        ]);

        if (error) throw error;
      } else {
        // Fallback simulation if Supabase credentials are not set up yet
        console.warn("Supabase credentials missing. Simulating submit...");
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }

      setIsSuccess(true);
      setName("");
      setEmail("");
      setType("");
      setBudget("");
      setMessage("");

      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (err: any) {
      console.error("Submission failed details:", err);
      const errMsg = err?.message || (typeof err === "object" ? JSON.stringify(err) : String(err));
      alert(`전송에 실패했습니다. 다시 시도해 주세요.\n\n오류 내용:\n${errMsg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Safe anchor scroll handler
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      const offset = 80;
      window.scrollTo({
        top: target.offsetTop - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ${
          isScrolled
            ? "bg-white/92 backdrop-blur-md shadow-[0_2px_8px_rgba(15,27,76,0.06)] py-3"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1160px] mx-auto px-6 flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => handleAnchorClick(e, "hero")}
            className="flex items-center gap-3 shrink-0"
          >
            <div className="w-11 h-11 bg-gradient-to-br from-navy to-navy-mid rounded-lg flex items-center justify-center font-en font-extrabold text-[0.85rem] text-white tracking-tight shadow-md">
              A<span className="text-teal">&</span>N
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-en font-extrabold text-[1.15rem] text-navy tracking-tight">A&N Dev</span>
              <span className="text-[0.65rem] text-gray-400 font-normal tracking-wide">에이엔디브</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-1 ml-auto">
            <li>
              <a
                href="#services"
                onClick={(e) => handleAnchorClick(e, "services")}
                className="px-[18px] py-2 rounded-full text-[0.93rem] font-medium text-navy hover:bg-gray-100 transition-colors"
              >
                {t("nav.services")}
              </a>
            </li>
            <li>
              <a
                href="#process"
                onClick={(e) => handleAnchorClick(e, "process")}
                className="px-[18px] py-2 rounded-full text-[0.93rem] font-medium text-navy hover:bg-gray-100 transition-colors"
              >
                {t("nav.process")}
              </a>
            </li>
            <li>
              <a
                href="#portfolio"
                onClick={(e) => handleAnchorClick(e, "portfolio")}
                className="px-[18px] py-2 rounded-full text-[0.93rem] font-medium text-navy hover:bg-gray-100 transition-colors"
              >
                {t("nav.portfolio")}
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => handleAnchorClick(e, "contact")}
                className="ml-2 px-[22px] py-2 rounded-full text-[0.93rem] font-semibold text-white bg-navy hover:bg-teal-dark hover:shadow-[0_4px_14px_rgba(0,201,167,0.35)] transition-all duration-300"
              >
                {t("nav.contact")}
              </a>
            </li>
          </ul>

          <div className="flex items-center gap-3 ml-auto md:ml-0">
            {/* Lang Toggle */}
            <button
              onClick={() => setLang(lang === "kr" ? "en" : "kr")}
              className="flex items-center gap-1.5 font-en text-[0.78rem] font-semibold tracking-wider text-gray-400 px-2.5 py-1.5 rounded-full border border-gray-200 hover:border-teal bg-white transition-colors cursor-pointer"
              aria-label="Toggle language"
            >
              <span className={lang === "kr" ? "text-navy" : ""}>KR</span>
              <span className="text-gray-200">|</span>
              <span className={lang === "en" ? "text-navy" : ""}>EN</span>
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex flex-col gap-1.25 p-2 focus:outline-none"
              aria-label="Open menu"
            >
              <span className={`block w-5.5 h-0.5 bg-navy rounded-sm transition-transform duration-300 ${isMobileMenuOpen ? "translate-y-1.75 rotate-45" : ""}`} />
              <span className={`block w-5.5 h-0.5 bg-navy rounded-sm transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5.5 h-0.5 bg-navy rounded-sm transition-transform duration-300 ${isMobileMenuOpen ? "-translate-y-1.75 -rotate-45" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile Nav Links Overlay */}
        <div
          className={`fixed top-0 bottom-0 w-[280px] bg-white shadow-[-8px_0_40px_rgba(0,0,0,0.1)] z-40 flex flex-col pt-20 px-6 gap-2 transition-all duration-300 md:hidden ${
            isMobileMenuOpen ? "right-0" : "-right-[100%]"
          }`}
        >
          <a
            href="#services"
            onClick={(e) => handleAnchorClick(e, "services")}
            className="w-full px-4 py-2.5 rounded-lg text-navy font-medium text-lg hover:bg-gray-100 transition-colors"
          >
            {t("nav.services")}
          </a>
          <a
            href="#process"
            onClick={(e) => handleAnchorClick(e, "process")}
            className="w-full px-4 py-2.5 rounded-lg text-navy font-medium text-lg hover:bg-gray-100 transition-colors"
          >
            {t("nav.process")}
          </a>
          <a
            href="#portfolio"
            onClick={(e) => handleAnchorClick(e, "portfolio")}
            className="w-full px-4 py-2.5 rounded-lg text-navy font-medium text-lg hover:bg-gray-100 transition-colors"
          >
            {t("nav.portfolio")}
          </a>
          <a
            href="#contact"
            onClick={(e) => handleAnchorClick(e, "contact")}
            className="w-full mt-4 text-center px-6 py-3 rounded-full text-white bg-navy font-semibold text-lg hover:bg-teal-dark transition-colors"
          >
            {t("nav.contact")}
          </a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-50 via-[#e8f0fe] to-teal-light pt-20"
      >
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 hero-grid" />
          <div className="absolute rounded-full filter blur-[80px] opacity-45 bg-[radial-gradient(circle,_rgba(0,201,167,0.22)_0%,_transparent_70%)] w-[520px] h-[520px] -top-[120px] -right-[80px] hero-orb" />
          <div className="absolute rounded-full filter blur-[80px] opacity-45 bg-[radial-gradient(circle,_rgba(79,200,240,0.2)_0%,_transparent_70%)] w-[380px] h-[380px] -bottom-[60px] -left-[60px] hero-orb [animation-delay:-3s]" />
          <div className="absolute rounded-full filter blur-[80px] opacity-45 bg-[radial-gradient(circle,_rgba(15,27,76,0.1)_0%,_transparent_70%)] w-[260px] h-[260px] top-[40%] left-[40%] hero-orb [animation-delay:-5s]" />

          <div className="absolute inset-0">
            <svg viewBox="0 0 1200 600" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
              <path className="circuit-path fill-none stroke-navy stroke-[1.5] opacity-10" d="M0,200 L200,200 L200,100 L400,100 L400,300 L600,300" />
              <path className="circuit-path fill-none stroke-navy stroke-[1.5] opacity-10" d="M1200,150 L1000,150 L1000,250 L800,250 L800,150 L650,150" />
              <path className="circuit-path fill-none stroke-navy stroke-[1.5] opacity-10" d="M100,500 L300,500 L300,400 L500,400" />
              <path className="circuit-path fill-none stroke-navy stroke-[1.5] opacity-10" d="M1100,450 L900,450 L900,350 L750,350" />
              <circle className="fill-teal opacity-35" cx="200" cy="200" r="4" />
              <circle className="fill-teal opacity-35" cx="400" cy="100" r="4" />
              <circle className="fill-teal opacity-35" cx="1000" cy="150" r="4" />
              <circle className="fill-teal opacity-35" cx="800" cy="250" r="4" />
              <circle className="fill-teal opacity-35" cx="300" cy="500" r="4" />
            </svg>
          </div>
        </div>

        <div className="relative z-10 max-w-[740px] px-6 py-20 text-center flex flex-col items-center">
          <div className="inline-block font-en text-[0.8rem] font-semibold tracking-widest text-teal-dark bg-teal-light border border-[rgba(0,201,167,0.25)] px-4.5 py-1.5 rounded-full mb-7 animate-[fadeUp_0.8s_ease_both]">
            {t("hero.badge")}
          </div>
          <h1 className="flex flex-col font-en font-extrabold text-[2.6rem] sm:text-[4.2rem] leading-[1.1] tracking-tight text-navy mb-6 animate-[fadeUp_0.8s_0.1s_ease_both]">
            <span className="text-[0.85em] font-sans font-bold leading-normal">{t("hero.title1")}</span>
            <span className="gradient-text text-[1.14em]">{t("hero.title2")}</span>
          </h1>
          <p
            className="text-base sm:text-[1.08rem] text-text-muted leading-relaxed mb-10 max-w-[620px] animate-[fadeUp_0.8s_0.2s_ease_both]"
            dangerouslySetInnerHTML={{ __html: t("hero.desc") }}
          />
          
          <div className="flex gap-4 justify-center flex-wrap mb-15 animate-[fadeUp_0.8s_0.3s_ease_both]">
            <a
              href="#contact"
              onClick={(e) => handleAnchorClick(e, "contact")}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-navy to-navy-mid text-white font-bold text-base px-8 py-3.5 rounded-full shadow-[0_8px_24px_rgba(15,27,76,0.25)] hover:scale-[1.03] hover:shadow-[0_16px_40px_rgba(15,27,76,0.30)] transition-all duration-300"
            >
              {t("hero.cta1")}
            </a>
            <a
              href="#services"
              onClick={(e) => handleAnchorClick(e, "services")}
              className="inline-flex items-center gap-2 bg-white text-navy font-semibold text-base px-7.5 py-3 rounded-full border-2 border-gray-200 hover:border-navy hover:scale-[1.02] hover:shadow-md transition-all duration-300"
            >
              {t("hero.cta2")}
            </a>
          </div>

          {/* Stats Bar */}
          <div
            ref={statsRef}
            className="flex items-center justify-center bg-white rounded-2xl py-6 px-10 shadow-[0_8px_32px_rgba(15,27,76,0.1)] border border-gray-100 flex-wrap gap-y-4 animate-[fadeUp_0.8s_0.4s_ease_both]"
          >
            <div className="flex flex-col items-center px-8">
              <span className="font-en text-[2.2rem] font-extrabold text-navy leading-none">
                <Counter value={100} trigger={statsVisible} />
                <span className="font-en text-[1.4rem] font-bold text-teal ml-0.5">+</span>
              </span>
              <span className="text-[0.78rem] text-gray-400 font-medium mt-1 whitespace-nowrap">{t("stat.projects")}</span>
            </div>
            <div className="w-px h-10 bg-gray-200 hidden sm:block" />
            <div className="flex flex-col items-center px-8">
              <span className="font-en text-[2.2rem] font-extrabold text-navy leading-none">
                <Counter value={98} trigger={statsVisible} />
                <span className="font-en text-[1.4rem] font-bold text-teal ml-0.5">%</span>
              </span>
              <span className="text-[0.78rem] text-gray-400 font-medium mt-1 whitespace-nowrap">{t("stat.satisfaction")}</span>
            </div>
            <div className="w-px h-10 bg-gray-200 hidden sm:block" />
            <div className="flex flex-col items-center px-8">
              <span className="font-en text-[2.2rem] font-extrabold text-navy leading-none">
                <Counter value={5} trigger={statsVisible} />
                <span className="font-en text-[1.4rem] font-bold text-teal ml-0.5">+</span>
              </span>
              <span className="text-[0.78rem] text-gray-400 font-medium mt-1 whitespace-nowrap">{t("stat.years")}</span>
            </div>
          </div>
        </div>

        {/* Scroll hint indicator */}
        <div className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 text-[0.72rem] tracking-widest font-en animate-[fadeUp_0.8s_0.8s_ease_both]">
          <div className="w-5.5 h-8.5 border-2 border-gray-400 rounded-xl flex justify-center pt-1.5">
            <div className="w-0.75 h-1.75 bg-teal rounded-sm scroll-wheel-anim" />
          </div>
          <span>{t("scroll")}</span>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 bg-white relative z-10">
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="text-center mb-15 reveal-item">
            <span className="inline-block font-en text-[0.72rem] font-bold tracking-widest text-teal-dark bg-teal-light px-3.5 py-1.25 rounded-full mb-4">
              {t("services.tag")}
            </span>
            <h2 className="font-en font-extrabold text-[2rem] sm:text-[2.8rem] leading-none text-navy mb-3.5">
              {t("services.title")}
            </h2>
            <p className="text-text-muted text-[1.05rem] max-w-[540px] mx-auto">
              {t("services.desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service 1 */}
            <div className="relative bg-white border border-gray-100 hover:border-teal-light rounded-2xl p-8 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(15,27,76,0.14)] transition-all duration-300 overflow-hidden group reveal-item">
              <div className="absolute -top-[60px] -right-[60px] w-[200px] h-[200px] bg-[radial-gradient(circle,_rgba(0,201,167,0.12)_0%,_transparent_70%)] pointer-events-none group-hover:opacity-150 transition-opacity" />
              <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center text-navy mb-5 group-hover:bg-navy group-hover:text-teal transition-all duration-300">
                <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="8" width="40" height="28" rx="3" stroke="currentColor" strokeWidth="2.5" />
                  <path d="M16 44h16M20 36v8M28 36v8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M14 22l4 4-4 4M20 30h8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="font-en font-bold text-lg text-navy mb-3">{t("svc1.title")}</h3>
              <p className="text-[0.9rem] text-text-muted leading-relaxed mb-5">{t("svc1.desc")}</p>
              <ul className="flex flex-wrap gap-1.5">
                <li className="font-en text-[0.72rem] font-semibold text-navy-mid bg-gray-100 px-2.5 py-1 rounded-full">React / Next.js</li>
                <li className="font-en text-[0.72rem] font-semibold text-navy-mid bg-gray-100 px-2.5 py-1 rounded-full">Node.js</li>
                <li className="font-en text-[0.72rem] font-semibold text-navy-mid bg-gray-100 px-2.5 py-1 rounded-full">REST API</li>
              </ul>
            </div>

            {/* Service 2 */}
            <div className="relative bg-gradient-to-br from-[#f0fefb] to-white border border-teal rounded-2xl p-8 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(15,27,76,0.14)] transition-all duration-300 overflow-hidden group reveal-item">
              <div className="absolute -top-[60px] -right-[60px] w-[200px] h-[200px] bg-[radial-gradient(circle,_rgba(0,201,167,0.12)_0%,_transparent_70%)] pointer-events-none group-hover:opacity-150 transition-opacity" />
              <span className="absolute top-5 right-5 font-en text-[0.68rem] font-bold tracking-wider px-2.5 py-1 rounded-full bg-teal text-white">{t("svc.featured")}</span>
              <div className="w-14 h-14 bg-teal-light rounded-xl flex items-center justify-center text-teal-dark mb-5 group-hover:bg-teal-dark group-hover:text-white transition-all duration-300">
                <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
                  <rect x="6" y="6" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2.5" />
                  <rect x="26" y="6" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2.5" />
                  <rect x="6" y="26" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2.5" />
                  <path d="M34 26v16M26 34h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="font-en font-bold text-lg text-navy mb-3">{t("svc2.title")}</h3>
              <p className="text-[0.9rem] text-text-muted leading-relaxed mb-5">{t("svc2.desc")}</p>
              <ul className="flex flex-wrap gap-1.5">
                <li className="font-en text-[0.72rem] font-semibold text-navy-mid bg-gray-100 px-2.5 py-1 rounded-full">Flutter</li>
                <li className="font-en text-[0.72rem] font-semibold text-navy-mid bg-gray-100 px-2.5 py-1 rounded-full">React Native</li>
                <li className="font-en text-[0.72rem] font-semibold text-navy-mid bg-gray-100 px-2.5 py-1 rounded-full">Swift / Kotlin</li>
              </ul>
            </div>

            {/* Service 3 */}
            <div className="relative bg-gradient-to-br from-[#f0fefb] to-white border border-teal rounded-2xl p-8 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(15,27,76,0.14)] transition-all duration-300 overflow-hidden group reveal-item">
              <div className="absolute -top-[60px] -right-[60px] w-[200px] h-[200px] bg-[radial-gradient(circle,_rgba(0,201,167,0.12)_0%,_transparent_70%)] pointer-events-none group-hover:opacity-150 transition-opacity" />
              <span className="absolute top-5 right-5 font-en text-[0.68rem] font-bold tracking-wider px-2.5 py-1 rounded-full bg-navy text-white">{t("svc.firmware")}</span>
              <div className="w-14 h-14 bg-teal-light rounded-xl flex items-center justify-center text-teal-dark mb-5 group-hover:bg-teal-dark group-hover:text-white transition-all duration-300">
                <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
                  <rect x="12" y="10" width="24" height="28" rx="2" stroke="currentColor" strokeWidth="2.5" />
                  <path d="M8 18h4M8 24h4M8 30h4M36 18h4M36 24h4M36 30h4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  <rect x="17" y="16" width="14" height="8" rx="1" stroke="currentColor" strokeWidth="2" />
                  <circle cx="21" cy="30" r="2" stroke="currentColor" strokeWidth="2" />
                  <circle cx="27" cy="30" r="2" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <h3 className="font-en font-bold text-lg text-navy mb-3">{t("svc3.title")}</h3>
              <p className="text-[0.9rem] text-text-muted leading-relaxed mb-5">{t("svc3.desc")}</p>
              <ul className="flex flex-wrap gap-1.5">
                <li className="font-en text-[0.72rem] font-semibold text-navy-mid bg-gray-100 px-2.5 py-1 rounded-full">STM32 / ESP32</li>
                <li className="font-en text-[0.72rem] font-semibold text-navy-mid bg-gray-100 px-2.5 py-1 rounded-full">FreeRTOS</li>
                <li className="font-en text-[0.72rem] font-semibold text-navy-mid bg-gray-100 px-2.5 py-1 rounded-full">C / C++</li>
              </ul>
            </div>

            {/* Service 4 */}
            <div className="relative bg-white border border-gray-100 hover:border-teal-light rounded-2xl p-8 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(15,27,76,0.14)] transition-all duration-300 overflow-hidden group reveal-item">
              <div className="absolute -top-[60px] -right-[60px] w-[200px] h-[200px] bg-[radial-gradient(circle,_rgba(0,201,167,0.12)_0%,_transparent_70%)] pointer-events-none group-hover:opacity-150 transition-opacity" />
              <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center text-navy mb-5 group-hover:bg-navy group-hover:text-teal transition-all duration-300">
                <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 6l18 10.5v15L24 42 6 31.5v-15L24 6z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
                  <path d="M24 6v36M6 16.5l18 10.5 18-10.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="font-en font-bold text-lg text-navy mb-3">{t("svc4.title")}</h3>
              <p className="text-[0.9rem] text-text-muted leading-relaxed mb-5">{t("svc4.desc")}</p>
              <ul className="flex flex-wrap gap-1.5">
                <li className="font-en text-[0.72rem] font-semibold text-navy-mid bg-gray-100 px-2.5 py-1 rounded-full">버그 수정</li>
                <li className="font-en text-[0.72rem] font-semibold text-navy-mid bg-gray-100 px-2.5 py-1 rounded-full">성능 최적화</li>
                <li className="font-en text-[0.72rem] font-semibold text-navy-mid bg-gray-100 px-2.5 py-1 rounded-full">기술 상담</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section id="process" className="py-24 bg-gradient-to-b from-gray-50 to-white relative z-10">
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="text-center mb-15 reveal-item">
            <span className="inline-block font-en text-[0.72rem] font-bold tracking-widest text-teal-dark bg-teal-light px-3.5 py-1.25 rounded-full mb-4">
              {t("process.tag")}
            </span>
            <h2 className="font-en font-extrabold text-[2rem] sm:text-[2.8rem] leading-none text-navy mb-3.5">
              {t("process.title")}
            </h2>
            <p className="text-text-muted text-[1.05rem] max-w-[540px] mx-auto">
              {t("process.desc")}
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-2">
            {/* Step 1 */}
            <div className="flex-1 w-full max-w-[220px] bg-white border border-gray-100 rounded-2xl p-7 text-center hover:-translate-y-1 hover:shadow-md transition-all duration-300 reveal-item">
              <div className="font-en text-[0.72rem] font-extrabold tracking-wider text-teal mb-4">01</div>
              <div className="w-12 h-12 bg-teal-light rounded-lg flex items-center justify-center text-teal-dark mx-auto mb-4">
                <svg viewBox="0 0 32 32" fill="currentColor" className="w-5.5 h-5.5" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 4C9.37 4 4 9.37 4 16s5.37 12 12 12 12-5.37 12-12S22.63 4 16 4zm0 5.5a3 3 0 110 6 3 3 0 010-6zm0 17a9 9 0 01-7-3.37c.04-2.32 4.67-3.59 7-3.59 2.32 0 6.96 1.27 7 3.59A9 9 0 0116 26.5z" />
                </svg>
              </div>
              <h4 className="font-en font-bold text-base text-navy mb-2.5">{t("step1.title")}</h4>
              <p className="text-[0.82rem] text-text-muted leading-relaxed">{t("step1.desc")}</p>
            </div>

            <div className="text-2xl text-gray-200 self-center rotate-90 md:rotate-0 my-2 md:my-0 select-none">→</div>

            {/* Step 2 */}
            <div className="flex-1 w-full max-w-[220px] bg-white border border-gray-100 rounded-2xl p-7 text-center hover:-translate-y-1 hover:shadow-md transition-all duration-300 reveal-item [animation-delay:0.1s]">
              <div className="font-en text-[0.72rem] font-extrabold tracking-wider text-teal mb-4">02</div>
              <div className="w-12 h-12 bg-teal-light rounded-lg flex items-center justify-center text-teal-dark mx-auto mb-4">
                <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5.5 h-5.5" xmlns="http://www.w3.org/2000/svg">
                  <path d="M28 6H4v20h24V6zM4 10h24" />
                  <path d="M9 15h14M9 20h8" />
                </svg>
              </div>
              <h4 className="font-en font-bold text-base text-navy mb-2.5">{t("step2.title")}</h4>
              <p className="text-[0.82rem] text-text-muted leading-relaxed">{t("step2.desc")}</p>
            </div>

            <div className="text-2xl text-gray-200 self-center rotate-90 md:rotate-0 my-2 md:my-0 select-none">→</div>

            {/* Step 3 */}
            <div className="flex-1 w-full max-w-[220px] bg-white border border-gray-100 rounded-2xl p-7 text-center hover:-translate-y-1 hover:shadow-md transition-all duration-300 reveal-item [animation-delay:0.2s]">
              <div className="font-en text-[0.72rem] font-extrabold tracking-wider text-teal mb-4">03</div>
              <div className="w-12 h-12 bg-teal-light rounded-lg flex items-center justify-center text-teal-dark mx-auto mb-4">
                <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5.5 h-5.5" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 20l4-4-4-4M16 20h6" />
                  <rect x="4" y="4" width="24" height="24" rx="2" />
                </svg>
              </div>
              <h4 className="font-en font-bold text-base text-navy mb-2.5">{t("step3.title")}</h4>
              <p className="text-[0.82rem] text-text-muted leading-relaxed">{t("step3.desc")}</p>
            </div>

            <div className="text-2xl text-gray-200 self-center rotate-90 md:rotate-0 my-2 md:my-0 select-none">→</div>

            {/* Step 4 */}
            <div className="flex-1 w-full max-w-[220px] bg-white border border-gray-100 rounded-2xl p-7 text-center hover:-translate-y-1 hover:shadow-md transition-all duration-300 reveal-item [animation-delay:0.3s]">
              <div className="font-en text-[0.72rem] font-extrabold tracking-wider text-teal mb-4">04</div>
              <div className="w-12 h-12 bg-teal-light rounded-lg flex items-center justify-center text-teal-dark mx-auto mb-4">
                <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5.5 h-5.5" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 16l8 8L26 8" />
                </svg>
              </div>
              <h4 className="font-en font-bold text-base text-navy mb-2.5">{t("step4.title")}</h4>
              <p className="text-[0.82rem] text-text-muted leading-relaxed">{t("step4.desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <section id="portfolio" className="py-24 bg-white relative z-10">
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="text-center mb-15 reveal-item">
            <span className="inline-block font-en text-[0.72rem] font-bold tracking-widest text-teal-dark bg-teal-light px-3.5 py-1.25 rounded-full mb-4">
              {t("portfolio.tag")}
            </span>
            <h2 className="font-en font-extrabold text-[2rem] sm:text-[2.8rem] leading-none text-navy mb-3.5">
              {t("portfolio.title")}
            </h2>
            <p className="text-text-muted text-[1.05rem] max-w-[540px] mx-auto">
              {t("portfolio.desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="rounded-2xl overflow-hidden border border-gray-100 bg-white hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(15,27,76,0.14)] transition-all duration-300 reveal-item">
              <div className="h-[200px] flex items-center justify-center relative bg-gradient-to-br from-navy to-navy-mid text-[rgba(255,255,255,0.85)]">
                <svg viewBox="0 0 64 64" fill="none" className="w-[72px] h-[72px]" xmlns="http://www.w3.org/2000/svg">
                  <rect x="16" y="12" width="32" height="40" rx="3" stroke="currentColor" strokeWidth="2.5" />
                  <path d="M8 24h8M8 32h8M8 40h8M48 24h8M48 32h8M48 40h8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  <rect x="22" y="20" width="20" height="12" rx="1.5" stroke="currentColor" strokeWidth="2" />
                  <circle cx="28" cy="40" r="3" stroke="currentColor" strokeWidth="2" />
                  <circle cx="36" cy="40" r="3" stroke="currentColor" strokeWidth="2" />
                </svg>
                <span className="absolute top-3.5 right-3.5 font-en text-[0.7rem] font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/20 text-white border border-white/40">
                  {t("badge.firmware")}
                </span>
              </div>
              <div className="p-6">
                <h4 className="font-en font-bold text-lg text-navy mb-2">{t("port1.title")}</h4>
                <p className="text-[0.88rem] text-text-muted leading-relaxed mb-3.5">{t("port1.desc")}</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="font-en text-[0.7rem] font-semibold px-2.5 py-0.75 rounded-full bg-navy text-teal">STM32</span>
                  <span className="font-en text-[0.7rem] font-semibold px-2.5 py-0.75 rounded-full bg-navy text-teal">FreeRTOS</span>
                  <span className="font-en text-[0.7rem] font-semibold px-2.5 py-0.75 rounded-full bg-navy text-teal">BLE</span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl overflow-hidden border border-gray-100 bg-white hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(15,27,76,0.14)] transition-all duration-300 reveal-item [animation-delay:0.1s]">
              <div className="h-[200px] flex items-center justify-center relative bg-gradient-to-br from-navy-mid to-teal text-[rgba(255,255,255,0.85)]">
                <svg viewBox="0 0 64 64" fill="none" className="w-[72px] h-[72px]" xmlns="http://www.w3.org/2000/svg">
                  <rect x="6" y="10" width="52" height="36" rx="3" stroke="currentColor" strokeWidth="2.5" />
                  <path d="M22 54h20M27 46v8M37 46v8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M20 28l6 6-6 6M30 34h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="absolute top-3.5 right-3.5 font-en text-[0.7rem] font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/20 text-white border border-white/40">
                  {t("badge.web")}
                </span>
              </div>
              <div className="p-6">
                <h4 className="font-en font-bold text-lg text-navy mb-2">{t("port2.title")}</h4>
                <p className="text-[0.88rem] text-text-muted leading-relaxed mb-3.5">{t("port2.desc")}</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="font-en text-[0.7rem] font-semibold px-2.5 py-0.75 rounded-full bg-navy text-teal">React</span>
                  <span className="font-en text-[0.7rem] font-semibold px-2.5 py-0.75 rounded-full bg-navy text-teal">Node.js</span>
                  <span className="font-en text-[0.7rem] font-semibold px-2.5 py-0.75 rounded-full bg-navy text-teal">PostgreSQL</span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl overflow-hidden border border-gray-100 bg-white hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(15,27,76,0.14)] transition-all duration-300 reveal-item [animation-delay:0.2s]">
              <div className="h-[200px] flex items-center justify-center relative bg-gradient-to-br from-[#006aff] to-teal text-[rgba(255,255,255,0.85)]">
                <svg viewBox="0 0 64 64" fill="none" className="w-[72px] h-[72px]" xmlns="http://www.w3.org/2000/svg">
                  <rect x="18" y="4" width="28" height="56" rx="4" stroke="currentColor" strokeWidth="2.5" />
                  <path d="M28 52h8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M24 16h16M24 24h12M24 32h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className="absolute top-3.5 right-3.5 font-en text-[0.7rem] font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/20 text-white border border-white/40">
                  {t("badge.app")}
                </span>
              </div>
              <div className="p-6">
                <h4 className="font-en font-bold text-lg text-navy mb-2">{t("port3.title")}</h4>
                <p className="text-[0.88rem] text-text-muted leading-relaxed mb-3.5">{t("port3.desc")}</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="font-en text-[0.7rem] font-semibold px-2.5 py-0.75 rounded-full bg-navy text-teal">Flutter</span>
                  <span className="font-en text-[0.7rem] font-semibold px-2.5 py-0.75 rounded-full bg-navy text-teal">BLE</span>
                  <span className="font-en text-[0.7rem] font-semibold px-2.5 py-0.75 rounded-full bg-navy text-teal">Firebase</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 bg-gradient-to-b from-gray-50 to-teal-light relative z-10">
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-15 items-start">
            
            {/* Contact Details Left Side */}
            <div className="lg:col-span-2 reveal-item">
              <span className="inline-block font-en text-[0.72rem] font-bold tracking-widest text-teal-dark bg-teal-light px-3.5 py-1.25 rounded-full mb-5">
                {t("contact.tag")}
              </span>
              <h2
                className="font-en font-extrabold text-[2rem] sm:text-[2.6rem] leading-[1.2] text-navy mb-5"
                dangerouslySetInnerHTML={{ __html: t("contact.title") }}
              />
              <p className="text-[0.95rem] text-text-muted leading-relaxed mb-8">{t("contact.desc")}</p>
              
              <div className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col gap-4 shadow-sm mb-6">
                <div className="flex items-center gap-3.5">
                  <div className="w-[38px] h-[38px] bg-teal-light rounded-lg flex items-center justify-center text-teal-dark shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-[18px] h-[18px]" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[0.72rem] text-gray-400 font-medium mb-0.5">{t("contact.ceo")}</span>
                    <span className="font-semibold text-navy text-[0.92rem]">노미선 (Roh Mi-seon)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-[38px] h-[38px] bg-teal-light rounded-lg flex items-center justify-center text-teal-dark shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px]" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[0.72rem] text-gray-400 font-medium mb-0.5">{t("contact.company")}</span>
                    <span className="font-semibold text-navy text-[0.92rem]">A&N Dev (에이엔디브)</span>
                  </div>
                </div>
              </div>

              <div className="text-[0.85rem] text-teal-dark font-semibold bg-teal-light px-4 py-2.5 rounded-lg">
                {t("contact.note")}
              </div>
            </div>

            {/* Form Right Side */}
            <div className="lg:col-span-3 bg-white rounded-3xl p-8 sm:p-10 shadow-[0_20px_60px_rgba(15,27,76,0.14)] border border-gray-100 reveal-item">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5" noValidate>
                
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-[0.82rem] font-semibold text-navy">{t("form.name")}</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors({ ...errors, name: false });
                    }}
                    placeholder="홍길동 / (주)ABC"
                    className={`px-4 py-3 border rounded-lg text-[0.92rem] bg-white outline-none transition-all ${
                      errors.name
                        ? "border-red-500 focus:border-red-500 focus:ring-3 focus:ring-red-500/10"
                        : "border-gray-200 focus:border-teal focus:ring-3 focus:ring-teal/12"
                    }`}
                  />
                  {errors.name && <span className="text-[0.76rem] text-red-500 font-medium">{t("err.name")}</span>}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-[0.82rem] font-semibold text-navy">{t("form.email")}</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: false });
                    }}
                    placeholder="your@email.com"
                    className={`px-4 py-3 border rounded-lg text-[0.92rem] bg-white outline-none transition-all ${
                      errors.email
                        ? "border-red-500 focus:border-red-500 focus:ring-3 focus:ring-red-500/10"
                        : "border-gray-200 focus:border-teal focus:ring-3 focus:ring-teal/12"
                    }`}
                  />
                  {errors.email && <span className="text-[0.76rem] text-red-500 font-medium">{t("err.email")}</span>}
                </div>

                {/* Type Select */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="type" className="text-[0.82rem] font-semibold text-navy">{t("form.type")}</label>
                  <div className="relative">
                    <select
                      id="type"
                      value={type}
                      onChange={(e) => {
                        setType(e.target.value);
                        if (errors.type) setErrors({ ...errors, type: false });
                      }}
                      className={`w-full px-4 py-3 border rounded-lg text-[0.92rem] bg-white outline-none transition-all appearance-none cursor-pointer ${
                        errors.type
                          ? "border-red-500 focus:border-red-500 focus:ring-3 focus:ring-red-500/10"
                          : "border-gray-200 focus:border-teal focus:ring-3 focus:ring-teal/12"
                      }`}
                    >
                      <option value="" disabled>{t("form.type.placeholder")}</option>
                      <option value="web">{t("form.type.web")}</option>
                      <option value="app">{t("form.type.app")}</option>
                      <option value="firmware">{t("form.type.firmware")}</option>
                      <option value="maintenance">{t("form.type.maintenance")}</option>
                      <option value="other">{t("form.type.other")}</option>
                    </select>
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                  {errors.type && <span className="text-[0.76rem] text-red-500 font-medium">{t("err.type")}</span>}
                </div>

                {/* Budget Select */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="budget" className="text-[0.82rem] font-semibold text-navy">{t("form.budget")}</label>
                  <div className="relative">
                    <select
                      id="budget"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 focus:border-teal focus:ring-3 focus:ring-teal/12 rounded-lg text-[0.92rem] bg-white outline-none appearance-none cursor-pointer"
                    >
                      <option value="" disabled>{t("form.budget.placeholder")}</option>
                      <option value="under100">{t("form.budget.1")}</option>
                      <option value="100-300">{t("form.budget.2")}</option>
                      <option value="300-500">{t("form.budget.3")}</option>
                      <option value="500-1000">{t("form.budget.4")}</option>
                      <option value="over1000">{t("form.budget.5")}</option>
                    </select>
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label htmlFor="message" className="text-[0.82rem] font-semibold text-navy">{t("form.message")}</label>
                  <textarea
                    id="message"
                    rows={5}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message) setErrors({ ...errors, message: false });
                    }}
                    placeholder="개발하고 싶은 내용을 자유롭게 적어주세요."
                    className={`px-4 py-3 border rounded-lg text-[0.92rem] bg-white outline-none transition-all resize-y min-h-[120px] ${
                      errors.message
                        ? "border-red-500 focus:border-red-500 focus:ring-3 focus:ring-red-500/10"
                        : "border-gray-200 focus:border-teal focus:ring-3 focus:ring-teal/12"
                    }`}
                  />
                  {errors.message && <span className="text-[0.76rem] text-red-500 font-medium">{t("err.message")}</span>}
                </div>

                {/* Submit Button */}
                {!isSuccess && (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="sm:col-span-2 flex items-center justify-center gap-2.5 bg-gradient-to-r from-navy to-navy-mid text-white font-bold text-base py-4 px-9 rounded-full cursor-pointer transition-all duration-300 border-none shadow-[0_8px_24px_rgba(15,27,76,0.20)] hover:from-teal-dark hover:to-teal hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,201,167,0.30)] disabled:opacity-70 disabled:cursor-not-allowed group"
                  >
                    <span>{isSubmitting ? t("form.submitting") : t("form.submit")}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                  </button>
                )}

                {/* Success Alert Banner */}
                {isSuccess && (
                  <div className="sm:col-span-2 flex items-center gap-3.5 bg-gradient-to-br from-[#f0fefb] to-[#e0faf4] border border-[rgba(0,201,167,0.3)] rounded-xl p-4.5 text-teal-dark font-semibold text-[0.92rem] animate-[fadeUp_0.4s_ease_both]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-6 h-6 shrink-0 text-teal" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <p>{t("form.success")}</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-800 text-white/75 pt-15 pb-5">
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-white/8">
            {/* Brand column */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-[36px] h-[36px] bg-gradient-to-br from-navy to-navy-mid rounded-lg flex items-center justify-center font-en font-extrabold text-[0.72rem] text-white tracking-tight">
                  A<span className="text-teal">&</span>N
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="font-en font-extrabold text-lg text-white tracking-tight">A&N Dev</span>
                  <span className="text-[0.65rem] text-white/40 font-normal tracking-wide">에이엔디브</span>
                </div>
              </div>
              <p className="text-[0.88rem] leading-relaxed text-white/50">{t("footer.desc")}</p>
            </div>

            {/* Links columns */}
            <div className="flex gap-15">
              <div className="flex-1 flex flex-col">
                <h5 className="font-en text-[0.78rem] font-bold tracking-wider text-teal mb-4">{t("footer.services")}</h5>
                <ul className="flex flex-col gap-2.5 text-[0.88rem]">
                  <li>
                    <a
                      href="#services"
                      onClick={(e) => handleAnchorClick(e, "services")}
                      className="text-white/50 hover:text-white transition-colors"
                    >
                      {t("footer.web")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#services"
                      onClick={(e) => handleAnchorClick(e, "services")}
                      className="text-white/50 hover:text-white transition-colors"
                    >
                      {t("footer.app")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#services"
                      onClick={(e) => handleAnchorClick(e, "services")}
                      className="text-white/50 hover:text-white transition-colors"
                    >
                      {t("footer.firmware")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#services"
                      onClick={(e) => handleAnchorClick(e, "services")}
                      className="text-white/50 hover:text-white transition-colors"
                    >
                      {t("footer.maintenance")}
                    </a>
                  </li>
                </ul>
              </div>
              <div className="flex-1 flex flex-col">
                <h5 className="font-en text-[0.78rem] font-bold tracking-wider text-teal mb-4">{t("footer.company")}</h5>
                <ul className="flex flex-col gap-2.5 text-[0.88rem]">
                  <li>
                    <a
                      href="#process"
                      onClick={(e) => handleAnchorClick(e, "process")}
                      className="text-white/50 hover:text-white transition-colors"
                    >
                      {t("footer.process")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#portfolio"
                      onClick={(e) => handleAnchorClick(e, "portfolio")}
                      className="text-white/50 hover:text-white transition-colors"
                    >
                      {t("footer.portfolio")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#contact"
                      onClick={(e) => handleAnchorClick(e, "contact")}
                      className="text-white/50 hover:text-white transition-colors"
                    >
                      {t("footer.contact")}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-5 text-[0.80rem] text-white/35 flex-wrap gap-2">
            <p>&copy; {new Date().getFullYear()} A&N Dev (에이엔디브). <span>{t("footer.rights")}</span></p>
            <div className="flex items-center gap-4">
              <p>{t("footer.ceo.label")}</p>
              <a
                href="/admin"
                className="flex items-center gap-1.5 text-white/20 hover:text-white/50 transition-colors text-[0.72rem] font-medium"
                title="관리자 페이지"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                관리자
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
