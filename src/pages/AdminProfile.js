import React, { useEffect, useState } from "react";
import NavBannerTop from "../components/navBannerTop/NavBannerTop";
import NavBar from "../components/navBar/NavBar";
import ProductComponent from "../components/product/ProductComponent";
import FooterPage from "../components/footer/FooterComponent";
import { useNavigate, useParams } from "react-router";
import { supabase } from "../utils/supabase";
import Select from "react-select";
import DraftEditor from "./DraftEditor";
import { EditorState, convertToRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import axios from "axios";
import PageTitle from "../components/titles/PageTitle";
import BigLoading from "../components/spinners/Loading";
import ErrorMessage from "../components/spinners/ErrorMessage";
import { Link } from "react-router-dom";
import ProfileComponent from "../components/profile/ProfileComponent";
import { FaFileUpload, FaRegSave, FaRegWindowClose } from "react-icons/fa";

const AdminProfile = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({});
  const [form, setForm] = useState({
    type: { value: "Basic", label: "Basic" },
    featured: { label: "True", value: "True" },
    best_sales: { label: "True", value: "True" },
    lay_by_availability_status: { label: "False", value: "false" },
  });
  const [images, setImages] = useState([]);
  const [imagesUrls, setImagesUrls] = useState([]);
  const [docs, setDocs] = useState([]);
  const [docsUrls, setDocsUrls] = useState([]);

  const [positions, setPositions] = useState([]);
  const [newPosition, setNewPosition] = useState("");

  const [banner, setBanner] = useState();
  const [companyBanner, setCompanyBanner] = useState();
  const [avatar, setAvatar] = useState();
  const [projects, setProjects] = useState([]);
  const [gallery, setGallery] = useState([]);

  const navigate = useNavigate();

  // const [pricingAdditionalInformation, setPricingAdditionalInformation] =
  //   useState(() => EditorState.createEmpty());

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelect = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddPosition = () => {
    const trimmed = newPosition.trim();
    if (trimmed) {
      setForm((prev) => ({
        ...prev,
        positions: [...(prev.positions || []), trimmed],
      }));
      setNewPosition("");
    }
  };

  const handleRemovePosition = (indexToRemove) => {
    setForm((prev) => ({
      ...prev,
      positions: prev.positions.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      setImages(e.target.files);
    }
  };
  const handleBannerChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBanner(file);
      const banner_url = URL.createObjectURL(file);
      setForm((prev) => ({ ...prev, banner_url }));
    }
  };

  const handleCompanyBannerChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setCompanyBanner(file);
      const company_banner_url = URL.createObjectURL(file);
      setForm((prev) => ({ ...prev, company_banner_url }));
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      const avatar_url = URL.createObjectURL(file);
      setForm((prev) => ({ ...prev, avatar_url }));
    }
  };

  const handlePortfolioChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setProjects(files);
      const imageUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setForm((prev) => ({ ...prev, projects: imageUrls }));
    }
  };

  const handleGalleryChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setGallery(files);
      const imageUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setForm((prev) => ({ ...prev, gallery: imageUrls }));
    }
  };

  const handleDocChange = (e) => {
    if (e.target.files) {
      setDocs(e.target.files);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      setLoading(true);

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          throw new Error(error.message);
        }

        setForm({
          ...form,
          ...data,
        });
      } catch (error) {
        console.log("errore", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const uploadFile = async (file) => {
    const uploadUrl = "https://api.cloudinary.com/v1_1/molowehou/upload";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "y1t423pb");

    const response = await axios.post(uploadUrl, formData, {
      headers: { "X-Requested-With": "XMLHttpRequest" },
    });

    return response.data.secure_url;
  };

  const handleUploadImages = async () => {
    try {
      setLoading(true);
      setError("");

      let banner_url = "";
      let avatar_url = "";
      let company_banner_url = "";
      let projects_urls = [];
      let gallery_urls = [];

      if (banner instanceof File) {
        banner_url = await uploadFile(banner);
      }

      if (avatar instanceof File) {
        avatar_url = await uploadFile(avatar);
      }
      if (companyBanner instanceof File) {
        company_banner_url = await uploadFile(companyBanner);
      }

      if (projects && projects.length > 0) {
        projects_urls = await Promise.all([...projects].map(uploadFile));
      }

      if (gallery && gallery.length > 0) {
        gallery_urls = await Promise.all([...gallery].map(uploadFile));
      }

      handleSaveData(
        banner_url,
        avatar_url,
        company_banner_url,
        projects_urls,
        gallery_urls
      );
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveData = async (
    banner_url,
    avatar_url,
    company_banner_url,
    projects_urls,
    gallery_urls
  ) => {
    try {
      setLoading(true);

      const profileData = {
        // Basic info
        first_name: form.first_name,
        middle_name: form.middle_name,
        last_name: form.last_name,
        mobile: form.mobile,
        land_line: form.land_line,
        work_line: form.work_line,
        email: form.email,
        positions: form.positions || [],
        bio: form.bio,

        // Company info
        company_name: form.company_name,
        company_bio: form.company_bio,
        company_video_url: form.company_video_url,
        company_tag_line: form.company_tag_line,

        // Descriptions

        testimonials: form.testimonials || [],

        // Socials
        website_url: form.website_url,
        linkedin_url: form.linkedin_url,
        facebook_url: form.facebook_url,
        youtube_url: form.youtube_url,
        instagram_url: form.instagram_url,
        x_url: form.x_url,
        socials: form.socials || {},

        // Theme colors
        text_color: form.text_color,
        theme_color: form.theme_color,
        primary_color: form.primary_color,
        secondary_color: form.secondary_color,
        button_background_color: form.button_background_color,
        button_text_color: form.button_text_color,
        divider_color: form.divider_color,
        divider_icon_color: form.divider_icon_color,
        heading_color: form.heading_color,
      };

      // Conditionally add images if URLs are available
      if (avatar_url) {
        profileData.avatar_url = avatar_url;
      }

      if (company_banner_url) {
        profileData.company_banner_url = company_banner_url;
      }
      if (banner_url) {
        profileData.banner_url = banner_url;
      }

      if (projects_urls && projects_urls.length > 0) {
        profileData.projects = projects_urls;
      }

      if (gallery_urls && gallery_urls.length > 0) {
        profileData.gallery = gallery_urls;
      }

      const { data, error } = await supabase
        .from("profiles")
        .update(profileData)
        .eq("id", id);

      if (error) {
        throw error;
      }

      navigate("/admin_profiles");
      return { success: true, data };
    } catch (err) {
      setError(err);
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />

      <PageTitle name={"Update Profile"} />
      {error.message && <ErrorMessage message={error.message} />}

      {loading ? (
        <BigLoading />
      ) : (
        form.id && (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: "10px",
                gap: "20px",
              }}
            >
              <button
                style={{
                  marginBottom: "20px",
                  background: "green",
                  color: "#fff",
                }}
                className=" ttm-btn ttm-btn-size-md ttm-btn-shape-square "
                onClick={handleUploadImages}
              >
                <FaFileUpload size={20} /> Publish Changes
              </button>

              <Link
                to={`/admin_profiles`}
                style={{ marginBottom: "20px" }}
                className="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-icon-btn-left ttm-btn-color-skincolor"
              >
                <i className="ti ti-arrow-left"></i>Back To Profiles
              </Link>
            </div>
            <div className="container row">
              <div className="col-sm-6">
                <div
                  id="ttm-contactform"
                  className="ttm-contactform wrap-form clearfix"
                >
                  <div className="row">
                    {/* <div className="col-lg-3">
                    <label>
                      <h6 style={{ marginTop: "20px" }}>Type</h6>
                      <span className="text-input">
                        <Select
                          defaultValue={{ label: "Basic", value: "Basic" }}
                          value={form?.type}
                          onChange={(e) => handleSelect("type", e)}
                          options={types.map((category) => ({
                            label: category.label,
                            value: category.value,
                          }))}
                        />
                      </span>
                    </label>
                  </div> */}

                    <div className="col-lg-12">
                      <input
                        type="file"
                        accept="image/*"
                        id="bannerInput"
                        style={{ display: "none" }}
                        onChange={handleBannerChange}
                      />

                      <h6>Profile Banner</h6>
                      <button
                        style={{ marginBottom: "20px" }}
                        onClick={() =>
                          document.getElementById("bannerInput").click()
                        }
                      >
                        Upload Banner
                      </button>
                    </div>

                    <div className="col-lg-12">
                      <input
                        type="file"
                        accept="image/*"
                        id="avatarInput"
                        style={{ display: "none" }}
                        onChange={handleAvatarChange}
                      />

                      <h6>Avatar</h6>
                      <button
                        style={{ marginBottom: "20px" }}
                        onClick={() =>
                          document.getElementById("avatarInput").click()
                        }
                      >
                        Upload Avatar
                      </button>
                    </div>
                    <div className="col-lg-4">
                      <h6 style={{ marginTop: "20px" }}>First Name</h6>
                      <label>
                        <span className="text-input">
                          <input
                            type="text"
                            placeholder="Name"
                            required="required"
                            name={"first_name"}
                            value={form?.first_name}
                            onChange={handleChange}
                          />
                        </span>
                      </label>
                    </div>
                    <div className="col-lg-4">
                      <h6 style={{ marginTop: "20px" }}>Middle Name</h6>
                      <label>
                        <span className="text-input">
                          <input
                            type="text"
                            placeholder="Middle Name"
                            required="required"
                            name={"middle_name"}
                            value={form?.middle_name}
                            onChange={handleChange}
                          />
                        </span>
                      </label>
                    </div>
                    <div className="col-lg-4">
                      <h6 style={{ marginTop: "20px" }}>Last Name</h6>
                      <label>
                        <span className="text-input">
                          <input
                            type="text"
                            placeholder="Last Name"
                            required="required"
                            name={"last_name"}
                            value={form?.last_name}
                            onChange={handleChange}
                          />
                        </span>
                      </label>
                    </div>
                    <div className="col-lg-4">
                      <h6 style={{ marginTop: "20px" }}>Cell:</h6>
                      <label>
                        <span className="text-input">
                          <input
                            type="text"
                            placeholder="Mobile"
                            required="required"
                            name={"mobile"}
                            value={form?.mobile}
                            onChange={handleChange}
                          />
                        </span>
                      </label>
                    </div>
                    <div className="col-lg-4">
                      <h6 style={{ marginTop: "20px" }}>Landline:</h6>
                      <label>
                        <span className="text-input">
                          <input
                            type="text"
                            placeholder="Land Line"
                            required="required"
                            name={"land_line"}
                            value={form?.land_line}
                            onChange={handleChange}
                          />
                        </span>
                      </label>
                    </div>
                    <div className="col-lg-4">
                      <h6 style={{ marginTop: "20px" }}>Work Phone: </h6>
                      <label>
                        <span className="text-input">
                          <input
                            type="text"
                            placeholder="Work"
                            required="required"
                            name={"work_line"}
                            value={form?.work_line}
                            onChange={handleChange}
                          />
                        </span>
                      </label>
                    </div>

                    <div className="col-lg-12">
                      <input
                        type="file"
                        accept="image/*"
                        id="portfolioInput"
                        multiple
                        style={{ display: "none" }}
                        onChange={handlePortfolioChange}
                      />

                      <h6>Positions</h6>

                      <input
                        type="text"
                        value={newPosition}
                        onChange={(e) => setNewPosition(e.target.value)}
                        placeholder="Enter position"
                        className="form-control mb-1"
                      />
                      <button
                        style={{ marginBottom: "20px" }}
                        onClick={handleAddPosition}
                      >
                        Add Position
                      </button>
                      <div className="d-flex flex-wrap gap-2">
                        {form?.positions?.map((position, index) => (
                          <span
                            key={index}
                            className="d-flex align-items-center"
                            style={{
                              fontSize: "12px",
                              padding: "5px",
                              borderRadius: "5px",
                              backgroundColor: "green",
                              color: "#fff",
                              marginRight: "10px",
                            }}
                          >
                            {position}{" "}
                            <FaRegWindowClose
                              color={"red"}
                              size={20}
                              style={{ marginLeft: "5px" }}
                              onClick={() => handleRemovePosition(index)}
                            />
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-6">
                      <h6 style={{ marginTop: "20px" }}>Website URL:</h6>
                      <label>
                        <span className="text-input">
                          <input
                            type="text"
                            placeholder="www:"
                            required="required"
                            name={"website_url"}
                            value={form?.website_url}
                            onChange={handleChange}
                          />
                        </span>
                      </label>
                    </div>
                    <div className="col-lg-6">
                      <h6 style={{ marginTop: "20px" }}>LinkedIn url</h6>
                      <label>
                        <span className="text-input">
                          <input
                            type="text"
                            placeholder="https://www.linkedin.com/in/...."
                            required="required"
                            name={"linkedin_url"}
                            value={form?.linkedin_url}
                            onChange={handleChange}
                          />
                        </span>
                      </label>
                    </div>
                    <div className="col-lg-6">
                      <h6 style={{ marginTop: "20px" }}>Facebook url</h6>
                      <label>
                        <span className="text-input">
                          <input
                            type="text"
                            placeholder="https://www.facebook.com/..."
                            required="required"
                            name={"facebook_url"}
                            value={form?.facebook_url}
                            onChange={handleChange}
                          />
                        </span>
                      </label>
                    </div>

                    <div className="col-lg-6">
                      <h6 style={{ marginTop: "20px" }}>Instagram url</h6>
                      <label>
                        <span className="text-input">
                          <input
                            type="text"
                            placeholder="instagram url"
                            required="required"
                            name={"instagram_url"}
                            value={form?.instagram_url}
                            onChange={handleChange}
                          />
                        </span>
                      </label>
                    </div>

                    <div className="col-lg-6">
                      <h6 style={{ marginTop: "20px" }}>Twitter url</h6>
                      <label>
                        <span className="text-input">
                          <input
                            type="text"
                            placeholder="x url"
                            required="required"
                            name={"x_url"}
                            value={form?.x_url}
                            onChange={handleChange}
                          />
                        </span>
                      </label>
                    </div>

                    <div className="col-lg-12">
                      <h6 style={{ marginTop: "20px" }}>Short Profile Bio</h6>
                      <label>
                        <span className="text-input">
                          <textarea
                            rows="3"
                            cols="40"
                            type="text"
                            placeholder="Short bio"
                            required="required"
                            name={"bio"}
                            value={form?.bio}
                            onChange={handleChange}
                          />
                        </span>
                      </label>
                    </div>

                    <div className="col-lg-12">
                      <input
                        type="file"
                        accept="image/*"
                        id="portfolioInput"
                        multiple
                        style={{ display: "none" }}
                        onChange={handlePortfolioChange}
                      />

                      <h6>Projects</h6>
                      <button
                        style={{ marginBottom: "20px" }}
                        onClick={() =>
                          document.getElementById("portfolioInput").click()
                        }
                      >
                        Upload Projects
                      </button>
                    </div>

                    <div className="col-lg-12">
                      <input
                        type="file"
                        accept="image/*"
                        id="galleryInput"
                        multiple
                        style={{ display: "none" }}
                        onChange={handleGalleryChange}
                      />

                      <h6>Gallery</h6>
                      <button
                        style={{ marginBottom: "20px" }}
                        onClick={() =>
                          document.getElementById("galleryInput").click()
                        }
                      >
                        Upload Gallery
                      </button>
                    </div>

                    <div className="col-lg-12">
                      <h6 style={{ marginTop: "20px" }}>Company Name</h6>
                      <label>
                        <span className="text-input">
                          <input
                            type="text"
                            placeholder="Company name"
                            required="required"
                            name={"company_name"}
                            value={form?.company_name}
                            onChange={handleChange}
                          />
                        </span>
                      </label>
                    </div>

                    <div className="col-lg-12">
                      <input
                        type="file"
                        accept="image/*"
                        id="companybannerInput"
                        style={{ display: "none" }}
                        onChange={handleCompanyBannerChange}
                      />

                      <h6>Company Banner</h6>
                      <button
                        style={{ marginBottom: "20px" }}
                        onClick={() =>
                          document.getElementById("companybannerInput").click()
                        }
                      >
                        Upload Company Banner
                      </button>
                    </div>

                    <div className="col-lg-12">
                      <h6 style={{ marginTop: "20px" }}>Tag Line</h6>
                      <label>
                        <span className="text-input">
                          <input
                            type="text"
                            placeholder="Company tagline"
                            required="required"
                            name={"tag_line"}
                            value={form?.tag_line}
                            onChange={handleChange}
                          />
                        </span>
                      </label>
                    </div>

                    <div className="col-lg-12">
                      <h6 style={{ marginTop: "20px" }}>Short company Bio</h6>
                      <label>
                        <span className="text-input">
                          <textarea
                            rows="3"
                            cols="40"
                            type="text"
                            placeholder="Short bio"
                            required="required"
                            name={"company_bio"}
                            value={form?.company_bio}
                            onChange={handleChange}
                          />
                        </span>
                      </label>
                    </div>

                    <div className="col-lg-12">
                      <h6 style={{ marginTop: "20px" }}>Company Video Url</h6>
                      <label>
                        <span className="text-input">
                          <input
                            type="text"
                            placeholder="Youtube Video Url"
                            required="required"
                            name={"company_video_url"}
                            value={form?.company_video_url}
                            onChange={handleChange}
                          />
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* <div className="col-lg-12">
                <h6 style={{ marginTop: "20px" }}>Content</h6>
                <DraftEditor
                  editorState={editorState}
                  setEditorState={setEditorState}
                />
              </div> */}

                  <div className="row container">
                    <h5 style={{ marginTop: "20px" }}>Colors</h5>
                  </div>

                  <div className="row">
                    <div className="col-lg-4">
                      <h6>Theme Color</h6>
                      <label>
                        <span className="text-input">
                          <input
                            type="text"
                            placeholder="Theme color"
                            required="required"
                            name={"theme_color"}
                            value={form?.theme_color}
                            onChange={handleChange}
                          />
                        </span>
                      </label>
                    </div>

                    <div className="col-lg-4">
                      <h6>Primary Color</h6>
                      <label>
                        <span className="text-input">
                          <input
                            type="text"
                            placeholder="Primary color"
                            required="required"
                            name={"primary_color"}
                            value={form?.primary_color}
                            onChange={handleChange}
                          />
                        </span>
                      </label>
                    </div>
                    <div className="col-lg-4">
                      <h6>Secondary Color</h6>
                      <label>
                        <span className="text-input">
                          <input
                            type="text"
                            placeholder="Secondary color"
                            required="required"
                            name={"secondary_color"}
                            value={form?.secondary_color}
                            onChange={handleChange}
                          />
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <h5>Buttons</h5>
                    </div>
                    <div className="col-lg-4">
                      <h6>Background Color</h6>
                      <label>
                        <span className="text-input">
                          <input
                            type="text"
                            placeholder="Button color"
                            required="required"
                            name={"button_background_color"}
                            value={form?.button_background_color}
                            onChange={handleChange}
                          />
                        </span>
                      </label>
                    </div>

                    <div className="col-lg-4">
                      <h6>Text Color</h6>
                      <label>
                        <span className="text-input">
                          <input
                            type="text"
                            placeholder="Button text color"
                            required="required"
                            name={"button_text_color"}
                            value={form?.button_text_color}
                            onChange={handleChange}
                          />
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <h5 style={{ marginTop: "20px" }}>Dividers</h5>
                    </div>

                    <div className="col-lg-4">
                      <h6>Color</h6>
                      <label>
                        <span className="text-input">
                          <input
                            type="text"
                            placeholder="Divider color"
                            required="required"
                            name={"divider_color"}
                            value={form?.divider_color}
                            onChange={handleChange}
                          />
                        </span>
                      </label>
                    </div>
                    <div className="col-lg-4">
                      <h6>Icon Color</h6>
                      <label>
                        <span className="text-input">
                          <input
                            type="text"
                            placeholder="Divider Icon color"
                            required="required"
                            name={"divider_icon_color"}
                            value={form?.divider_icon_color}
                            onChange={handleChange}
                          />
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <h5 style={{ marginTop: "20px" }}>Headings and Text</h5>
                    </div>

                    <div className="col-lg-4">
                      <h6>Headings Color</h6>
                      <label>
                        <span className="text-input">
                          <input
                            type="text"
                            placeholder="Headings color"
                            required="required"
                            name={"heading_color"}
                            value={form?.heading_color}
                            onChange={handleChange}
                          />
                        </span>
                      </label>
                    </div>
                    <div className="col-lg-4">
                      <h6>Text Color</h6>
                      <label>
                        <span className="text-input">
                          <input
                            type="text"
                            placeholder="Text color"
                            required="required"
                            name={"text_color"}
                            value={form?.text_color}
                            onChange={handleChange}
                          />
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <ProfileComponent
                  profile={form}
                  handleAddToContacts={() => {}}
                  shareContact={() => {}}
                />
              </div>
            </div>
          </>
        )
      )}

      <FooterPage />
    </>
  );
};

export default AdminProfile;
