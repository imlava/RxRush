import Link from 'next/link';

export default function Custom404() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f3f4f6'
    }}>
      <div style={{
        textAlign: 'center',
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{
          fontSize: '3.75rem',
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: '1rem'
        }}>404</h1>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          color: '#4b5563',
          marginBottom: '1rem'
        }}>Page Not Found</h2>
        <p style={{
          color: '#6b7280',
          marginBottom: '2rem'
        }}>The page you are looking for does not exist.</p>
        <Link 
          href="/"
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#2563eb',
            color: 'white',
            borderRadius: '0.375rem',
            textDecoration: 'none'
          }}
        >
          Return Home
        </Link>
      </div>
    </div>
  );
} 