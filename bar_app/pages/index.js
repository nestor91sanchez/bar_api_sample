import Link from "next/link";
import Head from "next/head";
import React from "react";
import axios from "axios";

const Home = ({bills}) => {
  return (
    <div className="h-full">
      <Head>
        <title>Bar POS</title>
        <meta
          name="description"
          content="crud operation using react and mongodb"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-[calc(100vh-100px)] max-w-[1000px] mx-auto p-5">
        <h1 className="text-center text-3xl font-bold">
          Table Actives
        </h1>

        <div className="flex gap-5 flex-wrap mt-8 justify-center">
          {bills.map((bill) => (
            <div
              className="shadow-md hover:shadow-sm p-4 transition-all duration-300 rounded-sm w-72  bg-white"
              key={bill.table}
            >
              <h3 className="text-xl text-center font-bold">
                <span> Table #{bill.table} </span>
              </h3>
              <div className="text-center">
                <span className="fa-money">${bill.total_amount}</span>
              </div>
              <div className="flex justify-between mt-5">
                <Link
                  key={bill.table}
                  href={`/${bill.table}`}
                  className="bg-blue-600 rounded-sm text-white py-1 px-3 flex items-center"
                >
                  View
                </Link>
                <Link
                  key={bill.table}
                  href={`/${bill.table}/pay`}
                  className="bg-green-500 rounded-sm text-white py-1 px-3 flex items-center"
                >
                  Pay
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const {SITE_URL} = process.env;
  const {data} = await axios.get(`${SITE_URL}bills/bills_active/`);
  return {
    props: {
      bills: data,
    },
  };
}

export default Home;
