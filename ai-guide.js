// ai-guide.js  —  POST /chatbot/ask  |  GET /chatbot/history
import { askChatbot, isLoggedIn } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
  const topInput    = document.getElementById('aiInput');
  const bottomInput = document.getElementById('bottomInput');
  const topSend     = document.getElementById('aiSend');
  const bottomSend  = document.querySelector('.bottom-send');
  const chat        = document.getElementById('aiChat');

  // ── session counter (localStorage) ───────────────────────
  const MAX = 15;
  const KEY  = 'siwa_sessions_' + new Date().toDateString();

  function getCount()  { return parseInt(localStorage.getItem(KEY) || '0'); }
  function addCount()  { const n = getCount()+1; localStorage.setItem(KEY, n); renderDots(n); return n; }
  function renderDots(n) {
    const wrap = document.getElementById('session-dots');
    const lbl  = document.getElementById('session-count');
    if (wrap) { wrap.innerHTML=''; for(let i=0;i<MAX;i++){const d=document.createElement('div');d.className='sdot'+(i<n?' used':'');wrap.appendChild(d);} }
    if (lbl)  lbl.textContent = `${n} / ${MAX} sessions today`;
  }
  renderDots(getCount());

  // ── helpers ───────────────────────────────────────────────
  function getTime() { return new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}); }

  function addMsg(role, text) {
    const wrap   = document.createElement('div');  wrap.className = `msg ${role}`;
    const bubble = document.createElement('div');  bubble.className = 'msg-bubble'; bubble.style.whiteSpace='pre-line'; bubble.textContent = text;
    const time   = document.createElement('span'); time.className = 'msg-time'; time.textContent = getTime();
    wrap.appendChild(bubble); wrap.appendChild(time); chat.appendChild(wrap);
    chat.scrollTop = chat.scrollHeight;
  }

  function addTyping() {
    const wrap = document.createElement('div'); wrap.className = 'msg bot typing';
    wrap.innerHTML = `<div class="msg-bubble"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>`;
    chat.appendChild(wrap); chat.scrollTop = chat.scrollHeight;
    return wrap;
  }

  // ── send ──────────────────────────────────────────────────
  async function sendMsg(text) {
    text = (text || '').trim();
    if (!text) return;
    if (topInput)    topInput.value    = '';
    if (bottomInput) bottomInput.value = '';

    if (getCount() >= MAX) { addMsg('bot', '⚠️ You have reached your daily limit of 15 sessions. Please come back tomorrow!'); return; }

    addMsg('user', text);
    addCount();

    const typingEl = addTyping();

    try {
      let answer;

      if (isLoggedIn()) {
        // POST /chatbot/ask  —  الباك اند يحفظ ويرجع الإجابة
        answer = await askChatbot(text);
      } else {
        // مش مسجل دخول — رد محلي مؤقت
        answer = localReply(text);
      }

      typingEl.remove();
      addMsg('bot', answer);

    } catch {
      typingEl.remove();
      // fallback لو الباك اند وقف
      addMsg('bot', localReply(text));
    }
  }

  // ── quick replies & global fn ─────────────────────────────
  window.quickSend = (text) => sendMsg(text);
  window.sendMsg   = ()     => sendMsg((topInput?.value || bottomInput?.value || ''));

  if (topSend)    topSend.addEventListener('click',    () => sendMsg(topInput?.value));
  if (bottomSend) bottomSend.addEventListener('click', () => sendMsg(bottomInput?.value));
  [topInput, bottomInput].forEach(inp => {
    if (!inp) return;
    inp.addEventListener('keydown', e => { if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); sendMsg(inp.value); } });
  });

  // ── local fallback replies ────────────────────────────────
  function localReply(q) {
    q = q.toLowerCase();
    if (q.includes('time') || q.includes('visit') || q.includes('when'))
      return 'The best time to visit Siwa is October–April (15–25°C). Spring is magical!';
    if (q.includes('bus') || q.includes('get') || q.includes('travel'))
      return 'You can reach Siwa from Cairo by West Delta Bus (~8–9 hrs). No airport in Siwa.';
    if (q.includes('stay') || q.includes('hotel') || q.includes('lodge'))
      return 'Great options:\n• Adrere Amellal – luxury eco-resort\n• Shali Lodge – rustic charm\n• Siwa Safari Paradise Hotel';
    if (q.includes('landmark') || q.includes('place') || q.includes('top') || q.includes('see'))
      return '🏛 Temple of Amun\n🏰 Shali Fortress\n💧 Cleopatra Spring\n🏜 Great Sand Sea\n🌊 Salt Lakes';
    return 'Great question! Ask me about Siwa places, activities, food, culture, or travel tips!';
  }
});
