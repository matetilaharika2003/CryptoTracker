import React, { useContext, useState } from 'react'
import { Coins, Search } from 'lucide-react';
import { CryptoContext } from '../context/CryptoContext'

const Navbar = () => {

    const [input, setInput] = useState("");
    const [filteredCoins, setFilteredCoins] = useState([]);
    const { cryptoList = [], setSearchTerm } = useContext(CryptoContext);

    const searchHandler = (event) => {
        event.preventDefault();
        setSearchTerm(input);
        setFilteredCoins([]);
    }

    const inputHandler = (event) => {
        const value = event.target.value;
        setInput(value);

        if (value === "") {
            setSearchTerm("");
            setFilteredCoins([]);
        }
        else {
            const suggestions = cryptoList.filter((coin) => coin.name.toLowerCase().includes(value.toLowerCase()))
            setFilteredCoins(suggestions.slice(0, 5));
        }
    }

    return (
        <nav className=' flex flex-wrap md:flex-nowrap items-center justify-between gap-4 px-[5%] md:px[8%] lg:px-[10%]
        py-5 bg-gray-900/80 backdrop-blur-md border-b border-gray-700/30 sticky top-0 z-50'>
            <a href="/" className=' order-1 flex-shrink-0 flex items-center gap-2 hover:scale-105
             transition-transform'>
                <Coins className=' w-8 h-8 text-emerald-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.6)]' />
                <span className=' text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text
                 text-transparent'>
                    CryptoTracker
                </span>
            </a>

            {/* SEARCH */}
            <form onSubmit={searchHandler} className=' order-3 w-full md:order-2 md:w-auto flex-1 max-w-2xl
             mx-0 md:mx-4 relative'>
                <div className=' relative group'>
                    <div className=' absolute -inset-0.5 bg-gradient-to-r from-emerald-600/40 to-cyan-500/40 rounded-full
                     blur opacity-30 group-hover:opacity-50 transition duration-300'/>

                    <div className=' relative flex items-center'>
                        <input type="text" placeholder='Search Crypto...' value={input} onChange={inputHandler} required
                            className=' w-full px-6 py-3 bg-gray-800/60 border border-gray-600/30 rounded-full
                          focus:outline-none focus:ring-2 focus:ring-emerald-500/50 placeholder-gray-400 text-gray-200
                           backdrop-blur-sm' />

                        <button type='submit' className=' z-10 relative right-2 top-1/2 -translate-y-1/2 px-4
                           py-1.5 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-full
                            hover:scale-105 transition-all'>
                            <Search className=' w-4 h-4 pointer-events-none' />
                        </button>
                    </div>
                </div>

                {filteredCoins.length > 0 && (
                    <ul className=' absolute w-full bg-gray-800/95 border border-gray-700 mt-2 rounded-lg
                     shadow-xl z-10 backdrop-blur-md'>
                        {filteredCoins.map((coin, idx) => (
                            <li key={idx} className=' px-4 py-2 hover:bg-emerald-600/30 cursor-pointer text-gray-100'
                                onClick={() => {
                                    setInput(coin.name);
                                    setFilteredCoins([]);
                                }}>
                                {coin.name}
                            </li>
                        ))}
                    </ul>
                )}
            </form>
        </nav>
    )
}

export default Navbar