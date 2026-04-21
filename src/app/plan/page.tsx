import { prisma } from "@/lib/prisma";
import PlanClient from "./PlanClient";

export const dynamic = "force-dynamic";

export default async function PlanPage() {
  const plans = await prisma.plan.findMany({
    include: {
      workouts: {
        include: {
          exercises: true
        },
        orderBy: { id: "asc" }
      }
    }
  });

  return <PlanClient plans={JSON.parse(JSON.stringify(plans))} />;
}