import { createLazyFileRoute } from '@tanstack/react-router'

import RefundPolicy from '@/pages/RefundPolicy'

export const Route = createLazyFileRoute('/refund-policy')({
  component: RefundPolicy,
})