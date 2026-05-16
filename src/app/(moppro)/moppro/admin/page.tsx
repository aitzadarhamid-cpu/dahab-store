'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  TrendingUp,
  ShoppingBag,
  Package,
  Euro,
  RefreshCw,
  ChevronDown,
  LogOut,
  Lock,
  BarChart3,
  Minus,
  Plus,
} from 'lucide-react';

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerCity: string;
  customerAddress: string;
  total: number;
  withUpsell: boolean;
  status: string;
  createdAt: string;
  items: { name: string; price: number; quantity: number }[];
}

interface Stats {
  totalOrders: number;
  todayOrders: number;
  totalRevenue: string;
  todayRevenue: string;
  stock: number;
  upsellRate: number | string;
  recentOrders: Order[];
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  EN_ATTENTE: { label: 'En attente', color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30' },
  EN_COURS: { label: 'En cours', color: 'text-blue-400 bg-blue-400/10 border-blue-400/30' },
  EXPEDIE: { label: 'Expédié', color: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30' },
  LIVRE: { label: 'Livré', color: 'text-green-400 bg-green-400/10 border-green-400/30' },
  ANNULE: { label: 'Annulé', color: 'text-red-400 bg-red-400/10 border-red-400/30' },
};

const ADMIN_PASSWORD = 'admin1234';

export default function AdminPage() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [pwError, setPwError] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [stock, setStock] = useState(0);
  const [loading, setLoading] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/moppro/stats');
    const data = await res.json();
    setStats(data);
    setStock(data.stock);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (authenticated) fetchStats();
  }, [authenticated, fetchStats]);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      setPwError(true);
      setTimeout(() => setPwError(false), 1500);
    }
  };

  const updateStock = async (newStock: number) => {
    setStock(newStock);
    await fetch('/api/moppro/stock', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stock: newStock }),
    });
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch('/api/moppro/orders', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    fetchStats();
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-cyan-400" />
            </div>
            <h1 className="text-2xl font-black text-white">Dashboard Admin</h1>
            <p className="text-gray-400 text-sm mt-1">MopPro Elite</p>
          </div>
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6">
            <label className="text-xs text-gray-400 mb-2 block">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="••••••••"
              className={`w-full bg-white/[0.05] border rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none transition-colors text-sm mb-4 ${
                pwError ? 'border-red-500/50 animate-shake' : 'border-white/[0.1] focus:border-cyan-500/50'
              }`}
            />
            {pwError && <p className="text-red-400 text-xs mb-3">Mot de passe incorrect</p>}
            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-[#0a0f1e] font-black py-3 rounded-xl hover:scale-[1.02] transition-transform"
            >
              Se connecter
            </button>
            <p className="text-center text-xs text-gray-600 mt-3">
              Démo : admin1234
            </p>
          </div>
          <button
            onClick={() => router.push('/moppro')}
            className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mx-auto mt-4 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au site
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1e] px-4 py-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/moppro')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-black text-white">Dashboard Admin</h1>
              <p className="text-xs text-gray-500">MopPro Elite — Vue en temps réel</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchStats}
              disabled={loading}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={() => setAuthenticated(false)}
              className="text-gray-600 hover:text-red-400 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {stats && (
          <>
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Euro className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-gray-400">CA aujourd'hui</span>
                </div>
                <p className="text-2xl font-black text-white">{stats.todayRevenue} €</p>
                <p className="text-xs text-gray-500 mt-1">{stats.todayOrders} commandes</p>
              </div>

              <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs text-gray-400">CA total</span>
                </div>
                <p className="text-2xl font-black text-white">{stats.totalRevenue} €</p>
                <p className="text-xs text-gray-500 mt-1">{stats.totalOrders} commandes</p>
              </div>

              <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <ShoppingBag className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs text-gray-400">Taux upsell</span>
                </div>
                <p className="text-2xl font-black text-white">{stats.upsellRate}%</p>
                <p className="text-xs text-gray-500 mt-1">éponge de rechange</p>
              </div>

              <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-4 h-4 text-purple-400" />
                  <span className="text-xs text-gray-400">Panier moyen</span>
                </div>
                <p className="text-2xl font-black text-white">
                  {stats.totalOrders > 0
                    ? (parseFloat(stats.totalRevenue) / stats.totalOrders).toFixed(2)
                    : '0.00'}{' '}
                  €
                </p>
                <p className="text-xs text-gray-500 mt-1">par commande</p>
              </div>
            </div>

            {/* Stock manager */}
            <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-5 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-cyan-400" />
                <h2 className="text-white font-bold">Gestion du stock</h2>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => updateStock(stock - 1)}
                  disabled={stock <= 0}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors disabled:opacity-30"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="flex-1 text-center">
                  <p className="text-4xl font-black text-white">{stock}</p>
                  <p className="text-xs text-gray-400 mt-1">exemplaires en stock</p>
                </div>
                <button
                  onClick={() => updateStock(stock + 1)}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-4 flex gap-2">
                {[10, 25, 50, 100].map((n) => (
                  <button
                    key={n}
                    onClick={() => updateStock(n)}
                    className="flex-1 py-1.5 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-cyan-500/30 text-xs transition-colors"
                  >
                    {n}
                  </button>
                ))}
              </div>
              <div className="mt-3 h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    stock > 20 ? 'bg-green-500' : stock > 5 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min(100, (stock / 100) * 100)}%` }}
                />
              </div>
              <p className={`text-xs mt-1 ${stock <= 5 ? 'text-red-400' : stock <= 20 ? 'text-yellow-400' : 'text-green-400'}`}>
                {stock <= 5 ? '⚠️ Stock critique' : stock <= 20 ? '⚡ Stock faible' : '✅ Stock OK'}
              </p>
            </div>

            {/* Orders list */}
            <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-white/[0.06]">
                <h2 className="text-white font-bold flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-cyan-400" />
                  Commandes récentes ({stats.totalOrders})
                </h2>
              </div>

              {stats.recentOrders.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>Aucune commande pour l'instant</p>
                  <p className="text-xs mt-1">Les commandes apparaîtront ici</p>
                </div>
              ) : (
                <div>
                  {stats.recentOrders.map((order) => {
                    const statusInfo = STATUS_LABELS[order.status] ?? STATUS_LABELS.EN_ATTENTE;
                    return (
                      <div key={order.id} className="border-b border-white/[0.04] last:border-0">
                        <button
                          onClick={() =>
                            setExpandedOrder(expandedOrder === order.id ? null : order.id)
                          }
                          className="w-full p-4 text-left hover:bg-white/[0.02] transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-cyan-400 font-bold text-sm">{order.orderNumber}</p>
                              <p className="text-white text-sm">{order.customerName}</p>
                              <p className="text-gray-500 text-xs">{order.customerCity}</p>
                            </div>
                            <div className="text-right flex items-center gap-2">
                              <div>
                                <p className="text-white font-bold">{order.total.toFixed(2)} €</p>
                                <span className={`text-xs border rounded-full px-2 py-0.5 ${statusInfo.color}`}>
                                  {statusInfo.label}
                                </span>
                              </div>
                              <ChevronDown
                                className={`w-4 h-4 text-gray-500 transition-transform ${
                                  expandedOrder === order.id ? 'rotate-180' : ''
                                }`}
                              />
                            </div>
                          </div>
                        </button>

                        {expandedOrder === order.id && (
                          <div className="px-4 pb-4 bg-white/[0.02]">
                            <div className="text-xs text-gray-400 space-y-1 mb-3">
                              <p>📞 {order.customerPhone}</p>
                              <p>📍 {order.customerAddress}</p>
                              <p>📅 {new Date(order.createdAt).toLocaleString('fr-FR')}</p>
                              {order.withUpsell && (
                                <p className="text-yellow-400">✅ Upsell éponge inclus</p>
                              )}
                            </div>
                            <div className="mb-3">
                              <p className="text-xs text-gray-500 mb-1">Articles :</p>
                              {order.items?.map((item, i) => (
                                <p key={i} className="text-xs text-white">
                                  {item.name} × {item.quantity} — {(item.price * item.quantity).toFixed(2)} €
                                </p>
                              ))}
                            </div>
                            <div className="flex gap-2 flex-wrap">
                              {Object.entries(STATUS_LABELS).map(([key, { label, color }]) => (
                                <button
                                  key={key}
                                  onClick={() => updateStatus(order.id, key)}
                                  className={`text-xs border rounded-full px-3 py-1 transition-colors ${
                                    order.status === key
                                      ? color
                                      : 'text-gray-500 border-gray-700 hover:border-gray-500'
                                  }`}
                                >
                                  {label}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}

        {loading && !stats && (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}
