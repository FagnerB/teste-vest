import api from "./api";

// Enviar contato (POST /contato)
export async function enviarContato(data: {
  nome: string,
  email: string,
  mensagem: string,
}) {
  await api.post("/contato", data);
}

// Listar (GET /contato)
export async function listarContatos() {
  const res = await api.get("/contato");
  return res.data;
}

// Consultar por ID (GET /contato/{msg_id})
export async function consultarContato(msgId: number) {
  const res = await api.get(`/contato/${msgId}`);
  return res.data;
}
