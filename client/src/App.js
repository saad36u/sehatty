import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="d-flex flex-column flex-root">
      <div className="page d-flex flex-row flex-column-fluid">
        <div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
          {/* Header */}
          <div
            id="kt_header"
            className="header"
            data-kt-sticky="true"
            style={{ height: "105px" }}
          >
            <div className="container-xxl header-container">
              <div className="d-flex align-items-center">
                <Link to="/">
                  <img
                    alt="Logo"
                    src="https://www.sehatty.ps/public/assets/sehatty_moh.png"
                    className="h-50px"
                  />
                </Link>
              </div>

              <div className="header-title">الخدمات الالكترونية</div>

              <div className="d-flex align-items-center gap-3">
                {/* <Link className="btn btn-light-primary" to="/">
                  واجهة المواطن
                </Link>
                <Link className="btn btn-light-warning" to="/login">
                  لوحة التحكم
                </Link> */}
              </div>
            </div>
          </div>

          {/* Toolbar */}
          <div className="toolbar py-5 py-lg-7" id="kt_toolbar"></div>

          {/* Content */}
          <div
            id="kt_content_container"
            className="d-flex flex-column-fluid align-items-start container-xxl"
          >
            <div className="content flex-row-fluid" id="kt_content">
              <Routes>
                <Route path="/" element={<SearchPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin" element={<AdminPage />} />
              </Routes>
            </div>
          </div>

          {/* Footer */}
          <div className="footer py-4 d-flex flex-lg-column" id="kt_footer">
            <div className="container-xxl d-flex flex-column flex-md-row align-items-center justify-content-between">
              <div className="text-dark order-2 order-md-1">
                <span className="text-muted fw-bold me-1">©️ 2025 - MOH</span>
              </div>
              <ul className="menu menu-gray-600 menu-hover-primary fw-bold order-1">
                <li className="menu-item">
                  <a className="menu-link px-2">About</a>
                </li>
                <li className="menu-item">
                  <a className="menu-link px-2">Support</a>
                </li>
                <li className="menu-item">
                  <a className="menu-link px-2">Contact</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolltop */}
      <div id="kt_scrolltop" className="scrolltop" data-kt-scrolltop="true">
        <span className="svg-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <rect
              opacity="0.5"
              x="13"
              y="6"
              width="13"
              height="2"
              rx="1"
              transform="rotate(90 13 6)"
              fill="black"
            />
            <path
              d="M12.5657 8.56569L16.75 12.75C17.1642 13.1642 17.8358 13.1642 18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25L12.7071 5.70711C12.3166 5.31658 11.6834 5.31658 11.2929 5.70711L5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75C6.16421 13.1642 6.83579 13.1642 7.25 12.75L11.4343 8.56569C11.7467 8.25327 12.2533 8.25327 12.5657 8.56569Z"
              fill="black"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}

export default App;
