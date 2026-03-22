/* =========================================
   Dr. Priti's Dental Care Clinic — Scripts
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* -----------------------------------------------
     1. Scroll-triggered fade-in animations
  ----------------------------------------------- */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));


  /* -----------------------------------------------
     2. Active nav link highlight on scroll
  ----------------------------------------------- */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  const highlightNav = () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 100) {
        current = section.id;
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });


  /* -----------------------------------------------
     3. Navbar shrink / shadow on scroll
  ----------------------------------------------- */
  const navEl = document.querySelector('nav');

  window.addEventListener('scroll', () => {
    navEl.style.boxShadow = window.scrollY > 50
      ? '0 4px 24px rgba(0,0,0,0.3)'
      : '0 2px 20px rgba(0,0,0,0.2)';
  }, { passive: true });


  /* -----------------------------------------------
     4. Smooth scroll for all in-page anchor links
  ----------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  /* -----------------------------------------------
     5. Appointment form submission handler
  ----------------------------------------------- */
  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const name  = document.getElementById('firstName')?.value.trim();
      const phone = document.getElementById('phone')?.value.trim();

      if (!name || !phone) {
        alert('Please fill in your name and phone number so we can reach you! 😊');
        return;
      }

      submitBtn.textContent = '✅ Request Sent!';
      submitBtn.disabled = true;
      submitBtn.style.background = '#28a745';

      setTimeout(() => {
        alert(`Thank you, ${name}! We will call you on ${phone} shortly to confirm your appointment. 😊`);
      }, 300);
    });
  }

});