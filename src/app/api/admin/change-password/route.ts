import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  requireAdmin,
  verifyPassword,
  hashPassword,
  signToken,
  setAuthCookie,
} from "@/lib/auth";
import { strongPasswordSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const { admin, error } = await requireAdmin();
    if (!admin) return error!;

    const { currentPassword, newPassword } = await request.json();

    // Validate new password strength
    const passwordValidation = strongPasswordSchema.safeParse(newPassword);
    if (!passwordValidation.success) {
      return NextResponse.json(
        {
          error: "Mot de passe trop faible",
          details: passwordValidation.error.errors.map((e) => e.message),
        },
        { status: 400 }
      );
    }

    // Fetch admin from database
    const dbAdmin = await prisma.admin.findUnique({
      where: { id: admin.id },
    });
    if (!dbAdmin) {
      return NextResponse.json(
        { error: "Administrateur introuvable" },
        { status: 404 }
      );
    }

    // Verify current password
    const validCurrent = await verifyPassword(
      currentPassword,
      dbAdmin.passwordHash
    );
    if (!validCurrent) {
      return NextResponse.json(
        { error: "Le mot de passe actuel est incorrect" },
        { status: 401 }
      );
    }

    // Ensure new password is different
    const sameAsOld = await verifyPassword(newPassword, dbAdmin.passwordHash);
    if (sameAsOld) {
      return NextResponse.json(
        { error: "Le nouveau mot de passe doit etre different de l'ancien" },
        { status: 400 }
      );
    }

    // Hash new password and update
    const newHash = await hashPassword(newPassword);
    await prisma.admin.update({
      where: { id: admin.id },
      data: {
        passwordHash: newHash,
        mustResetPassword: false,
      },
    });

    // Issue new token without mustResetPassword flag
    const newToken = await signToken({
      email: admin.email,
      id: admin.id,
      mustResetPassword: false,
    });
    await setAuthCookie(newToken);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Change password error:", error);
    return NextResponse.json(
      { error: "Erreur lors du changement de mot de passe" },
      { status: 500 }
    );
  }
}
