import Head from "next/head";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LargeCard from "../components/LargeCard";
import MediumCard from "../components/MediumCard";
import SmallCard from "../components/SmallCard";
import nextId from "react-id-generator";
import { useMotionValue } from "framer-motion";

export default function Home({ exploreData, cardsData }) {
  return (
    <div className="">
      <Head>
        <title>Airbnb</title>
        <link
          rel="icon"
          href="https://a0.muscache.com/airbnb/static/logotype_favicon-21cc8e6c6a2cca43f061d2dcabdf6e58.ico"
        />
      </Head>
      <Header />
      <Banner />

      <main className="max-w-7xl my-20 p-5 shadow-xl md:mx-5 lg:mx-10 xl:mx-40 2xl:mx-auto">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {exploreData?.map((item) => (
              <SmallCard
                img={item.img}
                distance={item.distance}
                location={item.location}
                key={nextId()}
              />
            ))}
          </div>
        </section>
        <section className="relative">
          <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>
          <div className="flex space-x-3 overflow-x-scroll scrollbar-hide overscroll-x-contain p-3">
            {cardsData.map((item) => (
              <MediumCard
                key={nextId()}
                img={item.img}
                title={item.title}
                id={nextId()}
              />
            ))}
          </div>
        </section>
        <LargeCard
          img="https://links.papareact.com/4cj"
          title="The Greatest Outdoors"
          description="Wishlists created by Airbnb"
          buttonText="Get Inspire"
        />
      </main>
      <Footer />
    </div>
  );
}

export const getStaticProps = async () => {
  const exploreData = await fetch("https://links.papareact.com/pyp").then(
    (res) => res.json()
  );

  const cardsData = await fetch("https://links.papareact.com/zp1").then((res) =>
    res.json()
  );

  return {
    props: {
      exploreData,
      cardsData,
    },
  };
};
