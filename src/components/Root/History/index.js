import React, { useState, useEffect } from 'react'
import { providers, utils } from 'ethers'
import { format } from 'date-fns'

const etherscankey = '8WBREAN4H3QJ6H2RJ7T3FX379JVQSH2BUS'

export const History = ({ wallet }) => {
  const [history, setHistory] = useState([])

  useEffect(() => {
    if (!wallet || history.length > 0) {
      return
    }

    const etherscanProvider = new providers.EtherscanProvider('sepolia', etherscankey)
    const res = etherscanProvider.getHistory(wallet.address)
    res.then(txHistory => setHistory(txHistory))
  }, [wallet?.address])

  if (!wallet) {
    return null
  }

  return (
    <ul>
      {history.map(i => <li key={i.timestamp}>to: {i.to}, amount: {utils.formatEther(i.value)}, date: {format(new Date(i.timestamp * 1000), 'MM/dd/yyyy')}</li>)}
    </ul>
  )
}
