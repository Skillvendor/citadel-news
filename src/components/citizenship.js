import React from 'react';
import {
  isConnectedToBlockchain,
  initWeb3,
  isWeb3Ready,
  connectToBlockchain,
  isCitizen
} from "../models/blockchain";
import LoadingButton from '@mui/lab/LoadingButton';
import FingerprintIcon from '@mui/icons-material/Fingerprint';

export default class Citizenship extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loadingBlockchainData: false,
      citizenship: false,
      verifiedCitizenship: false,
      account: ''
    }
  }

  loadBlockchainData = async () => {
    if (!isWeb3Ready() || !isConnectedToBlockchain()) {
      return
    }

    const citizenship = await isCitizen()
    this.setState({ citizenship,  verifiedCitizenship: true})

    this.setState({ loadingBlockchainData: false })
  }

  connectWallet = async () => {
    this.setState({ loadingBlockchainData: true })
    let result = await initWeb3()
    if (!result) {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        return
    }

    let account = await connectToBlockchain()
    this.setState({ account })

    await this.loadBlockchainData()
  }

  getButtonColor = () => {
    if(!this.state.verifiedCitizenship) {
      return 'primary'
    }

    if(this.state.citizenship) {
      return 'success'
    }

    return 'error'
  }

  getButtonText = () => {
    if(this.state.account) {
      return this.state.account
    }

    return 'Verify Citizenship'
  }

  render() {
    return(
      <div>
        <LoadingButton
          loading={this.state.loadingBlockchainData}
          loadingPosition="start"
          startIcon={<FingerprintIcon />}
          variant="contained"
          color={this.getButtonColor()}
          onClick={() => this.connectWallet()}
        >
          { this.getButtonText() }
        </LoadingButton>
        {
          this.state.verifiedCitizenship ?
            this.state.citizenship ? (
              <h1> I AM CITIZEN </h1>
            ) : (
              <h1> I AM RAT</h1>
            ) :
            <h1> Press the button </h1>
        }
      </div>
    )
  }
}
