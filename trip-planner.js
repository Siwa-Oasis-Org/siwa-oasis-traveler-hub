// trip-planner.js  —  POST /trip-plans  |  GET /trip-plans
import { createTripPlan, isLoggedIn } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
  const slider      = document.getElementById('daysSlider');
  const daysValue   = document.getElementById('daysValue');
  const generateBtn = document.getElementById('generateBtn');
  const resultDiv   = document.getElementById('result');

  slider.addEventListener('input', () => { daysValue.textContent = slider.value; });

  generateBtn.addEventListener('click', async () => {
    const days_count  = +slider.value;
    const arrival_date= document.getElementById('arrivalDate').value;
    const travel_style= document.querySelector('input[name="type"]:checked').value;

    if (!arrival_date) { alert('Please select an arrival date'); return; }

    generateBtn.disabled  = true;
    generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';

    // بناء الـ itinerary_json محلياً
    const itinerary = buildItinerary(days_count, arrival_date, travel_style);

    // عرض الخطة فوراً
    renderPlan(itinerary, days_count, arrival_date, travel_style);

    // حفظ في الباك اند لو مسجل دخول
    if (isLoggedIn()) {
      try {
        await createTripPlan({
          days_count,
          travel_style,
          arrival_date,
          group_size:           1,
          budget_level:         'medium',
          itinerary_json:       itinerary,
          total_cost_estimate:  null,
        });
        const note = document.createElement('p');
        note.style.cssText = 'text-align:center;color:#22c55e;font-weight:600;margin:.5rem 0 1.5rem';
        note.textContent = '✅ Trip saved to your account!';
        resultDiv.insertBefore(note, resultDiv.firstChild);
      } catch { /* silent */ }
    } else {
      const note = document.createElement('p');
      note.style.cssText = 'text-align:center;color:#888;margin:.5rem 0 1.5rem;font-size:.9rem';
      note.innerHTML = '<a href="auth.html" style="color:var(--orange);font-weight:600">Log in</a> to save this plan to your account.';
      resultDiv.insertBefore(note, resultDiv.firstChild);
    }

    generateBtn.disabled  = false;
    generateBtn.innerHTML = '<i class="fas fa-magic"></i> Create a trip plan';
  });

  // ── local plan builder ────────────────────────────────────
  const PLANS = {
    relax:     [['Arrival + Check-in','Cleopatra Spring','Traditional Lunch','Shali Fortress','Sunset + Dinner'],['Breakfast','Therapeutic sand bath','Lunch at springs','Recreation','Stargazing'],['Late breakfast','Fatnas Spring','Local lunch','Traditional Market','Farewell Siwa']],
    adventure: [['Arrival + Check-in','Sand Sea Safari','Lunch in desert','Dakrour Mountain','Stargazing'],['Quick breakfast','Long Safari','Lunch at camp','Hidden oases','Night camping'],['Breakfast at camp','Quad bikes','Lunch at lake','Sunset photography','Return']],
    cultural:  [['Arrival + Check-in','Oracle Temple','Lunch at Siwi home','Shali Fortress','Folklore show'],['Local breakfast','Siwa House Museum','Lunch with a family','Traditional workshop','Evening of stories'],['Market breakfast','Mountain of the Dead','Final lunch','Shop dates & olives','Farewell Siwa']],
    mixed:     [['Arrival + Cleopatra Spring','Traditional lunch','Oracle Temple','Salt lake sunset','Dinner under stars'],['Breakfast','Light Safari','Lunch in desert','Shali Fortress','Stargazing'],['Late breakfast','Hot springs','Last lunch','Traditional Market','Farewell Siwa']],
  };
  const TIMES = ['9:00 AM','11:30 AM','2:00 PM','4:30 PM','7:30 PM'];

  function buildItinerary(days, arrivalDate, style) {
    const type  = PLANS[style] || PLANS.mixed;
    const start = new Date(arrivalDate);
    return Array.from({ length: days }, (_, i) => {
      const d = new Date(start); d.setDate(start.getDate() + i);
      return {
        day:  i + 1,
        date: d.toISOString().split('T')[0],
        activities: type[i % type.length].map((activity, idx) => ({ time: TIMES[idx], activity })),
      };
    });
  }

  function renderPlan(plan, days, arrivalDate, style) {
    const styleLabel = { relax:'Relaxation', adventure:'Adventure', cultural:'Cultural', mixed:'Mixed' }[style] || style;
    const startStr   = new Date(arrivalDate).toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' });

    let html = `
      <div class="result-card">
        <h2>Your Perfect Siwa Itinerary</h2>
        <p>${days} Days • ${styleLabel} • Starting ${startStr}</p>
      </div>
      <div class="itinerary">`;

    plan.forEach(({ day, date, activities }) => {
      const label = new Date(date).toLocaleDateString('en-US', { weekday:'long', day:'numeric', month:'long' });
      html += `<div class="day-title">Day ${day} — ${label}</div>`;
      activities.forEach(({ time, activity }) => {
        html += `<div class="activity"><i class="fas fa-map-marker-alt"></i>
          <div style="flex:1"><strong>${activity}</strong></div>
          <div class="time">${time}</div></div>`;
      });
    });

    html += `</div>`;
    resultDiv.innerHTML = html;
    resultDiv.scrollIntoView({ behavior: 'smooth' });
  }
});
