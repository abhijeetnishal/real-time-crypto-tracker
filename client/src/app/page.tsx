"use client";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import styles from './page.module.css'

const ENDPOINT = "http://localhost:4000";
const socket = io(ENDPOINT);

const Page: React.FC = ()=> {
  const [coinValues, setCoinValues] = useState<Array<string>>([]);

  useEffect(() => {
      socket.on("connect", () => {
        console.log("Connected to server");
        socket.emit("getCoinData");
      });

      const intervalId = setInterval(() => {

        socket.on("coinData", (data) => {
          console.log("Received data:", data);
          setCoinValues(data);
        });
    
        return () => {
          socket.disconnect();
          console.log("Disconnected from server");
        };
      }, 6000);
      return () => clearInterval(intervalId);
    }, []);

  return (
    <main className={styles.main}>
      {
        coinValues.length !==0 ?
        (
          <div>
            {
              coinValues.map((val: string, index: number)=>(
                <div key={index}>
                  {
                    val
                  }
                </div>
              ))
            }
          </div>
        ) :
        (
          <div>loading</div>
        )

      }
    </main>
  )
}

export default Page;