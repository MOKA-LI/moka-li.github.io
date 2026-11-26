(function () {
  document.getElementById('year').textContent = new Date().getFullYear();

  // 从 GitHub API 取公开仓库数；失败就不显示，不打扰
  var el = document.getElementById('repo-count');
  fetch('https://api.github.com/users/MOKA-LI')
    .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
    .then(function (d) {
      if (typeof d.public_repos === 'number') el.textContent = d.public_repos;
    })
    .catch(function () { el.textContent = '—'; });

  // 卡片依次淡入
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var items = document.querySelectorAll('.card, .about-body, .contact');
  items.forEach(function (n, i) {
    n.style.opacity = '0';
    n.style.transform = 'translateY(14px)';
    n.style.transition = 'opacity .55s ease ' + (i * 70) + 'ms, transform .55s ease ' + (i * 70) + 'ms';
  });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'none';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(function (n) { io.observe(n); });
})();
