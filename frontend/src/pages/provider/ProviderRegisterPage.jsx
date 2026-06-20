
// import { useState, useEffect } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from "react-redux";
// // 1. Import your async thunks from the thunk file
// import { registerProvider } from "../../redux/authThunk";
// import { clearError } from "../../redux/slices/authSlice";



// export default function ProviderRegisterPage() {
//   const navigate = useNavigate()
//   const dispatch = useDispatch();
//   const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: '',
//     specialization: '',
//     qualification: '',
//     licenseNumber: '',
//     experienceYears: '',
//     services: '',
//     bio: '',
//   })
//   const [verificationDoc, setVerificationDoc] = useState(null);

//   const [certificates, setCertificates] = useState([])
//   const [validationError, setValidaitonError] = useState('')
//   const [success, setSuccess] = useState('')

//   useEffect(() => {
//     return () => {
//       dispatch(clearError());
//     };
//   }, [dispatch]);



//   useEffect(() => {
//     if (isAuthenticated) {
//       // e.g., navigate("/dashboard") using react-router-dom if you have it
//       console.log("User is authenticated! Redirecting...");
//       navigate("/dashboard");
//     }
//   }, [isAuthenticated]);



//   function updateField(key, value) {
//     setForm((prev) => ({ ...prev, [key]: value }))
//   }

//   function onCertificateChange(event) {
//     // const files = Array.from(event.target.files ?? [])
//     // setCertificates(files.map((f) => f.name))
//     const file = e.target.files?.[0];

//     if (file) {
//       setVerificationDoc(file);
//     }
//   }

  // async function onSubmit(event) {
  //   event.preventDefault()
  //   setValidaitonError('')
  //   setSuccess('')


  //   if (form.password.length < 6) {
  //     setError('Password should be at least 6 characters.')
  //     return
  //   }

  //   if (form.password !== form.confirmPassword) {
  //     setError('Passwords do not match.')
  //     return
  //   }

  //   const formData = new FormData();

  //   Object.entries(form).forEach(([key, value]) => {
  //     formData.append(key, value);
  //   });
  //   console.log(formData);


  //   if (verificationDoc) {
  //     formData.append('verificationDoc', verificationDoc);
  //   }


  //   function validate() {
  //     // 1. Basic Fields
  //     if (!form.name.trim()) return 'Name is required';

  //     // 2. Email validation (robust regex instead of just checking for '@')
  //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //     if (!emailRegex.test(form.email)) return 'Enter a valid email address';

  //     // 3. Phone number validation (checks for digits, common spaces/dashes, min length)
  //     const phoneRegex = /^\+?[0-9\s\-]{7,15}$/;
  //     if (!phoneRegex.test(form.phone)) return 'Enter a valid phone number';

  //     // 4. Provider Professional Fields
  //     if (!form.specialization.trim()) return 'Specialization is required';
  //     if (!form.qualification.trim()) return 'Qualification is required';
  //     if (!form.licenseNumber.trim()) return 'License number is required';

  //     // 5. Experience Validation
  //     const exp = parseInt(form.experienceYears, 10);
  //     if (isNaN(exp) || exp < 0) {
  //       return 'Experience must be a valid number of years';
  //     }

  //     // 6. Services & Bio
  //     if (!form.services.trim()) return 'Please list at least one service offered';
  //     if (!form.bio.trim() || form.bio.length < 20) {
  //       return 'Bio is required and should be at least 20 characters long';
  //     }

  //     // 7. File Upload Validation (Optional but recommended)
  //     if (!profileImage) {
  //       return 'Please upload a profile image';
  //     }

  //     // 8. Password Security & Matching
  //     if (form.password.length < 6) return 'Password must be at least 6 characters';
  //     if (form.password !== form.confirmPassword) return 'Passwords do not match';

  //     return ''; // No errors found
  //   }

  //   const validationError = validate()
  //   if (validationError) {
  //     setValidaitonError(validationError)
  //     return
  //   }

  //   const response = dispatch(registerProvider(form)).unwrap();
  //   navigate("/dashboard");

  // }


  import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { registerProvider } from "../../redux/authThunk";
import { clearError } from "../../redux/slices/authSlice";

