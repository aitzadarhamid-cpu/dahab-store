"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  changePasswordFormSchema,
  type ChangePasswordFormValues,
} from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, Check, X } from "lucide-react";

const PASSWORD_RULES = [
  { label: "Au moins 12 caracteres", test: (v: string) => v.length >= 12 },
  { label: "Une lettre majuscule", test: (v: string) => /[A-Z]/.test(v) },
  { label: "Une lettre minuscule", test: (v: string) => /[a-z]/.test(v) },
  { label: "Un chiffre", test: (v: string) => /[0-9]/.test(v) },
  {
    label: "Un caractere special (!@#$%...)",
    test: (v: string) => /[^A-Za-z0-9]/.test(v),
  },
];

export default function ResetPasswordPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPasswordValue = watch("newPassword", "");

  const onSubmit = async (data: ChangePasswordFormValues) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erreur lors du changement");
      }

      // Password changed successfully — redirect to admin dashboard
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erreur lors du changement"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl font-bold text-brand-black">
            DAHAB
          </h1>
          <p className="text-brand-gold font-display text-lg">دهب</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          {/* Security notice */}
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <Shield size={20} className="text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-amber-800">
                Changement de mot de passe requis
              </p>
              <p className="text-xs text-amber-600 mt-1">
                Pour la securite de votre compte, veuillez definir un nouveau
                mot de passe fort avant de continuer.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Mot de passe actuel"
              type="password"
              placeholder="Votre mot de passe actuel"
              error={errors.currentPassword?.message}
              {...register("currentPassword")}
            />

            <div>
              <Input
                label="Nouveau mot de passe"
                type="password"
                placeholder="Minimum 12 caracteres"
                error={errors.newPassword?.message}
                {...register("newPassword")}
              />

              {/* Password strength indicators */}
              {newPasswordValue.length > 0 && (
                <div className="mt-2 space-y-1">
                  {PASSWORD_RULES.map((rule) => {
                    const passed = rule.test(newPasswordValue);
                    return (
                      <div
                        key={rule.label}
                        className={`flex items-center gap-1.5 text-xs ${
                          passed ? "text-green-600" : "text-gray-400"
                        }`}
                      >
                        {passed ? (
                          <Check size={12} className="flex-shrink-0" />
                        ) : (
                          <X size={12} className="flex-shrink-0" />
                        )}
                        {rule.label}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <Input
              label="Confirmer le nouveau mot de passe"
              type="password"
              placeholder="Confirmez votre nouveau mot de passe"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />

            {error && (
              <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}

            <Button
              type="submit"
              loading={loading}
              size="lg"
              className="w-full"
            >
              Enregistrer le nouveau mot de passe
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          Vous serez redirige vers le tableau de bord apres le changement.
        </p>
      </div>
    </div>
  );
}
