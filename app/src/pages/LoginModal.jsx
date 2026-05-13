import { useState } from "react";
import "./LoginModal.css";

function LoginModal({ onClose, onLogin, onCreateAccount }) {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStepOne = (e) => {
    e.preventDefault();
    if (phone.length < 9) {
      setError("Please enter a valid phone number");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(2); }, 1000);
  };

  const handleStepTwo = (e) => {
    e.preventDefault();
    if (otp === "1234") {
      setError("");
      setStep(3);
    } else {
      setError("Wrong code. Try 1234");
    }
  };

  const handleStepThree = (e) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError("Name is too short");
      return;
    }
    onLogin({ name: name.trim(), phone });
  };

  return (
    <div className="login-modal-overlay">
      <div className="login-card">
        <button className="login-close" onClick={onClose}>✕</button>
        <h1 className="login-brand">Kanz</h1>

        {step === 1 && (
          <form className="login-step" onSubmit={handleStepOne}>
            <h2>Sign In</h2>
            <p>Enter your phone number</p>
            <input
              type="tel"
              required
              placeholder="05XXXXXXXX"
              value={phone}
              onChange={(e) => { setPhone(e.target.value); setError(""); }}
            />
            {error && <p className="login-error">{error}</p>}
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Sending..." : "Send Code"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form className="login-step" onSubmit={handleStepTwo}>
            <h2>Verify Phone</h2>
            <p>Code sent to {phone}</p>
            <input
              type="text"
              inputMode="numeric"
              autoFocus
              placeholder="0000"
              value={otp}
              onChange={(e) => { setOtp(e.target.value); setError(""); }}
            />
            {error && <p className="login-error">{error}</p>}
            <div className="login-btn-group">
              <button type="submit" className="login-btn">Verify</button>
              <button type="button" className="login-btn login-btn--secondary" onClick={() => setStep(1)}>
                Back
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form className="login-step" onSubmit={handleStepThree}>
            <h2>Welcome!</h2>
            <p>What is your name?</p>
            <input
              type="text"
              required
              placeholder="Your Name"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(""); }}
            />
            {error && <p className="login-error">{error}</p>}
            <button type="submit" className="login-btn">Complete</button>
          </form>
        )}

        {onCreateAccount && (
          <p className="login-footer-note">
            New here?{" "}
            <button className="login-link-btn" onClick={onCreateAccount}>
              Create an account
            </button>
          </p>
        )}
      </div>
    </div>
  );
}

export default LoginModal;
