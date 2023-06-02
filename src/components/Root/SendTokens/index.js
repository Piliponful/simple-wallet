import React, { useState } from 'react'
import { ethers, utils } from 'ethers'
import Select from 'react-select'
import abi from 'erc-20-abi'

export const SendTokens = ({ wallet, provider, erc20Balances }) => {
  const [addressTo, setAddressTo] = useState('')
  const [amount, setAmount] = useState('0')
  const [selectedToken, setSelectedToken] = useState({ value: 'ETH', label: 'ETH' })

  const sendTransaction = async () => {
    if (selectedToken.value === 'ETH') {
      const walletSigner = wallet.connect(provider)
      const gasPrice = provider.getGasPrice()
      const gasLimit = '0x100000'

      const tx = {
        from: wallet.address,
        to: addressTo,
        value: utils.parseEther(amount),
        nonce: provider.getTransactionCount(wallet.address, 'latest'),
        gasLimit: utils.hexlify(gasLimit),
        gasPrice
      }

      await walletSigner.sendTransaction(tx)
      window.alert('tx submited')
    } else {
      console.log('here')
      const contract = new ethers.Contract(selectedToken.address, abi, wallet)
      await contract.transfer(addressTo, utils.parseEther(amount))
      window.alert('tx submited')
    }
  }

  const options = [
    { value: 'ETH', label: 'ETH' },
    ...erc20Balances.map(i => ({ value: i.symbol, label: i.symbol, address: i.address }))
  ]

  return (
    <div>
      <h3>Send tokens to someone</h3>
      <Select
        value={selectedToken}
        onChange={selectedOption => setSelectedToken(selectedOption)}
        options={options}
      />
      <label>address: </label><input type='text' value={addressTo} onChange={e => setAddressTo(e.target.value)} />
      <label>amount: </label><input type='number' value={amount} onChange={e => setAmount(e.target.value)} />
      <button onClick={sendTransaction}>send</button>
    </div>
  )
}
