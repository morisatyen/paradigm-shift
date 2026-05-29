import { TRANSACTIONS } from "@/data/mockData";
import { Activity, CheckCircle2, Clock3, Layers, Wallet } from "lucide-react";

const Blockchain = () => {
  const confirmed = TRANSACTIONS.filter((tx) => tx.status === "confirmed").length;
  const pending = TRANSACTIONS.length - confirmed;
  const latestBlock = Math.max(...TRANSACTIONS.map((tx) => tx.block));

  return (
    <div className="p-8">
      <h1 className="text-2xl font-heading font-bold text-foreground mb-2">Blockchain</h1>
      <p className="text-muted-foreground text-sm mt-1 mb-8">Real-time transaction feed and network metrics</p>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="glass-card rounded-xl p-5">
          <Layers className="w-5 h-5 text-secondary mb-3" />
          <div className="text-2xl font-bold text-foreground">{latestBlock.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">Latest Block</div>
        </div>
        <div className="glass-card rounded-xl p-5">
          <CheckCircle2 className="w-5 h-5 text-success mb-3" />
          <div className="text-2xl font-bold text-foreground">{confirmed}</div>
          <div className="text-xs text-muted-foreground">Confirmed Transactions</div>
        </div>
        <div className="glass-card rounded-xl p-5">
          <Clock3 className="w-5 h-5 text-warning mb-3" />
          <div className="text-2xl font-bold text-foreground">{pending}</div>
          <div className="text-xs text-muted-foreground">Pending Transactions</div>
        </div>
        <div className="glass-card rounded-xl p-5">
          <Wallet className="w-5 h-5 text-secondary mb-3" />
          <div className="text-2xl font-bold text-foreground">$19.70</div>
          <div className="text-xs text-muted-foreground">Avg Gas (24h)</div>
        </div>
      </div>

      <div className="glass-card rounded-xl overflow-hidden">
        <div className="p-6 pb-4 flex items-center gap-2">
          <Activity className="w-4 h-4 text-secondary" />
          <h3 className="text-3xl font-serif italic font-normal text-foreground">Transaction Feed</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {[
                "Hash",
                "Type",
                "Artwork",
                "Amount",
                "Block",
                "Gas",
                "Time",
                "Status",
              ].map((h) => (
                <th key={h} className="p-4 pt-0 text-left text-sm font-bold text-muted-foreground">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TRANSACTIONS.map((tx) => (
              <tr key={tx.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                <td className="p-4 text-sm font-medium text-foreground">{tx.hash}</td>
                <td className="p-4 text-sm text-foreground">{tx.type}</td>
                <td className="p-4 text-sm text-muted-foreground">{tx.artwork}</td>
                <td className="p-4 text-sm text-foreground">{tx.amount}</td>
                <td className="p-4 text-sm text-foreground">{tx.block.toLocaleString()}</td>
                <td className="p-4 text-sm text-muted-foreground">{tx.gas}</td>
                <td className="p-4 text-sm text-muted-foreground">{tx.timestamp}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      tx.status === "confirmed" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                    }`}
                  >
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Blockchain;
