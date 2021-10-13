import React from 'react';
import {
  isConnectedToBlockchain,
  initWeb3,
  isWeb3Ready,
  connectToBlockchain,
  isCitizen
} from "../models/blockchain"

export default class Citizenship extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loadingBlockchainData: false,
      citizenship: false
    }
  }

  loadBlockchainData = async () => {
    if (!isWeb3Ready() || !isConnectedToBlockchain()) {
      return
    }

    this.setState({ loadingBlockchainData: true })

    const citizenship = await isCitizen()
    this.setState({ citizenship })

    this.setState({ loadingBlockchainData: false })
  }

  connectWallet = async () => {
    let result = await initWeb3()
    if (!result) {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        return
    }

    await connectToBlockchain()

    await this.loadBlockchainData()
  }

  render() {
    return(
      <div>
        <button onClick={() => this.connectWallet()}> Connect Wallet </button>
        {
          this.state.citizenship ? (
            <h1> I AM CITIZEN </h1>
          ) : (
            <h1> I AM RAT</h1>
          )
        }
      </div>
    )
  }
}
