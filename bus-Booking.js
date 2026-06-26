// bus-Booking.js  —  POST /bus-booking  |  GET /bus-booking/my
import { createBooking, isLoggedIn } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
  const searchBtn  = document.getElementById('searchBtn');
  const resultsDiv = document.getElementById('results');

  // بيانات الأتوبيسات ثابتة في الفرونت
  // الحجز بيتحفظ في الباك اند بـ POST /bus-booking
  const buses = [
    { label:'Super Jet',    departure:'21:00', arrival:'06:30', duration:'9.5 hrs', price:650, seats:12, type:'VIP'         },
    { label:'East Delta',   departure:'23:30', arrival:'09:00', duration:'9.5 hrs', price:480, seats:8,  type:'Normal'      },
    { label:'Siwa Travel',  departure:'19:00', arrival:'05:00', duration:'10 hrs',  price:720, seats:18, type:'VIP + Wifi'  },
  ];

  searchBtn.addEventListener('click', () => {
    resultsDiv.innerHTML = '<h2 style="margin-bottom:1.5rem">Available buses</h2>';

    buses.forEach((bus, i) => {
      const card = document.createElement('div');
      card.className = 'bus-result';
      card.innerHTML = `
        <div>
          <div class="company">${bus.label}</div>
          <div style="margin:8px 0;color:#888">${bus.type}</div>
        </div>
        <div class="time">${bus.departure} → ${bus.arrival}</div>
        <div><small>Duration</small><br><strong>${bus.duration}</strong></div>
        <div>
          <div class="price">${bus.price} EGP / seat</div>
          <small>Seats left: ${bus.seats}</small>
        </div>
        <button class="book-now-btn" onclick="handleBooking(${i})">Book now</button>`;
      resultsDiv.appendChild(card);
    });
  });

  window.handleBooking = async (i) => {
    if (!isLoggedIn()) {
      alert('Please log in first to book a bus.');
      window.location.href = 'auth.html';
      return;
    }

    const travelDate = document.getElementById('travelDate').value;
    const passengers = parseInt(document.getElementById('passengers').value) || 1;

    if (!travelDate) { alert('Please select a travel date.'); return; }

    const bus = buses[i];

    try {
      // POST /bus-booking
      await createBooking({
        bus_type:       bus.label + ' — ' + bus.type,
        departure_date: travelDate,
        seats_count:    passengers,
        total_price:    bus.price * passengers,
      });
      alert(`✅ Booking confirmed with ${bus.label}!\nDate: ${travelDate} | Seats: ${passengers} | Total: ${bus.price * passengers} EGP`);
    } catch (e) {
      alert('❌ Booking failed: ' + e.message);
    }
  };
});
