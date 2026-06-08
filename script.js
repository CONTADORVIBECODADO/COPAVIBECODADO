/* ============================================================
   Contador da Copa 2026
   Datas em horário de Brasília (UTC-3, sem horário de verão),
   fixadas com offset explícito para a contagem ficar correta
   em qualquer fuso / dispositivo.
   ============================================================ */

const LIVE_MS = 2.25 * 60 * 60 * 1000; // ~duração do jogo: mostra "AO VIVO" por 2h15

// Jogo de abertura
const opener = new Date("2026-06-11T16:00:00-03:00");

// Jogos do Brasil — Grupo C
const brazil = [
  { id: "br1", card: "card-br1", date: new Date("2026-06-13T19:00:00-03:00") }, // x Marrocos
  { id: "br2", card: "card-br2", date: new Date("2026-06-19T21:30:00-03:00") }, // x Haiti
  { id: "br3", card: "card-br3", date: new Date("2026-06-24T19:00:00-03:00") }, // Escócia x Brasil
];

const pad = (n) => String(n).padStart(2, "0");

// Retorna o estado do jogo em relação a agora
function phase(target, now) {
  const diff = target - now;
  if (diff > 0) return "upcoming";
  if (now - target < LIVE_MS) return "live";
  return "done";
}

// Texto da contagem "12d 04h 33m 09s"
function format(diff) {
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return `${d}d ${pad(h)}h ${pad(m)}m ${pad(s)}s`;
}

function update() {
  const now = new Date();

  /* ---- jogo de abertura ---- */
  const oState = phase(opener, now);
  const oEl = document.getElementById("opener");
  const oStatus = document.getElementById("opener-status");
  oEl.dataset.state = oState;

  if (oState === "upcoming") {
    const diff = opener - now;
    document.getElementById("days").textContent = pad(Math.floor(diff / 86400000));
    document.getElementById("hours").textContent = pad(Math.floor((diff / 3600000) % 24));
    document.getElementById("minutes").textContent = pad(Math.floor((diff / 60000) % 60));
    document.getElementById("seconds").textContent = pad(Math.floor((diff / 1000) % 60));
    oStatus.textContent = "Faltam";
  } else if (oState === "live") {
    oStatus.textContent = "● Ao vivo";
  } else {
    oStatus.textContent = "Encerrado";
  }

  /* ---- jogos do Brasil ---- */
  brazil.forEach((g) => {
    const card = document.getElementById(g.card);
    const txt = document.querySelector(`#${g.id} .txt`);
    const st = phase(g.date, now);
    card.dataset.state = st;

    if (st === "upcoming") txt.textContent = format(g.date - now);
    else if (st === "live") txt.textContent = "AO VIVO — bola rolando";
    else txt.textContent = "Jogo encerrado";
  });
}

update();
setInterval(update, 1000);
