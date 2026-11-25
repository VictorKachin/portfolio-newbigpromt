import type { ReactNode } from 'react'
import { useInView } from '@/hooks/useInView'
import styles from './Reveal.module.scss'

interface RevealProps {
  children: ReactNode
  delay?: number
}

export const Reveal = ({ children, delay = 0 }: RevealProps) => {
  const { ref, isVisible } = useInView()

  return (
    <div
      ref={ref}
      className={[styles.reveal, isVisible && styles.visible].filter(Boolean).join(' ')}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
