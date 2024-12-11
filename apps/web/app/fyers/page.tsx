"use client";

import { useRouter } from "next/router";

export default function TradingPage() {
    //const router = useRouter();

    const handleOnClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const response: any = await fetch("/api/fyers/login/generateURL");
        // if (response.code == "success") {
        //     router.push(response.url);
        // }
        console.log(`LoginURL: ${response.url}`);
    };

    return (
        <div style={{ textAlign: "center", margin: "20px" }}>
            <h1>Broker Page</h1>
            <button
                style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    cursor: "pointer",
                    backgroundColor: "#0070f3",
                    color: "white",
                    border: "2px solid #005bb5",
                    borderRadius: "5px",
                    transition: "background-color 0.3s, border-color 0.3s",
                }}
                onClick={handleOnClick}
            >
                Login
            </button>
        </div>
    );
}
