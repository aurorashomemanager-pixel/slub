// Countdown do 19.06.2027 16:00 (czasu polskiego)
(function () {
  const weddingDate = new Date("2027-06-19T16:00:00+02:00").getTime();

  const elDays = document.getElementById("cd-days");
  const elHours = document.getElementById("cd-hours");
  const elMins = document.getElementById("cd-mins");
  const elSecs = document.getElementById("cd-secs");

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function tick() {
    const now = Date.now();
    const diff = weddingDate - now;

    if (diff <= 0) {
      elDays.textContent = "00";
      elHours.textContent = "00";
      elMins.textContent = "00";
      elSecs.textContent = "00";
      return;
    }

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);

    elDays.textContent = pad(days);
    elHours.textContent = pad(hours);
    elMins.textContent = pad(mins);
    elSecs.textContent = pad(secs);
  }

  tick();
  setInterval(tick, 1000);
})();

// Nawigacja: tło paska nawigacji po scrollu
(function () {
  const nav = document.querySelector(".topnav");
  if (!nav) return;
  window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
      nav.style.background = "rgba(47,43,34,.92)";
      nav.style.boxShadow = "0 2px 20px rgba(0,0,0,.15)";
    } else {
      nav.style.background = "rgba(247,243,234,0)";
      nav.style.boxShadow = "none";
    }
  });
})();

// Powiadomienie po wysłaniu formularza RSVP
// Iframe Google Forms nawiguje wewnętrznie do strony potwierdzenia po submicie,
// co ponownie odpala zdarzenie "load" — pierwsze ładowanie (formularz) ignorujemy.
(function () {
  const iframe = document.getElementById("rsvp-iframe");
  const toast = document.getElementById("rsvp-toast");
  if (!iframe || !toast) return;

  let loadCount = 0;
  let toastTimer = null;

  iframe.addEventListener("load", () => {
    loadCount += 1;
    if (loadCount <= 1) return;

    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 5000);
  });
})();

// Link "Dodaj do kalendarza Google"
(function () {
  const link = document.getElementById("gcal-link");
  if (!link) return;

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: "Ślub Karoliny i Adama",
    dates: "20270619T160000/20270619T230000",
    details: "Zapraszamy na nasz ślub! Ceremonia i przyjęcie odbędą się w Gajówce Obręb.",
    location: "Gajówka Obręb",
    ctz: "Europe/Warsaw",
  });

  link.href = "https://calendar.google.com/calendar/render?" + params.toString();
})();
