import { useCallback, useState } from 'react'
import Link from 'next/link'
import { abbreviateAddress } from '../utils/index'
import useLocalStorageState from '../hooks/useLocalStorageState'
import MenuItem from './MenuItem'
import ThemeSwitch from './ThemeSwitch'
import useMangoStore from '../stores/useMangoStore'
import ConnectWalletButton from './ConnectWalletButton'
import AccountsModal from './AccountsModal'
import { DEFAULT_MARKET_KEY, initialMarket } from './SettingsModal'
import { useTranslation } from 'next-i18next'
import Settings from './Settings'
import TradeNavMenu from './TradeNavMenu'

const TopBar = () => {
  const { t } = useTranslation('common')
  const mangoAccount = useMangoStore((s) => s.selectedMangoAccount.current)
  const wallet = useMangoStore((s) => s.wallet.current)
  const [showAccountsModal, setShowAccountsModal] = useState(false)
  const [defaultMarket] = useLocalStorageState(
    DEFAULT_MARKET_KEY,
    initialMarket
  )

  const handleCloseAccounts = useCallback(() => {
    setShowAccountsModal(false)
  }, [])

  return (
    <>
      <nav className={`bg-th-bkg-2`}>
        <div className={`px-4 xl:px-6`}>
          <div className={`flex justify-between h-[6.25rem]`}>
            <div className={`flex`}>
              <Link href={defaultMarket.path} shallow={true}>
                <div
                  className={`cursor-pointer flex-shrink-0 flex items-center`}
                >
                  <img
                    className={`h-8 w-auto`}
                    src="/Lagrange-logo-light.png"
                    alt="next"
                  />
                </div>
              </Link>
              <div
                className={`hidden md:flex md:items-center md:space-x-2 lg:space-x-3 md:ml-4`}
              >
                <TradeNavMenu />
                <MenuItem href="/account">{t('account')}</MenuItem>
                <MenuItem href="/borrow">{t('borrow')}</MenuItem>
                <MenuItem href="/swap">{t('swap')}</MenuItem>
                <MenuItem href="/stats">{t('stats')}</MenuItem>
              </div>
            </div>
            <div className="flex items-center">
              <div className={`pl-2`}>
                <ThemeSwitch />
              </div>
              <div className="pl-2">
                <Settings />
              </div>
              {mangoAccount &&
              mangoAccount.owner.toBase58() ===
                wallet?.publicKey?.toBase58() ? (
                <div className="pl-2">
                  <button
                    className="px-2 py-1 text-xs border rounded border-th-bkg-4 focus:outline-none hover:border-th-fgd-4"
                    onClick={() => setShowAccountsModal(true)}
                  >
                    <div className="text-xs font-normal text-th-primary">
                      {t('account')}
                    </div>
                    {mangoAccount.name
                      ? mangoAccount.name
                      : abbreviateAddress(mangoAccount.publicKey)}
                  </button>
                </div>
              ) : null}
              <div className="flex">
                <div className="pl-4">
                  <ConnectWalletButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {showAccountsModal ? (
        <AccountsModal
          onClose={handleCloseAccounts}
          isOpen={showAccountsModal}
        />
      ) : null}
    </>
  )
}

export default TopBar
