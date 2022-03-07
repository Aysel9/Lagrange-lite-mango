/* eslint-disable @typescript-eslint/no-unused-vars */
import { JupiterProvider } from '@jup-ag/react-hook'
import type { NextPage } from 'next'
// @ts-ignore
import { useEffect, useState } from 'react'
import useMangoStore from '../stores/useMangoStore'
import PageBodyContainer from '../components/PageBodyContainer'
import TopBar from '../components/TopBar'
import {
  actionsSelector,
  connectionSelector,
  walletConnectedSelector,
  walletSelector,
} from '../stores/selectors'
import JupiterForm from '../components/JupiterForm'
// @ts-ignore
import { zeroKey } from '@blockworks-foundation/mango-client'
import Head from 'next/head'
/* import MobileLogo from '../components/MobileLogo'
import SidebarLogo from '../components/SidebarLogo'
import SidebarNavigation from '../components/SidebarNavigation' */

const SwapMango: NextPage = (props) => {
  const [isExpanded, toggleExpansion] = useState(true)
  console.log('SwapMango props', isExpanded)

  const connection = useMangoStore(connectionSelector)
  const connected = useMangoStore(walletConnectedSelector)
  const wallet = useMangoStore(walletSelector)
  const actions = useMangoStore(actionsSelector)
  console.log('connected')
  console.log(connected)

  useEffect(() => {
    if (connected) {
      actions.fetchWalletTokens()
    }
  }, [connected])

  if (!connection) return null

  const userPublicKey =
    wallet?.publicKey && !zeroKey.equals(wallet.publicKey)
      ? wallet.publicKey
      : null

  return (
    <div className="relative min-h-screen md:flex">
      <Head>
        <title>Lagrange.fi - Swap</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="flex-1 text-xl font-bold bg-gradient-to-r from-lagrangelight to-lagrangedark">
        <TopBar />
        <div>
          <JupiterProvider
            connection={connection}
            cluster="mainnet-beta"
            userPublicKey={connected ? userPublicKey : null}
          >
            <JupiterForm />
          </JupiterProvider>
        </div>
      </div>
    </div>
  )
}

export default SwapMango
