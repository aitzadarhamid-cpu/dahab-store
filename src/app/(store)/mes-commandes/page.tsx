"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Package, ChevronDown, ChevronUp, Clock, CheckCircle, Truck, MapPin, XCircle, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice, getStatusLabel, getStatusColor } from "@/lib/utils";

interface OrderItem {
  name: string;
  image: string;
  quantity: number;
  price: number;
  size: string | null;
}

interface Order {
  orderNumber: string;
  status: string;
  total: number;
  customerName: string;
  customerCity: string;
  createdAt: string;
  itemCount: number;
  items: OrderItem[];
}

const statusIcons: Record<string, typeof Clock> = {
  EN_ATTENTE: Clock,
  CONFIRMEE: CheckCircle,
  EN_PREPARATION: Package,
  EXPEDIEE: Truck,
  LIVREE: MapPin,
  ANNULEE: XCircle,
};

export default function MesCommandesPage() {
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setOrders([]);
    setLoading(true);
    setSearched(true);

    try {
      const res = await fetch("/api/orders/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phone.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
      } else {
        setOrders(data.orders);
      }
    } catch {
      setError("Erreur de connexion");
    }
    setLoading(false);
  };

  return (
    <div className="container-page py-8 max-w-2xl mx-auto">
      <h1 className="section-title mb-2">Mes commandes</h1>
      <p className="text-gray-500 text-center mb-8">
        Entrez votre numero de telephone pour retrouver toutes vos commandes
      </p>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm mb-8">
        <div className="space-y-4">
          <Input
            label="Telephone"
            placeholder="06XXXXXXXX"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          {error && (
            <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</p>
          )}
          <Button type="submit" loading={loading} className="w-full gap-2">
            <Search size={16} /> Rechercher mes commandes
          </Button>
        </div>
      </form>

      {searched && orders.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <p className="text-sm text-gray-500 mb-2">
            {orders.length} commande{orders.length > 1 ? "s" : ""} trouvee{orders.length > 1 ? "s" : ""}
          </p>

          {orders.map((order) => {
            const isExpanded = expandedOrder === order.orderNumber;
            const StatusIcon = statusIcons[order.status] || Package;

            return (
              <motion.div
                key={order.orderNumber}
                layout
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setExpandedOrder(isExpanded ? null : order.orderNumber)}
                  className="w-full p-5 flex items-center gap-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-brand-cream flex items-center justify-center flex-shrink-0">
                    <StatusIcon size={18} className="text-brand-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-display font-bold text-sm">{order.orderNumber}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                      {" · "}
                      {order.itemCount} article{order.itemCount > 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-display font-bold text-brand-gold">{formatPrice(order.total)}</p>
                    {isExpanded ? <ChevronUp size={16} className="text-gray-400 ml-auto mt-1" /> : <ChevronDown size={16} className="text-gray-400 ml-auto mt-1" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                        <div className="space-y-3">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex gap-3">
                              <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{item.name}</p>
                                <p className="text-xs text-gray-500">
                                  x{item.quantity} {item.size && `· Taille: ${item.size}`}
                                </p>
                              </div>
                              <span className="text-sm font-bold flex-shrink-0">{formatPrice(item.price * item.quantity)}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                          <span className="text-xs text-gray-500">
                            {order.customerCity}
                          </span>
                          <Link
                            href={`/suivi?order=${order.orderNumber}&phone=${phone}`}
                            className="text-xs text-brand-gold font-medium hover:underline"
                          >
                            Suivre cette commande
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {searched && orders.length === 0 && !error && !loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <ShoppingBag size={48} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Aucune commande trouvee</p>
          <Link href="/boutique" className="text-brand-gold text-sm font-medium hover:underline mt-2 inline-block">
            Decouvrir notre boutique
          </Link>
        </motion.div>
      )}
    </div>
  );
}
