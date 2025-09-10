'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Settings,
  ChevronLeft,
  Menu,
  X,
  Home,
  ShoppingCart,
  Package,
  CreditCard,
  MessageSquare,
  UserCheck,
  Store
} from 'lucide-react'

const allSidebarLinks = [
  {
    href: '/admin',
    label: 'Dashboard',
    icon: LayoutDashboard,
    roles: ['admin', 'pharmacy']
  },
  {
    href: '/admin/orders',
    label: 'Orders',
    icon: ShoppingBag,
    roles: ['admin', 'pharmacy']
  },
  {
    href: '/admin/inventory',
    label: 'Inventory',
    icon: Package,
    roles: ['admin', 'pharmacy']
  },
  {
    href: '/admin/customers',
    label: 'Customers',
    icon: Users,
    roles: ['admin', 'pharmacy']
  },
  {
    href: '/admin/users',
    label: 'Users',
    icon: UserCheck,
    roles: ['admin'] // Only admin can manage users
  },
  {
    href: '/admin/settings',
    label: 'Settings',
    icon: Settings,
    roles: ['admin', 'pharmacy']
  }
]

export function Sidebar() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()

  const isActive = (path: string) => {
    return pathname === path
  }

  // Filter sidebar links based on user role
  const sidebarLinks = allSidebarLinks.filter(link => 
    link.roles.includes(session?.user?.role as string)
  )

  const getUserRoleDisplay = () => {
    if (session?.user?.role === 'admin') return 'Administrator'
    if (session?.user?.role === 'pharmacy') return 'Pharmacy Manager'
    return 'User'
  }

  return (
    <>
      {/* Mobile Menu Button - only show on mobile and positioned relative to main header */}
      <div className="md:hidden fixed top-20 left-4 z-50">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="bg-white border border-gray-300 rounded-lg p-2 shadow-sm text-gray-600 hover:text-gray-900"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside 
        className={`
          fixed top-16 left-0 z-20 transition-transform duration-300
          ${sidebarCollapsed ? 'w-16' : 'w-64'}
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          bg-white border-r overflow-y-auto
          h-[calc(100vh-8rem)]
        `}
      >
        <div className="flex items-center justify-between h-12 px-4 border-b bg-green-50">
          {!sidebarCollapsed && (
            <div className="text-sm font-semibold text-green-700">
              Admin Panel
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden md:block text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className={`h-5 w-5 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* User Role Badge */}
        {!sidebarCollapsed && (
          <div className="px-4 py-3 bg-green-50 border-b">
            <div className="text-xs text-green-700 font-medium">
              {getUserRoleDisplay()}
            </div>
            <div className="text-xs text-green-600">
              {session?.user?.name}
            </div>
          </div>
        )}

        <nav className="p-4 space-y-2">
          {sidebarLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                  ${isActive(link.href) 
                    ? 'bg-green-50 text-green-600 border border-green-200' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {!sidebarCollapsed && <span>{link.label}</span>}
              </Link>
            )
          })}
          
          {/* Back to Main Site Link */}
          <div className="pt-4 border-t">
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Home className="h-5 w-5 shrink-0" />
              {!sidebarCollapsed && <span>Back to Store</span>}
            </Link>
          </div>
        </nav>
      </aside>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 top-16 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  )
} 