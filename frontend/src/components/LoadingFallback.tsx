import { ReactNode, Suspense } from 'react'

type Props = {
  children: ReactNode
}

const LoadingFallback = ({ children }: Props) => (
  <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
)

export default LoadingFallback
