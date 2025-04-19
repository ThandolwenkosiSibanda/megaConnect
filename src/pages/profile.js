import React, { useEffect, useState } from "react";

import { useParams } from "react-router";
import { supabase } from "../utils/supabase";
import ErrorMessage from "../components/spinners/ErrorMessage";
import BigLoading from "../components/spinners/Loading";
import ProfileComponent from "../components/profile/ProfileComponent";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [profile, setProfile] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!id) throw new Error("Profile ID is missing");

        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", id)
          .single();

        console.log("Data:", data);

        if (error) throw error;

        setProfile(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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

  return (
    <>
      {error?.message && <ErrorMessage message={error.message} />}

      {loading ? (
        <BigLoading />
      ) : (
        !error && (
          <ProfileComponent
            profile={profile}
            handleAddToContacts={handleAddToContacts}
            shareContact={shareContact}
          />
        )
      )}
    </>
  );
};

export default Profile;
