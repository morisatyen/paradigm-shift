import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Circle, ArrowRight, ArrowLeft, User, Shield, AlertTriangle, FileText, Fingerprint } from "lucide-react";

const STEPS = [
  { title: "Identity", icon: User, desc: "Personal information verification" },
  { title: "Documents", icon: FileText, desc: "Upload identity documents" },
  { title: "Accreditation", icon: Shield, desc: "Accredited investor verification" },
  { title: "Risk Profile", icon: AlertTriangle, desc: "Investment risk assessment" },
  { title: "Biometric", icon: Fingerprint, desc: "Final verification step" },
];

const Onboarding = () => {
  const [step, setStep] = useState(0);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-heading font-bold text-foreground mb-2">KYC / AML Verification</h1>
      <p className="text-muted-foreground text-sm mb-8">5-step onboarding process</p>

      <div className="flex gap-4 mb-8">
        {STEPS.map((s, i) => (
          <div key={i} className={`flex-1 flex items-center gap-2 p-3 rounded-lg border ${i === step ? "border-secondary bg-secondary/5" : i < step ? "border-success/30 bg-success/5" : "border-border"}`}>
            {i < step ? <CheckCircle2 className="w-5 h-5 text-success shrink-0" /> : <s.icon className={`w-5 h-5 shrink-0 ${i === step ? "text-secondary" : "text-muted-foreground"}`} />}
            <div><div className="text-sm font-medium text-foreground">{s.title}</div><div className="text-xs text-muted-foreground hidden lg:block">{s.desc}</div></div>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-xl p-8 max-w-2xl">
        {step === 0 && (<div className="space-y-4"><div className="grid grid-cols-2 gap-4"><div><Label>First Name</Label><Input placeholder="Alexander" /></div><div><Label>Last Name</Label><Input placeholder="Petrov" /></div></div><Label>Email</Label><Input type="email" placeholder="alex@fund.com" /><Label>Phone</Label><Input placeholder="+1 (555) 000-0000" /><Label>Country of Residence</Label><Input placeholder="United States" /></div>)}
        {step === 1 && (<div className="space-y-4"><Label>Government ID</Label><div className="border-2 border-dashed border-border rounded-lg p-8 text-center"><p className="text-muted-foreground text-sm">Drag & drop or click to upload passport/driver's license</p></div><Label>Proof of Address</Label><div className="border-2 border-dashed border-border rounded-lg p-8 text-center"><p className="text-muted-foreground text-sm">Utility bill or bank statement (last 90 days)</p></div></div>)}
        {step === 2 && (<div className="space-y-4"><Label>Annual Income</Label><select className="w-full p-2 rounded-lg border border-border bg-background text-foreground text-sm"><option>$200,000+</option><option>$300,000+ (joint)</option></select><Label>Net Worth (excl. primary residence)</Label><select className="w-full p-2 rounded-lg border border-border bg-background text-foreground text-sm"><option>$1,000,000+</option><option>$5,000,000+</option></select><Label>Accreditation Documentation</Label><div className="border-2 border-dashed border-border rounded-lg p-8 text-center"><p className="text-muted-foreground text-sm">Upload CPA letter or brokerage statement</p></div></div>)}
        {step === 3 && (<div className="space-y-4">{["What is your investment horizon?", "How would you react to a 20% portfolio decline?", "What percentage of net worth will you allocate?"].map((q, i) => (<div key={i}><Label>{q}</Label><select className="w-full p-2 rounded-lg border border-border bg-background text-foreground text-sm mt-1"><option>Select...</option><option>Conservative</option><option>Moderate</option><option>Aggressive</option></select></div>))}</div>)}
        {step === 4 && (<div className="text-center py-8"><Fingerprint className="w-16 h-16 text-secondary mx-auto mb-4" /><h3 className="text-xl font-heading font-bold text-foreground mb-2">Biometric Verification</h3><p className="text-muted-foreground mb-6">Take a selfie to match against your uploaded ID</p><Button size="lg">Start Verification</Button></div>)}

        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}><ArrowLeft className="w-4 h-4 mr-2" />Back</Button>
          <Button onClick={() => setStep(Math.min(4, step + 1))} disabled={step === 4}>Next <ArrowRight className="w-4 h-4 ml-2" /></Button>
        </div>
      </div>
    </div>
  );
};
export default Onboarding;
