"use server";
import prisma from "@/databases/db";

export const deleteUser = async (id: string) => {
  try {
    await prisma.$transaction([
      // Delete sessions
      prisma.session.deleteMany({ where: { userId: id } }),

      // Delete feedback
      prisma.feedback.deleteMany({ where: { userId: id } }),

      // Delete event registrations
      prisma.eventRegistration.deleteMany({ where: { userId: id } }),

      // Delete announcements
      prisma.announcement.deleteMany({ where: { userId: id } }),

      // Delete report submissions
      prisma.reportSubmission.deleteMany({ where: { userId: id } }),

      // Delete RiskEvaluation
      prisma.riskEvaluation.deleteMany({ where: { userId: id } }),

      // Delete UserDetail
      prisma.userDetail.deleteMany({ where: { userId: id } }),

      // Finally delete user
      prisma.user.delete({ where: { id } }),
    ]);
    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false };
  }
};
