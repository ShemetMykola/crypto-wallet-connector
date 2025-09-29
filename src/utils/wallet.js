import { ethers } from "ethers";

export async function connectWallet() {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed");
  }
  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
  return accounts[0];
}

export async function getBalance(address) {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed");
  }
  const provider = new ethers.BrowserProvider(window.ethereum);
  const balanceBigInt = await provider.getBalance(address);
  return ethers.formatEther(balanceBigInt);
}
