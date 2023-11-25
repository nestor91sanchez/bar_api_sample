import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import axios from "axios";

const {SITE_URL} = process.env;

const PayBill = ({bill}) => {

    const [formData, setFormData] = useState({
        bill: 0,
        amount: 0,
    });

    const [amountByCustomer, setAmountByCustomer] = useState([]);
    const [currentPayer, setCurrentPayer] = useState({
        'customer': '',
        'bill': 0,
        'amount': 0
    });

    const [currentSplit, setCurrentSplit] = useState(1);

    const router = useRouter();
    const tableId = router.query.id;

    const handleChange = (e) => {

        setFormData({
            ...formData,
            bill: currentPayer.bill,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangeSplitAccount = (e) => {
        console.info('e.target.value', e.target.value);
        let currentCustomer = amountByCustomer.find(customerData => customerData.customer === currentPayer.customer);
        let amount = 0;

        if (e.target.value == 2) {
            amount = Math.round((formData.amount / bill.length) * 100) / 100
        } else {
            console.info('current customer', currentCustomer);
            amount = Math.round(currentCustomer.amount * 100) / 100
        }

        setCurrentPayer({...currentPayer, amount});
        setCurrentSplit(e.target.value);
    };

    const handleChangeCustomer = (e) => {
        console.info('e.target.value', e.target.value);
        let currentCustomer = amountByCustomer.find(customerData => customerData.customer == e.target.value);
        let amount = 0;

        if(currentSplit == 2){
            amount = Math.round((formData.amount / bill.length) * 100) / 100
        } else {
            amount = Math.round(currentCustomer.amount * 100) / 100
        }

        setCurrentPayer({...currentCustomer, amount, bill});
        console.info('current customer', currentCustomer);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios(`http://localhost:8000/pos/api/v1/payments/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify(formData)
            })
            router.push(`/${tableId}`);
        } catch (error) {
            console.log(error);
        }
    };

    let amount = 0;
    let totalAmount = 0;

    useEffect(() => {

        bill.map(function (billRow) {
            amount = billRow.product_price * billRow.quantity;
            totalAmount += amount;
            amountByCustomer.push({'customer': billRow.customer_name, 'amount': amount, bill: billRow.id})
            setAmountByCustomer([...amountByCustomer])
        })


        if (amountByCustomer.length > 0) {
            setCurrentPayer(amountByCustomer[0]);
        }

        setFormData({
            bill: amountByCustomer[0].bill,
            amount: totalAmount
        })

        console.info('amountByCustomer', amountByCustomer);
        console.info('totalAmount', totalAmount);
    }, []);


    return (
        <div className="min-h-[calc(100vh-108px)] max-w-[1000px] mx-auto p-5">
            <h1 className="text-center text-xl font-bold">
                Pay Table #{tableId}
            </h1>
            <form onSubmit={handleSubmit}>
                <div className="shadow overflow-hidden max-w-[500px] w-full mx-auto mt-10">
                    <div className="px-4 py-5 bg-white">
                        <div className="flex flex-col justify-center items-center gap-6">
                            <div className="w-full font-bold">
                                Total: ${formData.amount}
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="amount"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Split Amount by:
                                </label>
                                <select
                                    defaultValue={1}
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm border-2 border-slate-300 rounded-md wi max-w-[400px]"
                                    onChange={handleChangeSplitAccount}>
                                    <option value="1" selected="selected">Customer consumption</option>
                                    <option value="2">Equal parts</option>
                                </select>
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="customer"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Customer
                                </label>

                                <select
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm border-2 border-slate-300 rounded-md"
                                    onChange={handleChangeCustomer}>
                                    {bill.map((billRow) => (
                                        <option value={billRow.customer_name}>{billRow.customer_name}</option>
                                    ))}
                                </select>
                                <label
                                    htmlFor="amount"
                                    className=" mt-1 block text-sm font-medium text-gray-700"
                                >
                                    Amount
                                </label>
                                <input
                                    type="number"
                                    name="amount"
                                    value={currentPayer.amount}
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm border-2 border-slate-300 rounded-md"
                                    onChange={handleChange}
                                />
                            </div>

                        </div>
                    </div>
                    <div className="px-4 pb-5 bg-gray-50 text-center">
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-offset-2
            focus:ring-indigo-500"
                        >
                            Pay
                        </button>
                    </div>
                </div>
            </form>
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

export default PayBill;
