import { getXataClient } from "@/src/xata";
import { auth } from "@clerk/nextjs";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async (model, priceId) => {
  const xataClient = getXataClient();
  const { userId } = auth();
  if (!userId) {
    return false;
  }
  const userSubscription = await xataClient.db.firus.search(userId)
  if (userSubscription.totalCount === 0) {
    return false;
  }

  const hasSubscription = userSubscription.records.some(subscription => {
    return (
      subscription.priceId &&
      new Date(subscription.currentPeriodEnd).getTime() + DAY_IN_MS > Date.now() &&
      subscription.models === model && subscription.priceId === priceId
    );
  });

  return hasSubscription;
};
