import React from "react";
import { Link } from "react-router-dom";

const FooterPage = () => {
  return (
    <>
      <footer
        style={{ marginTop: "100px" }}
        className="footer widget-footer ttm-bg ttm-bgimage-yes ttm-bgcolor-darkgrey ttm-textcolor-white clearfix mt-4"
      >
        <div className="ttm-row-wrapper-bg-layer ttm-bg-layer"></div>

        <div className="sep_holder_box">
          <span className="sep_holder">
            <span className="sep_line"></span>
          </span>
        </div>

        <div className="sep_holder_box">
          <span className="sep_holder">
            <span className="sep_line"></span>
          </span>
        </div>

        <div className="sep_holder_box">
          <span className="sep_holder">
            <span className="sep_line"></span>
          </span>
        </div>
        <div className="bottom-footer-text">
          <div className="container">
            <div className="row copyright">
              <div className="col-md-12 col-lg-6 ttm-footer2-left">
                <span>Copyright © 2025 Mega Connect </span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <a id="totop" href="#top">
        <i className="fa fa-angle-up"></i>
      </a>
    </>
  );
};

export default FooterPage;
