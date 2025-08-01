"use client";

import React, {
  useState,
  useEffect,
} from "react";
import Link from "next/link";
import { Button } from "./Button";
import {
  fadeIn,
  initAnimations,
} from "@/utils/animation";

const Navbar =
  () => {
    const [
      isMenuOpen,
      setIsMenuOpen,
    ] =
      useState(
        false
      );

    const toggleMenu =
      () => {
        setIsMenuOpen(
          !isMenuOpen
        );
      };

    // Initialize animations when component mounts
    useEffect(() => {
      initAnimations();
    }, []);

    const openContactModal =
      () => {
        // Dispatch a custom event that the Home component can listen for
        if (
          typeof window !==
          "undefined"
        ) {
          window.dispatchEvent(
            new CustomEvent(
              "openContactModal",
              {
                detail:
                  {
                    subject:
                      "Contact Us",
                    recipientEmail:
                      "info@ohiogolfclubindoor.com",
                  },
              }
            )
          );
        }
      };

    return (
      <header className="fixed top-4 left-4 right-4 z-50 flex justify-center items-center">
        <div
          className={`px-6 py-4 bg-white/50 rounded-2xl shadow-sm z-50 backdrop-blur-md w-auto ${fadeIn()}`}
        >
          <div className="flex items-center justify-between gap-8">
            <Link
              href="/"
              className="flex items-center shrink-0"
            >
              <svg
                className="w-48 h-auto"
                viewBox="0 0 2561 434"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M162.939 209.279C151.063 209.279 139.751 206.858 129.474 202.484V151.206C130.577 151.164 131.683 151.168 132.795 151.2C136.007 151.306 139.177 151.73 142.325 152.354C147.731 153.428 152.978 155.064 158.185 156.86C162.943 158.506 167.681 160.202 172.445 161.836C176.911 163.371 181.431 164.712 186.058 165.668C189.381 166.358 192.73 166.822 196.121 166.946C196.314 166.955 196.502 166.978 196.69 167C196.81 167.015 196.925 167.019 197.043 167.019H198.657C198.73 167.019 198.809 167.019 198.886 167.015C199.727 166.951 200.567 166.891 201.413 166.831C203.715 166.656 205.985 166.298 208.213 165.706C210.249 165.154 211.994 164.056 213.575 162.691C216.019 160.574 217.875 158.004 219.35 155.152C223.926 146.312 223.99 135.887 224.129 126.175C224.174 123.23 224.161 120.284 224.091 117.339C223.907 109.166 223.301 101.002 222.267 92.8925C221.749 88.7805 220.094 85.5872 215.725 84.8338C213.795 84.5032 211.866 84.5765 209.95 84.8978C208.534 85.1325 207.138 85.4632 205.733 85.7338C202.673 86.3178 199.581 86.5205 196.47 86.4325C193.194 86.3405 189.959 85.9178 186.747 85.2845C181.335 84.2138 176.085 82.5832 170.883 80.7912C166.206 79.1738 161.547 77.5018 156.866 75.8938C152.781 74.4872 148.65 73.2378 144.438 72.2818C140.803 71.4552 137.137 70.8805 133.411 70.6965C133.319 70.6925 133.231 70.6832 133.139 70.6645C132.965 70.6365 132.79 70.6231 132.615 70.6231H129.611C129.515 70.6231 129.414 70.6285 129.313 70.6365C128.702 70.6925 128.086 70.7565 127.475 70.8032C125.426 70.9592 123.405 71.2992 121.406 71.7578C121.175 71.8085 120.95 71.8645 120.726 71.9325C119.407 72.1578 118.203 72.7365 117.219 73.5645C117.174 73.6005 117.133 73.6418 117.091 73.6791C117.073 73.6925 117.059 73.7058 117.041 73.7205C117.022 73.7378 116.999 73.7565 116.981 73.7752C116.935 73.8165 116.889 73.8578 116.847 73.8992C116.797 73.9498 116.747 74.0005 116.697 74.0458C116.655 74.0925 116.614 74.1378 116.573 74.1791C116.526 74.2298 116.475 74.2805 116.43 74.3312C116.389 74.3765 116.347 74.4272 116.31 74.4738C116.265 74.5245 116.223 74.5791 116.177 74.6338C116.141 74.6805 116.103 74.7312 116.067 74.7818C116.026 74.8365 115.985 74.8912 115.943 74.9472C115.906 74.9978 115.869 75.0472 115.837 75.0978C115.795 75.1578 115.759 75.2138 115.722 75.2725C115.69 75.3231 115.658 75.3792 115.626 75.4285C115.589 75.4885 115.553 75.5485 115.521 75.6125C115.487 75.6632 115.461 75.7192 115.429 75.7738C115.395 75.8338 115.363 75.8978 115.337 75.9618C115.305 76.0178 115.277 76.0725 115.254 76.1271C115.222 76.1925 115.194 76.2565 115.166 76.3205C115.143 76.3752 115.115 76.4351 115.093 76.4898C115.065 76.5551 115.042 76.6232 115.019 76.6925C114.997 76.7472 114.973 76.8071 114.955 76.8631C114.931 76.9311 114.909 77.0045 114.886 77.0738C114.873 77.1338 114.849 77.1885 114.835 77.2485C114.817 77.3178 114.799 77.3912 114.781 77.4645C114.762 77.5245 114.749 77.5791 114.734 77.6391C114.721 77.7125 114.707 77.7911 114.693 77.8645C114.679 77.9245 114.666 77.9792 114.657 78.0392C114.642 78.1165 114.633 78.1992 114.625 78.2818C114.615 78.3378 114.606 78.3885 114.601 78.4431C114.591 78.5351 114.587 78.6272 114.578 78.7192C114.574 78.7645 114.569 78.8111 114.565 78.8565C114.559 78.9938 114.555 79.1365 114.555 79.2792V194.292C92.1072 178.872 77.3858 153.015 77.3858 123.722C77.3858 76.4725 115.69 38.1685 162.939 38.1685C210.189 38.1685 248.493 76.4725 248.493 123.722C248.493 170.975 210.189 209.279 162.939 209.279ZM0.589844 0.25914L57.5205 433.119L162.939 250.812L268.358 433.119L325.289 0.25914H0.589844Z"
                  fill="#ae1b22"
                />
                <path
                  d="M510.324 183.523C508.344 181.543 503.592 177.977 496.859 175.601C493.295 174.413 489.532 173.424 482.008 173.424C475.475 173.424 470.128 174.017 463.99 176.592C447.554 183.523 440.03 200.352 440.03 217.383C440.03 219.956 440.228 227.084 442.803 234.411C451.119 259.361 473.692 261.143 482.206 261.143C484.583 261.143 493.494 261.143 501.018 257.776C516.66 250.847 522.998 233.025 522.998 217.184C522.998 199.363 515.472 188.077 510.324 183.523ZM543.59 276.588C536.264 281.539 529.136 284.905 520.819 287.281C512.7 289.656 500.424 292.033 480.623 292.033C450.92 292.033 432.902 285.499 421.615 278.767C417.852 276.588 410.922 272.033 403.991 263.717C389.14 245.697 388.547 227.481 388.547 218.571C388.547 183.324 407.358 165.7 418.842 157.979C430.723 149.86 447.752 142.732 479.039 142.335C485.375 142.335 491.512 142.335 497.85 142.929C534.878 145.9 552.106 160.552 561.808 174.413C566.362 181.145 574.48 195.6 574.48 216.788C574.48 229.263 571.906 257.381 543.59 276.588Z"
                  fill="#011E41"
                />
                <path
                  d="M703.788 287.281V233.619H642.601V287.281H592.307V147.485H642.8V198.373H703.788V147.485H754.479V287.281H703.788Z"
                  fill="#011E41"
                />
                <path
                  d="M778.44 147.483H828.538V287.279H778.44V147.483Z"
                  fill="#011E41"
                />
                <path
                  d="M968.337 183.523C966.357 181.543 961.605 177.977 954.872 175.601C951.308 174.413 947.545 173.424 940.021 173.424C933.488 173.424 928.141 174.017 922.002 176.592C905.566 183.523 898.042 200.352 898.042 217.383C898.042 219.956 898.241 227.084 900.816 234.411C909.132 259.361 931.705 261.143 940.218 261.143C942.596 261.143 951.506 261.143 959.03 257.776C974.673 250.847 981.01 233.025 981.01 217.184C981.01 199.363 973.486 188.077 968.337 183.523ZM1001.6 276.588C994.277 281.539 987.149 284.905 978.832 287.281C970.713 289.656 958.437 292.033 938.636 292.033C908.933 292.033 890.914 285.499 879.628 278.767C875.865 276.588 868.934 272.033 862.004 263.717C847.153 245.697 846.56 227.481 846.56 218.571C846.56 183.324 865.37 165.7 876.854 157.979C888.736 149.86 905.765 142.732 937.052 142.335C943.388 142.335 949.525 142.335 955.862 142.929C992.89 145.9 1010.12 160.552 1019.82 174.413C1024.37 181.145 1032.49 195.6 1032.49 216.788C1032.49 229.263 1029.92 257.381 1001.6 276.588Z"
                  fill="#011E41"
                />
                <path
                  d="M1257.64 287.281V271.835C1254.47 274.806 1252.29 276.983 1244.97 280.943C1235.86 285.894 1222.2 291.439 1198.44 291.439C1189.53 291.439 1165.17 290.846 1143.98 274.41C1136.26 268.469 1131.9 262.727 1129.92 259.559C1125.57 253.222 1118.64 239.163 1118.64 219.165C1118.64 209.858 1119.83 188.274 1137.25 169.265C1150.32 155.206 1173.09 141.147 1215.46 141.147C1220.61 141.147 1248.73 141.545 1269.13 151.445C1276.65 155.206 1281.21 159.166 1283.58 161.543C1287.15 164.711 1290.51 168.473 1292.89 172.433C1294.47 174.81 1296.45 179.561 1296.45 179.561L1246.95 184.907C1242.2 179.759 1233.48 172.631 1216.26 172.631C1211.9 172.631 1199.23 172.83 1188.14 180.75C1181.8 185.305 1170.12 196.79 1170.12 217.778C1170.12 222.135 1170.52 235.203 1179.43 245.501C1187.55 255.202 1201.01 259.559 1213.48 259.559C1236.06 259.559 1249.52 246.887 1253.09 238.965C1253.29 238.57 1253.68 236.787 1254.08 235.203H1217.64V203.522H1301.01V287.281H1257.64Z"
                  fill="#011E41"
                />
                <path
                  d="M1438.63 183.523C1436.65 181.543 1431.9 177.977 1425.16 175.601C1421.6 174.413 1417.84 173.424 1410.31 173.424C1403.78 173.424 1398.43 174.017 1392.29 176.592C1375.86 183.523 1368.33 200.352 1368.33 217.383C1368.33 219.956 1368.53 227.084 1371.11 234.411C1379.42 259.361 1402 261.143 1410.51 261.143C1412.89 261.143 1421.8 261.143 1429.32 257.776C1444.97 250.847 1451.3 233.025 1451.3 217.184C1451.3 199.363 1443.78 188.077 1438.63 183.523ZM1471.89 276.588C1464.57 281.539 1457.44 284.905 1449.12 287.281C1441.01 289.656 1428.73 292.033 1408.93 292.033C1379.23 292.033 1361.21 285.499 1349.92 278.767C1346.16 276.588 1339.23 272.033 1332.3 263.717C1317.44 245.697 1316.85 227.481 1316.85 218.571C1316.85 183.324 1335.66 165.7 1347.15 157.979C1359.03 149.86 1376.06 142.732 1407.34 142.335C1413.68 142.335 1419.82 142.335 1426.15 142.929C1463.18 145.9 1480.41 160.552 1490.11 174.413C1494.67 181.145 1502.78 195.6 1502.78 216.788C1502.78 229.263 1500.21 257.381 1471.89 276.588Z"
                  fill="#011E41"
                />
                <path
                  d="M1520.81 287.281V147.485H1571.11V253.223H1642.59V287.281H1520.81Z"
                  fill="#011E41"
                />
                <path
                  d="M1707.34 178.968V205.7H1787.14V236.985H1707.34V287.281H1657.24V147.485H1794.27V178.968H1707.34Z"
                  fill="#011E41"
                />
                <path
                  d="M2037.63 269.261C2019.61 287.479 1990.5 292.033 1966.15 292.033C1939.81 292.033 1924.76 287.083 1914.27 282.132C1900.41 275.599 1873.67 258.371 1873.67 217.383C1873.67 210.056 1874.67 192.037 1886.35 175.205C1898.63 157.581 1921.2 141.544 1967.73 141.544C2005.75 141.544 2027.33 151.444 2039.02 164.315C2046.74 172.632 2049.71 181.937 2050.9 185.7L2004.56 193.819C2003.18 191.045 2002.38 189.463 2000.4 186.889C1992.88 177.185 1980.4 173.225 1968.72 173.424C1963.97 173.424 1948.13 174.413 1937.04 186.096C1929.32 194.412 1926.15 206.096 1926.15 217.184C1926.15 232.035 1931.5 240.945 1935.26 245.697C1946.15 259.955 1961 260.351 1967.34 260.351C1985.95 260.351 1997.04 251.044 2001.39 245.301C2002.98 243.124 2003.97 241.54 2005.75 236.985L2053.47 241.936C2051.89 247.084 2048.13 258.568 2037.63 269.261Z"
                  fill="#011E41"
                />
                <path
                  d="M2065.55 287.281V147.485H2115.85V253.223H2187.33V287.281H2065.55Z"
                  fill="#011E41"
                />
                <path
                  d="M2352.67 274.013C2340.59 285.3 2320.4 292.23 2284.95 292.23C2281.59 292.23 2268.12 292.23 2255.84 290.646C2251.09 290.052 2222.38 286.686 2209.31 266.885C2201.59 255.201 2201.98 241.737 2201.98 237.182V147.484H2251.88V226.886C2251.88 236.984 2252.68 245.894 2260.8 253.221C2269.51 261.142 2281.59 261.142 2284.95 261.142C2287.72 261.142 2300.2 260.944 2308.52 253.816C2312.08 250.648 2313.86 246.886 2314.46 245.5C2317.43 239.162 2317.62 232.826 2317.62 226.094V147.484H2367.52V220.748C2367.52 239.756 2368.12 259.558 2352.67 274.013Z"
                  fill="#011E41"
                />
                <path
                  d="M2503.96 183.919C2501.38 179.561 2496.63 178.968 2492.08 178.968H2442.18V200.751H2488.51C2493.66 200.751 2500.99 201.145 2504.16 195.404C2504.95 193.819 2505.54 191.64 2505.54 189.859C2505.54 188.869 2505.54 186.492 2503.96 183.919ZM2498.22 231.045H2441.78V255.401H2494.45C2494.85 255.401 2498.81 255.401 2501.38 254.808C2507.72 253.421 2510.89 248.868 2510.89 242.531C2510.89 231.244 2501.58 231.045 2498.22 231.045ZM2552.47 270.449C2539.6 285.895 2517.03 287.281 2499.21 287.281H2391.69V147.485H2509.11C2523.17 147.485 2540.39 148.475 2548.71 162.137C2550.69 165.305 2553.46 171.245 2553.46 180.157C2553.46 183.325 2553.26 192.236 2547.52 199.563C2544.35 203.523 2538.02 208.869 2526.73 211.64C2535.44 213.027 2543.36 214.412 2550.29 220.352C2558.61 227.284 2560.59 235.797 2560.59 246.095C2560.59 250.451 2560.39 260.748 2552.47 270.449Z"
                  fill="#011E41"
                />
              </svg>
            </Link>

            {/* Desktop Navigation */}
            <nav
              className={`hidden md:flex items-center space-x-8 shrink-0 ${fadeIn("sm")}`}
            >
              <Link
                href="#lessons"
                className="text-[#011E41] font-bold hover:text-primary transition-colors shrink-0"
              >
                Lessons
                &
                Fittings
              </Link>
              <Link
                href="#memberships-benefits"
                className="text-[#011E41] font-bold hover:text-primary transition-colors shrink-0"
              >
                Memberships
              </Link>
              <Link
                href="#bay-rentals"
                className="text-[#011E41] font-bold hover:text-primary transition-colors shrink-0"
              >
                Bay
                Rentals
              </Link>
              <Link
                href="tel:13309580052"
                className="text-[#011E41] font-bold hover:text-primary transition-colors shrink-0"
              >
                (330)
                958-0052
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden relative z-50 p-2 text-[#011E41] transition-colors focus:outline-none ${fadeIn("md")}`}
              onClick={
                toggleMenu
              }
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={
                      2
                    }
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={
                      2
                    }
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          {isMenuOpen && (
            <div className="md:hidden max-h-[80vh] pt-8 overflow-y-auto flex items-center justify-center">
              <div className="flex flex-col items-center text-center">
                <Link
                  href="#lessons"
                  className="text-[#011e41] text-xl font-bold hover:text-primary transition-colors py-4"
                  onClick={() =>
                    setIsMenuOpen(
                      false
                    )
                  }
                >
                  Lessons
                  &
                  Fittings
                </Link>
                <Link
                  href="#memberships-benefits"
                  className="text-[#011e41] text-xl font-bold hover:text-primary transition-colors py-4"
                  onClick={() =>
                    setIsMenuOpen(
                      false
                    )
                  }
                >
                  Memberships
                </Link>
                <Link
                  href="#bay-rentals"
                  className="text-[#011e41] text-xl font-bold hover:text-primary transition-colors py-4"
                  onClick={() =>
                    setIsMenuOpen(
                      false
                    )
                  }
                >
                  Bay
                  Rentals
                </Link>
                <Link
                  href="tel:13309580052"
                  className="text-[#011e41] text-xl font-bold hover:text-primary transition-colors py-4"
                  onClick={() =>
                    setIsMenuOpen(
                      false
                    )
                  }
                >
                  (330)
                  958-0052
                </Link>
                <Button
                  variant="primary"
                  size="lg"
                  className="mt-8 px-12 py-4 text-xl"
                  style={{
                    backgroundColor:
                      "#ae1b22",
                    color:
                      "white",
                  }}
                  onClick={() => {
                    setIsMenuOpen(
                      false
                    );
                    openContactModal();
                  }}
                >
                  Contact
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>
    );
  };

export { Navbar };
