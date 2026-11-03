import toast from 'react-hot-toast'

export const notify = {
  success: (message) =>
    toast.success(message, {
      style: {
        borderRadius: '14px',
        background: '#1e293b',
        color: '#fff',
        fontSize: '14px',
        fontWeight: '500',
        padding: '12px 18px',
        boxShadow: '0 10px 30px -5px rgba(0,0,0,0.2)',
      },
      iconTheme: {
        primary: '#22c55e',
        secondary: '#fff',
      },
    }),

  error: (message) =>
    toast.error(message, {
      style: {
        borderRadius: '14px',
        background: '#1e293b',
        color: '#fff',
        fontSize: '14px',
        fontWeight: '500',
        padding: '12px 18px',
        boxShadow: '0 10px 30px -5px rgba(0,0,0,0.2)',
      },
      iconTheme: {
        primary: '#ef4444',
        secondary: '#fff',
      },
    }),

  info: (message) =>
    toast(message, {
      icon: 'ℹ️',
      style: {
        borderRadius: '14px',
        background: '#1e293b',
        color: '#fff',
        fontSize: '14px',
        fontWeight: '500',
        padding: '12px 18px',
        boxShadow: '0 10px 30px -5px rgba(0,0,0,0.2)',
      },
    }),
}

export default notify
