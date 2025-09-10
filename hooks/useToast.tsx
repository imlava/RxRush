'use client'

import * as React from "react"
import { toast as hotToast } from 'react-hot-toast'
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react'

export interface ToastProps {
  title?: string
  description?: string
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info'
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

const getToastIcon = (variant: string) => {
  switch (variant) {
    case 'success':
      return React.createElement(CheckCircle, { className: "h-5 w-5 text-green-600" })
    case 'error':
      return React.createElement(AlertCircle, { className: "h-5 w-5 text-red-600" })
    case 'warning':
      return React.createElement(AlertTriangle, { className: "h-5 w-5 text-yellow-600" })
    case 'info':
      return React.createElement(Info, { className: "h-5 w-5 text-blue-600" })
    default:
      return React.createElement(Info, { className: "h-5 w-5 text-gray-600" })
  }
}

const getToastStyles = (variant: string) => {
  switch (variant) {
    case 'success':
      return {
        style: {
          background: '#f0fdf4',
          color: '#166534',
          border: '1px solid #bbf7d0',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        }
      }
    case 'error':
      return {
        style: {
          background: '#fef2f2',
          color: '#991b1b',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        }
      }
    case 'warning':
      return {
        style: {
          background: '#fffbeb',
          color: '#92400e',
          border: '1px solid #fed7aa',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        }
      }
    case 'info':
      return {
        style: {
          background: '#eff6ff',
          color: '#1e40af',
          border: '1px solid #bfdbfe',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        }
      }
    default:
      return {
        style: {
          background: '#ffffff',
          color: '#374151',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        }
      }
  }
}

export const useToast = () => {
  const toast = React.useCallback((props: ToastProps | string) => {
    if (typeof props === 'string') {
      return hotToast(props)
    }

    const { variant = 'default', duration = 4000, title, description } = props
    const styles = getToastStyles(variant)
    const message = title || description || ''

    return hotToast(message, {
      duration,
      ...styles,
      icon: getToastIcon(variant),
    })
  }, [])

  const success = React.useCallback((props: Omit<ToastProps, 'variant'> | string) => {
    if (typeof props === 'string') {
      return hotToast.success(props, getToastStyles('success'))
    }
    return toast({ ...props, variant: 'success' })
  }, [toast])

  const error = React.useCallback((props: Omit<ToastProps, 'variant'> | string) => {
    if (typeof props === 'string') {
      return hotToast.error(props, getToastStyles('error'))
    }
    return toast({ ...props, variant: 'error' })
  }, [toast])

  const warning = React.useCallback((props: Omit<ToastProps, 'variant'> | string) => {
    if (typeof props === 'string') {
      return hotToast(props, getToastStyles('warning'))
    }
    return toast({ ...props, variant: 'warning' })
  }, [toast])

  const info = React.useCallback((props: Omit<ToastProps, 'variant'> | string) => {
    if (typeof props === 'string') {
      return hotToast(props, getToastStyles('info'))
    }
    return toast({ ...props, variant: 'info' })
  }, [toast])

  const loading = React.useCallback((message: string) => {
    return hotToast.loading(message, {
      style: {
        background: '#ffffff',
        color: '#374151',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      }
    })
  }, [])

  const dismiss = React.useCallback((toastId?: string) => {
    return hotToast.dismiss(toastId)
  }, [])

  const promise = React.useCallback(<T,>(
    promise: Promise<T>,
    msgs: {
      loading: string
      success: string | ((data: T) => string)
      error: string | ((error: any) => string)
    }
  ) => {
    return hotToast.promise(promise, msgs, {
      success: getToastStyles('success'),
      error: getToastStyles('error'),
      loading: {
        style: {
          background: '#ffffff',
          color: '#374151',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        }
      }
    })
  }, [])

  return {
    toast,
    success,
    error,
    warning,
    info,
    loading,
    dismiss,
    promise,
  }
}

// Export individual functions for convenience
export const toast = (props: ToastProps | string) => {
  if (typeof props === 'string') {
    return hotToast(props)
  }
  const { variant = 'default', duration = 4000, title, description } = props
  const styles = getToastStyles(variant)
  const message = title || description || ''
  
  return hotToast(message, {
    duration,
    ...styles,
    icon: getToastIcon(variant),
  })
}

export const toastSuccess = (props: Omit<ToastProps, 'variant'> | string) => {
  if (typeof props === 'string') {
    return hotToast.success(props, getToastStyles('success'))
  }
  return toast({ ...props, variant: 'success' })
}

export const toastError = (props: Omit<ToastProps, 'variant'> | string) => {
  if (typeof props === 'string') {
    return hotToast.error(props, getToastStyles('error'))
  }
  return toast({ ...props, variant: 'error' })
}

export const toastWarning = (props: Omit<ToastProps, 'variant'> | string) => {
  if (typeof props === 'string') {
    return hotToast(props, getToastStyles('warning'))
  }
  return toast({ ...props, variant: 'warning' })
}

export const toastInfo = (props: Omit<ToastProps, 'variant'> | string) => {
  if (typeof props === 'string') {
    return hotToast(props, getToastStyles('info'))
  }
  return toast({ ...props, variant: 'info' })
}
