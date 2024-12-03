import PrivacyPolicy from '@/pages/PrivacyPolicy'

import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/privacy-policy')({
  component: PrivacyPolicy,
})
