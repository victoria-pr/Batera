import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar";

function Home() {
  const [data, setData] = useState([]);
  const [loged, setLoged] = useState(localStorage.getItem("infoUser"));
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const infoUser = localStorage.getItem("infoUser");
      console.log("infoUser", infoUser);
      if (!infoUser) {
        navigate("/login");
        return;
      }
      const token = JSON.parse(infoUser).token;
      const response = await axios.get("http://localhost:3100/", {
        headers: { "x-access-token": token },
      });
      console.log("LOS DATOS : ", response);
      setData(response.data);
    } catch (error) {
      console.log("Da este error al entrar en home", error);
      if (error.response.status === 401 || error.response.status === 400) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleButtonClick = (route) => {
    navigate(route);
  };

  /* if (!loged) {
    navigate("/login");
  } */
  return (
    <section className="homensection">
      <NavBar />
      <div className="home-container">
        <div className="menu-container">
          <button
            className="homebtns"
            onClick={() => handleButtonClick("/tareas")}
          >
            <svg
              width="96"
              height="96"
              viewBox="0 0 96 96"
              fill="none"
              xmlns="http://www.w3.org/2000/svg%22%3E"
            >
              <g clip-path="url(#clip0_16_267)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M80 12H16C11.6 12 8 15.6 8 20V76C8 80.4 11.6 84 16 84H80C84.4 84 88 80.4 88 76V20C88 15.6 84.4 12 80 12ZM40 68H20V60H40V68ZM40 52H20V44H40V52ZM40 36H20V28H40V36ZM59.28 60L48 48.64L53.64 43L59.28 48.68L71.96 36L77.64 41.68L59.28 60Z"
                  fill="#0A7F8D"
                />
              </g>
              <defs>
                <clipPath id="clip0_16_267">
                  <rect width="96" height="96" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Tareas
          </button>

          <button
            className="homebtns"
            onClick={() => handleButtonClick("/calendario")}
          >
            <svg
              width="72"
              height="80"
              viewBox="0 0 72 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 80C5.8 80 3.91667 79.2167 2.35 77.65C0.783333 76.0833 0 74.2 0 72V16C0 13.8 0.783333 11.9167 2.35 10.35C3.91667 8.78333 5.8 8 8 8H12V0H20V8H52V0H60V8H64C66.2 8 68.0833 8.78333 69.65 10.35C71.2167 11.9167 72 13.8 72 16V72C72 74.2 71.2167 76.0833 69.65 77.65C68.0833 79.2167 66.2 80 64 80H8ZM8 72H64V32H8V72ZM8 24H64V16H8V24ZM36 48C34.8667 48 33.9167 47.6167 33.15 46.85C32.3833 46.0833 32 45.1333 32 44C32 42.8667 32.3833 41.9167 33.15 41.15C33.9167 40.3833 34.8667 40 36 40C37.1333 40 38.0833 40.3833 38.85 41.15C39.6167 41.9167 40 42.8667 40 44C40 45.1333 39.6167 46.0833 38.85 46.85C38.0833 47.6167 37.1333 48 36 48ZM20 48C18.8667 48 17.9167 47.6167 17.15 46.85C16.3833 46.0833 16 45.1333 16 44C16 42.8667 16.3833 41.9167 17.15 41.15C17.9167 40.3833 18.8667 40 20 40C21.1333 40 22.0833 40.3833 22.85 41.15C23.6167 41.9167 24 42.8667 24 44C24 45.1333 23.6167 46.0833 22.85 46.85C22.0833 47.6167 21.1333 48 20 48ZM52 48C50.8667 48 49.9167 47.6167 49.15 46.85C48.3833 46.0833 48 45.1333 48 44C48 42.8667 48.3833 41.9167 49.15 41.15C49.9167 40.3833 50.8667 40 52 40C53.1333 40 54.0833 40.3833 54.85 41.15C55.6167 41.9167 56 42.8667 56 44C56 45.1333 55.6167 46.0833 54.85 46.85C54.0833 47.6167 53.1333 48 52 48ZM36 64C34.8667 64 33.9167 63.6167 33.15 62.85C32.3833 62.0833 32 61.1333 32 60C32 58.8667 32.3833 57.9167 33.15 57.15C33.9167 56.3833 34.8667 56 36 56C37.1333 56 38.0833 56.3833 38.85 57.15C39.6167 57.9167 40 58.8667 40 60C40 61.1333 39.6167 62.0833 38.85 62.85C38.0833 63.6167 37.1333 64 36 64ZM20 64C18.8667 64 17.9167 63.6167 17.15 62.85C16.3833 62.0833 16 61.1333 16 60C16 58.8667 16.3833 57.9167 17.15 57.15C17.9167 56.3833 18.8667 56 20 56C21.1333 56 22.0833 56.3833 22.85 57.15C23.6167 57.9167 24 58.8667 24 60C24 61.1333 23.6167 62.0833 22.85 62.85C22.0833 63.6167 21.1333 64 20 64ZM52 64C50.8667 64 49.9167 63.6167 49.15 62.85C48.3833 62.0833 48 61.1333 48 60C48 58.8667 48.3833 57.9167 49.15 57.15C49.9167 56.3833 50.8667 56 52 56C53.1333 56 54.0833 56.3833 54.85 57.15C55.6167 57.9167 56 58.8667 56 60C56 61.1333 55.6167 62.0833 54.85 62.85C54.0833 63.6167 53.1333 64 52 64Z"
                fill="#0A7F8D"
              />
            </svg>
            Calendario
          </button>

          <button
            className="homebtns"
            onClick={() => handleButtonClick("/perfil")}
          >
            <svg
              width="96"
              height="96"
              viewBox="0 0 96 96"
              fill="none"
              xmlns="http://www.w3.org/2000/svg%22%3E"
            >
              <g clip-path="url(#clip0_16_264)">
                <path
                  d="M48 8C25.92 8 8 25.92 8 48C8 70.08 25.92 88 48 88C70.08 88 88 70.08 88 48C88 25.92 70.08 8 48 8ZM48 20C54.64 20 60 25.36 60 32C60 38.64 54.64 44 48 44C41.36 44 36 38.64 36 32C36 25.36 41.36 20 48 20ZM48 76.8C38 76.8 29.16 71.68 24 63.92C24.12 55.96 40 51.6 48 51.6C55.96 51.6 71.88 55.96 72 63.92C66.84 71.68 58 76.8 48 76.8Z"
                  fill="#0A7F8D"
                />
              </g>
              <defs>
                <clipPath id="clip0_16_264">
                  <rect width="96" height="96" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Perfil
          </button>

          <button
            className="homebtns"
            onClick={() => handleButtonClick("/recursos")}
          >
            <svg
              width="96"
              height="97"
              viewBox="0 0 96 97"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M40.8183 0.898202C40.2284 1.1291 39.2565 1.92075 38.659 2.65677C37.6851 3.85656 37.5728 4.61129 37.5728 9.97464V15.9544L36.1014 16.4925C34.6804 17.0119 34.4751 16.8799 30.1424 12.6617C26.0001 8.62913 25.4992 8.29287 23.6381 8.29287C21.7578 8.29287 21.2696 8.63454 16.3876 13.3648C11.3964 18.2018 11.1535 18.5337 11.1535 20.5207C11.1535 22.4678 11.4385 22.8907 15.4949 26.9681C19.2835 30.7767 19.7936 31.495 19.504 32.6126L19.1723 33.8936H12.8845C6.65564 33.8936 6.58147 33.9069 4.93788 35.3302C3.34409 36.7097 3.27144 36.9347 3.0987 41.0032C2.97778 43.8572 3.12257 45.4769 3.54223 45.9668C4.38511 46.951 25.4682 47.0548 26.2653 46.0786C26.5422 45.7403 26.9233 44.2811 27.1133 42.8366C27.5894 39.2082 29.2009 35.2618 31.288 32.6121C33.2476 30.1249 33.2421 28.4781 31.2738 28.4781C29.0607 28.4781 24.5958 36.0298 24.0192 40.7482L23.7133 43.2477H15.122H6.53015L6.68257 40.4169L6.83499 37.586L12.9317 37.4654C16.285 37.3989 19.5167 37.235 20.1132 37.1006C20.7788 36.9514 21.6135 36.0007 22.2725 34.6424C24.1188 30.8363 23.883 30.2056 18.7745 25.278C16.2596 22.8523 14.2019 20.6713 14.2019 20.4316C14.2019 19.8629 21.8 12.2866 22.9985 11.6604C23.7657 11.2591 24.7066 11.9257 28.6187 15.6437C33.6587 20.4325 34.3801 20.7338 37.648 19.411C40.8498 18.1142 41.0825 17.5372 41.2405 10.4867L41.3833 4.10814H47.9881H54.5929L54.8469 10.558C55.1253 17.6298 55.3499 18.2048 58.2982 19.3987C61.5991 20.7353 62.3093 20.4409 67.3575 15.6437C71.2695 11.9257 72.2105 11.2591 72.9776 11.6604C74.1762 12.2866 81.7742 19.8629 81.7742 20.4316C81.7742 20.6713 79.7166 22.8523 77.2017 25.278C72.0931 30.2056 71.8574 30.8363 73.7037 34.6424C74.3626 36.0007 75.1974 36.9514 75.8629 37.1006C76.4594 37.235 79.6912 37.3989 83.0444 37.4654L89.1412 37.586L89.2936 40.4169L89.446 43.2477H80.8541H72.2628L71.9493 40.663C71.7746 39.221 70.825 36.4862 69.8023 34.477C64.0149 23.1113 49.97 18.1782 38.0986 23.3407C35.5858 24.4331 35.0325 24.8866 35.0325 25.853C35.0325 27.6539 36.2884 27.7479 39.7503 26.206C42.5488 24.9594 43.4841 24.7989 47.9881 24.7925C52.6531 24.7861 53.3481 24.9141 56.4844 26.3537C63.1807 29.4277 67.4641 34.926 68.7318 42.0765C69.062 43.9389 69.5162 45.7403 69.7408 46.0786C70.3891 47.0563 91.59 46.9519 92.4339 45.9668C92.8536 45.4769 92.9984 43.8572 92.8774 41.0032C92.7047 36.9347 92.632 36.7097 91.0383 35.3302C89.4003 33.9118 89.3012 33.8936 83.2796 33.8936C77.2743 33.8936 77.1712 33.8744 76.6042 32.6692C76.0662 31.525 76.3182 31.1528 80.4253 27.0242C84.5386 22.8897 84.8226 22.4698 84.8226 20.5207C84.8226 18.5337 84.5798 18.2018 79.5886 13.3648C74.7691 8.6951 74.1995 8.29287 72.4071 8.29287C70.6461 8.29287 70.0172 8.70839 65.8287 12.642C61.4583 16.7465 61.119 16.9627 59.8005 16.4856L58.4034 15.98V10.1903C58.4034 3.65028 57.9735 2.27473 55.5887 1.17784C53.7536 0.334002 42.7896 0.126241 40.8183 0.898202ZM42.7875 31.7067C37.3696 34.8531 36.1502 41.9987 40.2574 46.5315C44.5271 51.244 51.449 51.244 55.7188 46.5315C58.7361 43.2019 59.0384 39.128 56.5738 35.0146C53.905 30.5601 47.4343 29.0078 42.7875 31.7067ZM51.6228 34.6365C57.2932 38.2369 54.7443 46.6905 47.9881 46.6905C42.6138 46.6905 39.3561 41.0416 42.2825 36.7973C44.5023 33.577 48.4982 32.653 51.6228 34.6365ZM35.1178 53.166C32.7426 54.3053 30.7571 56.8122 30.2155 59.3555C29.9264 60.7123 29.6099 60.9836 28.01 61.2426C22.3888 62.1534 19.7545 63.7677 15.9801 68.6146L14.4559 70.5716L14.2019 68.6023L13.9479 66.633H7.08902H0.230173L0.0929958 76.7921C-0.0248747 85.5101 0.0655604 86.992 0.728074 87.2386C2.8157 88.015 2.99556 87.3474 3.13985 78.2774L3.27855 69.5869L6.962 69.4422L10.6455 69.2974V81.1176V92.9377L5.44391 93.078C0.906912 93.2006 0.219504 93.3316 0.0670853 94.1036C-0.316502 96.0458 0.807332 96.4185 7.04939 96.4185C10.9869 96.4185 13.1878 96.2196 13.5922 95.8277C14.0281 95.4053 14.2019 92.2677 14.2019 84.8292V74.421L15.9176 73.235C16.8611 72.5822 18.7237 70.7498 20.0563 69.1625C22.812 65.8807 24.5857 64.9906 29.2025 64.5726C33.8258 64.1546 37.6017 65.0226 47.734 68.8327C56.3051 72.0559 62.4491 73.7923 67.8025 74.5057C70.829 74.9084 72.1211 75.8877 72.1211 77.7772C72.1211 79.8346 70.4704 80.0054 65.1672 78.4975C55.9266 75.8694 47.9672 75.7651 42.2922 78.1976C40.4581 78.9839 40.0699 79.3718 40.203 80.2831C40.4017 81.6395 41.7663 81.6665 46.7179 80.4121C50.9364 79.3438 57.0397 79.6874 63.0023 81.3293C69.3948 83.0893 69.7403 83.1396 71.7476 82.6024C75.3945 81.6266 76.7851 77.7536 74.6868 74.4186C73.3607 72.3109 72.3639 71.8723 66.9927 71.0304C62.0548 70.2565 52.2116 67.2504 46.7779 64.8567C42.8912 63.1439 36.9844 61.4636 34.8521 61.4636C33.4666 61.4636 33.3996 61.3711 33.6978 59.8636C33.8716 58.9838 34.7038 57.654 35.5471 56.9096L37.081 55.5558H47.9881H58.8952L60.526 56.9677C62.0142 58.2561 62.1727 58.6766 62.3358 61.7679C62.5852 66.4946 62.8362 67.3715 63.9397 67.3715C65.7134 67.3715 66.1691 66.1313 65.9212 61.9791C65.6351 57.1981 64.2192 54.7498 60.8167 53.1537C58.7656 52.1917 57.7551 52.1095 47.9545 52.11C38.1037 52.1105 37.1562 52.1883 35.1178 53.166ZM86.6008 61.5572C86.042 61.8634 84.9258 62.6422 84.1205 63.2887C83.3147 63.9346 80.9715 65.3594 78.9128 66.4543C75.9391 68.0356 75.1694 68.6781 75.1694 69.5786C75.1694 70.2023 75.5246 70.8443 75.959 71.0058C76.9675 71.3809 81.0132 69.4023 85.6833 66.25C89.131 63.9228 89.4241 63.8174 90.8543 64.3915C92.6148 65.0979 93.1513 66.09 92.4547 67.3513C91.6032 68.8932 76.1195 83.0834 71.9854 86.1107C67.6806 89.2631 65.2698 90.1591 58.7753 91.0211C53.4335 91.7296 51.2112 91.381 44.6857 88.8086C38.783 86.4824 36.2838 85.8119 31.6732 85.3166C25.6521 84.6702 17.1858 87.0028 16.8337 89.4048C16.5944 91.0364 17.8345 91.2304 21.0501 90.0646C27.5512 87.7073 35.1732 88.3646 43.7488 92.0215C49.183 94.3389 53.0098 94.9499 58.631 94.3975C67.9976 93.4773 72.0296 91.2461 83.8065 80.4653C95.1871 70.0472 96 69.1374 96 66.8127C96 64.3092 95.4188 63.2813 93.2793 61.9998C91.3995 60.8743 88.2327 60.6641 86.6008 61.5572Z"
                fill="#0A7F8D"
              />
            </svg>
            Recursos
          </button>

          <button
            className="homebtns"
            onClick={() => handleButtonClick("/valoraciones")}
          >
            <svg
              width="88"
              height="56"
              viewBox="0 0 88 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M80 0V56H88V0H80ZM64 56H72V0H64V56ZM52 0H4C1.8 0 0 1.8 0 4V52C0 54.2 1.8 56 4 56H52C54.2 56 56 54.2 56 52V4C56 1.8 54.2 0 52 0ZM28 11C32.96 11 37 15.04 37 20C37 24.96 32.96 29 28 29C23.04 29 19 24.96 19 20C19 15.04 23.04 11 28 11ZM46 48H10V45C10 39 22 36 28 36C34 36 46 39 46 45V48Z"
                fill="#0A7F8D"
              />
            </svg>
            Mis valoraciones
          </button>

          <button
            className="homebtns"
            onClick={() => handleButtonClick("/boletin")}
          >
            <svg
              width="98"
              height="97"
              viewBox="0 0 98 97"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M29.0499 25.2819C3.64794 50.4446 3.53294 50.5777 4.64694 53.5083C5.63594 56.1084 5.48794 56.712 3.37894 58.6787C2.06594 59.9028 0.991943 61.652 0.991943 62.5644C0.991943 63.4777 8.38994 71.4308 17.4329 80.2377L33.8739 96.2511L17.1829 96.5489C8.00294 96.7127 22.3169 96.8428 48.9919 96.8368C75.6669 96.8318 85.0429 96.7018 69.8279 96.5479L42.1639 96.2679L69.5939 69.2298C96.4119 42.7963 97.0239 42.1044 97.0079 38.2306C96.9929 34.4273 96.2959 33.5805 79.6589 17.1342C63.1919 0.855769 62.1319 0 58.4489 0C54.7159 0 53.6239 0.938168 29.0499 25.2819ZM75.7309 21.0854C84.6749 29.9519 91.9919 37.6548 91.9919 38.2028C91.9919 38.7508 81.3149 49.8053 68.2659 62.7689L44.5389 86.3392L27.3509 69.2298L10.1619 52.1204L33.8189 28.5421C46.8309 15.5746 57.9249 4.96385 58.4729 4.96385C59.0209 4.96385 66.7869 12.218 75.7309 21.0854ZM39.0189 33.231L20.5659 51.5704L23.4659 54.5756C25.0609 56.2285 26.8489 57.5807 27.4389 57.5807C28.0289 57.5807 36.7639 49.3794 46.8499 39.3554L65.1879 21.1301L61.8399 18.0158C59.9989 16.3023 58.2619 14.8985 57.9819 14.8965C57.7009 14.8935 49.1679 23.1445 39.0189 33.231ZM60.7189 33.5278C53.3629 40.8733 51.5529 43.6819 54.1739 43.6819C56.0589 43.6819 71.2739 28.0607 70.5389 26.8802C70.1729 26.2925 69.5519 25.812 69.1599 25.812C68.7669 25.812 64.9679 29.2837 60.7189 33.5278ZM66.3849 38.8858C59.9919 45.04 57.1609 49.6385 59.7639 49.6385C61.1619 49.6385 77.0699 33.1704 76.3559 32.4616C74.9479 31.0628 73.6299 31.9116 66.3849 38.8858ZM72.1519 44.8166C67.6639 49.2186 63.9919 53.2214 63.9919 53.7118C63.9919 54.2013 64.7879 54.6024 65.7609 54.6024C67.6129 54.6024 81.9919 40.6728 81.9919 38.8779C81.9919 36.0604 79.6189 37.492 72.1519 44.8166ZM40.1699 53.9293C35.6719 58.4176 31.9919 62.4155 31.9919 62.8136C31.9919 63.2117 32.7689 63.5373 33.7179 63.5373C35.6679 63.5373 49.9919 49.848 49.9919 47.9846C49.9919 44.9914 47.7899 46.3237 40.1699 53.9293ZM46.0369 59.0877C38.3929 66.4719 36.4269 69.4939 39.2649 69.4939C39.9659 69.4939 44.1119 65.9259 48.4789 61.5647C54.5359 55.5167 56.1409 53.3604 55.2499 52.4759C54.3589 51.5913 52.1739 53.1589 46.0369 59.0877ZM51.7419 65.0642C44.5679 71.9868 42.3569 75.4505 45.1129 75.4505C46.9199 75.4505 62.2199 59.7439 61.5159 58.6112C60.4379 56.8808 59.7579 57.3295 51.7419 65.0642ZM25.4829 75.3393C38.7889 88.4727 40.9699 91.3349 37.6699 91.3349C35.5799 91.3349 6.61594 61.8506 8.12594 61.2589C8.87694 60.965 9.83594 60.8012 10.2559 60.8945C10.6759 60.9879 17.5279 67.4885 25.4829 75.3393Z"
                fill="#0A7F8D"
              />
            </svg>
            Boletín
          </button>
        </div>
      </div>
    </section>
  );
}

export default Home;
