'use client'

import * as React from "react"
import { toast as hotToast, ToastOptions } from 'react-hot-toast'
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
      return <CheckCircle className="h-5 w-5 text-green-600" />
    case 'error':
      return <AlertCircle className="h-5 w-5 text-red-600" />
    case 'warning':
      return <AlertTriangle className="h-5 w-5 text-yellow-600" />
    case 'info':
      return <Info className="h-5 w-5 text-blue-600" />
    default:
      return <Info className="h-5 w-5 text-gray-600" />
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

const CustomToastContent = ({ 
  title, 
  description, 
  variant = 'default', 
  action, 
  onDismiss 
}: ToastProps & { onDismiss?: () => void }) => {
  return (
    <div className="flex items-start space-x-3 w-full max-w-md">
      <div className="flex-shrink-0 mt-1">
        {getToastIcon(variant)}
      </div>
      <div className="flex-1 min-w-0">
        {title && (
          <div className="text-sm font-semibold mb-1">
            {title}
          </div>
        )}
        {description && (
          <div className="text-sm opacity-90 leading-relaxed">
            {description}
          </div>
        )}
        {action && (
          <button
            onClick={action.onClick}
            className="mt-2 text-xs font-medium underline hover:no-underline"
          >
            {action.label}
          </button>
        )}
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

export const useToast = () => {
  const toast = React.useCallback((props: ToastProps | string) => {
    if (typeof props === 'string') {
      return hotToast(props)
    }

    const { variant = 'default', duration = 4000, ...otherProps } = props
    const styles = getToastStyles(variant)

    return hotToast.custom(
      (t) => (
        <CustomToastContent
          {...otherProps}
          variant={variant}
          onDismiss={() => hotToast.dismiss(t.id)}
        />
      ),
      {
        duration,
        ...styles,
      }
    )
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
  const { toast: toastFn } = useToast()
  return toastFn(props)
}

export const toastSuccess = (props: Omit<ToastProps, 'variant'> | string) => {
  const { success } = useToast()
  return success(props)
}

export const toastError = (props: Omit<ToastProps, 'variant'> | string) => {
  const { error } = useToast()
  return error(props)
}

export const toastWarning = (props: Omit<ToastProps, 'variant'> | string) => {
  const { warning } = useToast()
  return warning(props)
}

export const toastInfo = (props: Omit<ToastProps, 'variant'> | string) => {
  const { info } = useToast()
  return info(props)
}
