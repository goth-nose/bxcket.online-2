/* ── View counter ── */
(function () {
  const key = 'profile_views';
  let count = parseInt(localStorage.getItem(key) || '0', 10);
  count += 1;
  localStorage.setItem(key, count);

  const el = document.getElementById('viewCount');
  if (!el) return;

  // Animate count up
  const target = count;
  const start = Math.max(0, target - 30);
  let current = start;
  const step = () => {
    current = Math.min(current + Math.ceil((target - current) / 6 + 1), target);
    el.textContent = current.toLocaleString();
    if (current < target) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
})();

/* ── Music player ── */
(function () {
  const TOTAL = 222; // seconds (3:42)
  let elapsed = 0;
  let playing = false;
  let interval = null;

  const playBtn    = document.getElementById('playBtn');
  const iconPlay   = document.getElementById('iconPlay');
  const iconPause  = document.getElementById('iconPause');
  const barFill    = document.getElementById('barFill');
  const elapsedEl  = document.getElementById('elapsed');

  function fmt(s) {
    return Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0');
  }

  function updateUI() {
    elapsedEl.textContent = fmt(elapsed);
    barFill.style.width = ((elapsed / TOTAL) * 100).toFixed(2) + '%';

    if (playing) {
      iconPlay.classList.add('hidden');
      iconPause.classList.remove('hidden');
    } else {
      iconPlay.classList.remove('hidden');
      iconPause.classList.add('hidden');
    }
  }

  function tick() {
    elapsed = Math.min(elapsed + 1, TOTAL);
    if (elapsed >= TOTAL) {
      playing = false;
      clearInterval(interval);
    }
    updateUI();
  }

  playBtn.addEventListener('click', () => {
    if (elapsed >= TOTAL) elapsed = 0;
    playing = !playing;

    if (playing) {
      interval = setInterval(tick, 1000);
    } else {
      clearInterval(interval);
    }
    updateUI();
  });

  updateUI();
})();