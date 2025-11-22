'use client';

import {useEffect, useState} from "react";

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

  return (
    <div style={styles.page}>
      <main style={styles.main}>
        {/* TODO: Add your UI code here! You will want to use parsedData. */}
        <p>Current King: <strong>{parsedData?.king}</strong></p>
        <p>Your name:</p>
        <input onChange={(e) => setYourName(e.target.value)} />
        <button onClick={event => {
          fetch("hill", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              newKing: yourName,
            })
          }).then(r => fetchKing())
        }}>
          Submit
        </button>
      </main>
    </div>
  );
}
