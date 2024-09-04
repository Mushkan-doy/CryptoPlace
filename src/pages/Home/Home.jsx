import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");

  const handleInput = (event) => {
    setInput(event.target.value);
    if(event.target.value === ""){
        setDisplayCoin(allCoin);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const filteredCoin = await allCoin.filter((coin) => {
      return coin.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoin(filteredCoin);
  };

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br /> Crypto MarketPlace
        </h1>
        <p>
          Welcome to the world's largest cryptocurrency marketplace. Sign up to
          explore more about cryptos.
        </p>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            list="coinlist"
            placeholder="Search crypto...."
            value={input}
            required
            onChange={handleInput}
          />
          <datalist id="coinlist">
            {allCoin.map((coin, index) => (<option key={index} value={coin.name}/>))}
          </datalist>
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className="market-cap">Market Cap</p>
        </div>
        {displayCoin &&
          displayCoin.slice(0, 10).map((coin, index) => (
            <Link to={`/coin/${coin.id}`} className="table-layout" key={index}>
              <p>{coin.market_cap_rank}</p>
              <div cl>
                <img src={coin.image} alt={coin.name} />
                <p>{coin.name + " - " + coin.symbol}</p>
              </div>
              <p>
                {currency.symbol} {coin.current_price.toLocaleString()}
              </p>
              <p
                className={
                  coin.price_change_percentage_24h > 0 ? "green" : "red"
                }
              >
                {Math.floor(coin.price_change_percentage_24h * 100) / 100}
              </p>
              <p className="market-cap">
                {currency.symbol} {coin.market_cap.toLocaleString()}
              </p>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Home;
