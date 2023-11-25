import React, {useEffect, useState} from "react";
import Link from "next/link";
import axios from "axios";
import {useRouter} from "next/router";

const Bar = ({bill}) => {
    const router = useRouter();
    const tableId = router.query.id;

   const [currentTotalAmount, setTotalAmount] = useState(0);

   let totalAmount = 0;

    useEffect(() => {

        bill.map(function (billRow) {
            totalAmount += billRow.product_price * billRow.quantity;
        })

        setTotalAmount(totalAmount);

    }, []);

    return (
        <div className="min-h-[calc(100vh-100px)] max-w-[1000px] mx-auto p-5">
            <h1 className="text-center text-3xl font-bold">Table #{tableId}</h1>
            <div
                className="bg-white shadow-lg rounded-md mt-10 p-5 max-w-[400px] mx-auto flex justify-center flex-col gap-3">
                <span className="font-bold">Total: ${currentTotalAmount}</span>
                <ul className="list-group">
                    {bill.map((billRow) => (
                        <li className="list-group-item mt-2">
                            <strong>Customer:</strong> {billRow.customer_name}
                            <span className="bg-gray-50"> ${billRow.product_price * billRow.quantity}</span>
                        </li>
                    ))}
                </ul>
                <div className="flex justify-between mt-5">
                <Link
                  key="home"
                  href={`/`}
                  className="bg-blue-600 rounded-sm text-white py-1 px-3 flex items-center"
                >
                  Back
                </Link>
                  <Link
                    key={tableId}
                    href={`/${tableId}/pay`}
                    className="bg-green-500 rounded-sm text-white py-1 px-3 flex items-center"
                  >
                    Pay
                  </Link>
                </div>
            </div>

        </div>
    );
};

export async function getServerSideProps({params}) {
    const {SITE_URL} = process.env;
    const {data} = await axios.get(`${SITE_URL}bills?table=${params.id}`);
    console.log(data);
    return {
        props: {
            bill: data,
        },
    };
}

export default Bar;
