"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Download, MessageCircle, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice, getStatusLabel, timeAgo } from "@/lib/utils";
import { getStatusUpdateWhatsAppLink } from "@/lib/whatsapp";

const STATUSES = [
  "all",
  "EN_ATTENTE",
  "CONFIRMEE",
  "EN_PREPARATION",
  "EXPEDIEE",
  "LIVREE",
  "ANNULEE",
];

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  customerName: string;
  customerPhone: string;
  customerCity: string;
  customerAddress: string;
  createdAt: string;
  items: { id: string; productName: string; quantity: number; priceAtOrder: number; selectedSize?: string | null }[];
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (statusFilter !== "all") params.set("status", statusFilter);
    if (search) params.set("search", search);
    try {
      const res = await fetch(`/api/orders?${params.toString()}`);
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, search]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateStatus = async (orderId: string, newStatus: string) => {
    await fetch(`/api/orders/${orderId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchOrders();
  };

  const handleExport = () => {
    const params = new URLSearchParams();
    if (statusFilter !== "all") params.set("status", statusFilter);
    window.open(`/api/admin/orders/export?${params.toString()}`);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-display font-bold">Commandes</h1>
        <Button variant="outline" size="sm" onClick={handleExport} className="gap-2">
          <Download size={16} />
          Exporter CSV
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Rechercher par numero ou telephone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchOrders()}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s === "all" ? "Tous les statuts" : getStatusLabel(s)}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Chargement...</div>
        ) : orders.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            Aucune commande trouvee
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">#</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Client</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Ville</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Total</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Statut</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Date</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {orders.map((order) => (
                  <>
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() =>
                        setExpandedOrder(
                          expandedOrder === order.id ? null : order.id
                        )
                      }
                    >
                      <td className="px-4 py-3 text-sm font-medium">
                        {order.orderNumber}
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium">{order.customerName}</p>
                        <p className="text-xs text-gray-500">{order.customerPhone}</p>
                      </td>
                      <td className="px-4 py-3 text-sm hidden md:table-cell">{order.customerCity}</td>
                      <td className="px-4 py-3 text-sm font-bold text-brand-gold">{formatPrice(order.total)}</td>
                      <td className="px-4 py-3">
                        <Badge status={order.status} />
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 hidden md:table-cell">
                        {timeAgo(new Date(order.createdAt))}
                      </td>
                      <td className="px-4 py-3">
                        <div className="relative" onClick={(e) => e.stopPropagation()}>
                          <select
                            value={order.status}
                            onChange={(e) =>
                              updateStatus(order.id, e.target.value)
                            }
                            className="text-xs border rounded px-2 py-1 bg-white"
                          >
                            {STATUSES.filter((s) => s !== "all").map((s) => (
                              <option key={s} value={s}>
                                {getStatusLabel(s)}
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>
                    </tr>
                    {expandedOrder === order.id && (
                      <tr key={`${order.id}-detail`}>
                        <td colSpan={7} className="px-4 py-4 bg-gray-50">
                          <div className="space-y-2">
                            <p className="text-sm">
                              <strong>Adresse:</strong> {order.customerAddress}
                            </p>
                            <p className="text-sm font-medium">Articles:</p>
                            {order.items.map((item) => (
                              <p key={item.id} className="text-sm text-gray-600 ml-4">
                                {item.productName} x{item.quantity} ={" "}
                                {formatPrice(item.priceAtOrder * item.quantity)}
                                {item.selectedSize && ` (Taille: ${item.selectedSize})`}
                              </p>
                            ))}
                            {/* WhatsApp notification button */}
                            <div className="flex items-center gap-2 mt-2">
                              {(() => {
                                const waLink = getStatusUpdateWhatsAppLink({
                                  orderNumber: order.orderNumber,
                                  customerName: order.customerName,
                                  customerPhone: order.customerPhone,
                                  status: order.status,
                                });
                                return waLink ? (
                                  <a
                                    href={waLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-500 text-white text-xs font-medium rounded-lg hover:bg-green-600 transition-colors"
                                  >
                                    <MessageCircle size={14} />
                                    Notifier client via WhatsApp
                                  </a>
                                ) : null;
                              })()}
                              <a
                                href={`/api/orders/${order.id}/pdf`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-gold text-white text-xs font-medium rounded-lg hover:bg-brand-gold-dark transition-colors"
                              >
                                <FileText size={14} />
                                Bon de commande PDF
                              </a>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
