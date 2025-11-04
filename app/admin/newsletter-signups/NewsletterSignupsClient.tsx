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
type DateRangeType = "all-time" | "24h" | "week" | "month" | "year";

export default function NewsletterSignupsClient({
  userEmail,
  subscriptions,
  errorMessage,
}: NewsletterSignupsClientProps) {
  const [filter, setFilter] = useState<FilterType>("all");
  const [dateRange, setDateRange] = useState<DateRangeType>("all-time");
  const [searchEmail, setSearchEmail] = useState("");
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  // Helper function to filter by date range
  const filterByDateRange = (subscription: NewsletterSubscription) => {
    if (dateRange === "all-time" || !subscription.created_at) {
      return true;
    }

    const createdDate = new Date(subscription.created_at);
    const now = new Date();
    const diffMs = now.getTime() - createdDate.getTime();

    switch (dateRange) {
      case "24h":
        return diffMs <= 24 * 60 * 60 * 1000;
      case "week":
        return diffMs <= 7 * 24 * 60 * 60 * 1000;
      case "month":
        return diffMs <= 30 * 24 * 60 * 60 * 1000;
      case "year":
        return diffMs <= 365 * 24 * 60 * 60 * 1000;
      default:
        return true;
    }
  };

  // Sort subscriptions by date descending and filter by newsletter type, date range, and email search
  const filteredSubscriptions = useMemo(() => {
    // First sort by date descending
    const sorted = [...subscriptions].sort((a, b) => {
      if (!a.created_at) return 1;
      if (!b.created_at) return -1;
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });

    // Then apply filters
    return sorted.filter((s) => {
      const matchesNewsletterType =
        filter === "all" || s.newsletters.includes(filter);
      const matchesDateRange = filterByDateRange(s);
      const matchesEmail =
        searchEmail.trim() === "" ||
        s.email.toLowerCase().includes(searchEmail.toLowerCase().trim()) ||
        (s.organization &&
          s.organization
            .toLowerCase()
            .includes(searchEmail.toLowerCase().trim()));
      return matchesNewsletterType && matchesDateRange && matchesEmail;
    });
  }, [subscriptions, filter, dateRange, searchEmail]);

  // Handle subscription deletion
  const handleDelete = async (subscription: NewsletterSubscription) => {
    if (!subscription.id) return;

    const confirmed = confirm(
      `Are you sure you want to delete the subscription for ${subscription.email}?`
    );

    if (!confirmed) return;

    setIsDeleting(subscription.id);

    try {
      const response = await fetch("/api/newsletter/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: subscription.id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete subscription");
      }

      // Refresh the page to update the list
      window.location.reload();
    } catch (error) {
      console.error("Error deleting subscription:", error);
      alert("Failed to delete subscription. Please try again.");
      setIsDeleting(null);
    }
  };

  // Calculate stats (always use full dataset for stats)
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

  const dateRangeOptions = [
    { value: "all-time", label: "All time" },
    { value: "24h", label: "Last 24h" },
    { value: "week", label: "Last week" },
    { value: "month", label: "Last month" },
    { value: "year", label: "Last year" },
  ] as const;

  return (
    <AdminLayout userEmail={userEmail}>
      <div className="space-y-4 lg:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-primary mb-2">
              Newsletter Subscriptions
            </h1>
            <p className="text-sm lg:text-base text-base-content/70">
              View all newsletter subscriptions from Supabase database
            </p>
          </div>

          {/* Filters Container */}
          <div className="flex flex-col sm:flex-row gap-2 sm:min-w-[400px]">
            {/* Email Search */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search by email or organization..."
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                className="input input-bordered input-sm w-full pl-10"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Date Range Filter */}
            <select
              id="dateRange"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as DateRangeType)}
              className="select select-bordered select-sm w-full sm:w-auto"
            >
              {dateRangeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
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
        {(filter !== "all" ||
          dateRange !== "all-time" ||
          searchEmail.trim() !== "") && (
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
            <div className="flex-1">
              <span>
                Showing {filteredSubscriptions.length} subscriber
                {filteredSubscriptions.length !== 1 ? "s" : ""}
                {filter !== "all" && (
                  <>
                    {" "}
                    for <strong>{filter}</strong> newsletter
                  </>
                )}
                {dateRange !== "all-time" && (
                  <>
                    {" "}
                    from{" "}
                    <strong>
                      {dateRangeOptions
                        .find((o) => o.value === dateRange)
                        ?.label.toLowerCase()}
                    </strong>
                  </>
                )}
                {searchEmail.trim() !== "" && (
                  <>
                    {" "}
                    matching <strong>"{searchEmail}"</strong>
                  </>
                )}
                .
              </span>
              <div className="mt-1 flex flex-wrap gap-2">
                {filter !== "all" && (
                  <button
                    onClick={() => setFilter("all")}
                    className="text-sm underline font-semibold hover:text-info-content"
                  >
                    Clear newsletter filter
                  </button>
                )}
                {dateRange !== "all-time" && (
                  <button
                    onClick={() => setDateRange("all-time")}
                    className="text-sm underline font-semibold hover:text-info-content"
                  >
                    Clear date filter
                  </button>
                )}
                {searchEmail.trim() !== "" && (
                  <button
                    onClick={() => setSearchEmail("")}
                    className="text-sm underline font-semibold hover:text-info-content"
                  >
                    Clear search
                  </button>
                )}
                {(filter !== "all" ||
                  dateRange !== "all-time" ||
                  searchEmail.trim() !== "") && (
                  <button
                    onClick={() => {
                      setFilter("all");
                      setDateRange("all-time");
                      setSearchEmail("");
                    }}
                    className="text-sm underline font-semibold hover:text-info-content"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            </div>
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
                  <th className="bg-base-100 p-2 sm:p-3 lg:p-4 text-center">
                    Actions
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
                      <td className="p-2 sm:p-3 lg:p-4 text-center">
                        <button
                          onClick={() => handleDelete(subscription)}
                          disabled={isDeleting === subscription.id}
                          className="btn btn-ghost btn-xs text-error hover:bg-error hover:text-error-content"
                          title="Delete subscription"
                        >
                          {isDeleting === subscription.id ? (
                            <span className="loading loading-spinner loading-xs"></span>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center py-8 text-base-content/60 text-sm"
                    >
                      {filter === "all" &&
                      dateRange === "all-time" &&
                      searchEmail.trim() === ""
                        ? "No newsletter subscriptions found"
                        : "No subscribers found matching the selected filters"}
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
