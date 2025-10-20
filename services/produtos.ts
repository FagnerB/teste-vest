import api from "./api";

// Listar produtos (GET /produtos)
export async function listarProdutos() {
  const res = await api.get("/produtos");
  return res.data;
}

// Consultar produto por ID (GET /produtos/{id})
export async function consultarProduto(id: number) {
  const res = await api.get(`/produtos/${id}`);
  return res.data;
}
