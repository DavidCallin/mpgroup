interface LoaderProps {
  size?: number
  className?: string
}

export function Loader({ size = 50, className = '' }: LoaderProps) {
  return (
    <div 
      className={`loader ${className}`}
      style={{ 
        width: `${size}px`,
        aspectRatio: '1',
        borderRadius: '50%',
        border: '8px solid #e5e7eb',
        borderRightColor: '#F59E0B',
        animation: 'spin 1s infinite linear'
      }}
    />
  )
}