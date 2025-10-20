import { getAppwrite, ID, AppwriteDocument } from '@/lib/appwrite'

// Tipagem do produto no Appwrite (ajuste os campos conforme a collection)
export interface ProdutoDoc {
  nome: string
  category?: string
  price: number
  stock?: number
  description?: string
  images?: string[]
}

export async function awListarProdutos() {
  const { databases, env } = getAppwrite()
  const res = await databases.listDocuments<AppwriteDocument<ProdutoDoc>>(
    env.databaseId,
    env.productsCollectionId,
    []
  )
  return res.documents
}

export async function awBuscarProdutoPorId(id: string) {
  const { databases, env } = getAppwrite()
  const doc = await databases.getDocument<AppwriteDocument<ProdutoDoc>>(
    env.databaseId,
    env.productsCollectionId,
    id
  )
  return doc
}

export async function awCriarProduto(payload: ProdutoDoc) {
  const { databases, env } = getAppwrite()
  const doc = await databases.createDocument<AppwriteDocument<ProdutoDoc>>(
    env.databaseId,
    env.productsCollectionId,
    ID.unique(),
    payload
  )
  return doc
}

export async function awAtualizarProduto(id: string, payload: Partial<ProdutoDoc>) {
  const { databases, env } = getAppwrite()
  const doc = await databases.updateDocument<AppwriteDocument<ProdutoDoc>>(
    env.databaseId,
    env.productsCollectionId,
    id,
    payload
  )
  return doc
}

export async function awExcluirProduto(id: string) {
  const { databases, env } = getAppwrite()
  await databases.deleteDocument(
    env.databaseId,
    env.productsCollectionId,
    id
  )
}
