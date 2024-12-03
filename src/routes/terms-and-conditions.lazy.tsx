import { createLazyFileRoute } from '@tanstack/react-router'

import TermsAndConditions from '@/pages/TermsAndConditions'

export const Route = createLazyFileRoute('/terms-and-conditions')({
  component: TermsAndConditions,
})
