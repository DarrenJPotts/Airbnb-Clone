import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";

function Search({ data }) {
  const results = data;
  const router = useRouter();
  const { location, startDate, endDate, numGuests } = router.query;

  const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
  const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
  const range = `${formattedStartDate} - ${formattedEndDate}`;
  return (
    <div>
      <Header placeholder={`${location} | ${range} | ${numGuests}`} />
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            300+ Stays - {range} - for {numGuests} number of guests
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>
          <div className="hidden md:inline-flex space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Types of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Bed</p>
            <p className="button">More Filters</p>
          </div>

          <div className="flex flex-col">
            {data.map((result) => (
              <InfoCard
                key={result.img}
                img={result.img}
                location={result.location}
                title={result.title}
                description={result.description}
                star={result.star}
                price={result.price}
                total={result.total}
              />
            ))}
          </div>
        </section>
        <section className="hidden xl:inline-block xl:min-w-[600px]">
          <Map searchResults={data} />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Search;

export async function getServerSideProps() {
  const searchResults = await fetch("https://links.papareact.com/isz");
  const data = await searchResults.json();

  return {
    props: {
      data,
    },
  };
}
