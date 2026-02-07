"use client";

import { useEffect, useState } from "react";

export function Ping() {
    const [pingStatus, setPingStatus] = useState<"idle" | "pinging" | "success" | "error">("idle");

    useEffect(() => {
        // Only ping once on mount
        const pingServer = async () => {
            setPingStatus("pinging");
            const clientTimestamp = new Date().toISOString();

            console.log(`PING sent to server at ${clientTimestamp}`);

            try {
                const response = await fetch(
                    `${process.env.SERVER_URL}/ping?timestamp=${encodeURIComponent(clientTimestamp)}`
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                console.log(`Ping received from server:`);
                console.log(`   Client sent at: ${data.clientTimestamp}`);
                console.log(`   Server received at: ${data.serverTimestamp}`);
                console.log(`   Time difference: ${data.timeDiff}ms`);

                setPingStatus("success");
            } catch (error) {
                console.error("Ping failed:", error);
                setPingStatus("error");
            }
        };

        pingServer();
    }, []); // Empty dependency array ensures this runs only once

    // Optional: Show connection status (you can remove this if you don't want visual feedback)
    if (pingStatus === "idle" || pingStatus === "success") return null;

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {pingStatus === "pinging" && (
                <div className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg">
                    Connecting to server...
                </div>
            )}
            {pingStatus === "error" && (
                <div className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
                    Server connection failed
                </div>
            )}
        </div>
    );
}