export default function ProviderRegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    specialization: '',
    qualification: '',
    licenseNumber: '',
    experienceYears: '',
    services: '',
    bio: '',
  });
  
  const [verificationDoc, setVerificationDoc] = useState(null);
  const [validationError, setValidationError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      console.log("User is authenticated! Redirecting...");
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function onCertificateChange(event) {
    // Fixed: changed 'e' to 'event'
    const file = event.target.files?.[0];
    if (file) {
      setVerificationDoc(file);
    }
  }

  function validate() {
    if (!form.name.trim()) return 'Name is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) return 'Enter a valid email address';
  
    const phoneRegex = /^\+?[0-9\s\-]{7,15}$/;
    if (!phoneRegex.test(form.phone)) return 'Enter a valid phone number';
  
    if (!form.specialization.trim()) return 'Specialization is required';
    if (!form.qualification.trim()) return 'Qualification is required';
    if (!form.licenseNumber.trim()) return 'License number is required';
    
    const exp = parseInt(form.experienceYears, 10);
    if (isNaN(exp) || exp < 0) return 'Experience must be a valid number of years';
  
    if (!form.services.trim()) return 'Please list at least one service offered';
    if (!form.bio.trim() || form.bio.length < 20) {
      return 'Bio is required and should be at least 20 characters long';
    }
  
    // Scope Fixed: Checks verificationDoc now
    if (!verificationDoc) {
      return 'Please upload a verification document';
    }
  
    if (form.password.length < 6) return 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) return 'Passwords do not match';
  
    return ''; 
  }

  async function onSubmit(event) {
    event.preventDefault();
    setValidationError('');
    setSuccess('');

    // 1. Run local validations first
    const errMsg = validate();
    if (errMsg) {
      setValidationError(errMsg);
      return;
    }

    // 2. Build Multi-part Form Data
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key !== 'confirmPassword') {
        formData.append(key, value);
      }
    });

    if (verificationDoc) {
      formData.append('verificationDoc', verificationDoc);
    }

    // try {
    //   // 3. CRITICAL: Pass formData object instead of plain form object
    //   await dispatch(registerProvider(formData)).unwrap();
    //   setSuccess('Registration initialization successful!');
    // } catch (err) {
    //   // Fallback if global Redux error handling isn't mapped to local view
    //   setValidationError(err || 'Registration failed');
    // }

    try {
      // 3. Pass formData object instead of plain form object
      const actionResult = await dispatch(registerProvider(formData)).unwrap();
      setSuccess('Registration initialization successful!');
    } catch (err) {
      // Sets error dynamically if unwrap yields a rejection string
      setValidationError(err || 'Registration failed');
    }
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-[#f3f4f6] px-4 py-10">

      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-md border border-slate-300 p-10">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-slate-600">
            Join Heal Together 🌿
          </h1>
          <p className="mt-2 text-slate-500">
            Start your wellness journey today
          </p>
        </div>

        {/* Form */}
        <form className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={onSubmit}>

          {validationError && (
            <p className="md:col-span-2 rounded-xl bg-rose-50 border border-rose-200 px-4 py-2 text-sm text-rose-600">
              {validationError}
            </p>
          )}

          {success && (
            <p className="md:col-span-2 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-2 text-sm text-emerald-600">
              {success}
            </p>
          )}

          {[
            { key: 'name', placeholder: 'Display Name' },
            { key: 'email', placeholder: 'Email', type: 'email' },
            { key: 'phone', placeholder: 'Phone' },
            { key: 'specialization', placeholder: 'Specialization' },
            { key: 'qualification', placeholder: 'Qualification' },
            { key: 'licenseNumber', placeholder: 'License Number' },
            { key: 'experienceYears', placeholder: 'Experience (Years)', type: 'number' },
            { key: 'services', placeholder: 'Services (comma separated)' },
          ].map((field) => (
            <input
              key={field.key}
              type={field.type || 'text'}
              required
              value={form[field.key]}
              onChange={(e) => updateField(field.key, e.target.value)}
              placeholder={field.placeholder}
              className="w-full rounded-2xl border border-slate-300 bg-slate-100 px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
            />
          ))}

          {/* Bio */}
          <textarea
            rows={3}
            required
            value={form.bio}
            onChange={(e) => updateField('bio', e.target.value)}
            placeholder="Bio"
            className="md:col-span-2 w-full rounded-2xl border border-slate-300 bg-slate-100 px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
          />

          {/* Certificates */}
          <div className="md:col-span-2">
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              // multiple
              onChange={onCertificateChange}
              className="w-full rounded-2xl border border-slate-300 bg-slate-100 px-5 py-4 text-sm"
            />
            {/* {certificates.length > 0 && (
              <p className="mt-2 text-xs text-slate-500">
                {certificates.join(', ')}
              </p>
            )} */}
          </div>

          {/* Password */}
          <input
            type="password"
            required
            value={form.password}
            onChange={(e) => updateField('password', e.target.value)}
            placeholder="Password"
            className="w-full rounded-2xl border border-slate-300 bg-slate-100 px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
          />

          {/* Confirm Password */}
          <input
            type="password"
            required
            value={form.confirmPassword}
            onChange={(e) => updateField('confirmPassword', e.target.value)}
            placeholder="Confirm Password"
            className="w-full rounded-2xl border border-slate-300 bg-slate-100 px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
          />

          {/* Button */}
          <button
            type="submit"
            className="md:col-span-2 w-full rounded-2xl bg-gradient-to-r from-indigo-500 to-teal-500 text-white py-4 text-sm font-medium hover:opacity-90 transition"
          >
            Create Account
          </button>

        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="text-teal-600">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  )
}