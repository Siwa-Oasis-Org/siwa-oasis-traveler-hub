
import { getPlaces } from './api.js';

const grid = document.getElementById('placesGrid');

  // skeleton loading
  grid.innerHTML = Array(6).fill(`
    <div class="place-card" style="min-height:340px">
      <div style="height:240px;background:#e5e5e5;border-radius:24px 24px 0 0;animation:pulse 1.5s infinite"></div>
      <div style="padding:1.8rem">
        <div style="height:20px;background:#ddd;border-radius:8px;margin-bottom:12px"></div>
        <div style="height:14px;background:#eee;border-radius:8px"></div>
      </div>
    </div>`).join('');

  let places = [];

  try {
    places = await getPlaces(); // GET /places
    if (!places || !places.length) throw new Error("empty");
  } catch {
    // fallback لو الباك اند وقف
    places = [
      { place_id:1,  name_en:'Cleopatra Spring',     description_ar:'The most famous hot spring in Siwa.',          photo_url:'photos/places/1.jpg'  },
      { place_id:2,  name_en:'Shali Fortress',        description_ar:'13th-century kershef citadel.',                photo_url:'photos/places/2.jpg'  },
      { place_id:3,  name_en:'Temple of Amun',        description_ar:'Oracle Temple visited by Alexander the Great.',photo_url:'photos/places/3.jpg'  },
      { place_id:4,  name_en:'Dakrour Mountain',      description_ar:'Famous for therapeutic sand baths.',           photo_url:'photos/places/4.png'  },
      { place_id:5,  name_en:'Salt Lakes',            description_ar:'Float like the Dead Sea.',                     photo_url:'photos/places/5.jpg'  },
      { place_id:6,  name_en:'Fatnas Spring',         description_ar:'One of the most beautiful sunsets.',           photo_url:'photos/places/6.png'  },
      { place_id:7,  name_en:'Great Sand Sea',        description_ar:'Golden dunes, safari & camping.',              photo_url:'photos/places/7.jpg'  },
      { place_id:8,  name_en:'Mountain of the Dead',  description_ar:'Ancient Pharaonic & Roman tombs.',             photo_url:'photos/places/8.jpg'  },
      { place_id:9,  name_en:'Traditional Market',    description_ar:'Dates, olives, jewellery.',                    photo_url:'photos/places/9.jpg'  },
      { place_id:10, name_en:'Bir Wahed',             description_ar:'Hot spring in the desert.',                    photo_url:'photos/places/10.jpg' },
      { place_id:11, name_en:'Cleopatra Night Bath',  description_ar:'Magical night swimming.',                      photo_url:'photos/places/11.jpg' },
      { place_id:12, name_en:'Desert Camping',        description_ar:'Night under the most beautiful stars.',        photo_url:'photos/places/12.jpg' },
      { place_id:13, name_en:'Ain El-Gara',           description_ar:'Peaceful spring for meditation.',              photo_url:'photos/places/13.jpg' },
      { place_id:14, name_en:'Sunset Safari',         description_ar:'4×4 adventure at sunset.',                    photo_url:'photos/places/14.jpg' },
      { place_id:15, name_en:'Siwa Oasis at Night',   description_ar:'Night tour in magical atmosphere.',            photo_url:'photos/places/15.jpg' },
    ];
  }

  grid.innerHTML = '';

  places.forEach(place => {
    const card = document.createElement('div');
    card.className = 'place-card';
    card.innerHTML = `
      <img src="${place.photo_url}" alt="${place.name_en}" loading="lazy"
           onerror="this.src='photos/fallback.jpg'">
      <div class="place-info">
        <h3>${place.name_en}</h3>
        <p>${place.description_ar}</p>
        <button class="place-btn" onclick="goToDetails(${place.place_id}, '${place.name_en}')">
          Learn More
        </button>
      </div>`;
    grid.appendChild(card);
  });

window.goToDetails = (id, name) => {
  window.location.href = `details.html?id=${id}&place=${encodeURIComponent(name)}`;
};
document.getElementById('placesSearch').addEventListener('input', function () {
  const val = this.value.toLowerCase().trim();
  document.querySelectorAll('.place-card').forEach(card => {
    const name = card.querySelector('h3')?.textContent.toLowerCase() || '';
    const desc = card.querySelector('p')?.textContent.toLowerCase() || '';
    card.style.display = name.includes(val) || desc.includes(val) ? '' : 'none';
  });
});