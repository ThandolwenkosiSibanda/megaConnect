import React, { useEffect, useState } from "react";
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
} from "react-icons/fa";
import { supabase } from "../utils/supabase";

export default function BusinessProfileCard() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [profile, setProfile] = useState({});
  const id = "71d226d4-217b-4073-a781-b7880987ebfe";

  const handleAddToContacts = () => {
    const vCardData = `
    BEGIN:VCARD
    VERSION:3.0
    N:${profile?.last_name || ""};${profile?.first_name || ""};;;
    FN:${profile?.first_name || ""} ${profile?.last_name || ""}
    ORG:${profile?.company_name || ""}
    TITLE:Owner
    TEL;TYPE=WORK,VOICE:+123456789
    TEL;TYPE=CELL,VOICE:+1987654321
    TEL;TYPE=HOME,VOICE:+1123456789
    EMAIL;TYPE=WORK:elizabeth@barcenasdesign.com
    EMAIL;TYPE=HOME:elizabeth.home@example.com
    URL:${profile?.website_url || ""}
    ADR;TYPE=WORK:;;123 Design Street;Los Angeles;CA;90210;USA
    BDAY:1985-05-12
    NOTE:Award-winning designer and creative director at Barcenas Design.
    PHOTO;TYPE=JPEG;VALUE=URI:https://randomuser.me/api/portraits/women/44.jpg
    X-SOCIALPROFILE;TYPE=linkedin:https://www.linkedin.com/in/elizabethbarcenas
    X-SOCIALPROFILE;TYPE=facebook:https://facebook.com/elizabethbarcenas
    X-SOCIALPROFILE;TYPE=youtube:https://youtube.com/elizabethbarcenas
    REV:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z
    END:VCARD
    `.trim();

    const blob = new Blob([vCardData], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${profile.last_name}${profile.first_name}${profile.id}.vcf`;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // if (!id) throw new Error("Product ID is missing");

        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", id)
          .single();

        console.log("Data:", data);

        if (error) throw error;

        setProfile(data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div
      className="container d-flex justify-content-center  min-vh-100"
      style={{ backgroundColor: "#fff" }}
    >
      <div
        className="card w-100"
        style={{ maxWidth: "400px", borderWidth: "0px" }}
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
            className="rounded-circle border border-white shadow mb-3"
            style={{ width: "100px", height: "100px", marginTop: "-50px" }}
          />
          <h5 className="card-title mb-0">
            {profile.first_name} {profile.last_name}
          </h5>
          <p className="mb-1" style={{ color: "#4f79c0" }}>
            {profile.company_name}
          </p>
          <p className="text-muted">
            Co-founder | App Developer | Website Designer
          </p>

          <div className="row text-center mb-3">
            <div className="col-3">
              <FaEnvelope title="Email" style={{ color: "#4f79c0" }} />
              <div style={{ fontSize: "12px" }}>Email</div>
            </div>
            <div className="col-3">
              <FaPhone title="Call" style={{ color: "#4f79c0" }} />
              <div style={{ fontSize: "12px" }}>Phone</div>
            </div>
            <div className="col-3">
              <FaCommentDots title="Text" style={{ color: "#4f79c0" }} />
              <div style={{ fontSize: "12px" }}>SMS</div>
            </div>
            <div className="col-3">
              <FaLink title="Connect" style={{ color: "#4f79c0" }} />
              <div style={{ fontSize: "12px" }}>Connect</div>
            </div>
            <div className="col-3">
              <FaLinkedin title="LinkedIn" style={{ color: "#4f79c0" }} />
              <div style={{ fontSize: "12px" }}>LinkedIn</div>
            </div>
            <div className="col-3">
              <FaFacebook title="Facebook" style={{ color: "#4f79c0" }} />
              <div style={{ fontSize: "12px" }}>Facebook</div>
            </div>
            <div className="col-3">
              <FaYoutube title="YouTube" style={{ color: "#4f79c0" }} />
              <div style={{ fontSize: "12px" }}>Youtube</div>
            </div>
            <div className="col-3">
              <FaCalendarAlt title="Book Me" style={{ color: "#4f79c0" }} />
              <div style={{ fontSize: "12px" }}>Book Me</div>
            </div>
          </div>

          <div className="d-flex gap-2 mb-3" style={{ gap: "0.5rem" }}>
            <button
              className="btn btn-warning w-100 text-white"
              style={{
                fontSize: "12px",
                backgroundColor: "#24283b",
                borderColor: "#24283b",
              }}
              onClick={handleAddToContacts}
            >
              ADD TO CONTACTS
            </button>
            <button
              className="btn btn-outline-secondary w-100"
              style={{ fontSize: "12px" }}
            >
              SHARE <FaShareAlt />
            </button>
          </div>

          <button
            className="btn btn-dark w-100 mb-3"
            style={{ fontSize: "12px" }}
          >
            <FaGlobe /> Website
          </button>

          <div
            className="d-flex gap-2 mb-3"
            style={{
              gap: "0rem",
              alignItems: "center",
            }}
          >
            <div
              className="border-top"
              style={{ flex: 3, height: "100%" }}
            ></div>
            <div style={{ flex: 1 }}>
              <FaBuilding />
            </div>
            <div className="border-top" style={{ flex: 3 }}></div>
          </div>

          <div className="pt-1 mb-3">
            <h6 className="mb-1">About {profile.company_name}</h6>
            <p className="small" style={{ color: "#4f79c0" }}>
              {profile.tag_line}
            </p>

            <div
              className="row g-2"
              style={{ gap: "0.5rem", position: "relative" }}
            >
              <div className="col-12 position-relative">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                  alt="Project 1"
                  className="img-fluid rounded"
                  style={{ width: "100%", height: "auto" }}
                />

                {/* Overlay */}
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
              </div>
            </div>

            <p className="small text-muted text-justify pt-1">
              Continuum is a far cry from your typical web and mobile app
              development services provider. We help small to medium business
              leaders make IT investments with confidence, meet the needs of the
              business, and optimize user productivity.
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
              className="border-top"
              style={{ flex: 3, height: "100%" }}
            ></div>
            <div style={{ flex: 1 }}>
              <FaThLarge />
            </div>
            <div className="border-top" style={{ flex: 3 }}></div>
          </div>

          {/* Portfolio Section */}
          <div className="text-start pt-1">
            <h6 className="text-center mb-3">Portfolio</h6>
            <div className="row g-2" style={{ gap: "0.5rem" }}>
              <div className="col-12">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                  alt="Project 1"
                  className="img-fluid rounded"
                />
              </div>
              <div className="col-12">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                  alt="Project 2"
                  className="img-fluid rounded"
                />
              </div>
            </div>
          </div>

          <button
            className="btn btn-dark w-100 mb-3 mt-2"
            style={{ fontSize: "12px", padding: "0.5rem" }}
          >
            View More Projects
          </button>

          <div
            className="d-flex gap-2 mb-3"
            style={{
              gap: "0rem",
              alignItems: "center",
            }}
          >
            <div
              className="border-top"
              style={{ flex: 3, height: "100%" }}
            ></div>
            <div style={{ flex: 1 }}>
              <FaRegUserCircle />
            </div>
            <div className="border-top" style={{ flex: 3 }}></div>
          </div>

          {/* Portfolio Section */}
          <div className="text-start pt-1">
            <h6 className="text-center mb-3">About</h6>
            <div className="row g-2" style={{ gap: "0.5rem" }}>
              <div className="col-12">
                <img
                  src={profile.avatar_url}
                  alt="Project 1"
                  className="img-fluid rounded"
                />
              </div>
            </div>

            <p className="small text-muted text-justify pt-1">
              Thando is an experienced Full-Stack Developer proficient in
              ReactJS, NodeJS, React Native, Typescript, MongoDB, GraphQL,
              Vanilla JavaScript, and a proven track record of being able to
              work in a fast-paced collaborative environment....
            </p>
            <p className="small text-muted text-justify">Read More</p>
          </div>

          <div
            className="d-flex gap-2 mb-3"
            style={{
              gap: "0rem",
              alignItems: "center",
            }}
          >
            <div
              className="border-top"
              style={{ flex: 3, height: "100%" }}
            ></div>
            <div style={{ flex: 1 }}>
              <FaRegImages />
            </div>
            <div className="border-top" style={{ flex: 3 }}></div>
          </div>

          {/* Portfolio Section */}
          <div className="text-start pt-1">
            <h6 className="text-center mb-3">Gallery</h6>
            <div className="row g-1">
              <div className="col-6" style={{ marginBottom: "0.5rem" }}>
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                  alt="Project 1"
                  className="img-fluid rounded"
                />
              </div>
              <div className="col-6" style={{ marginBottom: "0.5rem" }}>
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                  alt="Project 2"
                  className="img-fluid rounded"
                />
              </div>
              <div className="col-6" style={{ marginBottom: "0.5rem" }}>
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                  alt="Project 2"
                  className="img-fluid rounded"
                />
              </div>
              <div className="col-6" style={{ marginBottom: "0.5rem" }}>
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                  alt="Project 2"
                  className="img-fluid rounded"
                />
              </div>
            </div>
          </div>

          <div
            className="d-flex gap-2 mb-3 mt-3"
            style={{
              gap: "0rem",
              alignItems: "center",
            }}
          >
            <div
              className="border-top"
              style={{ flex: 3, height: "100%" }}
            ></div>
            <div style={{ flex: 1 }}>
              <FaInfo />
            </div>
            <div className="border-top" style={{ flex: 3 }}></div>
          </div>

          {/* Portfolio Section */}
          <div className="text-start pt-1">
            <h6 className="text-center mb-3">Resources</h6>
          </div>

          <button
            className="btn btn-dark w-100 mb-3 mt-2"
            style={{ fontSize: "12px", padding: "0.5rem" }}
          >
            Download Our App
          </button>

          <button
            className="btn btn-dark w-100 mb-3 mt-2"
            style={{ fontSize: "12px", padding: "0.5rem" }}
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
              className="border-top"
              style={{ flex: 3, height: "100%" }}
            ></div>
            <div style={{ flex: 1 }}>
              <FaRegShareSquare />
            </div>
            <div className="border-top" style={{ flex: 3 }}></div>
          </div>

          <button
            className="btn btn-dark w-100 mb-3 mt-2"
            style={{ fontSize: "12px", padding: "0.5rem" }}
          >
            Share My Information
          </button>
        </div>
      </div>
    </div>
  );
}
