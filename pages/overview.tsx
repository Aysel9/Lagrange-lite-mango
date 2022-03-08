/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect, useState } from 'react'

import type { NextPage } from 'next'
import Image from 'next/image'
import TopBar from '../components/TopBar'
import EURS from '../public/coin/2989.png'
import JPYC from '../public/coin/9045.png'
import TRYB from '../public/coin/5181.png'
import BRZ from '../public/coin/4139.png'
import Head from 'next/head'

interface Props {
  data: any
}
const Overview: NextPage<Props> = (props) => {
  const [isExpanded, toggleExpansion] = useState(true)

  const { data } = props

  return (
    <div className="relative min-h-screen md:flex">
      <Head>
        <title>Lagrange.fi</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex-1 text-xl font-bold bg-gradient-to-r from-light-theme-lagrangelight to-light-theme-lagrangedark">
        <TopBar />
        <div className="pl-12 pr-12 rounded  pt-9">
          <div className="">
            <div className="bg-white">
              <h1 className="ml-8 text-4xl font-normal ">Market Overview</h1>
            </div>
            <table className="w-full p-2 bg-white shadow-lg">
              <thead>
                <tr>
                  <th className="text-left border place-self-center"></th>
                  <th className="py-2 text-left border place-self-center">
                    <div className="flex flex-wrap items-center self-center justify-center sm:text-2xl xs:text-xs">
                      <Image
                        src="https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
                        alt="USDC"
                        width={32}
                        height={32}
                        layout="fixed"
                      />
                      <p className="px-2 py-2">USDC</p>
                    </div>
                  </th>

                  <th className="text-left border place-self-center">
                    <div className="flex flex-wrap items-center self-center justify-center sm:text-2xl xs:text-xs">
                      <Image
                        src="https://assets.coingecko.com/coins/images/19479/small/agEUR.png?1635283566"
                        alt="agEUR"
                        width={32}
                        height={32}
                        layout="fixed"
                      />
                      <p className="px-2 py-2">agEUR</p>
                    </div>
                  </th>

                  <th className="text-left border">
                    <div className="flex flex-wrap items-center self-center justify-center sm:text-2xl xs:text-xs">
                      <Image
                        src="https://s2.coinmarketcap.com/static/img/coins/64x64/5181.png"
                        alt="TRYB"
                        width={32}
                        height={32}
                        layout="fixed"
                      />
                      <p className="px-2 py-2">TRYB</p>
                    </div>
                  </th>
                  <th className="text-left border">
                    <div className="flex flex-wrap items-center self-center justify-center sm:text-2xl xs:text-xs">
                      <Image
                        src="https://s2.coinmarketcap.com/static/img/coins/64x64/4139.png"
                        alt="BRZ"
                        width={32}
                        height={32}
                        layout="fixed"
                      />
                      <p className="px-2 py-2">BRZ</p>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="grid px-2 py-2 text-left border justify-items-center">
                    <div className="flex flex-wrap items-center self-center justify-center sm:text-2xl xs:text-xs">
                      <Image
                        src="https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
                        alt="USDC"
                        width={32}
                        height={32}
                      />
                      <p className="px-2 py-2">USDC</p>
                    </div>
                  </td>
                  <td className="border">
                    <p className="text-center sm:text-xl xs:text-xs">-</p>
                  </td>

                  <td className="border">
                    <p className="text-center sm:text-xl xs:text-xs">1.11</p>
                  </td>

                  <td className="border">
                    <p className="text-center sm:text-xl xs:text-xs">1.42</p>
                  </td>
                  <td className="border">
                    <p className="text-center sm:text-xl xs:text-xs">2.18</p>
                  </td>
                </tr>

                <tr>
                  <td className="grid py-2 text-left border justify-items-center">
                    <div className="flex flex-wrap items-center self-center justify-center sm:text-2xl xs:text-xs">
                      <Image
                        src="https://assets.coingecko.com/coins/images/19479/small/agEUR.png?1635283566"
                        alt="agEUR"
                        width={32}
                        height={32}
                      />
                      <p className="px-2 py-2">agEUR</p>
                    </div>
                  </td>
                  <td className="border">
                    <p className="text-center sm:text-xl xs:text-xs">2.56</p>
                  </td>

                  <td className="border">
                    <p className="text-center sm:text-xl xs:text-xs">-</p>
                  </td>

                  <td className="border">
                    <p className="text-center sm:text-xl xs:text-xs">0.58</p>
                  </td>
                  <td className="border">
                    <p className="text-center sm:text-xl xs:text-xs">0.97</p>
                  </td>
                </tr>

                <tr>
                  <td className="grid py-2 text-left border justify-items-center">
                    <div className="flex flex-wrap items-center self-center justify-center sm:text-2xl xs:text-xs">
                      <Image
                        src="https://s2.coinmarketcap.com/static/img/coins/64x64/5181.png"
                        alt="TRYB"
                        width={32}
                        height={32}
                      />
                      <p className="px-2 py-2">TRYB</p>
                    </div>
                  </td>
                  <td className="border">
                    <p className="text-center sm:text-xl xs:text-xs">0.28</p>
                  </td>

                  <td className="border">
                    <p className="text-center sm:text-xl xs:text-xs">2.52</p>
                  </td>

                  <td className="border">
                    <p className="text-center sm:text-xl xs:text-xs">-</p>
                  </td>
                  <td className="border">
                    <p className="text-center sm:text-xl xs:text-xs">1.91</p>
                  </td>
                </tr>
                <tr>
                  <td className="grid py-2 text-left border justify-items-center">
                    <div className="flex flex-wrap items-center self-center justify-center sm:text-2xl xs:text-xs">
                      <Image
                        src="https://s2.coinmarketcap.com/static/img/coins/64x64/4139.png"
                        alt="BRZ"
                        width={32}
                        height={32}
                      />
                      <p className="px-2 py-2">BRZ</p>
                    </div>
                  </td>
                  <td className="border">
                    <p className="text-center sm:text-xl xs:text-xs">1.11</p>
                  </td>

                  <td className="border">
                    <p className="text-center sm:text-xl xs:text-xs">2.56</p>
                  </td>

                  <td className="border">
                    <p className="text-center sm:text-xl xs:text-xs">0.98</p>
                  </td>
                  <td className="border">
                    <p className="text-center sm:text-xl xs:text-xs">-</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Overview
