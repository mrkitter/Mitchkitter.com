/**
 * main.js — Mitch Kitter Personal Brand Website
 * Handles: navigation, smooth scroll, mobile menu,
 *          scroll-spy, fade-in animations, footer year,
 *          and the homepage Insights cards (three newest posts).
 */

(function () {
  'use strict';

  /* ── DOM references ─────────────────────────────────────── */
  const header       = document.getElementById('site-header');
  const hamburger    = document.getElementById('nav-hamburger');
  const mobileMenu   = document.getElementById('mobile-menu');
  const closeBtn     = document.getElementById('mobile-menu-close');
  const mobileLinks  = document.querySelectorAll('.mobile-nav-link');
  const navLinks     = document.querySelectorAll('.nav-link');
  const sections     = document.querySelectorAll('section[id]');
  const yearEl       = document.getElementById('current-year');
  const fadeEls      = document.querySelectorAll('.fade-in-up');

  /* ── Footer year ────────────────────────────────────────── */
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ── Navigation: transparent → solid on scroll ──────────── */
  function handleHeaderScroll() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll(); // Run once on load

  /* ── Mobile menu ────────────────────────────────────────── */
  function openMenu() {
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    // Move focus to close button
    closeBtn.focus();
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    hamburger.focus();
  }

  if (hamburger) hamburger.addEventListener('click', openMenu);
  if (closeBtn)  closeBtn.addEventListener('click', closeMenu);

  // Close when a nav link is clicked
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMenu();
    }
  });

  // Close on backdrop click (clicking outside the menu content)
  mobileMenu.addEventListener('click', function (e) {
    if (e.target === mobileMenu) {
      closeMenu();
    }
  });

  /* ── Scroll-spy: highlight active nav link ──────────────── */
  var navHeight = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '68',
    10
  );

  function updateActiveNav() {
    var scrollPos = window.scrollY + navHeight + 20;
    var currentId = '';

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollPos) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentId) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  /* ── Smooth scroll with offset for fixed nav ────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href').slice(1);
      if (!targetId) return; // href="#" — scroll to top

      var target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();
      var targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });

  /* ── Fade-in-up on scroll (IntersectionObserver) ────────── */
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    // Hero elements start visible (they animate on page load via CSS delay)
    var heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      heroContent.querySelectorAll('.fade-in-up').forEach(function (el) {
        el.classList.add('visible');
      });
    }

    fadeEls.forEach(function (el) {
      // Skip hero children — already handled above
      if (heroContent && heroContent.contains(el)) return;
      observer.observe(el);
    });
  } else {
    // Fallback: make all visible immediately
    fadeEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ── Hero load animation trigger ───────────────────────── */
  window.addEventListener('load', function () {
    var heroItems = document.querySelectorAll('.hero-content .fade-in-up');
    heroItems.forEach(function (el, i) {
      setTimeout(function () {
        el.classList.add('visible');
      }, i * 120);
    });
  });

  /* ── Insights: always show the 3 newest posts ───────────── */
  // blog.html is the list of posts. The homepage reads it and shows the three
  // newest by date, so adding a post there updates the homepage too. If the
  // fetch fails, the cards written into index.html stay as they are.
  var insightsGrid = document.querySelector('.blog-preview .blog-cards-grid');

  function buildInsightCard(post) {
    function el(tag, className, text) {
      var node = document.createElement(tag);
      if (className) node.className = className;
      if (text) node.textContent = text;
      return node;
    }
    var card = el('article', 'blog-card');
    var meta = el('div', 'blog-card-meta');
    var time = el('time', '', post.dateText);
    time.setAttribute('datetime', post.date);
    meta.appendChild(time);
    if (post.tag) meta.appendChild(el('span', 'blog-tag', post.tag));
    var title = el('h3', 'blog-card-title');
    var titleLink = el('a', '', post.title);
    titleLink.href = post.href;
    title.appendChild(titleLink);
    var more = el('a', 'blog-read-more', 'Read more →');
    more.href = post.href;
    card.appendChild(meta);
    card.appendChild(title);
    if (post.excerpt) card.appendChild(el('p', 'blog-card-excerpt', post.excerpt));
    card.appendChild(more);
    return card;
  }

  if (insightsGrid && window.fetch && window.DOMParser) {
    fetch('blog.html', { cache: 'no-cache' })
      .then(function (res) {
        if (!res.ok) throw new Error('blog.html ' + res.status);
        return res.text();
      })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var posts = [];
        doc.querySelectorAll('.blog-list-item').forEach(function (item) {
          var time = item.querySelector('time[datetime]');
          var link = item.querySelector('.blog-list-item-title a');
          var tag = item.querySelector('.blog-tag');
          var excerpt = item.querySelector('.blog-list-item-excerpt');
          var href = link ? link.getAttribute('href') : '';
          // only local post pages, e.g. blog/some-post.html
          if (!time || !link || !/^blog\/[\w.-]+\.html$/.test(href)) return;
          posts.push({
            date: time.getAttribute('datetime'),
            dateText: time.textContent.trim(),
            tag: tag ? tag.textContent.trim() : '',
            title: link.textContent.trim(),
            href: href,
            excerpt: excerpt ? excerpt.textContent.replace(/\s+/g, ' ').trim() : ''
          });
        });
        if (!posts.length) return;
        posts.sort(function (a, b) {
          return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
        });
        var cards = document.createDocumentFragment();
        posts.slice(0, 3).forEach(function (post) {
          cards.appendChild(buildInsightCard(post));
        });
        while (insightsGrid.firstChild) insightsGrid.removeChild(insightsGrid.firstChild);
        insightsGrid.appendChild(cards);
      })
      .catch(function () { /* keep the cards already in the page */ });
  }

  /* ── Scroll-linked hero parallax (subtle) ───────────────── */
  var heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', function () {
      if (window.scrollY < window.innerHeight) {
        heroBg.style.transform = 'translateY(' + window.scrollY * 0.25 + 'px)';
      }
    }, { passive: true });
  }

})();
