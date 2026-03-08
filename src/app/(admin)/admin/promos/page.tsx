"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";

interface PromoCode {
  id: string;
  code: string;
  type: string;
  value: number;
  minOrder: number;
  maxUses: number;
  usedCount: number;
  active: boolean;
  expiresAt: string | null;
  createdAt: string;
}

export default function AdminPromosPage() {
  const [promos, setPromos] = useState<PromoCode[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form state
  const [code, setCode] = useState("");
  const [type, setType] = useState("PERCENTAGE");
  const [value, setValue] = useState("");
  const [minOrder, setMinOrder] = useState("");
  const [maxUses, setMaxUses] = useState("");

  const fetchPromos = async () => {
    const res = await fetch("/api/promos");
    if (res.ok) {
      const data = await res.json();
      setPromos(data.promos || []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchPromos(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/promos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: code.toUpperCase().trim(),
        type,
        value: parseFloat(value),
        minOrder: parseFloat(minOrder) || 0,
        maxUses: parseInt(maxUses) || 0,
      }),
    });
    if (res.ok) {
      setShowForm(false);
      setCode(""); setValue(""); setMinOrder(""); setMaxUses("");
      fetchPromos();
    }
  };

  const toggleActive = async (id: string, active: boolean) => {
    await fetch(`/api/promos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !active }),
    });
    fetchPromos();
  };

  const deletePromo = async (id: string) => {
    if (!confirm("Supprimer ce code promo ?")) return;
    await fetch(`/api/promos/${id}`, { method: "DELETE" });
    fetchPromos();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Codes promo</h1>
        <Button size="sm" onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus size={16} /> Nouveau code
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-white rounded-xl p-5 shadow-sm mb-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Code" value={code} onChange={(e) => setCode(e.target.value)} placeholder="DAHAB25" required />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)} className="w-full px-3 py-2 border rounded-lg">
                <option value="PERCENTAGE">Pourcentage (%)</option>
                <option value="FIXED">Montant fixe (MAD)</option>
              </select>
            </div>
            <Input label={type === "PERCENTAGE" ? "Pourcentage" : "Montant (MAD)"} value={value} onChange={(e) => setValue(e.target.value)} type="number" required />
            <Input label="Commande minimum (MAD)" value={minOrder} onChange={(e) => setMinOrder(e.target.value)} type="number" placeholder="0" />
            <Input label="Utilisations max (0=illimite)" value={maxUses} onChange={(e) => setMaxUses(e.target.value)} type="number" placeholder="0" />
          </div>
          <div className="flex gap-2">
            <Button type="submit" size="sm">Creer</Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => setShowForm(false)}>Annuler</Button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3 font-medium">Code</th>
              <th className="text-left p-3 font-medium">Remise</th>
              <th className="text-left p-3 font-medium">Min.</th>
              <th className="text-left p-3 font-medium">Utilise</th>
              <th className="text-left p-3 font-medium">Statut</th>
              <th className="text-right p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading ? (
              <tr><td colSpan={6} className="p-8 text-center text-gray-400">Chargement...</td></tr>
            ) : promos.length === 0 ? (
              <tr><td colSpan={6} className="p-8 text-center text-gray-400">Aucun code promo</td></tr>
            ) : (
              promos.map((promo) => (
                <tr key={promo.id} className="hover:bg-gray-50">
                  <td className="p-3 font-mono font-bold">{promo.code}</td>
                  <td className="p-3">
                    {promo.type === "PERCENTAGE" ? `${promo.value}%` : formatPrice(promo.value)}
                  </td>
                  <td className="p-3">{promo.minOrder > 0 ? formatPrice(promo.minOrder) : "-"}</td>
                  <td className="p-3">{promo.usedCount}/{promo.maxUses || "∞"}</td>
                  <td className="p-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${promo.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {promo.active ? "Actif" : "Inactif"}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => toggleActive(promo.id, promo.active)} className="p-1 hover:bg-gray-100 rounded">
                        {promo.active ? <ToggleRight size={18} className="text-green-600" /> : <ToggleLeft size={18} className="text-gray-400" />}
                      </button>
                      <button onClick={() => deletePromo(promo.id)} className="p-1 hover:bg-red-50 rounded text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </div>
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
