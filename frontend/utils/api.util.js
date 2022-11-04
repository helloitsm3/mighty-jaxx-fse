import axios from "axios";

const endpoint =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : "https://might-jaxx-server.onrender.com";

export default {
  user: {
    login: (email, password) =>
      axios.post(`${endpoint}/auth/login`, {
        email,
        password,
      }),

    register: (email, password) =>
      axios.post(`${endpoint}/auth/`, { email, password }),
  },
  product: {
    create: (formData, config) =>
      axios.post(`${endpoint}/product/create`, formData, config),
    edit: (id, formData, config) =>
      axios.put(`${endpoint}/product/${id}`, formData, config),
    remove: (id, config) => axios.delete(`${endpoint}/product/${id}`, config),
    pagination: (page) => axios.get(`${endpoint}/product/${page}`),
    search: (search) => axios.post(`${endpoint}/product/search`, { search }),
    get: () => axios.get(`${endpoint}/product/1`),
  },
};
