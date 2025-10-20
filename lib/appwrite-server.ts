// Appwrite server-side client (usa API Key e variáveis NÃO públicas)
// Defina em .env.local ou no ambiente do servidor:
// APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
// APPWRITE_PROJECT=seu_project_id
// APPWRITE_API_KEY=XXXXXXXX
// APPWRITE_DATABASE=seu_database_id
// APPWRITE_COLLECTION_PRODUCTS=sua_collection_id

import { Client, Databases, ID, Models } from 'node-appwrite'

export const serverEnv = {
  endpoint: process.env.APPWRITE_ENDPOINT || '',
  project: process.env.APPWRITE_PROJECT || '',
  apiKey: process.env.APPWRITE_API_KEY || '',
  databaseId: process.env.APPWRITE_DATABASE || '',
  productsCollectionId: process.env.APPWRITE_COLLECTION_PRODUCTS || '',
}

function ensureServerEnv() {
  const missing: string[] = []
  if (!serverEnv.endpoint) missing.push('APPWRITE_ENDPOINT')
  if (!serverEnv.project) missing.push('APPWRITE_PROJECT')
  if (!serverEnv.apiKey) missing.push('APPWRITE_API_KEY')
  if (!serverEnv.databaseId) missing.push('APPWRITE_DATABASE')
  if (!serverEnv.productsCollectionId) missing.push('APPWRITE_COLLECTION_PRODUCTS')
  if (missing.length) {
    throw new Error(`Appwrite server não configurado. Defina: ${missing.join(', ')}`)
  }
}

export function getAppwriteServer() {
  ensureServerEnv()
  const client = new Client().setEndpoint(serverEnv.endpoint).setProject(serverEnv.project).setKey(serverEnv.apiKey)
  const databases = new Databases(client)
  return { client, databases, serverEnv, ID }
}

export type AppwriteDocument<T> = Models.Document & T
