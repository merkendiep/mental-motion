"use client";

import { useState, useMemo } from "react";
import AdminLayout from "@/src/components/AdminLayout";
import { NewsletterSubscription } from "@/src/services/newsletterService";

interface NewsletterSignupsClientProps {
  userEmail: string;
  subscriptions: NewsletterSubscription[];
  errorMessage: string | null;
}

type FilterType = "all" | "monthly" | "quarterly" | "tips";

export default function NewsletterSignupsClient({
  userEmail,
  subscriptions,
  errorMessage,
}: NewsletterSignupsClientProps) {
  const [filter, setFilter] = useState<FilterType>("all");

  // Filter subscriptions based on selected newsletter type
  const filteredSubscriptions = useMemo(() => {
    if (filter === "all") {
      return subscriptions;
    }
    return subscriptions.filter((s) => s.newsletters.includes(filter));
  }, [subscriptions, filter]);

  // Calculate stats
  const totalSubscriptions = subscriptions.length;
  const monthlyCount = subscriptions.filter((s) =>
    s.newsletters.includes("monthly")
  ).length;
  const quarterlyCount = subscriptions.filter((s) =>
    s.newsletters.includes("quarterly")
  ).length;
  const tipsCount = subscriptions.filter((s) =>
    s.newsletters.includes("tips")
  ).length;

  return (
    <AdminLayout userEmail={userEmail}>
      <div className="space-y-4 lg:space-y-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-primary mb-2">
            Newsletter Subscriptions
          </h1>
          <p className="text-sm lg:text-base text-base-content/70">
            View all newsletter subscriptions from Supabase database
          </p>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="alert alert-error shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h3 className="font-bold">Error loading subscriptions</h3>
              <div className="text-xs">{errorMessage}</div>
              <div className="text-xs mt-2">
                Make sure Supabase environment variables are configured:
              </div>
              <div className="text-xs font-mono">
                NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
          <div
            className={`card bg-white shadow-lg rounded-2xl border-2 p-4 lg:p-6 cursor-pointer transition-all ${
              filter === "all"
                ? "border-primary"
                : "border-base-200 hover:border-base-300"
            }`}
            onClick={() => setFilter("all")}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-base-content/60 text-xs lg:text-sm">
                  Total Subscribers
                </p>
                <p className="text-2xl lg:text-3xl font-bold text-primary mt-1">
                  {totalSubscriptions}
                </p>
              </div>
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 lg:w-6 lg:h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div
            className={`card bg-white shadow-lg rounded-2xl border-2 p-4 lg:p-6 cursor-pointer transition-all ${
              filter === "monthly"
                ? "border-success"
                : "border-base-200 hover:border-base-300"
            }`}
            onClick={() => setFilter("monthly")}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-base-content/60 text-xs lg:text-sm">
                  Monthly
                </p>
                <p className="text-2xl lg:text-3xl font-bold text-success mt-1">
                  {monthlyCount}
                </p>
              </div>
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 lg:w-6 lg:h-6 text-success"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div
            className={`card bg-white shadow-lg rounded-2xl border-2 p-4 lg:p-6 cursor-pointer transition-all ${
              filter === "quarterly"
                ? "border-info"
                : "border-base-200 hover:border-base-300"
            }`}
            onClick={() => setFilter("quarterly")}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-base-content/60 text-xs lg:text-sm">
                  Quarterly
                </p>
                <p className="text-2xl lg:text-3xl font-bold text-info mt-1">
                  {quarterlyCount}
                </p>
              </div>
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-info/10 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 lg:w-6 lg:h-6 text-info"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div
            className={`card bg-white shadow-lg rounded-2xl border-2 p-4 lg:p-6 cursor-pointer transition-all ${
              filter === "tips"
                ? "border-warning"
                : "border-base-200 hover:border-base-300"
            }`}
            onClick={() => setFilter("tips")}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-base-content/60 text-xs lg:text-sm">Tips</p>
                <p className="text-2xl lg:text-3xl font-bold text-warning mt-1">
                  {tipsCount}
                </p>
              </div>
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-warning/10 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 lg:w-6 lg:h-6 text-warning"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Info */}
        {filter !== "all" && (
          <div className="alert alert-info shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>
              Showing {filteredSubscriptions.length} subscriber
              {filteredSubscriptions.length !== 1 ? "s" : ""} for{" "}
              <strong>{filter}</strong> newsletter.
              <button
                onClick={() => setFilter("all")}
                className="ml-2 underline font-semibold hover:text-info-content"
              >
                Clear filter
              </button>
            </span>
          </div>
        )}

        {/* Subscriptions Table */}
        <div className="card bg-white shadow-lg rounded-2xl border border-base-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full text-xs sm:text-sm lg:text-base">
              <thead>
                <tr className="border-b border-base-300">
                  <th className="bg-base-100 p-2 sm:p-3 lg:p-4">Email</th>
                  <th className="bg-base-100 hidden md:table-cell p-2 sm:p-3 lg:p-4">
                    Organization
                  </th>
                  <th className="bg-base-100 p-2 sm:p-3 lg:p-4">Newsletters</th>
                  <th className="bg-base-100 hidden lg:table-cell p-2 sm:p-3 lg:p-4">
                    Subscribed On
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredSubscriptions.length > 0 ? (
                  filteredSubscriptions.map((subscription) => (
                    <tr key={subscription.id} className="hover:bg-base-100">
                      <td className="font-medium break-all p-2 sm:p-3 lg:p-4">
                        {subscription.email}
                      </td>
                      <td className="hidden md:table-cell p-2 sm:p-3 lg:p-4">
                        {subscription.organization || "-"}
                      </td>
                      <td className="p-2 sm:p-3 lg:p-4">
                        <div className="flex flex-wrap gap-1">
                          {subscription.newsletters.map((newsletter, idx) => (
                            <span
                              key={idx}
                              className={`badge badge-xs lg:badge-sm ${
                                newsletter === "monthly"
                                  ? "badge-success"
                                  : newsletter === "quarterly"
                                  ? "badge-info"
                                  : "badge-warning"
                              }`}
                            >
                              {newsletter}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="text-xs sm:text-sm text-base-content/60 hidden lg:table-cell p-2 sm:p-3 lg:p-4">
                        {subscription.created_at
                          ? new Date(
                              subscription.created_at
                            ).toLocaleDateString()
                          : "-"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="text-center py-8 text-base-content/60 text-sm"
                    >
                      {filter === "all"
                        ? "No newsletter subscriptions found"
                        : `No subscribers found for ${filter} newsletter`}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
