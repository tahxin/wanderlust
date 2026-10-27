const fields = [
  { label: "Location", placeholder: "Address, City Or Zip" },
  { label: "Date/Duration", placeholder: "Anytime/ 3 Days" },
  { label: "Budget", placeholder: "$0-$3000" },
  { label: "People", placeholder: "5-10" },
];

export function SearchBar() {
  return (
    <div className="grid min-h-[75px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(4,1fr)_200px] w-full">
      {fields.map((field) => (
        <div
          key={field.label}
          className="flex flex-col justify-center border-b sm:border-b-0 sm:border-r border-white/40 bg-white/40 px-6 py-3.5 lg:py-0 backdrop-blur-[2px]"
        >
          <p className="text-[15px] sm:text-[17px] font-semibold text-white">{field.label}</p>
          <input
            type="text"
            placeholder={field.placeholder}
            spellCheck={false}
            className="mt-0.5 w-full bg-transparent text-[14px] text-white/90 placeholder:text-white/75 outline-none"
          />
        </div>
      ))}
      <button
        type="button"
        className="col-span-1 sm:col-span-2 lg:col-span-1 flex h-14 lg:h-auto items-center justify-center bg-brand text-[17px] font-semibold text-white transition-colors hover:bg-brand/90"
      >
        Search
      </button>
    </div>
  );
}
