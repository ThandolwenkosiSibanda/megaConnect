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
  FaAddressCard,
} from "react-icons/fa";
import { supabase } from "../utils/supabase";

export default function BusinessProfileCard() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [profile, setProfile] = useState({});
  const [projectsPerPage, setProjectsPerPage] = useState(2);
  const [galleryItemsPerPage, setGalleryItemsPerPage] = useState(2);
  const id = "71d226d4-217b-4073-a781-b7880987ebfe";

  const handleAddToContacts = () => {
    const vCardData = `
BEGIN:VCARD
VERSION:3.0
FN:Thandolwenkosi Sibanda
ORG:Continuum Creative Agency
TEL;TYPE=CELL,VOICE:+263776406842
TEL;TYPE=WORK,VOICE:+263776406842
TEL;TYPE=HOME,VOICE:+263776406842
TITLE:Co-founder
NOTE:Co-founder | App Developer | Website Designer
URL:https://continuum.co.zw
ADR;TYPE=WORK:;;1st Floor, 2nd Street, Harare, Zimbabwe
EMAIL:sibandathandolwenkosi2@gmail.com
END:VCARD
    `.trim();

    const blob = new Blob([vCardData], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "Elizabeth_Barcenas.vcf";
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const shareContact = async (profile) => {
    const contactText = `
  ${profile.first_name} ${profile.last_name}
  ${profile.title || "Owner"}, ${profile.company_name}
  
  Phone: +123456789
  Mobile: +1987654321
  Email: ${profile.email || "elizabeth@barcenasdesign.com"}
  Website: ${profile.website_url}
  Address: 123 Design Street, Los Angeles, CA 90210
  `.trim();

    const shareData = {
      title: `${profile.first_name} ${profile.last_name} - Contact Info`,
      text: contactText,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Error sharing:", err);
        alert("Sharing failed or was canceled.");
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(contactText);
        alert(
          "Contact copied to clipboard. You can now paste it into SMS, email, or WhatsApp."
        );
      } catch (err) {
        alert("Failed to copy contact info.");
      }
    }
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
            {profile?.positions?.map((position) => position).join(" | ")}
            {/* Co-founder | App Developer | Website Designer */}
          </p>

          <div className="row text-center mb-3">
            <div className="col-3">
              <a
                href={`mailto:${profile.email}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaEnvelope title="Email" style={{ color: "#4f79c0" }} />
                <div style={{ fontSize: "12px" }}>Email</div>
              </a>
            </div>
            <div className="col-3">
              <a
                href={`tel:${profile.phone}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaPhone title="Call" style={{ color: "#4f79c0" }} />
                <div style={{ fontSize: "12px" }}>Phone</div>
              </a>
            </div>
            <div className="col-3">
              <a
                href={`sms:${profile.phone}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaCommentDots title="Text" style={{ color: "#4f79c0" }} />
                <div style={{ fontSize: "12px" }}>SMS</div>
              </a>
            </div>
            <div className="col-3">
              <a
                href={profile.website_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLink title="Connect" style={{ color: "#4f79c0" }} />
                <div style={{ fontSize: "12px" }}>Connect</div>
              </a>
            </div>
            <div className="col-3">
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin title="LinkedIn" style={{ color: "#4f79c0" }} />
                <div style={{ fontSize: "12px" }}>LinkedIn</div>
              </a>
            </div>
            <div className="col-3">
              <a
                href={profile.facebook_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook title="Facebook" style={{ color: "#4f79c0" }} />
                <div style={{ fontSize: "12px" }}>Facebook</div>
              </a>
            </div>
            <div className="col-3">
              <a
                href={profile.youtube_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube title="YouTube" style={{ color: "#4f79c0" }} />
                <div style={{ fontSize: "12px" }}>Youtube</div>
              </a>
            </div>
            {/* <div className="col-3">
              <a
                href={profile.booking_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaCalendarAlt title="Book Me" style={{ color: "#4f79c0" }} />
                <div style={{ fontSize: "12px" }}>Book Me</div>
              </a>
            </div> */}
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
              <FaAddressCard /> ADD TO CONTACTS
            </button>
            <button
              className="btn btn-outline-secondary w-100"
              style={{ fontSize: "12px" }}
              onClick={() => shareContact(profile)}
            >
              SHARE <FaShareAlt />
            </button>
          </div>

          <a
            href={profile.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-dark w-100 mb-3"
            style={{
              fontSize: "12px",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            <FaGlobe /> Website
          </a>

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
                  src={profile.company_banner_url}
                  alt="Company Banner"
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
              className="btn btn-dark w-100 mb-3 mt-2"
              style={{ fontSize: "12px", padding: "0.5rem" }}
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
              className="border-top"
              style={{ flex: 3, height: "100%" }}
            ></div>
            <div style={{ flex: 1 }}>
              <FaRegUserCircle />
            </div>
            <div className="border-top" style={{ flex: 3 }}></div>
          </div>

          {/* Portfolio Section */}
          <div className="text-start pt-1 ">
            <h6 className="text-center mb-3">About</h6>
            <div className="row g-2" style={{ gap: "0.5rem" }}>
              <div className="col-12">
                <img
                  src={profile.avatar_url}
                  alt="User Image"
                  className="img-fluid rounded"
                />
              </div>
            </div>

            <p className="small text-muted text-justify pt-1">{profile.bio}</p>
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
              className="btn btn-dark w-100 mb-3 mt-2"
              style={{ fontSize: "12px", padding: "0.5rem" }}
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
