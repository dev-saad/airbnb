import Image from "next/image";
import {
  CashIcon,
  GlobeAltIcon,
  MenuIcon,
  SearchIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { useRouter } from "next/dist/client/router";

const Header = ({ placeholder }) => {
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [numOfChildren, setNumOfChildren] = useState("0");
  const [numOfAdults, setNumOfAdults] = useState("1");
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const router = useRouter();

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const search = (e) => {
    e.preventDefault();
    searchInput &&
      router.push({
        pathname: "/search",
        query: {
          location: searchInput,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          numOfChildren,
          numOfAdults,
          maxPrice,
          minPrice,
        },
      });
    setSearchInput("");
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10 md:shadow-sm">
      <div
        className="relative flex items-center h-10 cursor-pointer my-auto"
        onClick={() => router.push("/")}
      >
        <Image
          src="https://links.papareact.com/qd3"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>
      <form className="flex items-center md:border-2 rounded-full">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder={placeholder || "Start your search"}
          className="pl-5 bg-transparent outline-none flex-grow text-sm text-gray-600 placeholder-gray-400 h-full"
        />
        <button type="submit" onClick={search}>
          <SearchIcon className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2 my-2" />
        </button>
      </form>
      <div className="flex items-center justify-end space-x-4 text-gray-500">
        <p className="hidden md:inline-flex cursor-pointer">Become a host</p>
        <GlobeAltIcon className="h-6" />
        <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
          <MenuIcon className="h-6" />
          <UserCircleIcon className="h-6" />
        </div>
      </div>

      {searchInput && (
        <div className="flex flex-col col-span-3 mx-auto mt-5">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#fd5b61"]}
            onChange={handleSelect}
          />
          <div className="flex items-center border-b mb-1 children:flex children:justify-between children:items-center children:flex-1 children:px-5 children:py-3 children:bg-gray-50 space-x-2 my-2">
            <div>
              <h2 className="text-xl flex-grow font-semibold">Adults</h2>
              <UsersIcon className="h-5" />
              <input
                value={numOfAdults}
                onChange={(e) => setNumOfAdults(e.target.value)}
                min={1}
                type="number"
                className="w-12 pl-2 text-lg outline-none text-red-400"
              />
            </div>
            <div>
              <h2 className="text-xl flex-grow font-semibold">Children</h2>
              <UsersIcon className="h-5" />
              <input
                value={numOfChildren}
                onChange={(e) => setNumOfChildren(e.target.value)}
                min={0}
                type="number"
                className="w-12 pl-2 text-lg outline-none text-red-400"
              />
            </div>
          </div>
          <div className="flex items-center border-b mb-1 children:flex children:justify-between children:items-center children:flex-1 children:px-5 children:py-3 children:bg-gray-50 space-x-2 my-2">
            <div>
              <h2 className="text-xl flex-grow font-semibold">Min Price</h2>
              <CashIcon className="h-5" />
              <input
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                min={0}
                type="number"
                className="w-12 pl-2 text-lg outline-none text-red-400"
              />
            </div>
            <div>
              <h2 className="text-xl flex-grow font-semibold">Max Price</h2>
              <CashIcon className="h-5" />
              <input
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                min={10}
                type="number"
                className="w-12 pl-2 text-lg outline-none text-red-400"
              />
            </div>
          </div>
          <div className="flex space-x-1">
            <button
              className="flex-grow rounded-md text-gray-500 hover:bg-gray-100 hover:text-black transition-all duration-200 ease-out h-full py-2"
              onClick={() => setSearchInput("")}
            >
              Cancel
            </button>
            <button
              className="flex-grow rounded-md text-red-400 hover:bg-red-400 hover:text-white transition-all duration-200 ease-out h-full py-2"
              onClick={search}
            >
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
