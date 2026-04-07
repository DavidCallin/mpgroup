import { useState, ImgHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  placeholderColor?: string
  priority?: boolean
}

export function OptimizedImage({
  src,
  alt,
  className,
  placeholderColor = 'bg-muted',
  priority = false,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className="relative w-full h-full">
      {/* Placeholder */}
      <div
        className={cn(
          'absolute inset-0 transition-opacity duration-500',
          placeholderColor,
          isLoaded ? 'opacity-0' : 'opacity-100'
        )}
      />
      
      {/* Image */}
      <img
        src={src}
        alt={alt}
        className={cn(
          'transition-opacity duration-500',
          isLoaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setIsLoaded(true)}
        {...props}
      />
    </div>
  )
}
