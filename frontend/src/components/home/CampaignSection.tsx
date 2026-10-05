import {
  useEffect,
  useState,
} from "react";
import {
  BadgePercent,
} from "lucide-react";
import { Link } from "react-router-dom";

import CampaignCard from "../campaigns/CampaignCard";
import {
  getActiveCampaigns,
  type CampaignCard as Campaign,
} from "../../services/campaignService";
import { useFilter } from "../../hooks/useFilter";

function shuffleCampaigns(
  campaigns: Campaign[]
): Campaign[] {
  const shuffled = [...campaigns];

  for (
    let index = shuffled.length - 1;
    index > 0;
    index -= 1
  ) {
    const swapIndex = Math.floor(
      Math.random() * (index + 1)
    );

    [
      shuffled[index],
      shuffled[swapIndex],
    ] = [
      shuffled[swapIndex],
      shuffled[index],
    ];
  }

  return shuffled;
}

export default function CampaignSection() {
  const { city } = useFilter();

  const [campaigns, setCampaigns] =
    useState<Campaign[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);

      const data =
        await getActiveCampaigns(
          city
        );

      const uniqueByRestaurant =
        new Map<number, Campaign>();

      for (const campaign of data) {
        if (
          !uniqueByRestaurant.has(
            campaign.restaurantId
          )
        ) {
          uniqueByRestaurant.set(
            campaign.restaurantId,
            campaign
          );
        }
      }

      const showcaseCampaigns =
        shuffleCampaigns(
          Array.from(
            uniqueByRestaurant.values()
          )
        ).slice(0, 3);

      if (!cancelled) {
        setCampaigns(
          showcaseCampaigns
        );
        setLoading(false);
      }
    }

    if (!city) {
      return () => {
        cancelled = true;
      };
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [city]);

  if (!city) {
    return null;
  }

  if (
    !loading &&
    campaigns.length === 0
  ) {
    return null;
  }

  return (
    <section className="mb-10 sm:mb-14">
      <div className="mb-5 flex items-end justify-between gap-4 sm:mb-6">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <BadgePercent
              size={22}
              className="shrink-0 text-orange-500 sm:size-6"
            />

            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Güncel Kampanyalar
            </h2>
          </div>

          <p className="mt-2 hidden text-sm text-gray-500 sm:block">
            {city} restoranlarındaki
            güncel fırsatları keşfet.
          </p>

          <p className="mt-1 text-xs font-medium text-gray-400">
            Sponsorlu içerikler yer
            alabilir.
          </p>
        </div>

        <Link
          to="/campaigns"
          className="shrink-0 text-xs font-bold text-orange-600 transition hover:text-orange-700 sm:text-sm"
        >
          Tümünü Gör →
        </Link>
      </div>

      {loading ? (
        <>
          {/* Mobil skeleton */}
          <div className="-mx-4 flex gap-4 overflow-hidden px-4 sm:hidden">
            {[1, 2].map(
              (item) => (
                <div
                  key={item}
                  className="h-[380px] w-[84vw] max-w-[340px] shrink-0 animate-pulse rounded-2xl bg-gray-100"
                />
              )
            )}
          </div>

          {/* Desktop skeleton */}
          <div className="hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map(
              (item) => (
                <div
                  key={item}
                  className="h-[390px] animate-pulse rounded-3xl bg-gray-100"
                />
              )
            )}
          </div>
        </>
      ) : (
        <>
          {/* Mobil: yatay kampanya carousel */}
          <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 scrollbar-hide sm:hidden">
            {campaigns.map(
              (campaign) => (
                <div
                  key={campaign.id}
                  className="w-[84vw] max-w-[340px] shrink-0 snap-start"
                >
                  <CampaignCard
                    campaign={campaign}
                  />
                </div>
              )
            )}
          </div>

          {/* Tablet / desktop */}
          <div className="hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
            {campaigns.map(
              (campaign) => (
                <CampaignCard
                  key={campaign.id}
                  campaign={campaign}
                />
              )
            )}
          </div>
        </>
      )}
    </section>
  );
}
