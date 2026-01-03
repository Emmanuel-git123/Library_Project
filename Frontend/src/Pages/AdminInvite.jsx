import React, { useState } from "react";
import toast from "react-hot-toast";

const AdminInvite = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const sendInvite = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:8080/api/auth/accept-invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to send invite");
        return;
      }

      toast.success("Invite sent successfully ✉️");
      setEmail("");

    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <form onSubmit={sendInvite} className="my-10 p-6 rounded shadow-md w-[350px]">
        <h2 className="text-lg font-bold mb-4 text-center">Invite Admin</h2>
        <input type="email" placeholder="Admin email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border px-3 py-2 mb-4 rounded"/>
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          {loading ? "Sending..." : "Send Invite"}
        </button>
      </form>
    </div>
  );
};

export default AdminInvite;
