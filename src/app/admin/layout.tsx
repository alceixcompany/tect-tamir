import type { Metadata } from 'next'
import AdminLayoutWrapper from './AdminLayoutWrapper'

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default AdminLayoutWrapper