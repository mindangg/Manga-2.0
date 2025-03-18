import React from "react";
import logo from "../assets/WEBTOON_Logo.png";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-content">
          <a href="#">
            <img src={logo} alt="Webtoon Logo" />
          </a>
          <p>Address: 340 Đ. Hoang Van Thu, Ward 4, Tan Binh, Ho Chi Minh</p>
          <p>Web programming and its application</p>
        </div>

        <div className="footer-content">
          <h3>
            Customer Service
            <div className="footer-underline">
              <span></span>
            </div>
          </h3>
          <p>FAQs</p>
          <p>Returns Policy</p>
          <p>Refund Policy</p>
          <p className="footer-email--id">thanhsang@sgu.edu.vn</p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <i className="fa-solid fa-phone" style={{ marginRight: "10px" }}></i>
            <h4>076-302-0810</h4>
          </div>
        </div>

        <div className="footer-content">
          <h3>
            Legal
            <div className="footer-underline">
              <span></span>
            </div>
          </h3>
          <p>Terms & Conditions</p>
          <p>Privacy Notice</p>
        </div>

        <div className="footer-content">
          <h3>
            Newsletter
            <div className="footer-underline">
              <span></span>
            </div>
          </h3>
          <form className="footer-form">
            <i className="fa-regular fa-envelope" style={{ color: "white" }}></i>
            <input type="email" placeholder="E-mail" required />
            <button type="submit">{">"}</button>
          </form>

          <div className="footer-social--icons">
            <a href="#">
              <i className="fa-brands fa-instagram" style={{ color: "white" }}></i>
            </a>
            <a href="https://www.tiktok.com/@_.mindang?_t=8qOahI38W4V&_r=1" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-tiktok" style={{ color: "white" }}></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-facebook" style={{ color: "white" }}></i>
            </a>
            <a href="https://www.youtube.com/@dangkoo4896" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-youtube" style={{ color: "white" }}></i>
            </a>
          </div>
        </div>
        <hr />
        <p className="copyright">© {new Date().getFullYear()}, Web Development, Powered by J97</p>
      </div>
    </footer>
  );
}
