import React from "react";
import styles from "../page.module.css";
import { Typography } from "@mui/material";

const Footer = () => {
  return (
    <footer className={styles.footer} style={{ margin: "15px" }}>
      <Typography style={{ fontSize: "10px" }}>
        *This calculator is given to empower you to design your retirement and
        help a gauge for the retirement benefit. It is planned exclusively for
        data/instruction reason. The outcomes introduced by this adding machine
        are speculative and premise the data/inputs given by you and guides you
        to design your retirement and significance of investment funds for your
        retirement benefits. Please refrain from construing this as investment
        advice or a direct or indirect solicitation for the performance or
        product. While absolute attention to detail has been practiced in
        setting up this calculator, I don&apos;t warrant the fulfillment or
        assurance the precision of the data and won&apos;t be answerable for any
        liabilities, misfortunes, harms emerging out of the utilization or in
        regard of anything done in dependence of the adding machine. The
        computations gave through this number cruncher will not
        straightforwardly or by implication be understood as requesting of plan
        the presentation of the plan. Demand you counsel your monetary
        consultant prior to making any kind of speculation.
      </Typography>
      <br />
      <Typography>
        Made with ❤️ in India By{" "}
        <a href="https://portfolio-kdjadeja21.vercel.app/" target="_blank">
          Krushnasinh Jadeja
        </a>
      </Typography>
    </footer>
  );
};

export default Footer;
