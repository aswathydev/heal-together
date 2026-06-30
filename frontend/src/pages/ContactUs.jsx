// import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

// export default function Contact() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-green-50">

//       {/* Hero */}
//       <section className="max-w-7xl mx-auto px-6 pt-20 pb-12">
//         <div className="text-center">
//           <p className="text-cyan-600 font-semibold uppercase tracking-widest">
//             Get In Touch
//           </p>

//           <h1 className="mt-3 text-4xl md:text-5xl font-extrabold text-slate-800">
//             We're Here To
//             <span className="bg-gradient-to-r from-green-500 to-cyan-600 bg-clip-text text-transparent">
//               {" "}Support You
//             </span>
//           </h1>

//           <p className="mt-5 max-w-2xl mx-auto text-slate-600">
//             Whether you have questions, need support, or simply want to
//             connect, our team is always ready to help you on your mental
//             wellness journey.
//           </p>
//         </div>
//       </section>

//       {/* Main Section */}
//       <section className="max-w-7xl mx-auto px-6 pb-20">
//         <div className="grid lg:grid-cols-2 gap-10">

//           {/* Left Side */}
//           <div className="space-y-6">

//             <div className="bg-white rounded-3xl p-8 shadow-sm">
//               <h2 className="text-2xl font-bold text-slate-800 mb-6">
//                 Contact Information
//               </h2>

//               <div className="space-y-6">

//                 <div className="flex items-start gap-4">
//                   <div className="h-14 w-14 rounded-2xl bg-green-100 flex items-center justify-center">
//                     <FaEnvelope className="text-green-600 text-xl" />
//                   </div>

//                   <div>
//                     <h3 className="font-semibold text-slate-800">
//                       Email
//                     </h3>
//                     <p className="text-slate-600">
//                       support@healtogether.com
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-4">
//                   <div className="h-14 w-14 rounded-2xl bg-cyan-100 flex items-center justify-center">
//                     <FaPhoneAlt className="text-cyan-600 text-xl" />
//                   </div>

//                   <div>
//                     <h3 className="font-semibold text-slate-800">
//                       Phone
//                     </h3>
//                     <p className="text-slate-600">
//                       +91 98765 43210
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-4">
//                   <div className="h-14 w-14 rounded-2xl bg-blue-100 flex items-center justify-center">
//                     <FaMapMarkerAlt className="text-blue-600 text-xl" />
//                   </div>

//                   <div>
//                     <h3 className="font-semibold text-slate-800">
//                       Address
//                     </h3>
//                     <p className="text-slate-600">
//                       Mumbai, Maharashtra, India
//                     </p>
//                   </div>
//                 </div>

//               </div>
//             </div>

//             {/* Support Card */}
//             <div className="bg-gradient-to-r from-green-500 via-cyan-500 to-blue-500 rounded-3xl p-8 text-white shadow-lg">
//               <h3 className="text-2xl font-bold">
//                 💙 Need Immediate Help?
//               </h3>

//               <p className="mt-3 text-white/90">
//                 Our AI support and community care services are
//                 available 24/7 to support your wellness journey.
//               </p>

//               <button className="mt-6 px-6 py-3 rounded-full bg-white text-cyan-600 font-semibold hover:scale-105 transition">
//                 Get Support
//               </button>
//             </div>

//           </div>

//           {/* Right Side Form */}
//           <div className="bg-white rounded-3xl p-8 shadow-sm">

//             <h2 className="text-2xl font-bold text-slate-800 mb-6">
//               Send Us a Message
//             </h2>

//             <form className="space-y-5">

//               <div>
//                 <label className="block mb-2 text-sm font-medium text-slate-700">
//                   Full Name
//                 </label>

//                 <input
//                   type="text"
//                   placeholder="John Doe"
//                   className="
//                     w-full
//                     rounded-2xl
//                     border
//                     border-slate-200
//                     px-4
//                     py-3
//                     outline-none
//                     focus:ring-2
//                     focus:ring-cyan-500
//                   "
//                 />
//               </div>

//               <div>
//                 <label className="block mb-2 text-sm font-medium text-slate-700">
//                   Email
//                 </label>

//                 <input
//                   type="email"
//                   placeholder="john@example.com"
//                   className="
//                     w-full
//                     rounded-2xl
//                     border
//                     border-slate-200
//                     px-4
//                     py-3
//                     outline-none
//                     focus:ring-2
//                     focus:ring-cyan-500
//                   "
//                 />
//               </div>

//               <div>
//                 <label className="block mb-2 text-sm font-medium text-slate-700">
//                   Subject
//                 </label>

