import React from "react";
import styles from "../page.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer} style={{ margin: "15px" }}>
      Made with ❤️ in India By{" "}
      <a href="https://portfolio-kdjadeja21.vercel.app/" target="_blank">
        Krushnasinh Jadeja
      </a>
    </footer>
  );
};

export default Footer;
