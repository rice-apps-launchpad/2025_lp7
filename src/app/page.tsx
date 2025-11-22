'use client';

import {MouseEventHandler, useEffect, useState} from "react";

const styles = {
  page: {
    alignItems: "center",
    justifyItems: "center",
    // gap: "64px",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    // gap: "32px",
  }
} as const;

type Data = {
  king: string,
}

export default function WeatherScreen() {
  const [parsedData, setParsedData] = useState<Data>()
  const [yourName, setYourName] = useState("")

  async function fetchKing() {
    console.log("Refreshing...")
    const data = await fetch('hill')
    const json = await data.json()
    setParsedData(json as Data)
  }

  // Run once on mount & whenever shouldRefresh changes
  useEffect(() => {
    fetchKing();
  }, []);

  async function postNewKing() {
    const response = await fetch("hill", {
      method: "POST",
      body: JSON.stringify({newKing: yourName})
    });

    const typedResponse = await response.json() as Data
    setParsedData(typedResponse)
  }

  return (
    <div style={styles.page}>
      <main style={styles.main}>
        <p>Current King: <strong>{parsedData?.king}</strong></p>
        <p>Your name:</p>
        <input onChange={(e) => setYourName(e.target.value)}/>
        <button onClick={postNewKing}>
          Submit
        </button>
      </main>
    </div>
  );
}
