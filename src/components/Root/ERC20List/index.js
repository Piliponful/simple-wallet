import React, { useState, useEffect } from 'react'
import abi from 'erc-20-abi'
import { ethers, utils } from 'ethers'

export const ERC20List = ({ wallet, provider, erc20Balances, setErc20Balances }) => {
  const [latestERC20, setLatestERC20] = useState('')
  const [addresses, setAddresses] = useState([])

  const fetchBalance = async ({ address, token }) => {
    const contract = new ethers.Contract(token, abi, provider)
    const balance = await contract.balanceOf(address)
    const symbol = await contract.symbol()

    return { formatted: utils.formatEther(balance), symbol }
  }

  useEffect(() => {
    if (addresses.length === 0) {
      return
    }

    fetchBalance({
      address: wallet.address,
      token: addresses[addresses.length - 1]
    })
      .then(balance => {
        setErc20Balances([...erc20Balances, { address: addresses[addresses.length - 1], ...balance }])
      })
  }, [addresses.length])

  return (
    <div>
      <label>ecr20 address <input type='text' onChange={e => setLatestERC20(e.target.value)} /></label>
      <button onClick={() => setAddresses([...addresses, latestERC20])}>add new token</button>
      <br />
      <ul>
        {erc20Balances.map(balance => (
          <li key={balance.symbol}>{balance.symbol}: {balance.formatted}</li>
        ))}
      </ul>
    </div>
  )
}
