import React from "react";
import styles from "../../sass/homeStyles.module.scss";
import { Hero } from "./Hero";
import { Offer } from "./Offer";
import { Promo } from "./Promo";
import { Features } from "./Features";
import { Working } from "./Working";
import { Banner } from "./Banner";
import { Testimonials } from "./Testimonials";

export const Home: React.FC = () => {
  return (
    <section className={styles.container__main}>
      <Hero />
      <Offer />
      <Promo />
      <Features />
      <Working />
      <Testimonials />
      <Banner />
    </section>
  );
};
