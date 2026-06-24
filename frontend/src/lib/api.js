import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
});

export async function submitConsultation(payload) {
  const { data } = await api.post("/consultations", payload);
  return data;
}

export async function submitWebinarRegistration(payload) {
  const { data } = await api.post("/webinar-registrations", payload);
  return data;
}

export async function submitContact(payload) {
  const { data } = await api.post("/contacts", payload);
  return data;
}

export async function fetchBlogPosts(category) {
  const { data } = await api.get("/blog", { params: category ? { category } : {} });
  return data;
}

export async function fetchBlogPost(slug) {
  const { data } = await api.get(`/blog/${slug}`);
  return data;
}
