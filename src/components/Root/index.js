import React, { useState } from 'react'
import { getDefaultProvider, Wallet } from 'ethers'

import { History } from './History'
import { SendTokens } from './SendTokens'
import { ERC20List } from './ERC20List'
import { Balance } from './Balance'

const provider = getDefaultProvider('sepolia', { alchemy: 'lkffjIS31F1CO6xtEEF7r4URx9cL6696' })

export const Root = () => {
  const [wallet, setWallet] = useState('')
  const [privateKey, setPrivateKey] = useState('')
  const [erc20Balances, setErc20Balances] = useState([])

  return (
    <div>
      <Balance provider={provider} wallet={wallet} />
      <ERC20List provider={provider} wallet={wallet} setErc20Balances={setErc20Balances} erc20Balances={erc20Balances} />
      <label>private key</label>
      <input type='text' onChange={e => setPrivateKey(e.target.value)} />
      <button onClick={() => setWallet(new Wallet(privateKey, provider))}>load wallet</button>
      <br />
      <SendTokens provider={provider} wallet={wallet} erc20Balances={erc20Balances} />
      <br />
      <History wallet={wallet} />
    </div>
  )
}
