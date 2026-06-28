import axios from "axios"

const BaseUrl = import.meta.env.VITE_BASE_URL

export const api = axios.create({
  baseURL: BaseUrl,
})
