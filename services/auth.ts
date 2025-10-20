import api from "./api";

// Login admin (POST /admin/token). Salve o token retornado.
export async function loginAdmin(email: string, senha: string): Promise<string> {
  const form = new URLSearchParams();
  form.append("grant_type", "password");
  form.append("username", email);
  form.append("password", senha);
  const res = await api.post("/admin/token", form);
  return res.data.access_token;
}
