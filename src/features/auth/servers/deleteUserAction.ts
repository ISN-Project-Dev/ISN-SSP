"use server";
import prisma from "@/databases/db";

export const deleteUser = async (id: string) => {
  try {
    await prisma.$transaction([
      prisma.session.deleteMany({ where: { userId: id } }),
      prisma.user.delete({ where: { id } }),
    ]);
    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false };
  }
};
