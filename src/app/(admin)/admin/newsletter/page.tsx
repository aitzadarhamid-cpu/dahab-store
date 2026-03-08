"use client";

import { useState, useEffect } from "react";
import { Download, Mail, Users, UserPlus, ToggleRight, ToggleLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Subscriber {
  id: string;
  email: string;
  firstName: string;
  subscribedAt: string;
  active: boolean;
}

interface NewsletterStats {
  total: number;
  active: number;
  newThisMonth: number;
}

export default function AdminNewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [stats, setStats] = useState<NewsletterStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/newsletter");
      if (res.ok) {
        const data = await res.json();
        setSubscribers(data.subscribers || []);
        setStats(data.stats || null);
      }
    } catch (err) {
      console.error("Fetch newsletter error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const exportCSV = () => {
    const activeSubscribers = subscribers.filter((s) => s.active);
    const headers = ["Email", "Prenom", "Date d'inscription", "Statut"];
    const rows = activeSubscribers.map((s) => [
      s.email,
      s.firstName || "",
      new Date(s.subscribedAt).toLocaleDateString("fr-FR"),
      s.active ? "Actif" : "Inactif",
    ]);

    const csvContent =
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `dahab-newsletter-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const statCards = stats
    ? [
        {
          label: "Total abonnes",
          value: stats.total.toString(),
          icon: Users,
          color: "bg-blue-50 text-blue-700",
        },
        {
          label: "Abonnes actifs",
          value: stats.active.toString(),
          icon: Mail,
          color: "bg-green-50 text-green-700",
        },
        {
          label: "Nouveaux ce mois",
          value: stats.newThisMonth.toString(),
          icon: UserPlus,
          color: "bg-purple-50 text-purple-700",
        },
      ]
    : [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold text-brand-black">
          Newsletter
        </h1>
        <Button
          size="sm"
          variant="outline"
          onClick={exportCSV}
          disabled={subscribers.length === 0}
          className="gap-2"
        >
          <Download size={16} />
          Exporter CSV
        </Button>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {statCards.map((card) => (
            <div
              key={card.label}
              className="bg-white rounded-xl p-5 shadow-sm"
            >
              <div
                className={`w-10 h-10 rounded-lg ${card.color} flex items-center justify-center mb-3`}
              >
                <card.icon size={20} />
              </div>
              <p className="text-sm text-gray-500">{card.label}</p>
              <p className="text-2xl font-display font-bold text-brand-black">
                {card.value}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Subscribers Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3 font-medium">Email</th>
              <th className="text-left p-3 font-medium">Prenom</th>
              <th className="text-left p-3 font-medium">Date</th>
              <th className="text-left p-3 font-medium">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-400">
                  Chargement...
                </td>
              </tr>
            ) : subscribers.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-400">
                  Aucun abonne pour le moment
                </td>
              </tr>
            ) : (
              subscribers.map((sub) => (
                <tr key={sub.id} className="hover:bg-gray-50">
                  <td className="p-3 font-medium">{sub.email}</td>
                  <td className="p-3 text-gray-600">
                    {sub.firstName || "-"}
                  </td>
                  <td className="p-3 text-gray-500">
                    {new Date(sub.subscribedAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="p-3">
                    <span
                      className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                        sub.active
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {sub.active ? (
                        <ToggleRight size={14} />
                      ) : (
                        <ToggleLeft size={14} />
                      )}
                      {sub.active ? "Actif" : "Inactif"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
