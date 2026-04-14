import { TRANSACTIONS } from "@/data/mockData";
import { ArrowRightLeft, Fuel, Box, Clock } from "lucide-react";

const Blockchain = () => (
  <div className="p-8">
    <h1 className="text-2xl font-heading font-bold text-foreground mb-2">Blockchain</h1>
    <p className="text-muted-foreground text-sm mb-8">Real-time transaction feed & network metrics</p>

    <div className="grid md:grid-cols-3 gap-4 mb-8">
      {[{ label: "Total Transactions", value: "2,847", icon: ArrowRightLeft }, { label: "Avg Gas Cost", value: "$3.94", icon: Fuel }, { label: "Latest Block", value: "#19,234,567", icon: Box }].map(m => (
        <div key={m.label} className="glass-card rounded-xl p-5">
          <m.icon className="w-5 h-5 text-secondary mb-3" />
          <div className="text-2xl font-bold text-foreground">{m.value}</div>
          <div className="text-xs text-muted-foreground">{m.label}</div>
        </div>
      ))}
    </div>

    <div className="glass-card rounded-xl p-6 mb-8">
      <h3 className="font-semibold text-foreground mb-4">Bridge Visualization</h3>
      <div className="flex items-center justify-center gap-4 py-8">
        <div className="text-center p-4 rounded-xl border border-border bg-muted/50 w-40">
          <div className="text-sm font-semibold text-foreground">Ethereum L1</div>
          <div className="text-xs text-muted-foreground">Security Layer</div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <ArrowRightLeft className="w-5 h-5 text-secondary" />
          <span className="text-xs text-muted-foreground">Bridge</span>
        </div>
        <div className="text-center p-4 rounded-xl border border-secondary/30 bg-secondary/5 w-40">
          <div className="text-sm font-semibold text-foreground">Polygon L2</div>
          <div className="text-xs text-muted-foreground">Execution Layer</div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <ArrowRightLeft className="w-5 h-5 text-secondary" />
          <span className="text-xs text-muted-foreground">Settle</span>
        </div>
        <div className="text-center p-4 rounded-xl border border-border bg-muted/50 w-40">
          <div className="text-sm font-semibold text-foreground">IPFS</div>
          <div className="text-xs text-muted-foreground">Metadata Storage</div>
        </div>
      </div>
    </div>

    <div className="glass-card rounded-xl overflow-hidden">
      <h3 className="font-semibold text-foreground p-6 pb-4">Transaction Feed</h3>
      <table className="w-full">
        <thead><tr className="border-b border-border text-left">
          {["Hash", "Type", "Amount", "Artwork", "Time", "Gas", "Status"].map(h => <th key={h} className="px-6 py-3 text-xs font-medium text-muted-foreground">{h}</th>)}
        </tr></thead>
        <tbody>
          {TRANSACTIONS.map(tx => (
            <tr key={tx.id} className="border-b border-border last:border-0 hover:bg-muted/50">
              <td className="px-6 py-4 text-sm font-mono text-secondary">{tx.hash}</td>
              <td className="px-6 py-4 text-sm text-foreground">{tx.type}</td>
              <td className="px-6 py-4 text-sm font-semibold text-foreground">{tx.amount}</td>
              <td className="px-6 py-4 text-sm text-muted-foreground">{tx.artwork}</td>
              <td className="px-6 py-4 text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{tx.timestamp}</td>
              <td className="px-6 py-4 text-xs text-muted-foreground">{tx.gas}</td>
              <td className="px-6 py-4"><span className={`px-2 py-1 rounded-full text-xs ${tx.status === "confirmed" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>{tx.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
export default Blockchain;
