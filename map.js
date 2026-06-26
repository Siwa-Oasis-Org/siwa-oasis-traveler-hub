document.addEventListener("DOMContentLoaded", () => {
  const map = document.getElementById("interactive-map");

  const places = [
    {
      name: "Cleopatra Spring",
      desc: "The most famous hot spring in Siwa",
      type: "spring",
      top: "42%",
      left: "48%",
      url: "https://www.google.com/maps/place/Cleopatra's+Bath/@29.202581,25.519374,17z/data=!3m1!4b1!4m6!3m5!1s0x143a5e5e5e5e5e5e:0x9b59b6b6b6b6b6b6!8m2!3d29.202581!4d25.519374!16s%2Fg%2F11c42q2q2q"
    },
    {
      name: "Shali Fortress",
      desc: "The historic heart of Siwa from 800 years ago",
      type: "historical",
      top: "45%",
      left: "50%",
      url: "https://www.google.com/maps/place/Shali+Fortress/@29.205833,25.518889,17z/data=!3m1!4b1!4m6!3m5!1s0x143a5e5e5e5e5e5f:0x8f8f8f8f8f8f8f8f!8m2!3d29.205833!4d25.518889!16zL20vMDE1eXh4"
    },
    {
      name: "Temple of Amun (Oracle)",
      desc: "Visited by Alexander the Great",
      type: "historical",
      top: "35%",
      left: "42%",
      url: "https://www.google.com/maps/place/Oracle+of+Amun/@29.191944,25.498611,17z/data=!3m1!4b1!4m6!3m5!1s0x143a5d5d5d5d5d5d:0x7e7e7e7e7e7e7e7e!8m2!3d29.191944!4d25.498611!16zL20vMDV4eGg"
    },
    {
      name: "Dakrour Mountain",
      desc: "Therapeutic sand bath + 360° panoramic view",
      type: "nature",
      top: "48%",
      left: "68%",
      url: "https://www.google.com/maps/place/Dakrur+Mountain/@29.205,25.55,15z/data=!3m1!4b1!4m6!3m5!1s0x143a5f5f5f5f5f5f:0x6f6f6f6f6f6f6f6f!8m2!3d29.205!4d25.55!16zL20vMDV4eGg"
    },
    {
      name: "Zeytuna Salt Lake",
      desc: "You float like in the Dead Sea",
      type: "nature",
      top: "52%",
      left: "82%",
      url: "https://www.google.com/maps/place/Siwa+Salt+Lake/@29.216667,25.716667,13z/data=!3m1!4b1!4m6!3m5!1s0x143a606060606060:0x5f5f5f5f5f5f5f5f!8m2!3d29.216667!4d25.716667!16zL20vMDV4eGg"
    },
    {
      name: "Fatnas Spring",
      desc: "One of the most beautiful sunsets in the world",
      type: "view",
      top: "48%",
      left: "28%",
      url: "https://www.google.com/maps/place/Fatnas+Island/@29.205,25.466667,15z/data=!3m1!4b1!4m6!3m5!1s0x143a5c5c5c5c5c5c:0x4e4e4e4e4e4e4e4e!8m2!3d29.205!4d25.466667!16zL20vMDV4eGg"
    },
    {
      name: "Mountain of the Dead",
      desc: "Ancient Roman tombs",
      type: "historical",
      top: "38%",
      left: "55%",
      url: "https://www.google.com/maps/place/Mountain+of+the+Dead/@29.198611,25.516667,16z/data=!3m1!4b1!4m6!3m5!1s0x143a5e5e5e5e5e5e:0x3d3d3d3d3d3d3d3d!8m2!3d29.198611!4d25.516667!16zL20vMDV4eGg"
    },
    {
      name: "Bir Wahed",
      desc: "The starting point of famous desert safari trips",
      type: "adventure",
      top: "65%",
      left: "40%",
      url: "https://www.google.com/maps/place/Bir+Wahed/@29.15,25.45,14z/data=!3m1!4b1!4m6!3m5!1s0x143a5b5b5b5b5b5b:0x2c2c2c2c2c2c2c2c!8m2!3d29.15!4d25.45!16zL20vMDV4eGg"
    }
  ];

  places.forEach(place => {
    const pin = document.createElement("div");
    pin.className = `pin ${place.type}`;
    pin.style.top = place.top;
    pin.style.left = place.left;

    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.innerHTML = `<strong>${place.name}</strong><br>${place.desc}<br><small style="color:#ff9800">Click to open Google Maps</small>`;

    pin.appendChild(tooltip);

    pin.onclick = (e) => {
      e.stopPropagation();
      window.open(place.url, "_blank");
    };

    map.appendChild(pin);
  });

  // filtering
  document.querySelectorAll(".filters input[type='checkbox']").forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      const checkedTypes = Array.from(document.querySelectorAll(".filters input:checked"))
                                .map(cb => cb.value);

      document.querySelectorAll(".pin").forEach(pin => {
        const pinType = Array.from(pin.classList).find(cls => cls !== "pin" && cls !== "tooltip");
        if (pinType) {
          pin.style.display = checkedTypes.includes(pinType) ? "block" : "none";
        }
      });
    });
  });
});