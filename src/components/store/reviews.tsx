"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { timeAgo } from "@/lib/utils";

interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ProductReviewsProps {
  productId: string;
}

function StarRating({
  rating,
  interactive = false,
  onRate,
  size = 16,
}: {
  rating: number;
  interactive?: boolean;
  onRate?: (r: number) => void;
  size?: number;
}) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => onRate?.(star)}
          onMouseEnter={() => interactive && setHover(star)}
          onMouseLeave={() => interactive && setHover(0)}
          className={interactive ? "cursor-pointer" : "cursor-default"}
        >
          <Star
            size={size}
            className={`transition-colors ${
              star <= (hover || rating)
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [avgRating, setAvgRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetch(`/api/reviews?productId=${productId}`)
      .then((r) => r.json())
      .then((data) => {
        setReviews(data.reviews || []);
        setAvgRating(data.averageRating || 0);
        setTotalReviews(data.totalReviews || 0);
      })
      .catch(() => {});
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !rating || !comment) return;

    setLoading(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, customerName: name, rating, comment }),
      });
      if (res.ok) {
        setSubmitted(true);
        setShowForm(false);
        setName("");
        setRating(0);
        setComment("");
      }
    } catch {}
    setLoading(false);
  };

  return (
    <div className="mt-12 border-t pt-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-xl font-bold">
            Avis clients
          </h3>
          {totalReviews > 0 && (
            <div className="flex items-center gap-2 mt-1">
              <StarRating rating={Math.round(avgRating)} size={14} />
              <span className="text-sm text-gray-500">
                {avgRating.toFixed(1)} ({totalReviews} avis)
              </span>
            </div>
          )}
        </div>
        {!showForm && !submitted && (
          <Button variant="outline" size="sm" onClick={() => setShowForm(true)}>
            Donner votre avis
          </Button>
        )}
      </div>

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 text-green-700 p-4 rounded-xl flex items-center gap-2 mb-6"
          >
            <CheckCircle size={18} />
            Merci ! Votre avis sera publie apres validation.
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="bg-brand-cream rounded-xl p-5 mb-6 space-y-4"
          >
            <Input
              label="Votre nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Fatima Z."
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Note
              </label>
              <StarRating rating={rating} interactive onRate={setRating} size={24} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Commentaire
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Partagez votre experience..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold bg-white resize-none min-h-[80px]"
                required
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" size="sm" loading={loading} className="gap-2">
                <Send size={14} /> Envoyer
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowForm(false)}
              >
                Annuler
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {reviews.length === 0 && !showForm && !submitted && (
        <p className="text-gray-400 text-center py-8">
          Aucun avis pour le moment. Soyez le premier !
        </p>
      )}

      <div className="space-y-4">
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl p-4 shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold font-bold text-sm">
                  {review.customerName.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium text-sm">{review.customerName}</span>
              </div>
              <span className="text-xs text-gray-400">
                {timeAgo(new Date(review.createdAt))}
              </span>
            </div>
            <StarRating rating={review.rating} size={12} />
            <p className="text-sm text-gray-600 mt-2">{review.comment}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
