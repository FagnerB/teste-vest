"use client"

import type { ReactNode } from "react"
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { AuthProvider } from '@/contexts/AuthContext'
import { ProtectedRoute } from '@/components/admin/protected-route'
import { usePathname } from 'next/navigation'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin/login'

  return (
    <AuthProvider>
      {isLoginPage ? (
        children
      ) : (
        <ProtectedRoute>
          <div className="flex h-screen overflow-hidden bg-background">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto lg:ml-64">
              <div className="p-4 lg:p-8">
                {children}
              </div>
            </main>
          </div>
        </ProtectedRoute>
      )}
    </AuthProvider>
  )
}
