import api from "./api";

// Cadastro (POST /clientes/)
export async function cadastrarCliente(data: {
  nome: string,
  email: string,
  senha: string,
  telefone?: string,
  cpf?: string,
}) {
  await api.post("/clientes/", data);
}

// Listar (GET /clientes)
export async function listarClientes() {
  const res = await api.get("/clientes");
  return res.data;
}

// Consultar (GET /clientes/{id})
export async function consultarCliente(id: number) {
  const res = await api.get(`/clientes/${id}`);
  return res.data;
}
