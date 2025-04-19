import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaPhone,
  FaEnvelope,
  FaCommentDots,
  FaLink,
  FaLinkedin,
  FaFacebook,
  FaYoutube,
  FaCalendarAlt,
  FaShareAlt,
  FaGlobe,
  FaBuilding,
  FaPlayCircle,
  FaThLarge,
  FaRegImages,
  FaRegUserCircle,
  FaInfo,
  FaRegShareSquare,
  FaAddressCard,
  FaMobile,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

const ProfileComponent = ({ profile, handleAddToContacts, shareContact }) => {
  const [projectsPerPage, setProjectsPerPage] = useState(2);
  const [galleryItemsPerPage, setGalleryItemsPerPage] = useState(2);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div
      className="container d-flex justify-content-center  min-vh-100"
      style={{ backgroundColor: "#fff" }}
    >
      <div
        className="card w-100"
        style={{
          maxWidth: "400px",
          borderWidth: "0px",
          backgroundColor: profile.theme_color,
        }}
      >
        <div
          className="card-img-top"
          style={{
            height: "150px",
            width: "100%",
            backgroundImage: `url(${profile.banner_url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="card-body text-center">
          <img
            src={profile.avatar_url}
            alt="Profile"
            className="rounded-circle shadow mb-3"
            style={{
              width: "100px",
              height: "100px",
              marginTop: "-50px",
              borderColor: profile.theme_color,
              borderWidth: "1px",
              borderStyle: "solid",
            }}
          />
          <h5
            className="card-title mb-0"
            style={{ color: profile.heading_color }}
          >
            {profile.first_name} {profile.last_name}
          </h5>
          <p className="mb-1" style={{ color: profile.secondary_color }}>
            {profile.company_name}
          </p>
          <p style={{ color: profile.text_color }}>
            {profile?.positions?.map((position) => position).join(" | ")}
          </p>

          <div className="row text-center mb-3">
            {profile?.mobile && (
              <>
                <div className="col-3">
                  <a
                    href={`tel:${profile.mobile}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaMobile
                      title="Call"
                      style={{ color: profile.secondary_color }}
                    />
                    <div style={{ fontSize: "12px" }}>Mobile</div>
                  </a>
                </div>
                <div className="col-3">
                  <a
                    href={`sms:${profile.mobile}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaCommentDots
                      title="Text"
                      style={{ color: profile.secondary_color }}
                    />
                    <div style={{ fontSize: "12px" }}>SMS</div>
                  </a>
                </div>
              </>
            )}
            {profile?.email && (
              <div className="col-3">
                <a
                  href={`mailto:${profile.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaEnvelope
                    title="Email"
                    style={{ color: profile.secondary_color }}
                  />
                  <div style={{ fontSize: "12px" }}>Email</div>
                </a>
              </div>
            )}

            {profile?.land_line && (
              <>
                <div className="col-3">
                  <a
                    href={`tel:${profile.land_line}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaPhone
                      title="Call"
                      style={{ color: profile.secondary_color }}
                    />
                    <div style={{ fontSize: "12px" }}>Land Line</div>
                  </a>
                </div>
              </>
            )}

            {profile?.website_url && (
              <div className="col-3">
                <a
                  href={profile.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLink
                    title="Connect"
                    style={{ color: profile.secondary_color }}
                  />
                  <div style={{ fontSize: "12px" }}>Connect</div>
                </a>
              </div>
            )}

            {profile?.linkedin_url && (
              <div className="col-3">
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin
                    title="LinkedIn"
                    style={{ color: profile.secondary_color }}
                  />
                  <div style={{ fontSize: "12px" }}>LinkedIn</div>
                </a>
              </div>
            )}

            {profile?.facebook_url && (
              <div className="col-3">
                <a
                  href={profile.facebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook
                    title="Facebook"
                    style={{ color: profile.secondary_color }}
                  />
                  <div style={{ fontSize: "12px" }}>Facebook</div>
                </a>
              </div>
            )}
            {profile?.instagram_url && (
              <div className="col-3">
                <a
                  href={profile.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram
                    title="Instagram"
                    style={{ color: profile.secondary_color }}
                  />
                  <div style={{ fontSize: "12px" }}>Instagram</div>
                </a>
              </div>
            )}

            {profile?.x_url && (
              <div className="col-3">
                <a
                  href={profile.x_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter
                    title="Instagram"
                    style={{ color: profile.secondary_color }}
                  />
                  <div style={{ fontSize: "12px" }}>X</div>
                </a>
              </div>
            )}

            {profile?.youtube_url && (
              <div className="col-3">
                <a
                  href={profile.youtube_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaYoutube
                    title="YouTube"
                    style={{ color: profile.secondary_color }}
                  />
                  <div style={{ fontSize: "12px" }}>Youtube</div>
                </a>
              </div>
            )}

            {profile?.booking_url && (
              <div className="col-3">
                <a
                  href={profile.booking_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaCalendarAlt
                    title="Book Me"
                    style={{ color: profile.secondary_color }}
                  />
                  <div style={{ fontSize: "12px" }}>Book Me</div>
                </a>
              </div>
            )}
          </div>

          <div className="d-flex gap-2 mb-3" style={{ gap: "0.5rem" }}>
            <button
              className="btn w-100"
              style={{
                fontSize: "12px",
                backgroundColor: profile.button_background_color,
                borderColor: profile.button_background_color,
                color: profile.button_text_color,
              }}
              onClick={handleAddToContacts}
            >
              <FaAddressCard /> ADD TO CONTACTS
            </button>
            <button
              className="btn w-100"
              onClick={() => shareContact(profile)}
              style={{
                fontSize: "12px",
                color: profile.button_background_color,
                borderColor: profile.button_background_color,
              }}
            >
              SHARE <FaShareAlt />
            </button>
          </div>

          {profile?.website_url && (
            <a
              href={profile.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn w-100 mb-3"
              style={{
                fontSize: "12px",
                textDecoration: "none",
                display: "inline-block",
                color: profile.button_text_color,
                backgroundColor: profile.button_background_color,
                borderColor: profile.button_background_color,
              }}
            >
              <FaGlobe /> Website
            </a>
          )}

          <div
            className="d-flex gap-2 mb-3"
            style={{
              gap: "0rem",
              alignItems: "center",
            }}
          >
            <div
              style={{
                flex: 3,
                height: "100%",
                borderTop: `1px solid ${profile.divider_color}`,
              }}
            />
            <div style={{ flex: 1 }}>
              <FaBuilding color={profile.divider_icon_color} />
            </div>
            <div
              style={{
                flex: 3,
                height: "100%",
                borderTop: `1px solid ${profile.divider_color}`,
              }}
            />
          </div>

          <div className="pt-1 mb-3">
            <h6 className="mb-1" style={{ color: profile.heading_color }}>
              About {profile.company_name}
            </h6>
            <p className="small" style={{ color: profile.secondary_color }}>
              {profile.tag_line}
            </p>

            <div
              className="row g-2"
              style={{ gap: "0.5rem", position: "relative" }}
            >
              <div className="col-12 position-relative">
                <img
                  src={profile.company_banner_url}
                  alt="Company Banner"
                  className="img-fluid rounded"
                  style={{ width: "100%", height: "auto" }}
                />

                {/* Overlay */}
                {profile.company_video_url && (
                  <a
                    href="https://www.youtube.com/watch?v=VIDEO_ID"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="d-flex align-items-center justify-content-center text-white text-decoration-none rounded"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(0, 0, 0, 0)",
                      opacity: 1,
                      zIndex: 10,
                      fontSize: "1rem",
                      fontWeight: "600",
                      transition: "opacity 0.3s",
                    }}
                  >
                    <FaPlayCircle size={64} />
                  </a>
                )}
              </div>
            </div>

            <p
              className="small text-justify pt-1"
              style={{ color: profile.text_color }}
            >
              {profile.company_bio}
            </p>
          </div>

          <div
            className="d-flex gap-2 mb-3"
            style={{
              gap: "0rem",
              alignItems: "center",
            }}
          >
            <div
              style={{
                flex: 3,
                height: "100%",
                borderTop: `1px solid ${profile.divider_color}`,
              }}
            />
            <div style={{ flex: 1 }}>
              <FaThLarge color={profile.divider_icon_color} />
            </div>
            <div
              style={{
                flex: 3,
                height: "100%",
                borderTop: `1px solid ${profile.divider_color}`,
              }}
            />
          </div>

          {/* Portfolio Section */}
          <div className="text-start pt-1">
            <h6
              className="text-center mb-3"
              style={{ color: profile.heading_color }}
            >
              Portfolio
            </h6>
            <div className="row g-2" style={{ gap: "0.5rem" }}>
              {profile?.projects
                ?.slice(0, projectsPerPage)
                .map((project, index) => (
                  <div className="col-12" key={index}>
                    <img
                      src={project}
                      alt={project}
                      className="img-fluid rounded"
                    />
                  </div>
                ))}
            </div>
          </div>

          {profile?.projects?.length > projectsPerPage && (
            <button
              className="btn w-100 mb-3 mt-2"
              style={{
                fontSize: "12px",
                padding: "0.5rem",
                backgroundColor: profile.button_background_color,
                borderColor: profile.button_background_color,
                color: profile.button_text_color,
              }}
              onClick={() => setProjectsPerPage((prev) => prev + 3)}
            >
              View More Projects
            </button>
          )}

          <div
            className="d-flex gap-2 mb-3 mt-3"
            style={{
              gap: "0rem",
              alignItems: "center",
            }}
          >
            <div
              style={{
                flex: 3,
                height: "100%",
                borderTop: `1px solid ${profile.divider_color}`,
              }}
            />
            <div style={{ flex: 1 }}>
              <FaRegUserCircle color={profile.divider_icon_color} />
            </div>
            <div
              style={{
                flex: 3,
                height: "100%",
                borderTop: `1px solid ${profile.divider_color}`,
              }}
            />
          </div>

          {/* Portfolio Section */}
          <div className="text-start pt-1 ">
            <h6
              className="text-center mb-3"
              style={{ color: profile.heading_color }}
            >
              About
            </h6>
            <div className="row g-2" style={{ gap: "0.5rem" }}>
              <div className="col-12">
                <img
                  src={profile.avatar_url}
                  alt=""
                  className="img-fluid rounded"
                />
              </div>
            </div>

            <p
              className="small text-justify pt-1"
              style={{ color: profile.text_color }}
            >
              {profile.bio}
            </p>
          </div>

          <div
            className="d-flex gap-2 mb-3"
            style={{
              gap: "0rem",
              alignItems: "center",
            }}
          >
            <div
              style={{
                flex: 3,
                height: "100%",
                borderTop: `1px solid ${profile.divider_color}`,
              }}
            />
            <div style={{ flex: 1 }}>
              <FaRegImages color={profile.divider_icon_color} />
            </div>
            <div
              style={{
                flex: 3,
                height: "100%",
                borderTop: `1px solid ${profile.divider_color}`,
              }}
            />
          </div>

          {/* Portfolio Section */}
          <div className="text-start pt-1">
            <h6
              className="text-center mb-3"
              style={{ color: profile.heading_color }}
            >
              Gallery
            </h6>
            <div className="row g-1">
              {profile?.gallery
                ?.slice(0, galleryItemsPerPage)
                .map((item, index) => (
                  <div
                    className="col-6"
                    key={index}
                    style={{ marginBottom: "0.5rem" }}
                  >
                    <img src={item} alt={item} className="img-fluid rounded" />
                  </div>
                ))}
            </div>
          </div>

          {profile?.gallery?.length > galleryItemsPerPage && (
            <button
              className="btn w-100 mb-3 mt-2"
              style={{
                fontSize: "12px",
                padding: "0.5rem",
                backgroundColor: profile.button_background_color,
                borderColor: profile.button_background_color,
                color: profile.button_text_color,
              }}
              onClick={() => setGalleryItemsPerPage((prev) => prev + 4)}
            >
              View More
            </button>
          )}

          <div
            className="d-flex gap-2 mb-3 mt-3"
            style={{
              gap: "0rem",
              alignItems: "center",
            }}
          >
            <div
              style={{
                flex: 3,
                height: "100%",
                borderTop: `1px solid ${profile.divider_color}`,
              }}
            />
            <div style={{ flex: 1 }}>
              <FaInfo color={profile.divider_icon_color} />
            </div>
            <div
              style={{
                flex: 3,
                height: "100%",
                borderTop: `1px solid ${profile.divider_color}`,
              }}
            />
          </div>

          {/* Portfolio Section */}
          <div className="text-start pt-1">
            <h6
              className="text-center mb-3"
              style={{ color: profile.heading_color }}
            >
              Resources
            </h6>
          </div>

          <button
            className="btn w-100 mb-3 mt-2"
            style={{
              fontSize: "12px",
              padding: "0.5rem",
              backgroundColor: profile.button_background_color,
              borderColor: profile.button_background_color,
              color: profile.button_text_color,
            }}
          >
            Download Our App
          </button>

          <button
            className="btn w-100 mb-3 mt-2"
            style={{
              fontSize: "12px",
              padding: "0.5rem",
              backgroundColor: profile.button_background_color,
              borderColor: profile.button_background_color,
              color: profile.button_text_color,
            }}
          >
            Contact Developers
          </button>

          <div
            className="d-flex gap-2 mb-3 mt-3"
            style={{
              gap: "0rem",
              alignItems: "center",
            }}
          >
            <div
              style={{
                flex: 3,
                height: "100%",
                borderTop: `1px solid ${profile.divider_color}`,
              }}
            />
            <div style={{ flex: 1 }}>
              <FaRegShareSquare color={profile.divider_icon_color} />
            </div>
            <div
              style={{
                flex: 3,
                height: "100%",
                borderTop: `1px solid ${profile.divider_color}`,
              }}
            />
          </div>

          <button
            className="btn w-100 mb-3 mt-2"
            style={{
              fontSize: "12px",
              padding: "0.5rem",
              backgroundColor: profile.button_background_color,
              borderColor: profile.button_background_color,
              color: profile.button_text_color,
            }}
          >
            Share My Information
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
