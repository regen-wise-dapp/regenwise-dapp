import React from 'react';
import styles from './index.module.scss';
export default function MarketHeader() {
  return (
    <div className={`${styles.main_container} py-6 md:py-12`}>
      <div className={styles.wrapper}>
        <h1 className="text-3xl lg:text-5xl xl:text-7xl font-extrabold">
          REGENWISE (RW) NFT MARKET
        </h1>
        <div className={styles.seperator}>
          <div className={styles.seperator_left}></div>
          <div className={styles.seperator_right}></div>
        </div>
        <h2 className="text-xl lg:text-2xl xl:text-4xl font-extrabold">
          Trade and Embrace NFTs from RegenWise Collections to Support The Valuable Regen Goal!
        </h2>
      </div>
    </div>
  );
}
