import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const MOCK_OTP = "1234";

const VisitorLogin = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "collection";
  const id = searchParams.get("id") || "col1";

  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  const handleSendOtp = () => {
    if (phone.length < 8) { setError("Please enter a valid phone number"); return; }
    setError("");
    setStep("otp");
    setResendTimer(30);
    const interval = setInterval(() => {
      setResendTimer(t => { if (t <= 1) { clearInterval(interval); return 0; } return t - 1; });
    }, 1000);
  };

  const handleOtpChange = (val: string, idx: number) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[idx] = val.slice(-1);
    setOtp(next);
    if (val && idx < 3) {
      const nextInput = document.getElementById(`otp-${idx + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = () => {
    const entered = otp.join("");
    if (entered !== MOCK_OTP) { setError("Invalid OTP. Use 1234"); return; }
    navigate(`/visitor/poll?type=${type}&id=${id}`);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">

        {/* Logo + Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl gradient-navy flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎨</span>
          </div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Visitor Vote</h1>
          <p className="text-muted-foreground text-sm mt-1">Share your experience with us</p>
        </div>

        <div className="glass-card rounded-2xl p-6">

          {step === "phone" ? (
            <div className="space-y-5">
              <div>
                <p className="text-sm font-medium text-foreground mb-1">Enter your mobile number</p>
                <p className="text-xs text-muted-foreground mb-4">We'll send you a one-time code to verify</p>
                <div className="flex gap-2">
                  <div className="flex items-center px-3 rounded-lg border border-border bg-muted text-sm text-foreground shrink-0">+1</div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => { setPhone(e.target.value); setError(""); }}
                    placeholder="000 000 0000"
                    className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>
                {error && <p className="text-xs text-destructive mt-2">{error}</p>}
              </div>

              <button
                onClick={handleSendOtp}
                className="w-full py-3.5 rounded-xl gradient-navy text-white font-semibold text-base"
              >
                Send OTP
              </button>

              <p className="text-center text-xs text-muted-foreground">
                No account needed · Your vote is anonymous
              </p>
            </div>

          ) : (
            <div className="space-y-5">
              <div>
                <p className="text-sm font-medium text-foreground mb-1">Enter verification code</p>
                <p className="text-xs text-muted-foreground mb-4">
                  Sent to +1 {phone} · <span className="text-secondary font-medium">Demo OTP: 1234</span>
                </p>

                <div className="flex gap-3 justify-center mb-2">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      type="tel"
                      maxLength={1}
                      value={digit}
                      onChange={e => handleOtpChange(e.target.value, i)}
                      onKeyDown={e => {
                        if (e.key === "Backspace" && !otp[i] && i > 0) {
                          document.getElementById(`otp-${i - 1}`)?.focus();
                        }
                      }}
                      className="w-14 h-14 text-center text-xl font-bold rounded-xl border-2 border-border bg-background text-foreground focus:outline-none focus:border-secondary"
                    />
                  ))}
                </div>
                {error && <p className="text-xs text-destructive text-center mt-2">{error}</p>}
              </div>

              <button
                onClick={handleVerify}
                className="w-full py-3.5 rounded-xl gradient-navy text-white font-semibold text-base"
              >
                Verify & Continue
              </button>

              <div className="text-center">
                {resendTimer > 0
                  ? <p className="text-xs text-muted-foreground">Resend in {resendTimer}s</p>
                  : <button onClick={() => { setOtp(["", "", "", ""]); setError(""); setResendTimer(30); }} className="text-xs text-secondary font-medium">Resend OTP</button>
                }
              </div>

              <button onClick={() => { setStep("phone"); setOtp(["", "", "", ""]); setError(""); }} className="w-full text-xs text-muted-foreground text-center">
                ← Change number
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default VisitorLogin;
