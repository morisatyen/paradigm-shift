import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail, ArrowRight } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const success = login(email, password);
    if (success) {
      if (email === "museum@demo.com") navigate("/museum");
      else navigate("/stakeholder");
    } else {
      setError("Use museum@demo.com or investor@demo.com with any password");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: Branding */}
      <div className="hidden lg:flex w-[55%] gradient-navy relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 30% 40%, hsl(202 56% 56% / 0.4), transparent 50%)" }} />
        <div className="relative z-10 text-center px-12">
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="text-5xl font-heading font-bold text-primary-foreground tracking-tight">PARADIGM</span>
            <div className="w-14 h-14 rounded-xl gradient-accent flex items-center justify-center shadow-lg" style={{ transform: "rotateX(15deg) rotateY(-15deg)", perspective: "500px" }}>
              <span className="text-primary-foreground font-bold text-2xl">✦</span>
            </div>
            <span className="text-5xl font-heading font-bold text-primary-foreground tracking-tight">SHIFT</span>
          </div>
          <p className="text-primary-foreground/60 text-lg max-w-md mx-auto">
            Institutional-grade fractional art ownership, powered by blockchain technology.
          </p>
          <div className="grid grid-cols-3 gap-6 mt-12 max-w-sm mx-auto">
            {["$1.2B+", "24", "14.2%"].map((v, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-heading font-bold text-secondary">{v}</div>
                <div className="text-primary-foreground/40 text-xs mt-1">{["Art Value", "Museums", "Returns"][i]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-card">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center"><span className="text-primary-foreground font-bold text-sm">P</span></div>
            <span className="font-heading font-semibold text-xl text-foreground">Paradigm Shift</span>
          </div>
          <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Welcome back</h2>
          <p className="text-muted-foreground mb-8">Sign in to access your portal</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="museum@demo.com" value={email} onChange={e => setEmail(e.target.value)} className="pl-10" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="pl-10" required />
              </div>
            </div>
            {error && <p className="text-destructive text-sm">{error}</p>}
            <Button type="submit" className="w-full" size="lg">Sign In <ArrowRight className="w-4 h-4 ml-2" /></Button>
          </form>

          <div className="mt-8 p-4 rounded-lg bg-muted">
            <p className="text-xs text-muted-foreground font-medium mb-2">Demo Credentials</p>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p><span className="font-mono font-medium text-foreground">museum@demo.com</span> — Museum Portal</p>
              <p><span className="font-mono font-medium text-foreground">investor@demo.com</span> — Stakeholder Portal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
