"use client";
import React, { useEffect, useState } from "react";
import { useDarkMode } from "@/app/context/DarkModeContext";
import { fetchpayments, fetchser, initiate } from "@/actions/useractions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

const PaymentPage = ({ params: paramsPromise }) => {
    const [paymentform, setPaymentform] = useState({
        name: '',
        message: '',
        amount: ''
    });
    const [currentUser, setcurrentUser] = useState({})
    const { data: session, status } = useSession();
    const [username, setUsername] = useState(null);
    const { darkMode: contextDarkMode } = useDarkMode();
    const [darkMode, setDarkMode] = useState(null);
    const router = useRouter();
    const [payments, setPayments] = useState([])

    useEffect(() => {
        if (status === "loading") return;
        if (!session) {
            router.push("/login");
        }
    }, [session, status, router]);

    useEffect(() => {
        if (username) {
            getData();
        }
    }, [username]);

    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
    };

    const getData = async () => {
        try {
            let u = await fetchser(username);
            setcurrentUser(u);
            console.log("Fetching payments for username:", username);
            let dbpayments = await fetchpayments(username);
            setPayments(dbpayments);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Dynamically load the Razorpay script
    // useEffect(() => {
    //     const script = document.createElement('script');
    //     script.src = "https://checkout.razorpay.com/v1/checkout.js";
    //     script.onload = () => console.log("Razorpay script loaded successfully");
    //     script.onerror = () => console.error("Failed to load Razorpay script");
    //     document.body.appendChild(script);

    //     return () => {
    //         document.body.removeChild(script); // Clean up the script on component unmount
    //     };
    // }, []);

    useEffect(() => {
        const unwrapParams = async () => {
            const params = await paramsPromise;
            setUsername(params.username);
            console.log("Username set to:", params.username);
            await getData(params.username);
        };
        unwrapParams();
    }, [paramsPromise]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('paymentdone') === 'true') {
            setPaymentform({ name: '', message: '', amount: '' });
        }
    }, [router.query]);


    useEffect(() => {
        setDarkMode(contextDarkMode);
    }, [contextDarkMode]);

    const pay = async (amount) => {
        if (!session) {
            console.error("No session found!");
            return;
        }

        let mockResponse = await initiate(amount, session?.user.name, paymentform);
        let orderId = mockResponse.id;

        // Now, use the mock response to simulate Razorpay's behavior
        var options = {
            "key": "mock_key",
            "amount": amount,
            "currency": "INR",
            "name": "Fund My Flow",
            "description": "Test Transaction",
            "image": "/user.png",
            "order_id": orderId,
            "callback_url": "/api/auth/razorpay",
            "prefill": {
                "name": session?.user.name || "Test User",
                "email": "testuser@example.com",
                "contact": "9000090000"
            },
            "notes": {
                "address": "Mock Address"
            },
            "theme": {
                "color": "#3399cc"
            }
        };

        // Open the mock Razorpay payment modal
        // var rzp1 = new Razorpay(options);
        // rzp1.open();

        setTimeout(() => {
            console.log("Mock payment successful!");
            alert("Payment Successful! Order ID: " + options.order_id);
            console.log("Sending payload to callback URL:", {
                razorpay_payment_id: "mock_payment_id",
                razorpay_order_id: options.order_id,
                razorpay_signature: "mock_signature",
            });
            fetch(options.callback_url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    razorpay_payment_id: "mock_payment_id",
                    razorpay_order_id: options.order_id,
                    razorpay_signature: "mock_signature",
                    username: username,
                }),
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(`Server returned ${res.status}: ${res.statusText}`);
                    }
                    return res.json();
                })
                .then((data) => {
                    if (data.success) {
                        toast.success("Payment successful!", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            transition: Bounce,
                        });
                        setPaymentform({ name: '', message: '', amount: '' });
                        setTimeout(() => {
                            router.push(data.redirectUrl);
                            setTimeout(() => {
                                router.push(`/${username}`);
                            }, 2000);
                        }, 2000);
                    } else {
                        toast.error("Payment verification failed.");
                    }
                })
                .catch((err) => {
                    console.error("Payment capture error:", err.message || err);
                    alert("Payment capture failed. Check the console for details.");
                });
        }, 2000);
    };

    if (username === null || darkMode === null || status === "loading") {
        return <div>Loading...</div>;
    }

    function handleClick() {
        if (paymentform.name?.length < 2) {
            alert("Name must be at least 2 characters long.");
        } else if (paymentform.message?.length < 4) {
            alert("Message must be at least 4 characters long.");
        } else if (paymentform.amount?.length < 1) {
            alert("Amount cannot be empty.");
        }
    }

    return (
            <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-[#E3F2FD] text-gray-900"}`}>
                <ToastContainer />
                <div className="relative w-full">
                    {currentUser?.coverpic && (
                        <img src={currentUser.coverpic || "/user.png"} alt="Background" className="object-cover w-full h-[350px] sm:h-[300px] md:h-[350px]" />
                    )}
                    <div className="absolute bottom-[-75px] left-1/2 transform -translate-x-1/2">
                        {currentUser?.profilepic && (
                            <img src={currentUser.profilepic || "/username.jpg"} alt="User Image" className="rounded-full w-[150px] h-[150px] border-4 border-white sm:w-[120px] sm:h-[120px]" />
                        )}
                    </div>
                </div>
                <div className="mt-[100px] flex flex-col items-center px-4 sm:px-8">
                    <h1 className={`text-2xl font-bold text-center ${darkMode ? "text-gray-200" : "text-[#3c3c3c]"}`}>
                        @{username}
                    </h1>
                    <p className={`text-sm text-center mt-2 ${darkMode ? "text-gray-400" : "text-gray-700"}`}>Let&apos;s help {username} Fund My Flow!</p>
                    <div className="flex space-x-4 mt-4">
                        <p className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{payments.length} Payments</p>
                        <span className={`${darkMode ? "text-gray-600" : "text-gray-300"}`}> |</span>
                        <p className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>₹{payments.reduce((a, b) => a + b.amount, 0)} raised</p>
                    </div>
                </div>
                <div className="flex pb-10 justify-center items-center mt-12">
                    <div className="payment flex flex-col sm:flex-row gap-8 w-full max-w-6xl px-4 sm:px-0">
                        <div className={`supporters flex-1 rounded-lg p-6 sm:p-8 shadow-md ${darkMode ? "bg-gray-700 text-gray-300" : "bg-[#EAF4FC] text-gray-800"}`} style={{ maxHeight: "450px", overflowY: "auto", }}>
                            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-5 text-center sm:text-left">Supporters</h2>
                            <ul className="mx-4 sm:mx-5 text-base sm:text-lg space-y-4">
                                {payments.length === 0 && (
                                    <li className="text-center">No payments yet</li>
                                )}
                                {payments.map((p, i) => (
                                    <li key={i} className="flex flex-wrap gap-3 items-center sm:gap-4 sm:flex-nowrap">
                                        {currentUser?.profilepic && (
                                            <img src={currentUser.profilepic || "/username.jpg"} alt="User Image" width={40} height={40} className="rounded-full object-cover" />
                                        )}
                                        <span className="flex-1 whitespace-normal sm:whitespace-nowrap text-sm sm:text-base">
                                            {p.name} <span className="font-bold">₹{p.amount}</span> with a  message: &quot;{p.message}&quot;
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={`makePayment flex-1 rounded-lg p-8 shadow-md ${darkMode ? "bg-gray-700 text-gray-300" : "bg-[#EAF4FC] text-gray-800"}`}>
                            <h2 className="text-2xl font-bold mb-5">Make a Payment</h2>
                            <div className="flex flex-col gap-4">
                                <input onChange={handleChange} value={paymentform.name} name="name" type="text" className="w-full p-3 rounded-lg border border-gray-300 focus:ring focus:outline-none" placeholder="Enter Name" />
                                <input onChange={handleChange} value={paymentform.message} name="message" type="text" className="w-full p-3 rounded-lg border border-gray-300 focus:ring focus:outline-none" placeholder="Enter Message" />
                                <input onChange={handleChange} value={paymentform.amount} name="amount" type="text" className="w-full p-3 rounded-lg border border-gray-300 focus:ring focus:outline-none" placeholder="Enter Amount" />
                                <button type="button" className="w-24 text-white bg-gradient-to-r from-purple-500 to-blue-400 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium  rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transform transition-transform duration-300 hover:scale-105"
                                    onClick={() => {
                                        if (
                                            paymentform.name?.length < 2 ||
                                            paymentform.message?.length < 4 ||
                                            paymentform.amount?.length < 1
                                        ) {
                                            handleClick();
                                        } else {
                                            pay(Number.parseInt(paymentform.amount));
                                        }
                                    }}>Pay
                                </button>
                                <div className="flex gap-7">
                                    <button className="flex-1 p-3 w-fit rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-800 transform transition-transform duration-300 hover:scale-105" onClick={() => pay(10)}>Pay ₹10</button>
                                    <button className="flex-1 p-3 w-fit rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-800 transform transition-transform duration-300 hover:scale-105" onClick={() => pay(20)}>Pay ₹20</button>
                                    <button className="flex-1 p-3 w-fit rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-800 transform transition-transform duration-300 hover:scale-105" onClick={() => pay(30)}>Pay ₹30</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default PaymentPage;