'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { 
  Bell, 
  Mail, 
  Shield, 
  Database,
  Globe,
  CreditCard,
  Truck,
  Store
} from 'lucide-react'

interface SettingSection {
  title: string
  description: string
  icon: any
  fields: {
    id: string
    label: string
    type: 'text' | 'email' | 'number' | 'select' | 'toggle'
    value: string | number | boolean
    options?: { label: string; value: string }[]
  }[]
}

const settingSections: SettingSection[] = [
  {
    title: 'Notifications',
    description: 'Configure how you want to receive notifications',
    icon: Bell,
    fields: [
      {
        id: 'email_notifications',
        label: 'Email Notifications',
        type: 'toggle',
        value: true
      },
      {
        id: 'order_updates',
        label: 'Order Status Updates',
        type: 'toggle',
        value: true
      },
      {
        id: 'inventory_alerts',
        label: 'Low Stock Alerts',
        type: 'toggle',
        value: true
      }
    ]
  },
  {
    title: 'Email Settings',
    description: 'Configure email sending settings',
    icon: Mail,
    fields: [
      {
        id: 'smtp_host',
        label: 'SMTP Host',
        type: 'text',
        value: 'smtp.example.com'
      },
      {
        id: 'smtp_port',
        label: 'SMTP Port',
        type: 'number',
        value: 587
      },
      {
        id: 'smtp_encryption',
        label: 'Encryption',
        type: 'select',
        value: 'tls',
        options: [
          { label: 'None', value: 'none' },
          { label: 'TLS', value: 'tls' },
          { label: 'SSL', value: 'ssl' }
        ]
      }
    ]
  },
  {
    title: 'Security',
    description: 'Configure security settings',
    icon: Shield,
    fields: [
      {
        id: 'two_factor',
        label: 'Two Factor Authentication',
        type: 'toggle',
        value: false
      },
      {
        id: 'session_timeout',
        label: 'Session Timeout (minutes)',
        type: 'number',
        value: 30
      }
    ]
  },
  {
    title: 'Database',
    description: 'Database configuration settings',
    icon: Database,
    fields: [
      {
        id: 'backup_enabled',
        label: 'Automatic Backups',
        type: 'toggle',
        value: true
      },
      {
        id: 'backup_frequency',
        label: 'Backup Frequency',
        type: 'select',
        value: 'daily',
        options: [
          { label: 'Daily', value: 'daily' },
          { label: 'Weekly', value: 'weekly' },
          { label: 'Monthly', value: 'monthly' }
        ]
      }
    ]
  },
  {
    title: 'Regional',
    description: 'Configure regional settings',
    icon: Globe,
    fields: [
      {
        id: 'timezone',
        label: 'Default Timezone',
        type: 'select',
        value: 'Asia/Kolkata',
        options: [
          { label: 'India (IST)', value: 'Asia/Kolkata' },
          { label: 'UTC', value: 'UTC' },
          { label: 'US Eastern', value: 'America/New_York' }
        ]
      },
      {
        id: 'date_format',
        label: 'Date Format',
        type: 'select',
        value: 'DD/MM/YYYY',
        options: [
          { label: 'DD/MM/YYYY', value: 'DD/MM/YYYY' },
          { label: 'MM/DD/YYYY', value: 'MM/DD/YYYY' },
          { label: 'YYYY-MM-DD', value: 'YYYY-MM-DD' }
        ]
      }
    ]
  },
  {
    title: 'Payment',
    description: 'Configure payment settings',
    icon: CreditCard,
    fields: [
      {
        id: 'payment_gateway',
        label: 'Payment Gateway',
        type: 'select',
        value: 'razorpay',
        options: [
          { label: 'Razorpay', value: 'razorpay' },
          { label: 'Stripe', value: 'stripe' },
          { label: 'PayPal', value: 'paypal' }
        ]
      },
      {
        id: 'currency',
        label: 'Default Currency',
        type: 'select',
        value: 'INR',
        options: [
          { label: 'Indian Rupee (₹)', value: 'INR' },
          { label: 'US Dollar ($)', value: 'USD' },
          { label: 'Euro (€)', value: 'EUR' }
        ]
      }
    ]
  },
  {
    title: 'Shipping',
    description: 'Configure shipping settings',
    icon: Truck,
    fields: [
      {
        id: 'free_shipping_threshold',
        label: 'Free Shipping Threshold',
        type: 'number',
        value: 500
      },
      {
        id: 'shipping_rate',
        label: 'Default Shipping Rate',
        type: 'number',
        value: 50
      }
    ]
  },
  {
    title: 'Store',
    description: 'Configure store settings',
    icon: Store,
    fields: [
      {
        id: 'store_name',
        label: 'Store Name',
        type: 'text',
        value: 'RxRush'
      },
      {
        id: 'support_email',
        label: 'Support Email',
        type: 'email',
        value: 'support@rxrush.com'
      },
      {
        id: 'support_phone',
        label: 'Support Phone',
        type: 'text',
        value: '+91 1234567890'
      }
    ]
  }
]

export default function SettingsPage() {
  const [settings, setSettings] = useState(settingSections)

  const handleChange = (sectionIndex: number, fieldId: string, value: string | number | boolean) => {
    const newSettings = [...settings]
    const field = newSettings[sectionIndex].fields.find(f => f.id === fieldId)
    if (field) {
      field.value = value
    }
    setSettings(newSettings)
  }

  const handleSave = () => {
    // TODO: Implement settings save functionality
    toast.success('Settings saved successfully')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">Manage your application settings</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {settings.map((section, sectionIndex) => {
          const Icon = section.icon
          return (
            <div key={section.title} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg bg-green-50 text-green-600`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-medium text-gray-900">{section.title}</h2>
                  <p className="mt-1 text-sm text-gray-600">{section.description}</p>
                  <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {section.fields.map((field) => (
                      <div key={field.id}>
                        <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
                          {field.label}
                        </label>
                        <div className="mt-1">
                          {field.type === 'toggle' ? (
                            <button
                              type="button"
                              className={`
                                relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
                                transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                                ${field.value ? 'bg-green-600' : 'bg-gray-200'}
                              `}
                              onClick={() => handleChange(sectionIndex, field.id, !field.value)}
                            >
                              <span
                                className={`
                                  pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 
                                  transition duration-200 ease-in-out
                                  ${field.value ? 'translate-x-5' : 'translate-x-0'}
                                `}
                              />
                            </button>
                          ) : field.type === 'select' ? (
                            <select
                              id={field.id}
                              value={field.value as string}
                              onChange={(e) => handleChange(sectionIndex, field.id, e.target.value)}
                              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                            >
                              {field.options?.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type={field.type}
                              id={field.id}
                              value={field.value as string | number}
                              onChange={(e) => handleChange(sectionIndex, field.id, e.target.value)}
                              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  )
} 