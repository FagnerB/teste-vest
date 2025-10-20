import api from "./api";

// Criar pedido (POST /pedidos)
export async function criarPedido(data: {
  cliente_id: number,
  total: number,
  status: string,
  pagamento: string,
  endereco_entrega_id: number,
  items: Array<{
    produto_id: number,
    quantidade: number,
    preco: number,
    tamanho?: string,
    cor?: string,
  }>
}) {
  await api.post("/pedidos", data);
}

// Listar pedidos (GET /pedidos)
export async function listarPedidos() {
  const res = await api.get("/pedidos");
  return res.data;
}

// Consultar pedido por ID (GET /pedidos/{pedido_id})
export async function consultarPedido(pedidoId: number) {
  const res = await api.get(`/pedidos/${pedidoId}`);
  return res.data;
}
