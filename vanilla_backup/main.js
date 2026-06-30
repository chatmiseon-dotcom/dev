/* ===========================
   A&N Dev — main.js
   =========================== */

/* ── i18n ─────────────────── */
const i18n = {
  kr: {
    "nav.services":   "서비스",
    "nav.process":    "프로세스",
    "nav.portfolio":  "포트폴리오",
    "nav.contact":    "문의하기",
    "hero.badge":     "✦ 소프트웨어부터 펌웨어까지",
    "hero.title1":    "당신의 아이디어를",
    "hero.title2":    "현실로 만듭니다",
    "hero.desc":      "웹·앱 개발부터 임베디드 펌웨어까지 — A&N Dev가 기획부터 납품까지<br/>전문적으로 지원합니다.",
    "hero.cta1":      "지금 문의하기",
    "hero.cta2":      "서비스 보기",
    "stat.projects":  "완료 프로젝트",
    "stat.satisfaction": "고객 만족도",
    "stat.years":     "년 경력",
    "scroll":         "스크롤",
    "services.tag":   "SERVICES",
    "services.title": "무엇이든 개발합니다",
    "services.desc":  "소프트웨어와 하드웨어의 경계를 넘어, 다양한 분야의 개발을 지원합니다.",
    "svc1.title":     "웹 개발",
    "svc1.desc":      "반응형 웹사이트, 관리자 대시보드, 쇼핑몰, SaaS 플랫폼 등 다양한 웹 솔루션을 구축합니다.",
    "svc.featured":   "인기",
    "svc2.title":     "앱 개발",
    "svc2.desc":      "iOS / Android 네이티브 앱 및 크로스플랫폼 앱을 전문적으로 개발합니다.",
    "svc.firmware":   "펌웨어",
    "svc3.title":     "펌웨어 / 임베디드",
    "svc3.desc":      "MCU 펌웨어, RTOS, 드라이버 개발 등 임베디드 소프트웨어 전 분야를 지원합니다.",
    "svc4.title":     "유지보수 & 기술지원",
    "svc4.desc":      "기존 시스템 유지보수, 버그 수정, 성능 최적화, 지속적인 기술 지원 서비스를 제공합니다.",
    "process.tag":    "HOW WE WORK",
    "process.title":  "개발 프로세스",
    "process.desc":   "체계적인 단계별 프로세스로 프로젝트를 성공적으로 완수합니다.",
    "step1.title":    "상담 & 분석",
    "step1.desc":     "요구사항 파악, 기술 검토, 프로젝트 범위 정의",
    "step2.title":    "기획 & 설계",
    "step2.desc":     "아키텍처 설계, 일정 수립, 견적 제안",
    "step3.title":    "개발 & 구현",
    "step3.desc":     "단계별 개발, 코드 리뷰, 중간 보고",
    "step4.title":    "테스트 & 납품",
    "step4.desc":     "품질 검증, 문서화, 최종 납품 및 사후 지원",
    "portfolio.tag":  "PORTFOLIO",
    "portfolio.title":"주요 프로젝트",
    "portfolio.desc": "다양한 분야에서 축적된 개발 경험",
    "badge.firmware": "펌웨어",
    "badge.web":      "웹",
    "badge.app":      "앱",
    "port1.title":    "IoT 센서 모듈 펌웨어",
    "port1.desc":     "STM32 기반 다채널 센서 데이터 수집 및 무선 전송 시스템",
    "port2.title":    "물류 관리 대시보드",
    "port2.desc":     "실시간 재고 추적 및 배송 현황 통합 관리 웹 플랫폼",
    "port3.title":    "헬스케어 모바일 앱",
    "port3.desc":     "웨어러블 기기 연동 건강 데이터 모니터링 iOS/Android 앱",
    "contact.tag":    "CONTACT",
    "contact.title":  "프로젝트를<br/>시작해봅시다",
    "contact.desc":   "아이디어가 있으신가요? 어떤 분야든 먼저 문의해 주세요.<br/>빠르게 검토 후 연락드립니다.",
    "contact.ceo":    "대표자",
    "contact.company":"회사명",
    "contact.note":   "✦ 펌웨어 / 임베디드 개발 문의도 환영합니다",
    "form.name":      "이름 / 회사명",
    "form.email":     "이메일",
    "form.type":      "개발 분야",
    "form.type.placeholder": "분야를 선택하세요",
    "form.type.web":  "웹 개발",
    "form.type.app":  "앱 개발",
    "form.type.firmware": "펌웨어 / 임베디드",
    "form.type.maintenance": "유지보수 & 기술지원",
    "form.type.other":"기타",
    "form.budget":    "예상 예산 (선택)",
    "form.budget.placeholder": "예산 범위를 선택하세요",
    "form.budget.1":  "100만원 미만",
    "form.budget.2":  "100~300만원",
    "form.budget.3":  "300~500만원",
    "form.budget.4":  "500만~1000만원",
    "form.budget.5":  "1000만원 이상",
    "form.message":   "프로젝트 내용",
    "form.submit":    "문의 보내기",
    "form.success":   "문의가 접수되었습니다! 빠른 시일 내에 연락드리겠습니다.",
    "err.name":       "이름을 입력해 주세요.",
    "err.email":      "올바른 이메일을 입력해 주세요.",
    "err.type":       "분야를 선택해 주세요.",
    "err.message":    "내용을 입력해 주세요.",
    "footer.desc":    "소프트웨어부터 펌웨어까지,<br/>전문 개발팀이 함께합니다.",
    "footer.services":"서비스",
    "footer.web":     "웹 개발",
    "footer.app":     "앱 개발",
    "footer.firmware":"펌웨어 개발",
    "footer.maintenance":"유지보수",
    "footer.company": "회사",
    "footer.process": "개발 프로세스",
    "footer.portfolio":"포트폴리오",
    "footer.contact": "문의",
    "footer.rights":  "All rights reserved.",
    "footer.ceo.label":"대표 노미선"
  },
  en: {
    "nav.services":   "Services",
    "nav.process":    "Process",
    "nav.portfolio":  "Portfolio",
    "nav.contact":    "Contact",
    "hero.badge":     "✦ From Software to Firmware",
    "hero.title1":    "We Turn Your Ideas",
    "hero.title2":    "Into Reality",
    "hero.desc":      "From web & app development to embedded firmware — A&N Dev delivers end-to-end professional development solutions.",
    "hero.cta1":      "Get in Touch",
    "hero.cta2":      "Our Services",
    "stat.projects":  "Projects Done",
    "stat.satisfaction": "Satisfaction",
    "stat.years":     "Yrs Experience",
    "scroll":         "SCROLL",
    "services.tag":   "SERVICES",
    "services.title": "We Build Everything",
    "services.desc":  "Bridging the gap between software and hardware across diverse development domains.",
    "svc1.title":     "Web Development",
    "svc1.desc":      "Responsive websites, admin dashboards, e-commerce, SaaS platforms, and more.",
    "svc.featured":   "Popular",
    "svc2.title":     "App Development",
    "svc2.desc":      "Native iOS / Android apps and cross-platform mobile solutions.",
    "svc.firmware":   "Firmware",
    "svc3.title":     "Firmware / Embedded",
    "svc3.desc":      "MCU firmware, RTOS, driver development — full embedded software support.",
    "svc4.title":     "Maintenance & Support",
    "svc4.desc":      "System maintenance, bug fixes, performance tuning, and ongoing technical support.",
    "process.tag":    "HOW WE WORK",
    "process.title":  "Our Process",
    "process.desc":   "A structured, step-by-step approach to deliver successful projects every time.",
    "step1.title":    "Consult & Analyze",
    "step1.desc":     "Requirements gathering, technical review, project scoping",
    "step2.title":    "Plan & Design",
    "step2.desc":     "Architecture design, timeline planning, proposal",
    "step3.title":    "Develop & Implement",
    "step3.desc":     "Phased development, code reviews, progress reports",
    "step4.title":    "Test & Deliver",
    "step4.desc":     "QA testing, documentation, delivery & post-launch support",
    "portfolio.tag":  "PORTFOLIO",
    "portfolio.title":"Featured Projects",
    "portfolio.desc": "Development experience across diverse industries",
    "badge.firmware": "Firmware",
    "badge.web":      "Web",
    "badge.app":      "App",
    "port1.title":    "IoT Sensor Module Firmware",
    "port1.desc":     "STM32-based multi-channel sensor data collection and wireless transmission system",
    "port2.title":    "Logistics Management Dashboard",
    "port2.desc":     "Real-time inventory tracking and delivery status integrated web platform",
    "port3.title":    "Healthcare Mobile App",
    "port3.desc":     "Wearable device integration health data monitoring iOS/Android app",
    "contact.tag":    "CONTACT",
    "contact.title":  "Let's Start<br/>Your Project",
    "contact.desc":   "Have an idea? Contact us in any field.<br/>We'll review and get back to you quickly.",
    "contact.ceo":    "CEO",
    "contact.company":"Company",
    "contact.note":   "✦ Firmware / Embedded development inquiries welcome",
    "form.name":      "Name / Company",
    "form.email":     "Email",
    "form.type":      "Development Type",
    "form.type.placeholder": "Select a type",
    "form.type.web":  "Web Development",
    "form.type.app":  "App Development",
    "form.type.firmware": "Firmware / Embedded",
    "form.type.maintenance": "Maintenance & Support",
    "form.type.other":"Other",
    "form.budget":    "Estimated Budget (optional)",
    "form.budget.placeholder": "Select a budget range",
    "form.budget.1":  "Under ₩1M",
    "form.budget.2":  "₩1M – ₩3M",
    "form.budget.3":  "₩3M – ₩5M",
    "form.budget.4":  "₩5M – ₩10M",
    "form.budget.5":  "Over ₩10M",
    "form.message":   "Project Details",
    "form.submit":    "Send Inquiry",
    "form.success":   "Your inquiry has been received! We'll get back to you shortly.",
    "err.name":       "Please enter your name.",
    "err.email":      "Please enter a valid email.",
    "err.type":       "Please select a type.",
    "err.message":    "Please enter a message.",
    "footer.desc":    "From software to firmware,<br/>our expert team has you covered.",
    "footer.services":"Services",
    "footer.web":     "Web Dev",
    "footer.app":     "App Dev",
    "footer.firmware":"Firmware Dev",
    "footer.maintenance":"Maintenance",
    "footer.company": "Company",
    "footer.process": "Process",
    "footer.portfolio":"Portfolio",
    "footer.contact": "Contact",
    "footer.rights":  "All rights reserved.",
    "footer.ceo.label":"CEO: Roh Mi-seon"
  }
};

