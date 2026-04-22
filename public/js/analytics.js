/**
 * Custom dataLayer events for Google Tag Manager
 * Tracks: phone clicks, email clicks, form submissions, CTA clicks, external links
 */
(function() {
  'use strict';

  // Ensure dataLayer exists
  window.dataLayer = window.dataLayer || [];

  function pushEvent(eventName, data) {
    window.dataLayer.push(Object.assign({ event: eventName }, data || {}));
  }

  // === PHONE CLICK TRACKING ===
  document.addEventListener('click', function(e) {
    var link = e.target.closest('a[href^="tel:"]');
    if (link) {
      var phone = link.href.replace('tel:', '').trim();
      pushEvent('phone_click', {
        phone_number: phone,
        click_location: getLocation(link),
        click_text: link.textContent.trim().substring(0, 100)
      });
    }
  });

  // === EMAIL CLICK TRACKING ===
  document.addEventListener('click', function(e) {
    var link = e.target.closest('a[href^="mailto:"]');
    if (link) {
      var email = link.href.replace('mailto:', '').trim();
      pushEvent('email_click', {
        email_address: email,
        click_location: getLocation(link),
        click_text: link.textContent.trim().substring(0, 100)
      });
    }
  });

  // === CTA BUTTON TRACKING ===
  document.addEventListener('click', function(e) {
    var btn = e.target.closest('.btn-primary, .btn-outline, a[class*="btn-"]');
    if (btn && !btn.closest('form')) {
      var text = btn.textContent.trim().substring(0, 100);
      if (text) {
        pushEvent('cta_click', {
          cta_text: text,
          cta_href: btn.href || '',
          click_location: getLocation(btn)
        });
      }
    }
  });

  // === EXTERNAL LINK TRACKING ===
  document.addEventListener('click', function(e) {
    var link = e.target.closest('a[href^="http"]');
    if (link && link.hostname && link.hostname !== window.location.hostname) {
      pushEvent('external_link_click', {
        link_url: link.href,
        link_domain: link.hostname,
        link_text: link.textContent.trim().substring(0, 100)
      });
    }
  });

  // === JOB CARD CLICK TRACKING ===
  document.addEventListener('click', function(e) {
    var jobCard = e.target.closest('.job-card, a[href*="αγγελίες-εργασίας/"]');
    if (jobCard && jobCard.tagName === 'A') {
      var title = jobCard.querySelector('h3')?.textContent?.trim() || jobCard.textContent.trim().substring(0, 100);
      pushEvent('job_click', {
        job_title: title,
        job_url: jobCard.href
      });
    }
  });

  // === CONTACT FORM SUBMISSION ===
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      var formData = new FormData(contactForm);
      pushEvent('contact_form_submit', {
        form_name: 'contact',
        user_type: formData.get('type') || 'unknown',
        has_phone: !!formData.get('phone')
      });
    });
  }

  // === SCROLL DEPTH TRACKING ===
  var scrollDepthReported = { 25: false, 50: false, 75: false, 90: false };
  var throttleTimer = null;
  window.addEventListener('scroll', function() {
    if (throttleTimer) return;
    throttleTimer = setTimeout(function() {
      throttleTimer = null;
      var scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      var scrollPercent = Math.round((window.scrollY / scrollHeight) * 100);
      [25, 50, 75, 90].forEach(function(threshold) {
        if (scrollPercent >= threshold && !scrollDepthReported[threshold]) {
          scrollDepthReported[threshold] = true;
          pushEvent('scroll_depth', { percent: threshold });
        }
      });
    }, 500);
  });

  // === DARK MODE TOGGLE ===
  var themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      setTimeout(function() {
        var isDark = document.documentElement.classList.contains('dark');
        pushEvent('theme_toggle', { theme: isDark ? 'dark' : 'light' });
      }, 100);
    });
  }

  // === HELPER: determine where on the page the click happened ===
  function getLocation(el) {
    if (el.closest('header')) return 'header';
    if (el.closest('footer')) return 'footer';
    if (el.closest('[class*="hero"]')) return 'hero';
    if (el.closest('nav')) return 'nav';
    if (el.closest('[id*="testimonial"], [class*="review"]')) return 'reviews';
    return 'body';
  }
})();
