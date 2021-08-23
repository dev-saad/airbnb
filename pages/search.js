import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/dist/client/router";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";
import Response from "../Response";
import { flushLayout } from "framer-motion";

const Search = ({ hotelsDetails }) => {
  const router = useRouter();
  const { location, startDate, endDate, numOfGuests } = router.query;
  const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
  const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
  const range = `${formattedStartDate} - ${formattedEndDate}`;
  const hotels = hotelsDetails.data.body.searchResults.results;

  return (
    <div>
      <Header placeholder={`${location} | ${range} | ${numOfGuests} guests`} />
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            300+ Stays - {range} - for {numOfGuests} guests
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in{" "}
            {location
              .toLowerCase()
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
              .join(" ")}
          </h1>
          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More filters</p>
          </div>
          <div className="flex flex-col">
            {hotels.map((hotel) => (
              <InfoCard
                key={hotel.id}
                img={hotel.optimizedThumbUrls.srpDesktop}
                location={`${hotel.address.streetAddress}, ${hotel.address.locality}, ${hotel.address.countryName}`}
                title={hotel.name}
                description={hotel.name}
                star={hotel.guestReviews && hotel.guestReviews.rating}
                price={hotel.ratePlan.price.current}
                total={hotel.ratePlan.price.current}
              />
            ))}
          </div>
        </section>
        <section className="hidden xl:inline-flex xl:min-w-[600px] ">
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
    `https://hotels4.p.rapidapi.com/properties/list?destinationId=${hotelCity.suggestions[0].entities[0].destinationId}&pageNumber=1&pageSize=25&checkIn=${formatCheckIn}&checkOut=${formatCheckOut}&adults1=1&sortOrder=PRICE&locale=en_US&currency=USD`,
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
