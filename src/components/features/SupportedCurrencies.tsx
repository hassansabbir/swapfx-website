import React from "react";

export const SupportedCurrencies = () => {
  const currencies = [
    { code: "USD", name: "US DOLLAR" },
    { code: "EUR", name: "EURO" },
    { code: "GBP", name: "BRITISH POUND" },
    { code: "JPY", name: "JAPANESE YEN" },
    { code: "CAD", name: "CANADIAN DOLLAR" },
    { code: "AUD", name: "AUSSIE DOLLAR" },
    { code: "MXN", name: "MEXICAN PESO" },
    { code: "CHF", name: "SWISS FRANC" },
    { code: "...", name: "MORE" },
  ];

  return (
    <div className="space-y-8 mt-16 pb-16">
      <div className="flex justify-between items-center px-2">
        <h3 className="text-[1.5rem] font-bold text-slate-800">
          Supported Currencies
        </h3>
        <span className="px-3 py-1 bg-[#E0F7F7] text-[#1ACCC9] text-[0.75rem] font-bold rounded-full">
          20+ Countries
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {currencies.map((currency, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm border border-slate-50 flex flex-col items-center justify-center text-center space-y-1 hover:shadow-md transition-all cursor-pointer group"
          >
            <span className="text-[1.2rem] font-bold text-slate-800 group-hover:text-[#09A6A4] transition-colors">
              {currency.code}
            </span>
            <span className="text-[0.7rem] font-medium text-slate-400 uppercase tracking-wider">
              {currency.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
