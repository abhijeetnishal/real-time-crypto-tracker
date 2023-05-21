"use client";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import styles from './page.module.css'

const ENDPOINT = "http://localhost:4000";
const socket = io(ENDPOINT);

const Page: React.FC = ()=> {
  const [coinValues, setCoinValues] = useState<Array<object>>([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
      socket.emit("getCoinData");
    });

    const intervalId = setInterval(() => {
      socket.on("coinData", (data) => {
        //console.log("Received quotes:", data);
        setCoinValues(data);
      });
    }, 20000);
    
    return () => clearInterval(intervalId);
    }, []);

  return coinValues && (
    //always create table after data is received from backend else it will throw error server side html...
    <main className={styles.main}>
      {
        coinValues.length ?
        (
          <table className={styles.table_container}>
            <tbody className={styles.main_tr}>
              <tr>
                <td className={styles.main_td}>#</td>
                <td className={styles.main_td}>Coin</td>
                <td className={styles.main_td}>Price</td>
                <td className={styles.main_td}>Market Cap</td>
              </tr>
            </tbody>
              {
              (coinValues.map((val: any, index: number) => (
                <tbody key={index} className={styles.main_tr}>
                  <tr>
                    <td className={styles.sub_td}>{index + 1}</td>
                    <td className={styles.sub_td}>{val.name}</td>
                    <td className={styles.sub_td}>${val.current_price}</td>
                    <td className={styles.sub_td}>${val.market_cap}</td>
                  </tr>
                </tbody>
              )))
              }
          </table>
        ):
        (
          <div>
          </div>
        )
      } 
    </main>
  )
}

export default Page;