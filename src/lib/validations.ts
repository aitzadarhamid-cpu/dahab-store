import { z } from "zod";

const phoneRegex = /^(?:\+212|00212|0)[67]\d{8}$/;

export const orderFormSchema = z.object({
  customerName: z
    .string()
    .min(3, "Le nom doit contenir au moins 3 caracteres"),
  customerPhone: z.string().regex(phoneRegex, "Numero de telephone invalide (format: 06XXXXXXXX)"),
  customerCity: z.string().min(1, "Veuillez selectionner une ville"),
  customerAddress: z
    .string()
    .min(5, "L'adresse doit contenir au moins 5 caracteres"),
  customerNote: z.string().optional(),
});

export type OrderFormValues = z.infer<typeof orderFormSchema>;

export const productFormSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caracteres"),
  slug: z.string().optional(),
  description: z
    .string()
    .min(10, "La description doit contenir au moins 10 caracteres"),
  price: z.coerce.number().min(1, "Le prix doit etre superieur a 0"),
  compareAtPrice: z.coerce.number().optional().nullable(),
  category: z.string().min(1, "Categorie requise"),
  material: z.string().min(1, "Materiau requis"),
  stock: z.coerce.number().min(0, "Le stock ne peut pas etre negatif"),
  sizes: z.string().optional(),
  images: z.string().optional(),
  featured: z.boolean().optional(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;

export const loginFormSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caracteres"),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

// Strong password validation for admin accounts
export const strongPasswordSchema = z
  .string()
  .min(12, "Le mot de passe doit contenir au moins 12 caracteres")
  .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
  .regex(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule")
  .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
  .regex(
    /[^A-Za-z0-9]/,
    "Le mot de passe doit contenir au moins un caractere special (!@#$%...)"
  );

export const changePasswordFormSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Le mot de passe actuel est requis"),
    newPassword: strongPasswordSchema,
    confirmPassword: z.string().min(1, "La confirmation est requise"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "Le nouveau mot de passe doit etre different de l'ancien",
    path: ["newPassword"],
  });

export type ChangePasswordFormValues = z.infer<typeof changePasswordFormSchema>;

export function validatePhone(phone: string): boolean {
  return phoneRegex.test(phone);
}
