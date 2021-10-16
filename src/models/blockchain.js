import Web3 from 'web3';
import Abi from "../contracts/identity.json";

let contractAddress = '0x86357A19E5537A8Fba9A004E555713BC943a66C0'

let web3 = undefined
let account = undefined
let contract = undefined

export function isWeb3Ready() {
  return web3 !== undefined
}

export async function initWeb3() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum)
    await window.ethereum.enable()
    return true
  }
  else if (window.web3) {
    web3 = new Web3(window.web3.currentProvider)
    return true
  }

  return false
}

export const connectToBlockchain = async () => {
  const accounts = await web3.eth.getAccounts()

  contract = new web3.eth.Contract(Abi, contractAddress)
  account = accounts[0]

  return account
}

export const isConnectedToBlockchain = () => {
  return contract !== undefined && account !== undefined
}

export const getBalance = async () => await contract.methods.balanceOf(account).call()

export const isCitizen = async () => {
  const balance = await getBalance()

  return balance > 0
}
