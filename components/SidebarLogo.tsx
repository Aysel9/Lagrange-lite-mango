/* eslint-disable @typescript-eslint/no-unused-vars */

import Link from 'next/link'
import Image from 'next/image'
import LagrangeLogoImage from '../public/Lagrange_logo_sidebar.png'
import Lagrangefilogo2 from '../public/favicon.ico'
import type { NextPage } from 'next'
const SidebarLogo: NextPage = () => {
  return (
    <Link href="/">
      <a className="flex items-center space-x-2 space-y-2 text-gray-600">
        <Image
          src={Lagrangefilogo2}
          width={215}
          height={58}
          alt="Lagrange logo"
        />
      </a>
    </Link>
  )
}
export default SidebarLogo
