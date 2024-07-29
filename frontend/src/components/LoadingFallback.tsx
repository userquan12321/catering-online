import { ReactNode, Suspense } from 'react'

import Loading from '@/components/common/Loading'

type Props = {
  children: ReactNode
}

const LoadingFallback = ({ children }: Props) => (
  <Suspense fallback={<Loading />}>{children}</Suspense>
)

export default LoadingFallback