//                 <input
//                   type="text"
//                   placeholder="How can we help?"
//                   className="
//                     w-full
//                     rounded-2xl
//                     border
//                     border-slate-200
//                     px-4
//                     py-3
//                     outline-none
//                     focus:ring-2
//                     focus:ring-cyan-500
//                   "
//                 />
//               </div>

//               <div>
//                 <label className="block mb-2 text-sm font-medium text-slate-700">
//                   Message
//                 </label>

//                 <textarea
//                   rows={6}
//                   placeholder="Write your message..."
//                   className="
//                     w-full
//                     rounded-2xl
//                     border
//                     border-slate-200
//                     px-4
//                     py-3
//                     outline-none
//                     focus:ring-2
//                     focus:ring-cyan-500
//                   "
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="
//                   w-full
//                   py-4
//                   rounded-2xl
//                   font-semibold
//                   text-white
//                   bg-gradient-to-r
//                   from-green-500
//                   via-cyan-500
//                   to-blue-600
//                   shadow-lg
//                   hover:scale-[1.02]
//                   transition
//                 "
//               >
//                 Send Message
//               </button>

//             </form>
//           </div>

//         </div>
//       </section>
//     </div>
//   );
// }



import React, { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaSpinner, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import axiosInstance from "../api/axiosInstance"; // Adjust relative path as needed

export default function Contact() {
  // 1. Core Form & UI States
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null); // Managed as { type: 'success'|'error', text: string }

  // 2. State Change Syncer
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 3. API Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    try {
      // Triggering POST request directly to your newly created controller
      const response = await axiosInstance.post("/contacts", formData);
      
      setAlert({
        type: "success",
        text: response.data.message || "Message sent successfully!",
      });

      // Clear layout fields cleanly on safe submission
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setAlert({
        type: "error",
        text: err.response?.data?.message || "Could not deliver message. Please check connection.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-green-50">

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-12">
        <div className="text-center">
          <p className="text-cyan-600 font-semibold uppercase tracking-widest text-xs tracking-wider">
            Get In Touch
          </p>

          <h1 className="mt-3 text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
            We're Here To
            <span className="bg-gradient-to-r from-green-500 to-cyan-600 bg-clip-text text-transparent">
              {" "}Support You
            </span>
          </h1>

          <p className="mt-5 max-w-2xl mx-auto text-slate-600 leading-relaxed">
            Whether you have questions, need support, or simply want to
            connect, our team is always ready to help you on your mental
            wellness journey.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-2 gap-10">

          {/* Left Side Info Blocks */}
          <div className="space-y-6">

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">
                Contact Information
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-green-100 flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Email</h3>
                    <p className="text-slate-600">support@healtogether.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-cyan-100 flex items-center justify-center flex-shrink-0">
                    <FaPhoneAlt className="text-cyan-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Phone</h3>
                    <p className="text-slate-600">+91 949620 15610</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Address</h3>
                    <p className="text-slate-600">Mumbai, Maharashtra, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Card CTA */}
            <div className="bg-gradient-to-r from-green-500 via-cyan-500 to-blue-500 rounded-3xl p-8 text-white shadow-lg transition-all">
              <h3 className="text-2xl font-bold">
                💙 Need Immediate Help?
              </h3>
              <p className="mt-3 text-white/90 leading-relaxed text-sm">
                Our AI support and community care services are
                available 24/7 to support your wellness journey.
              </p>
              <button className="mt-6 px-6 py-3 rounded-full bg-white text-cyan-600 font-semibold hover:shadow-md active:scale-95 transition-all">
                Get Support
              </button>
            </div>
          </div>

          {/* Right Side Form Panel */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">
              Send Us a Message
            </h2>

            {/* Success/Failure Alert Banners */}
            {alert && (
              <div className={`flex items-start gap-3 p-4 mb-6 rounded-2xl text-sm transition-all ${
                alert.type === "success" 
                  ? "bg-green-50 border border-green-200 text-green-800" 
                  : "bg-rose-50 border border-rose-200 text-rose-800"
              }`}>
                {alert.type === "success" ? (
                  <FaCheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                ) : (
                  <FaExclamationCircle className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0" />
                )}
                <span>{alert.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block mb-2 text-sm font-medium text-slate-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500 bg-slate-50/50 transition-all"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500 bg-slate-50/50 transition-all"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-slate-700">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  required
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500 bg-slate-50/50 transition-all"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-slate-700">
                  Message
                </label>
                <textarea
                  rows={6}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  required
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500 bg-slate-50/50 resize-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-green-500 via-cyan-500 to-blue-600 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.99]"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin text-lg" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <span>Send Message</span>
                )}
              </button>
            </form>
          </div>

        </div>
      </section>
    </div>
  );
}