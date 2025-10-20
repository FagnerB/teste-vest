// Centraliza a configuração do Appwrite (SDK Web)
// Defina as variáveis em .env.local:
// NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1 (ou seu endpoint)
// NEXT_PUBLIC_APPWRITE_PROJECT=seu_project_id
// NEXT_PUBLIC_APPWRITE_DATABASE=seu_database_id
// NEXT_PUBLIC_APPWRITE_COLLECTION_PRODUCTS=sua_collection_id

import { Client, Databases, ID, Models } from 'appwrite'

export const env = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || '',
  project: process.env.NEXT_PUBLIC_APPWRITE_PROJECT || '',
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE || '',
  productsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_PRODUCTS || '',
}

function ensureEnv() {
  const missing: string[] = []
  if (!env.endpoint) missing.push('NEXT_PUBLIC_APPWRITE_ENDPOINT')
  if (!env.project) missing.push('NEXT_PUBLIC_APPWRITE_PROJECT')
  if (!env.databaseId) missing.push('NEXT_PUBLIC_APPWRITE_DATABASE')
  if (!env.productsCollectionId) missing.push('NEXT_PUBLIC_APPWRITE_COLLECTION_PRODUCTS')
  if (missing.length) {
    throw new Error(
      `Appwrite não configurado. Defina as variáveis no .env.local: ${missing.join(', ')}\n` +
      'Exemplo:\n' +
      'NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1\n' +
      'NEXT_PUBLIC_APPWRITE_PROJECT=seu_project_id\n' +
      'NEXT_PUBLIC_APPWRITE_DATABASE=seu_database_id\n' +
      'NEXT_PUBLIC_APPWRITE_COLLECTION_PRODUCTS=sua_collection_id'
    )
  }
}

export function getAppwrite() {
  ensureEnv()
  const client = new Client().setEndpoint(env.endpoint).setProject(env.project)
  const databases = new Databases(client)
  return { client, databases, env }
}

export type AppwriteDocument<T> = Models.Document & T

export { ID }
