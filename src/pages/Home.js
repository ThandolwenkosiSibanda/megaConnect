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
} from "react-icons/fa";
import { supabase } from "../utils/supabase";

export default function BusinessProfileCard() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [profile, setProfile] = useState({});
  const id = "71d226d4-217b-4073-a781-b7880987ebfe";

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
    <div className="container py-5 d-flex justify-content-center bg-light min-vh-100">
      <div className="card shadow-lg w-100" style={{ maxWidth: "400px" }}>
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

          <div className="border-top pt-3 mb-3">
            <h6 className="mb-1">About {profile.company_name}</h6>
            <p className="small" style={{ color: "#4f79c0" }}>
              {profile.tag_line}
            </p>
          </div>

          {/* Portfolio Section */}
          <div className="text-start border-top pt-3">
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
              <div className="col-12">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                  alt="Project 3"
                  className="img-fluid rounded"
                />
              </div>
              <div className="col-12">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                  alt="Project 4"
                  className="img-fluid rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
