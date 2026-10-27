const fields = [
  { label: "Location", placeholder: "Address, City Or Zip" },
  { label: "Date/Duration", placeholder: "Anytime/ 3 Days" },
  { label: "Budget", placeholder: "$0-$3000" },
  { label: "People", placeholder: "5-10" },
];

export function SearchBar() {
  return (
    <div className="grid h-[75px] grid-cols-2 lg:grid-cols-[repeat(4,1fr)_200px]">
      {fields.map((field) => (
        <div
          key={field.label}
          className="flex flex-col justify-center border-r border-white/40 bg-white/40 px-6 backdrop-blur-[2px]"
        >
          <p className="text-[17px] font-semibold text-white">{field.label}</p>
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
        className="col-span-2 flex items-center justify-center bg-brand text-[17px] font-semibold text-white transition-colors hover:bg-brand/90 max-lg:h-14 lg:col-span-1"
      >
        Search
      </button>
    </div>
  );
}
