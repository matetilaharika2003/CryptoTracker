import { createContext, useEffect, useState } from "react";

export const CryptoContext = createContext();

const CryptoContextProvider = (props) => {
    const [cryptoList, setCryptoList] = useState([]);
    const [filteredCryptos, setFilteredCryptos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentCurrency, setCurrentCurrency] = useState({
        name: "usd",
        symbol: "$",
    })

    const fetchCryptoData = async () => {
        const options = {
            method: 'GET',
            headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-AnBWaS7PvDtHUrGcEzUhXCKf' }
        };

        try {
            const res = await fetch(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currentCurrency.name}`,
                options
            );
            const data = await res.json();
            setCryptoList(data);
        } catch (err) {
            console.error("Failed to fetch crypto data:", err);
        }
    }

    // RE FETCH WHEN CURRENCY CHANGES
    useEffect(() => {
        fetchCryptoData();
    }, [currentCurrency]);

    // REFILTER WHEN RAW LIST OR SEARCH TERM CHANGES
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredCryptos(cryptoList);
        }
        else {
            setFilteredCryptos(
                cryptoList.filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
            )
        }
    }, [cryptoList, searchTerm]);


    const contextValue = {
        cryptoList,
        filteredCryptos,
        currentCurrency,
        setCurrentCurrency,
        searchTerm,
        setSearchTerm,
    }

    return (
        <CryptoContext.Provider value={contextValue}>
            {props.children}
        </CryptoContext.Provider>
    )
}

export default CryptoContextProvider