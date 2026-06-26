
// ================================================================
//  api.js  —  Siwa Frontend ↔ Backend
// ================================================================

const BASE_URL = "http://localhost:3000";

export function getToken() {
  return localStorage.getItem("siwa_token");
}

function saveSession(token, userData) {
  localStorage.setItem("siwa_token", token);
  localStorage.setItem("siwa_is_logged_in", "true");
  localStorage.setItem("siwa_user", JSON.stringify(userData));
}

export function clearSession() {
  localStorage.removeItem("siwa_token");
  localStorage.removeItem("siwa_is_logged_in");
  localStorage.removeItem("siwa_user");
}

export function isLoggedIn() {
  return localStorage.getItem("siwa_is_logged_in") === "true" && !!getToken();
}

export function getCurrentUser() {
  const d = localStorage.getItem("siwa_user");
  return d ? JSON.parse(d) : null;
}

async function api(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };

  if (auth) {
    const token = getToken();
    if (!token) throw new Error("Not logged in");
    headers["authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(BASE_URL + path, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);
  return data;
}

export async function register({ full_name, email, phone, password }) {
  const data = await api("/auth/register", {
    method: "POST",
    body: { full_name, email, phone, password },
  });

  // Save token first so the next request is authenticated
  if (data.token) {
    localStorage.setItem("siwa_token", data.token);

    // Fetch full profile to store in session
    const profile = await api("/users/me", { auth: true });
    saveSession(data.token, {
      user_id:   profile.user.user_id,
      full_name: profile.user.full_name,
      email:     profile.user.email,
      role:      profile.user.role,
    });
  }

  return data;
}

export async function login({ email, password }) {
  const data = await api("/auth/login", {
    method: "POST",
    body: { email, password },
  });

  localStorage.setItem("siwa_token", data.token);

  const profile = await api("/users/me", { auth: true });
  saveSession(data.token, {
    user_id:   profile.user.user_id,
    full_name: profile.user.full_name,
    email:     profile.user.email,
    role:      profile.user.role,
  });

  return data;
}

export async function getMyProfile() {
  return api("/users/me", { auth: true });
}

export function logout() {
  clearSession();
  window.location.href = "auth.html";
}

export async function getPlaces(category = "") {
  const qs = category ? `?category=${category}` : "";
  const data = await api(`/places${qs}`);
  if (!data.places) throw new Error("No places returned");
  return data.places;
}

export async function getPlaceById(id) {
  const data = await api(`/places/${id}`);
  return data.place;
}

export async function createBooking({ bus_type, departure_date, seats_count, total_price }) {
  const data = await api("/bus-booking", {
    method: "POST",
    auth: true,
    body: { bus_type, departure_date, seats_count, total_price },
  });
  return data.booking;
}

export async function getMyBookings() {
  const data = await api("/bus-booking/my", { auth: true });
  return data.bookings;
}

export async function createTripPlan({
  days_count, travel_style, arrival_date,
  group_size, budget_level, itinerary_json, total_cost_estimate,
}) {
  const data = await api("/trip-plans", {
    method: "POST",
    auth: true,
    body: { days_count, travel_style, arrival_date, group_size, budget_level, itinerary_json, total_cost_estimate },
  });
  return data.plan;
}

export async function getMyTripPlans() {
  const data = await api("/trip-plans", { auth: true });
  return data.plans;
}

export async function deleteTripPlan(id) {
  return api(`/trip-plans/${id}`, { method: "DELETE", auth: true });
}

export async function askChatbot(question) {
  const data = await api("/chatbot/ask", {
    method: "POST",
    auth: true,
    body: { question },
  });
  return data.answer;
}

export async function getChatHistory() {
  const data = await api("/chatbot/history", { auth: true });
  return data.history;
}