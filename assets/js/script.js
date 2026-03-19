/* ─────────────────────────────────────────
   OpenClaw — Interactive JavaScript Layer
───────────────────────────────────────── */

/* ── 1. PARTICLE CANVAS ── */
(function initParticles() {
  const canvas = document.getElementById('particles');
  const ctx    = canvas.getContext('2d');
  let   W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(true); }
    reset(init = false) {
      this.x  = Math.random() * W;
      this.y  = init ? Math.random() * H : H + 10;
      this.r  = Math.random() * 1.5 + 0.3;
      this.vy = -(Math.random() * 0.3 + 0.08);
      this.vx = (Math.random() - 0.5) * 0.15;
      this.life = Math.random() * 0.5 + 0.1;
      this.maxLife = this.life;
    }
    update() {
      this.x   += this.vx;
      this.y   += this.vy;
      this.life -= 0.0005;
      if (this.y < -10 || this.life <= 0) this.reset();
    }
    draw() {
      const alpha = Math.min(this.life / this.maxLife, 1) * 0.6;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99,179,237,${alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 120; i++) particles.push(new Particle());

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }
  loop();
})();

/* ── 2. NAVBAR SCROLL EFFECT ── */
(function initNavbar() {
  const nav = document.getElementById('navbar');
  const handler = () => {
    if (window.scrollY > 60) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', handler, { passive: true });
})();

/* ── 2b. HAMBURGER MENU ── */
(function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const overlay   = document.getElementById('mobileNav');
  if (!hamburger || !overlay) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    overlay.classList.toggle('open');
    document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
  });

  // Close on link click
  overlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

/* ── 3. SCROLL REVEAL ── */
(function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  function expose(selector, baseDelay = 0, stagger = 80) {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = (baseDelay + i * stagger) + 'ms';
      observer.observe(el);
    });
  }

  expose('.feature-card',   0, 70);
  expose('.req-item',       0, 60);
  expose('.wizard-step',    0, 50);
  expose('.channel-block',  0, 60);
  expose('.adv-block',      0, 70);
  expose('.resource-card',  0, 80);
  expose('.gw-command',     0, 60);
  expose('.trouble-item',   0, 40);
  expose('.section-title',  0,  0);
  expose('.section-intro',  0,  0);
})();

/* ── 4. INSTALL TABS ── */
(function initTabs() {
  const buttons = document.querySelectorAll('.tab-btn');
  const contents = document.querySelectorAll('.tab-content');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      buttons.forEach(b => b.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const target = document.getElementById('tab-' + tab);
      if (target) target.classList.add('active');
    });
  });
})();

/* ── 5. COPY BUTTONS ── */
(function initCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const text = btn.dataset.code;
      try {
        await navigator.clipboard.writeText(text);
        const orig = btn.textContent;
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = orig;
          btn.classList.remove('copied');
        }, 1800);
      } catch (_) {
        // fallback: select + execCommand
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 1800);
      }
    });
  });
})();

/* ── 6. ACTIVE NAV LINK HIGHLIGHT ── */
(function initActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(l => l.classList.remove('nav-active'));
        const active = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (active) active.classList.add('nav-active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));

  // Inject active style
  const style = document.createElement('style');
  style.textContent = '.nav-links a.nav-active { color: var(--accent) !important; }';
  document.head.appendChild(style);
})();

/* ── 7. SMOOTH PARALLAX NEBULAE ── */
(function initParallax() {
  const nebulae = document.querySelectorAll('.nebula');
  const factors = [0.02, -0.015, 0.012];

  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    nebulae.forEach((n, i) => {
      const f = factors[i] || 0;
      n.style.transform = `translate(0, ${sy * f}px)`;
    });
  }, { passive: true });
})();

/* ── 8. TERMINAL RE-ANIMATION ON SCROLL INTO VIEW ── */
(function initTerminalAnimation() {
  const card = document.querySelector('.terminal-card');
  if (!card) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Reset typewriter animation
        const cmd = card.querySelector('.typewriter');
        if (cmd) {
          cmd.style.animation = 'none';
          void cmd.offsetWidth; // reflow
          cmd.style.animation = '';
        }
        // Reset output fade-ins
        card.querySelectorAll('.animated-line').forEach(line => {
          line.style.animation = 'none';
          void line.offsetWidth;
          line.style.animation = `fade-in-up 0.4s ease forwards ${line.style.getPropertyValue('--delay')}`;
        });
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  obs.observe(card);
})();