let currentLang = 'kr';

function applyLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang === 'kr' ? 'ko' : 'en';

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const text = i18n[lang][key];
    if (text !== undefined) {
      el.innerHTML = text;
    }
  });

  // update active state
  document.getElementById('langKr').classList.toggle('active', lang === 'kr');
  document.getElementById('langEn').classList.toggle('active', lang === 'en');
}

document.getElementById('langToggle').addEventListener('click', (e) => {
  const target = e.target.closest('.lang-kr, .lang-en');
  if (!target) return;
  const newLang = target.classList.contains('lang-kr') ? 'kr' : 'en';
  if (newLang !== currentLang) applyLang(newLang);
});

/* ── Navbar scroll ────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── Hamburger ────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ── Scroll reveal ────────── */
const revealEls = document.querySelectorAll(
  '.service-card, .step, .portfolio-card, .contact-wrapper > *, .section-header'
);
revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

/* ── Counter animation ────── */
function animateCount(el, target, duration = 1600) {
  let start = null;
  const step = (ts) => {
    if (!start) start = ts;
    const prog = Math.min((ts - start) / duration, 1);
    const eased = 1 - Math.pow(1 - prog, 3);
    el.textContent = Math.floor(eased * target);
    if (prog < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

const counterEls = document.querySelectorAll('.stat-num[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const target = parseInt(e.target.dataset.count);
      animateCount(e.target, target);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

counterEls.forEach(el => counterObserver.observe(el));

/* ── Active nav link ──────── */
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(sec => {
    const top    = sec.offsetTop;
    const bottom = top + sec.offsetHeight;
    const id     = sec.id;
    const link   = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      link.style.color = (scrollY >= top && scrollY < bottom)
        ? 'var(--navy)' : '';
    }
  });
}, { passive: true });

/* ── Form validation ──────── */
const form      = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

function validateEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function showError(input, errEl, show) {
  errEl.classList.toggle('visible', show);
  input.classList.toggle('error', show);
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  let valid = true;

  const nameEl    = document.getElementById('name');
  const emailEl   = document.getElementById('email');
  const typeEl    = document.getElementById('type');
  const msgEl     = document.getElementById('message');

  const nameErr   = nameEl.nextElementSibling;
  const emailErr  = emailEl.nextElementSibling;
  const typeErr   = typeEl.nextElementSibling;
  const msgErr    = msgEl.nextElementSibling;

  if (!nameEl.value.trim())          { showError(nameEl, nameErr, true);  valid = false; }
  else                               { showError(nameEl, nameErr, false); }

  if (!validateEmail(emailEl.value)) { showError(emailEl, emailErr, true);  valid = false; }
  else                               { showError(emailEl, emailErr, false); }

  if (!typeEl.value)                 { showError(typeEl, typeErr, true);  valid = false; }
  else                               { showError(typeEl, typeErr, false); }

  if (!msgEl.value.trim())           { showError(msgEl, msgErr, true);  valid = false; }
  else                               { showError(msgEl, msgErr, false); }

  if (!valid) return;

  // Simulate sending
  submitBtn.disabled = true;
  const btnText = submitBtn.querySelector('span');
  const origText = btnText.innerHTML;
  btnText.innerHTML = currentLang === 'kr' ? '전송 중...' : 'Sending...';

  await new Promise(r => setTimeout(r, 1400));

  submitBtn.style.display = 'none';
  formSuccess.classList.add('show');
  form.reset();

  setTimeout(() => {
    formSuccess.classList.remove('show');
    submitBtn.style.display = '';
    submitBtn.disabled = false;
    btnText.innerHTML = origText;
  }, 5000);
});

/* Clear error on input */
document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(el => {
  el.addEventListener('input', () => {
    el.classList.remove('error');
    const err = el.nextElementSibling;
    if (err && err.classList.contains('form-error')) err.classList.remove('visible');
  });
});

/* ── Smooth anchor links ──── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      const offset = navbar.offsetHeight + 16;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
  });
});

/* Init */
applyLang('kr');
