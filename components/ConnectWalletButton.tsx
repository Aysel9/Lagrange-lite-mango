import { Fragment, useCallback, useState } from 'react'
import useMangoStore from '../stores/useMangoStore'
import { Menu, Transition } from '@headlessui/react'
import {
  CurrencyDollarIcon,
  DuplicateIcon,
  LogoutIcon,
} from '@heroicons/react/outline'
import { PROVIDER_LOCAL_STORAGE_KEY } from '../hooks/useWallet'
import useLocalStorageState from '../hooks/useLocalStorageState'
import { abbreviateAddress, copyToClipboard } from '../utils'
import WalletSelect from './WalletSelect'
import { WalletIcon, ProfileIcon } from './icons'
import AccountsModal from './AccountsModal'
import { useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { DEFAULT_PROVIDER, WALLET_PROVIDERS } from '../utils/wallet-adapters'

const ConnectWalletButton = () => {
  const { t } = useTranslation('common')
  const wallet = useMangoStore((s) => s.wallet.current)
  const mangoGroup = useMangoStore((s) => s.selectedMangoGroup.current)
  const pfp = useMangoStore((s) => s.wallet.pfp)
  const connected = useMangoStore((s) => s.wallet.connected)
  const set = useMangoStore((s) => s.set)
  const [showAccountsModal, setShowAccountsModal] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState(DEFAULT_PROVIDER.url)
  const [savedProviderUrl] = useLocalStorageState(
    PROVIDER_LOCAL_STORAGE_KEY,
    DEFAULT_PROVIDER.url
  )

  // update in useEffect to prevent SRR error from next.js
  useEffect(() => {
    setSelectedWallet(savedProviderUrl)
  }, [savedProviderUrl])

  const handleWalletConect = () => {
    wallet.connect()
    set((state) => {
      state.selectedMangoAccount.initialLoad = true
    })
  }

  const handleCloseAccounts = useCallback(() => {
    setShowAccountsModal(false)
  }, [])

  return (
    <>
      {connected && wallet?.publicKey ? (
        <Menu>
          {({ open }) => (
            <div className="relative" id="profile-menu-tip">
              <Menu.Button className="flex items-center justify-center w-10 h-10 text-white rounded-full bg-th-bkg-4 focus:outline-none hover:bg-th-bkg-4 hover:text-th-fgd-3">
                {pfp?.isAvailable ? (
                  <img alt="" src={pfp.url} className="rounded-full" />
                ) : (
                  <ProfileIcon className="w-6 h-6" />
                )}
              </Menu.Button>
              <Transition
                appear={true}
                show={open}
                as={Fragment}
                enter="transition-all ease-in duration-200"
                enterFrom="opacity-0 transform scale-75"
                enterTo="opacity-100 transform scale-100"
                leave="transition ease-out duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Menu.Items className="absolute bg-th-bkg-3 mt-1 px-4 py-2.5 right-0 rounded-md space-y-1.5 w-48 z-20">
                  <Menu.Item>
                    <button
                      className="flex flex-row font-normal items-center py-0.5 rounded-none w-full hover:text-th-primary hover:cursor-pointer focus:outline-none"
                      onClick={() => setShowAccountsModal(true)}
                    >
                      <CurrencyDollarIcon className="w-4 h-4" />
                      <div className="pl-2 text-left">{t('accounts')}</div>
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      className="flex flex-row font-normal items-center py-0.5 rounded-none w-full hover:text-th-primary hover:cursor-pointer focus:outline-none"
                      onClick={() => copyToClipboard(wallet?.publicKey)}
                    >
                      <DuplicateIcon className="w-4 h-4" />
                      <div className="pl-2 text-left">{t('copy-address')}</div>
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      className="flex flex-row font-normal items-center py-0.5 rounded-none w-full hover:text-th-primary hover:cursor-pointer focus:outline-none"
                      onClick={() => wallet.disconnect()}
                    >
                      <LogoutIcon className="w-4 h-4" />
                      <div className="pl-2 text-left">
                        <div className="pb-0.5">{t('disconnect')}</div>
                        <div className="text-xs text-th-fgd-4">
                          {abbreviateAddress(wallet?.publicKey)}
                        </div>
                      </div>
                    </button>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </div>
          )}
        </Menu>
      ) : (
        <div
          className="flex justify-between border divide-x h-14 divide-th-bkg-3"
          id="connect-wallet-tip"
        >
          <button
            onClick={handleWalletConect}
            disabled={!wallet || !mangoGroup}
            className="rounded-none text-light-theme-lagrangewalletcolor hover:brightness-[1.1] focus:outline-none disabled:text-th-bkg-2 disabled:cursor-wait"
            /* className="bg-th-primary-dark rounded-none text-th-bkg-1 hover:brightness-[1.1] focus:outline-none disabled:text-th-bkg-2 disabled:cursor-wait" */
          >
            <div className="flex flex-row items-center justify-center h-full px-1 default-transition">
              <WalletIcon className="w-4 h-4 mr-2 fill-current" />
              <div className="text-left">
                <div className="font-bold mb-0.5 mt-2 whitespace-nowrap">
                  Connect Wallet
                </div>
                <div className="font-normal leading-3 tracking-wider text-th-bkg-2 text-xxs">
                  {WALLET_PROVIDERS.find((p) => p.url === selectedWallet)?.name}
                </div>
              </div>
            </div>
          </button>
          <div className="relative">
            <WalletSelect />
          </div>
        </div>
      )}
      {showAccountsModal ? (
        <AccountsModal
          onClose={handleCloseAccounts}
          isOpen={showAccountsModal}
        />
      ) : null}
    </>
  )
}

export default ConnectWalletButton
