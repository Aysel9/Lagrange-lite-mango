/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect, useState, useCallback, useRef } from 'react'
import TopBar from '../components/TopBar'
import Image from 'next/image'
import EURS from '../public/coin/2989.png'
import USDC from '../public/coin/3408.png'
import USDT from '../public/coin/825.png'
import JPYC from '../public/coin/9045.png'
import TRYB from '../public/coin/5181.png'
import BRZ from '../public/coin/4139.png'
import Head from 'next/head'
import useMangoStore from '../stores/useMangoStore'
import {
  connectionSelector,
  walletConnectedSelector,
  walletSelector,
} from '../stores/selectors'
import {
  WalletError,
  WalletNotConnectedError,
} from '@solana/wallet-adapter-base'
import {
  Keypair,
  Transaction,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
  Connection,
  PublicKey,
} from '@solana/web3.js'
import axios from 'axios'

const Pools = (props) => {
  const [usd, setUsd] = useState()
  const [ageur, setAgeur] = useState()
  const [brz, setBrz] = useState()
  const [jpyc, setJpyc] = useState()
  const [bilira, setBilira] = useState()

  //// FOR solana ////
  const [changeUsdBalance, setChangeUsdBalance] = useState()

  //////-----  token balance ------/////////
  const [usdbalance, setUsdbalance] = useState()
  const [ageurbalance, setAgeurbalance] = useState()
  const [brzbalance, setBrzbalance] = useState()
  const [usdtbalance, setUsdtbalance] = useState()
  const [bilirabalance, setBilirabalance] = useState()
  ////////////-----finish-----//////////////////////

  //////-----  token balance USD ------/////////
  const [usdcbalance$, setUsdcbalance$] = useState()
  const [ageurbalance$, setAgeurbalance$] = useState()
  const [brzbalance$, setBrzbalance$] = useState()
  const [usdtbalance$, setUsdtbalance$] = useState()
  const [bilirabalance$, setBilirabalance$] = useState()
  ////////////-----finish-----//////////////////////

  //////----- current token balance USD ------/////////
  const [usdcbalance$c, setUsdcbalance$c] = useState()
  const [ageurbalance$c, setAgeurbalance$c] = useState()
  const [brzbalance$c, setBrzbalance$c] = useState()
  const [usdtbalance$c, setUsdtbalance$c] = useState()
  const [bilirabalance$c, setBilirabalance$c] = useState()
  ////////////-----finish-----//////////////////////

  const [mytotalvalue, setMytotalvalue] = useState()
  const [isExpanded, toggleExpansion] = useState(true)
  const { data } = props
  const [mybalance, setMybalance] = useState(String)

  const { swappableOutputForSol } = props

  const wallet = useMangoStore(walletSelector)
  const connection = useMangoStore(connectionSelector)
  const connected = useMangoStore(walletConnectedSelector)
  console.log(wallet?.publicKey?.toBase58())
  console.log('connected')
  console.log(connected == true)

  const gelsolbalance = async () => {}

  useEffect(() => {
    setUsdcbalance$c(Number(usdbalance * usdcbalance$).toFixed(2))
  }, [usd, usdbalance, usdcbalance$])

  useEffect(() => {
    setAgeurbalance$c(Number(ageurbalance * ageurbalance$).toFixed(2))
  }, [ageur, ageurbalance, ageurbalance$])

  useEffect(() => {
    setBrzbalance$c(Number(brzbalance * brzbalance$).toFixed(2))
  }, [brz, brzbalance, brzbalance$])

  useEffect(() => {
    setUsdtbalance$c(Number(usdtbalance * usdtbalance$).toFixed(2))
  }, [jpyc, usdtbalance, usdcbalance$])

  useEffect(() => {
    setBilirabalance$c(Number(bilirabalance * bilirabalance$).toFixed(2))
  }, [bilirabalance, bilirabalance$])

  useEffect(() => {
    //-----------------usd-----------------//
    async function fetchUsd() {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=usd-coin&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      )
      const data = await response.json()
      console.log(data.map((d) => d.total_volume))
      setUsd(data.map((d) => d.total_volume))
    }
    fetchUsd()

    //-----------------ageur-----------------//
    async function fetchAgeur() {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ageur&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      )
      const data = await response.json()
      console.log(data.map((d) => d.total_volume))
      setAgeur(data.map((d) => d.total_volume))
    }
    fetchAgeur()

    //-----------------JPYC-----------------//
    async function fetchJpyc() {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=jpyc&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      )
      const data = await response.json()
      console.log(data.map((d) => d.total_volume))
      setJpyc(data.map((d) => d.total_volume))
    }
    fetchJpyc()

    //-----------------brz-----------------//
    async function fetchBrz() {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=brz&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      )
      const data = await response.json()
      console.log(data.map((d) => d.total_volume))
      setBrz(data.map((d) => d.total_volume))
    }
    fetchBrz()

    //-----------------brz-----------------//
    async function fetchBilira() {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bilira&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      )
      const data = await response.json()
      console.log(data.map((d) => d.total_volume))
      setBilira(data.map((d) => d.total_volume))
    }
    fetchBilira()

    //------------sol change usd------------///
    async function changeUsd() {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd'
      )
      const data = await response.json()
      console.log('sol usd ' + data.solana.usd)
      setChangeUsdBalance(data.solana.usd)
    }
    changeUsd()

    //------------USDC change usd------------///
    async function changeUsdc() {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=usd-coin&vs_currencies=usd'
      )
      const data = await response.json()
      console.log('usdc usd  ' + data['usd-coin'].usd)
      setUsdcbalance$(data['usd-coin'].usd.toFixed(2))
    }
    changeUsdc()

    //------------USDT change usd------------///
    async function changeUsdt() {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd'
      )
      const data = await response.json()
      console.log('usdt usd  ' + data.tether.usd)
      setUsdtbalance$(data.tether.usd.toFixed(2))
    }
    changeUsdt()

    //------------Ageur change usd------------///
    async function changeAgeur() {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=ageur&vs_currencies=usd'
      )
      const data = await response.json()
      console.log('ageur usd  ' + data.ageur.usd)
      setAgeurbalance$(data.ageur.usd.toFixed(2))
    }
    changeAgeur()

    //------------Brz change usd------------///
    async function changeBrz() {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=brz&vs_currencies=usd'
      )
      const data = await response.json()
      console.log('brz usd  ' + data.brz.usd)
      setBrzbalance$(data.brz.usd.toFixed(2))
    }
    changeBrz()

    //------------Brz change usd------------///
    async function changeBilira() {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bilira&vs_currencies=usd'
      )
      const data = await response.json()
      console.log('bilira usd  ' + data.bilira.usd)
      setBilirabalance$(data.bilira.usd.toFixed(2))
    }
    changeBilira()

    //----USDC balance -----///

    const getUSDCBalance = async () => {
      const walletAddress = wallet?.publicKey
      console.log('publicKey')
      console.log(wallet?.publicKey)
      const tokenMintAddress = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
      const response = await axios({
        url: `https://api.mainnet-beta.solana.com`,
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: {
          jsonrpc: '2.0',
          id: 1,
          method: 'getTokenAccountsByOwner',
          params: [
            walletAddress,
            {
              mint: tokenMintAddress,
            },
            {
              encoding: 'jsonParsed',
            },
          ],
        },
      })

      if (
        Array.isArray(response?.data?.result?.value) &&
        response?.data?.result?.value?.length > 0 &&
        response?.data?.result?.value[0]?.account?.data?.parsed?.info
          ?.tokenAmount?.amount > 0 &&
        connected == true
      ) {
        Number(
          response?.data?.result?.value[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmount.toFixed(
            5
          )
        )
        setUsdbalance(
          response?.data?.result?.value[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmount.toFixed(
            5
          )
        )
        console.log(
          'USDC Balance:   ' +
            response?.data?.result?.value[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmount.toFixed(
              5
            )
        )
      } else {
        setUsdbalance(0)
        console.log(
          'USDC Balance:   ' +
            response?.data?.result?.value[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmount.toFixed(
              5
            )
        )
      }
    }
    getUSDCBalance()

    ///--- USDC Balance FINISH ---- /////

    //----USDT balance -----///

    const getUSDTBalance = async () => {
      const walletAddress = wallet?.publicKey
      const tokenMintAddress = 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB'
      const response = await axios({
        url: `https://api.mainnet-beta.solana.com`,
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: {
          jsonrpc: '2.0',
          id: 1,
          method: 'getTokenAccountsByOwner',
          params: [
            walletAddress,
            {
              mint: tokenMintAddress,
            },
            {
              encoding: 'jsonParsed',
            },
          ],
        },
      })

      // console.log(response.data.result.value[0].account.data.parsed.info.tokenAmount)

      if (
        Array.isArray(response?.data?.result?.value) &&
        response?.data?.result?.value?.length > 0 &&
        response?.data?.result?.value[0]?.account?.data?.parsed?.info
          ?.tokenAmount?.amount > 0 &&
        connected == true
      ) {
        Number(
          response?.data?.result?.value[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmount.toFixed(
            5
          )
        )
        setUsdtbalance(
          response?.data?.result?.value[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmount.toFixed(
            5
          )
        )
        console.log(
          'USDT Balance:   ' +
            response?.data?.result?.value[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmount.toFixed(
              5
            )
        )
      } else {
        setUsdtbalance(0)
        console.log(
          'USDT Balance:   ' +
            response?.data?.result?.value[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmount.toFixed(
              5
            )
        )
      }
    }
    getUSDTBalance()

    ///--- USDT Balance FINISH ---- /////

    //----Ageur balance -----///

    const getAgeurBalance = async () => {
      const walletAddress = wallet?.publicKey
      const tokenMintAddress = 'CbNYA9n3927uXUukee2Hf4tm3xxkffJPPZvGazc2EAH1'
      const response = await axios({
        url: `https://api.mainnet-beta.solana.com`,
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: {
          jsonrpc: '2.0',
          id: 1,
          method: 'getTokenAccountsByOwner',
          params: [
            walletAddress,
            {
              mint: tokenMintAddress,
            },
            {
              encoding: 'jsonParsed',
            },
          ],
        },
      })

      if (
        Array.isArray(response?.data?.result?.value) &&
        response?.data?.result?.value?.length > 0 &&
        response?.data?.result?.value[0]?.account?.data?.parsed?.info
          ?.tokenAmount?.amount > 0 &&
        connected == true
      ) {
        Number(
          response?.data?.result?.value[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmount.toFixed(
            5
          )
        )
        setAgeurbalance(
          response?.data?.result?.value[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmount.toFixed(
            5
          )
        )
        console.log(
          'Ageur Balance:   ' +
            response?.data?.result?.value[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmount.toFixed(
              5
            )
        )
      } else {
        setAgeurbalance(0)
        console.log(
          'Ageur Balance:   ' +
            response?.data?.result?.value[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmount.toFixed(
              5
            )
        )
      }
    }
    getAgeurBalance()

    ///--- Ageur Balance FINISH ---- /////

    //----Brz balance -----///

    const getBrzBalance = async () => {
      const walletAddress = wallet?.publicKey
      const tokenMintAddress = 'FtgGSFADXBtroxq8VCausXRr2of47QBf5AS1NtZCu4GD'
      const response = await axios({
        url: `https://api.mainnet-beta.solana.com`,
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: {
          jsonrpc: '2.0',
          id: 1,
          method: 'getTokenAccountsByOwner',
          params: [
            walletAddress,
            {
              mint: tokenMintAddress,
            },
            {
              encoding: 'jsonParsed',
            },
          ],
        },
      })

      // console.log(response.data.result.value[0].account.data.parsed.info.tokenAmount)

      if (
        Array.isArray(response?.data?.result?.value) &&
        response?.data?.result?.value?.length > 0 &&
        response?.data?.result?.value[0]?.account?.data?.parsed?.info
          ?.tokenAmount?.amount > 0 &&
        connected == true
      ) {
        Number(
          response?.data?.result?.value[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmount.toFixed(
            5
          )
        )
        setBrzbalance(
          response?.data?.result?.value[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmount.toFixed(
            5
          )
        )
        console.log(
          'BRZ Balance:   ' +
            response?.data?.result?.value[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmount.toFixed(
              5
            )
        )
      } else {
        setBrzbalance(0)
        console.log('BRZ Balance:   ' + 0)
      }
    }
    getBrzBalance()

    ///--- Brz Balance FINISH ---- /////

    //----BiLira balance -----///

    const getBiliraBalance = async () => {
      const walletAddress = wallet?.publicKey
      const tokenMintAddress = 'A94X2fRy3wydNShU4dRaDyap2UuoeWJGWyATtyp61WZf'
      const response = await axios({
        url: `https://api.mainnet-beta.solana.com`,
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: {
          jsonrpc: '2.0',
          id: 1,
          method: 'getTokenAccountsByOwner',
          params: [
            walletAddress,
            {
              mint: tokenMintAddress,
            },
            {
              encoding: 'jsonParsed',
            },
          ],
        },
      })

      if (
        Array.isArray(response?.data?.result?.value) &&
        response?.data?.result?.value?.length > 0 &&
        response?.data?.result?.value[0]?.account?.data?.parsed?.info
          ?.tokenAmount?.amount > 0 &&
        connected == true
      ) {
        Number(
          response?.data?.result?.value[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmount.toFixed(
            5
          )
        )
        setBilirabalance(
          response?.data?.result?.value[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmount.toFixed(
            5
          )
        )
      } else {
        setBilirabalance(0)
      }
    }
    getBiliraBalance()

    /* BiLira Balance FINISH */
    if (wallet?.publicKey == null) {
      setMybalance(0)
    }
    gelsolbalance()
    checkBalance()
  }, [wallet?.publicKey])

  const checkBalance = useCallback(async () => {
    if (!wallet?.publicKey) {
      throw new WalletNotConnectedError() && console.log('Wallet not connected')
      // eslint-disable-next-line no-unreachable
      setMybalance(0)
    }

    const walletBalance = await connection.getBalance(
      wallet?.publicKey,
      'confirmed'
    )

    const walletBalanceSOL = (walletBalance / LAMPORTS_PER_SOL).toLocaleString()
    setMybalance(walletBalanceSOL)
  }, [connection, wallet?.publicKey])
  checkBalance()
  let fromKeypair = Keypair.generate()

  const connectiontestnet = useRef(
    new Connection(clusterApiUrl('mainnet-beta'))
  )

  const testnetbalance = async () => {
    const testnetBalance = await connectiontestnet.current.getBalanceAndContext(
      fromKeypair.publicKey,
      'confirmed'
    )
  }

  return (
    <div className="relative min-h-screen md:flex">
      <Head>
        <title>Lagrange.fi</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex-1 text-xl font-bold bg-gradient-to-r from-light-theme-lagrangelight to-light-theme-lagrangedark">
        <TopBar />
     

   
<div className="pool0">
        
<span className="title">Account Balances</span>
 
 <table>
  <tr>
    <th></th>
    <th>Price</th>
    <th>Balances</th>
    <th>Value</th>
  </tr>
  <tr>
   <td >
   <div className="loqoword"><Image src={USDC}  alt="USDC" width={35} height={35} layout="fixed" /> <span>USDC</span> </div>
   </td>
    <td>${usdcbalance$}</td>
    <td>{usdbalance == undefined ? 0 : usdbalance}</td>
    <td>${isNaN(usdcbalance$c) ? 0.0 : usdcbalance$c}</td>
  </tr>
   <tr>
   <td >
   <div className="loqoword"><Image src={USDT}  alt="USDC" width={35} height={35} layout="fixed" />  <span> USDT  </span></div>
   </td>
    <td>${usdtbalance$}</td>
    <td>{usdtbalance == undefined ? 0 : usdtbalance}</td>
    <td>${isNaN(usdtbalance$c) ? 0.0 : usdtbalance$c}</td>
  </tr>
   <tr>
   <td >
   <div className="loqoword"><Image src={EURS}  alt="USDC" width={35} height={35} layout="fixed" />  <span>agEUR </span></div>
   </td>
    <td>${ageurbalance$}</td>
    <td>{ageurbalance == undefined ? 0 : ageurbalance}</td>
    <td>${isNaN(ageurbalance$c) ? 0.0 : ageurbalance$c}</td>
  </tr>
   <tr>
   <td >
   <div className="loqoword"><Image src={TRYB}  alt="USDC" width={35} height={35} layout="fixed" />  <span>TRYB </span> </div>
   </td>
    <td>${bilirabalance$}</td>
    <td>{bilirabalance == undefined ? 0 : bilirabalance}</td>
    <td>${isNaN(bilirabalance$c) ? 0.0 : bilirabalance$c}</td>
  </tr>
   <tr>
   <td >
   <div className="loqoword"><Image src={BRZ}  alt="USDC" width={35} height={35} layout="fixed" />  <span>BRZ </span> </div>
   </td>
    <td>${brzbalance$}</td>
    <td>{brzbalance == undefined ? 0 : brzbalance}</td>
    <td>${isNaN(brzbalance$c) ? 0.0 : brzbalance$c}</td>
  </tr>
  
</table>
 

 </div>



      

<div className="pool1">
        
<span className="title">Pools</span>
 
 <table>
  <tr>
    <th>Asset</th>
    <th>Rewards APR</th>
    <th>Total Pool Value</th>
    <th></th>
  </tr>
  <tr>
    <td className="td1">
   <div><Image src={BRZ}  alt="USDC" width={46} height={46} layout="fixed" /></div>
   <div className="img2"><Image src={USDC}  alt="USDC" width={46} height={46} layout="fixed" /></div>
    WBRZ/USDL
    </td>
    <td>--%</td>
    <td>$129.652.00</td>
    <td><button>Add Liquidity </button></td>
  </tr>
  <tr>
    <td className="td1">
    <div><Image  src={TRYB}  alt="USDC" width={46} height={46} layout="fixed" /></div>
    <div className="img2"><Image  src={USDC}  alt="USDC" width={46} height={46} layout="fixed" /></div>
    WBRZ/USDL
    </td>
    <td>--%</td>
    <td>$129.652.00</td>
    <td><button>Add Liquidity </button></td>
  </tr>
</table>
 

 </div>



 <div className="pool2">
 
<div className="titlediv">        
<span className="title">Your Liquidity</span>
<button>Claim Rewards</button>
</div>
 
 <table>
  <tr>
    <th>Pool</th>
    <th>Portion Amount</th>
    <th>Portion Value </th>
    <th>Unclaimed Rewards</th>
    <th>Action</th>
  </tr>
  <tr>
    <td className="td1">
   <div><Image src={BRZ}  alt="USDC" width={39} height={39} layout="fixed" /></div>
   <div className="img2"><Image src={USDC}  alt="USDC" width={39} height={39} layout="fixed" /></div>
    WBRZ/USDL
    </td>
    <td>0.0868</td>
    <td>8.1315 USD</td>
      <td className="td1">
   <div><Image src={BRZ}  alt="USDC" width={39} height={39} layout="fixed" /></div>
   <div className="img2"><Image src={USDC}  alt="USDC" width={39} height={39} layout="fixed" /></div>
    0.121 USD
    </td>
    <td><button>Remove</button></td>
  </tr>

</table>
 

 </div>
      


      </div>
    </div>
  )
}
export default Pools
