"use client";

import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Star } from "lucide-react";

interface Review {
  id: string;
  productId: string;
  customerName: string;
  rating: number;
  comment: string;
  approved: boolean;
  createdAt: string;
  product?: { name: string };
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    const res = await fetch("/api/admin/reviews");
    if (res.ok) {
      const data = await res.json();
      setReviews(data.reviews || []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchReviews(); }, []);

  const toggleApproval = async (id: string, approved: boolean) => {
    await fetch(`/api/admin/reviews/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ approved: !approved }),
    });
    fetchReviews();
  };

  const deleteReview = async (id: string) => {
    if (!confirm("Supprimer cet avis ?")) return;
    await fetch(`/api/admin/reviews/${id}`, { method: "DELETE" });
    fetchReviews();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Gestion des avis</h1>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3 font-medium">Client</th>
              <th className="text-left p-3 font-medium">Note</th>
              <th className="text-left p-3 font-medium">Commentaire</th>
              <th className="text-left p-3 font-medium">Statut</th>
              <th className="text-right p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading ? (
              <tr><td colSpan={5} className="p-8 text-center text-gray-400">Chargement...</td></tr>
            ) : reviews.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-gray-400">Aucun avis</td></tr>
            ) : (
              reviews.map((review) => (
                <tr key={review.id} className="hover:bg-gray-50">
                  <td className="p-3">
                    <div className="font-medium">{review.customerName}</div>
                    <div className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString("fr-FR")}</div>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={12} className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"} />
                      ))}
                    </div>
                  </td>
                  <td className="p-3 max-w-xs truncate">{review.comment}</td>
                  <td className="p-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${review.approved ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {review.approved ? "Approuve" : "En attente"}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => toggleApproval(review.id, review.approved)} className="p-1 hover:bg-gray-100 rounded" title={review.approved ? "Desapprouver" : "Approuver"}>
                        {review.approved ? <XCircle size={16} className="text-yellow-500" /> : <CheckCircle size={16} className="text-green-500" />}
                      </button>
                      <button onClick={() => deleteReview(review.id)} className="p-1 hover:bg-red-50 rounded text-red-500">
                        <XCircle size={16} />
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
