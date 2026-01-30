
import React, { useState, useEffect } from 'react';

const Home: React.FC = () => {
  const [rateText, setRateText] = useState<string>("Loading...");
  const [currency, setCurrency] = useState("EUR");
  const [lastUpdate, setLastUpdate] = useState("");
  const [availableRates, setAvailableRates] = useState<Record<string, number>>({});
  const tg = window.Telegram?.WebApp;

  // Daftar lengkap mata uang asli Anda
  const forexList = [
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "British Pound" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "NZD", name: "New Zealand Dollar" },
    { code: "CHF", name: "Swiss Franc" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "IDR", name: "Indonesian Rupiah" }
  ];

  // Daftar komoditas tambahan
  const commodityList = [
    { code: "XAU", name: "Gold (Emas)" },
    { code: "XAG", name: "Silver (Perak)" },
    { code: "WTI", name: "WTI Oil" },
    { code: "BRN", name: "Brent Oil" }
  ];

  const fetchRates = async () => {
    try {
      const response = await fetch(`https://open.er-api.com/v6/latest/USD`);
      const data = await response.json();
      
      if (data.result === "success") {
        setAvailableRates(data.rates);
        updateDisplayRate(currency, data.rates);
        setLastUpdate(new Date().toLocaleTimeString());
      }
    } catch (error) {
      setRateText("Connection Error");
    }
  };

  const updateDisplayRate = (selected: string, rates: Record<string, number>) => {
    const value = rates[selected];
    if (!value) {
      setRateText("Data Not Available");
      return;
    }

    const commodities = ["XAU", "XAG", "WTI", "BRN"];
    if (commodities.includes(selected)) {
      // Untuk komoditas: 1 unit dalam USD (1/rate)
      const priceInUSD = 1 / value;
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 4
      }).format(priceInUSD);
      setRateText(`${selected} = ${formatted}`);
    } else {
      // Untuk Forex: Berapa unit per 1 USD
      const formatted = selected === "IDR" 
        ? new Intl.NumberFormat('id-ID').format(value) 
        : value.toFixed(5);
      setRateText(`1 USD = ${formatted} ${selected}`);
    }
  };

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (Object.keys(availableRates).length > 0) {
      updateDisplayRate(currency, availableRates);
    }
  }, [currency]);

  const handleSupportClick = (url: string) => {
    if (tg?.HapticFeedback) tg.HapticFeedback.impactOccurred('medium');
    window.open(url, '_blank');
  };

  // Filter komoditas: Hanya tampilkan jika kodenya ada di API
  const activeCommodities = commodityList.filter(item => availableRates[item.code]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Support Header */}
      <div className="bg-orange-50 dark:bg-orange-900/20 border border-dashed border-orange-300 dark:border-orange-700 p-4 rounded-2xl text-center">
        <p className="text-[11px] text-orange-700 dark:text-orange-300 mb-2 font-medium">Help us keep this bot free! ⚡ Support server costs.</p>
        <button 
          onClick={() => handleSupportClick('https://otieu.com/4/10404724')}
          className="w-full bg-[#e67e22] text-white text-[11px] font-bold py-2 rounded-xl active:scale-95 transition-all"
        >
          Support Now 🚀
        </button>
      </div>

      {/* Live Rate Card */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-800 dark:text-gray-100 text-sm">
              💱 Live Exchange Rate
            </h3>
            <span className="text-[9px] text-gray-400 font-mono">{lastUpdate}</span>
          </div>

          <select 
            value={currency} 
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#1b5e20] transition-all"
          >
            <optgroup label="Forex Major">
              {forexList.map(item => (
                <option key={item.code} value={item.code}>{item.code} - {item.name}</option>
              ))}
            </optgroup>
            
            {activeCommodities.length > 0 && (
              <optgroup label="Commodities (Available)">
                {activeCommodities.map(item => (
                  <option key={item.code} value={item.code}>{item.code} - {item.name}</option>
                ))}
              </optgroup>
            )}
          </select>

          <div className="py-6 text-center bg-gray-50 dark:bg-gray-900/40 rounded-2xl border border-gray-100 dark:border-gray-800">
            <div className="text-2xl font-black text-[#1b5e20] dark:text-green-400 tracking-tight">
              {rateText}
            </div>
            <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-widest font-bold">USD Base Price</p>
          </div>
        </div>
      </div>

      {/* Support Developer Card */}
      <div className="bg-white dark:bg-gray-800 p-5 rounded-3xl border-l-4 border-yellow-500 shadow-sm flex items-center justify-between">
        <div className="flex-1 pr-4">
          <h4 className="text-sm font-bold text-gray-800 dark:text-gray-100">Support Our Bot 🚀</h4>
          <p className="text-[10px] text-gray-500 leading-tight mt-1">Your click keeps this computing service online and free for everyone!</p>
        </div>
        <button 
          onClick={() => handleSupportClick('https://otieu.com/4/10406158')}
          className="bg-yellow-500 text-white text-[10px] font-black px-4 py-2 rounded-xl active:scale-95 transition-all whitespace-nowrap"
        >
          KEEP IT FREE
        </button>
      </div>

      {/* Grid Features */}
      <div className="grid grid-cols-2 gap-4">
        <div onClick={() => handleSupportClick('https://www.forexhomeexpert.com/2024/11/how-to-create-simple-multi-currency.html')} className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center cursor-pointer active:scale-95 transition-all">
          <span className="text-2xl mb-2">💡</span>
          <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300">Latest Insights</span>
        </div>
        <div onClick={() => handleSupportClick('https://www.forexhomeexpert.com/p/forex-calculators.html')} className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center cursor-pointer active:scale-95 transition-all">
          <span className="text-2xl mb-2">📏</span>
          <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300">Trading Tools</span>
        </div>
      </div>

      {/* Share Button */}
      <button 
        onClick={() => handleSupportClick('https://t.me/share/url?url=https://t.me/Roberto3RJfxbot/fhe&text=Cek Smart Forex Calculator ini! Sangat berguna untuk trading harian! 🚀')}
        className="w-full bg-gradient-to-br from-[#2ecc71] to-[#27ae60] text-white font-bold py-4 rounded-2xl shadow-xl shadow-green-100 dark:shadow-none flex items-center justify-center space-x-2 active:scale-95 transition-all"
      >
        <span>📢</span>
        <span className="text-sm">Share with Trader Friends</span>
      </button>

      {/* Footer Ads */}
      <div className="pt-4 border-t border-gray-100 dark:border-gray-800 text-center">
        <h5 className="text-[11px] font-bold text-gray-700 dark:text-gray-300">Maintenance Support 🛠️</h5>
        <button 
          onClick={() => handleSupportClick('https://otieu.com/4/10404679')}
          className="text-blue-500 text-[12px] font-bold mt-1 hover:underline"
        >
          [ Support Developer ]
        </button>
      </div>

      <div className="text-center pb-8">
        <p className="text-[10px] text-gray-400 font-medium">&copy; 2026 FOREX HOME EXPERT | MANTAP MENTONG!</p>
      </div>
    </div>
  );
};

export default Home;
