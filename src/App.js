import React, { useState, useEffect } from "react";
import { connectWallet, getBalance } from "./utils/wallet";

function App() {
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);

  const handleConnect = async () => {
    try {
      const addr = await connectWallet();
      setAddress(addr);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (address) {
      getBalance(address).then((bal) => {
        setBalance(bal);
      }).catch((err) => {
        setError(err.message);
      });
    }
  }, [address]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Crypto Wallet Connector</h1>
      {!address && (
        <button onClick={handleConnect}>Connect MetaMask</button>
      )}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {address && (
        <div>
          <p><strong>Address:</strong> {address}</p>
          {balance !== null ? (
            <p><strong>ETH Balance:</strong> {balance} ETH</p>
          ) : (
            <p>Loading balance...</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
