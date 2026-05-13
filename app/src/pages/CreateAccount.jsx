import { useState } from "react";
import "./CreateAccount.css";

function CreateAccount({ onLogin, setPage }) {
  const [form, setForm] = useState({
    firstName: "", lastName: "", username: "",
    email: "", phone: "", password: "", confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const set = (key, val) => {
    setForm(f => Object.assign({}, f, { [key]: val }));
    setErrors(e => Object.assign({}, e, { [key]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.lastName.trim()) e.lastName = "Last name is required";
    if (!form.username.trim() || form.username.length < 3)e.username  = "Username must be at least 3 characters";
    if (!form.email.includes("@")) e.email = "Enter a valid email address";
    if (form.phone.length < 9) e.phone = "Enter a valid phone number";
    if (form.password.length < 6) e.password = "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    const userData = {
      name: `${form.firstName} ${form.lastName}`,
      username: form.username,
      email: form.email,
      phone: form.phone,
    };
    setTimeout(() => {
      onLogin(userData);
      setPage("home");
    }, 1200);
  };

  if (submitted) {
    return (
      <div className="ca-page">
        <div className="ca-success">
          <div className="ca-success-icon">✓</div>
          <h2>Account Created!</h2>
          <p>Welcome, {form.firstName}. You are now signed in.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ca-page">
      <div className="ca-card">
        <div className="ca-header">
          <h1>Create Account</h1>
          <p>Join Kanz and start shopping today.</p>
        </div>

        <form className="ca-form" onSubmit={handleSubmit}>

          <div className="ca-row">
            <div className="ca-field">
              <label className="ca-label">First Name <span className="ca-required">*</span></label>
              <input
                className={`ca-input${errors.firstName ? " ca-input--error" : ""}`}
                type="text"
                placeholder="First Name"
                value={form.firstName}
                onChange={(e) => set("firstName", e.target.value)}
              />
              {errors.firstName && <span className="ca-error">{errors.firstName}</span>}
            </div>
            <div className="ca-field">
              <label className="ca-label">Last Name <span className="ca-required">*</span></label>
              <input
                className={`ca-input${errors.lastName ? " ca-input--error" : ""}`}
                type="text"
                placeholder="Last Name"
                value={form.lastName}
                onChange={(e) => set("lastName", e.target.value)}
              />
              {errors.lastName && <span className="ca-error">{errors.lastName}</span>}
            </div>
          </div>

          <div className="ca-field">
            <label className="ca-label">Username <span className="ca-required">*</span></label>
            <input
              className={`ca-input${errors.username ? " ca-input--error" : ""}`}
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={(e) => set("username", e.target.value)}
            />
            {errors.username && <span className="ca-error">{errors.username}</span>}
          </div>

          <div className="ca-field">
            <label className="ca-label">Email Address <span className="ca-required">*</span></label>
            <input
              className={`ca-input${errors.email ? " ca-input--error" : ""}`}
              type="email"
              placeholder="email@example.com"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
            />
            {errors.email && <span className="ca-error">{errors.email}</span>}
          </div>

          <div className="ca-field">
            <label className="ca-label">Phone Number <span className="ca-required">*</span></label>
            <input
              className={`ca-input${errors.phone ? " ca-input--error" : ""}`}
              type="tel"
              placeholder="05XXXXXXXX"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
            />
            {errors.phone && <span className="ca-error">{errors.phone}</span>}
          </div>

          <div className="ca-row">
            <div className="ca-field">
              <label className="ca-label">Password <span className="ca-required">*</span></label>
              <input
                className={`ca-input${errors.password ? " ca-input--error" : ""}`}
                type="password"
                placeholder="Min. 6 characters"
                value={form.password}
                onChange={(e) => set("password", e.target.value)}
              />
              {errors.password && <span className="ca-error">{errors.password}</span>}
            </div>
            <div className="ca-field">
              <label className="ca-label">Confirm Password <span className="ca-required">*</span></label>
              <input
                className={`ca-input${errors.confirmPassword ? " ca-input--error" : ""}`}
                type="password"
                placeholder="Re-enter password"
                value={form.confirmPassword}
                onChange={(e) => set("confirmPassword", e.target.value)}
              />
              {errors.confirmPassword && <span className="ca-error">{errors.confirmPassword}</span>}
            </div>
          </div>

          <button type="submit" className="ca-submit">Create My Account</button>

          <p className="ca-signin-note">
            Already have an account?{" "}
            <button type="button" className="ca-link-btn" onClick={() => setPage("home")}>
              Sign in
            </button>
          </p>

        </form>
      </div>
    </div>
  );
}

export default CreateAccount;
