/* eslint-disable @typescript-eslint/no-unused-vars */

import Link from 'next/link'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import React, { useState } from 'react'

const SidebarNavigation: NextPage = (props) => {
  const router = useRouter()
  /*   const [isHovering, setIsHovered] = useState(false); */
  const [isHoveringSwap, setIsHoveredSwap] = useState(false)
  const [isHoveringOverview, setIsHoveredOverview] = useState(false)
  const [isHoveringPool, setIsHoveredPool] = useState(false)

  return (
    <nav className="sidebarparentdiv">
      <Link href="/swap">
        <a>Swap</a>
      </Link>

      <Link href="/overview">
        <a>Market Overview</a>
      </Link>

      <Link href="/pools">
        <a>Account</a>
      </Link>
    </nav>
  )
}
export default SidebarNavigation
