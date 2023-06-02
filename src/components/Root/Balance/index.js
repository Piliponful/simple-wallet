import React, { useState, useEffect } from 'react'
import { utils } from 'ethers'

export const Balance = ({ provider, wallet }) => {
  const [balance, setBalance] = useState('0')

  useEffect(() => {
    if (!wallet) {
      return
    }

    provider.getBalance(wallet.address)
      .then(balance => setBalance(utils.formatEther(balance)))
  }, [wallet?.address])

  return (
    <p>balance: <span>{balance}</span></p>
  )
}
