import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/dist/client/router";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";
import Response from "../Response";
import { flushLayout } from "framer-motion";
import { useEffect, useState } from "react";

const Search = ({ hotelsDetails }) => {
  const router = useRouter();
  const {
    location,
    startDate,
    endDate,
    numOfChildren,
    numOfAdults,
    minPrice,
    maxPrice,
  } = router.query;
  const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
  const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
  const range = `${formattedStartDate} - ${formattedEndDate}`;
  const hotels = hotelsDetails.data.body.searchResults.results;
  const [filter, setFilter] = useState("PRICE");

  useEffect(() => {
    filter &&
      router.push({
        pathname: "/search",
        query: {
          ...router.query,
          filter,
        },
      });
  }, [filter]);

  console.log(hotels);

  return (
    <div className="overflow-x-hidden">
      <Header
        placeholder={`${location} | ${range} | ${numOfChildren} children | ${numOfAdults} adults`}
      />
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            300+ Stays - {range} - for {numOfAdults} adults and {numOfChildren}{" "}
            children
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in{" "}
            {location
              .toLowerCase()
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
              .join(" ")}
          </h1>
          <div className="hidden lg:flex mb-5 text-gray-800 whitespace-nowrap flex-wrap">
            <p className="button" onClick={() => setFilter("BEST_SELLER")}>
              Best Seller
            </p>
            <p
              className="button"
              onClick={() => setFilter("STAR_RATING_HIGHEST_FIRST")}
            >
              Highest Star Rating
            </p>
            <p
              className="button"
              onClick={() => setFilter("STAR_RATING_LOWEST_FIRST")}
            >
              Lowest Star Rating
            </p>
            <p
              className="button"
              onClick={() => setFilter("DISTANCE_FROM_LANDMARK")}
            >
              Distance From Landmark
            </p>
            <p className="button" onClick={() => setFilter("GUEST_RATING")}>
              Guest Rating
            </p>
            <p
              className="button"
              onClick={() => setFilter("PRICE_HIGHEST_FIRST")}
            >
              Highest Price
            </p>
            <p className="button" onClick={() => setFilter("PRICE")}>
              Price
            </p>
          </div>
          <div className="flex flex-col">
            {hotels.map((hotel) => (
              <InfoCard
                key={hotel.id && hotel.id}
                img={
                  (hotel.optimizedThumbUrls &&
                    hotel.optimizedThumbUrls.srpDesktop) ||
                  "https://www.microbiologics.com/sca-dev-2020-1/extensions/RSM/RSM_Custom_Theme/1.0.0/img/no_image_available.jpeg"
                }
                location={`${hotel.address.streetAddress}, ${hotel.address.locality}, ${hotel.address.countryName}`}
                title={hotel.name}
                description={hotel.name}
                star={hotel && hotel.starRating}
                price={
                  (hotel.ratePlan && hotel.ratePlan.price.current) ||
                  "Not Available"
                }
                total={
                  (hotel.ratePlan && hotel.ratePlan.price.current) ||
                  "Not Available"
                }
              />
            ))}
          </div>
        </section>
        <section className="hidden xl:inline-flex xl:min-w-[600px] children:!sticky children:!bottom-0 children:!h-screen">
          <Map hotels={hotels} />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Search;

export const getServerSideProps = async (context) => {
  const useDummyData = false;

  const hotelCity = useDummyData
    ? Response
    : await fetch(
        `https://hotels4.p.rapidapi.com/locations/search?query=${context.query.location}&locale=en_US`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": process.env.xRapidapiHost,
            "x-rapidapi-key": process.env.xRapidapiKey,
          },
        }
      )
        .then((response) => response.json())
        .catch((err) => {
          console.error(err);
        });

  const formatCheckIn = format(new Date(context.query.startDate), "yyyy-MM-dd");
  const formatCheckOut = format(new Date(context.query.endDate), "yyyy-MM-dd");

  const hotelsDetails = await fetch(
    `https://hotels4.p.rapidapi.com/properties/list?destinationId=${
      hotelCity.suggestions[0].entities[0].destinationId
    }&pageNumber=1&pageSize=25&checkIn=${formatCheckIn}&checkOut=${formatCheckOut}&adults1=${
      context.query.numOfAdults
    }&children1=${context.query.numOfChildren}${
      context.query.minPrice && "&priceMin="
    }${context.query.minPrice && context.query.minPrice}${
      context.query.maxPrice && "&priceMax="
    }${context.query.maxPrice && context.query.maxPrice}&sortOrder=${
      context.query.filter
    }&locale=en_US&currency=USD`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": process.env.xRapidapiHost,
        "x-rapidapi-key": process.env.xRapidapiKey,
      },
    }
  )
    .then((response) => response.json())
    .catch((err) => {
      console.error(err);
    });

  return {
    props: {
      hotelsDetails,
    },
  };
};
