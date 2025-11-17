"use client";

import { useState, useMemo } from "react";
import AdminLayout from "@/src/components/AdminLayout";
import { EventSignup, Event } from "@/src/lib/supabase";
import Pagination from "@/src/components/Pagination";

interface EventSignupsClientProps {
  signups: EventSignup[];
  events: Event[];
  userEmail: string;
}

export default function EventSignupsClient({
  signups,
  events,
  userEmail,
}: EventSignupsClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEventId, setSelectedEventId] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Filter and search signups
  const filteredSignups = useMemo(() => {
    let filtered = [...signups];

    // Filter by event
    if (selectedEventId !== "all") {
      filtered = filtered.filter(
        (signup) => signup.event_id === selectedEventId
      );
    }

    // Search by name or email
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((signup) => {
        const fullName =
          `${signup.first_name} ${signup.last_name}`.toLowerCase();
        const email = signup.email.toLowerCase();
        return fullName.includes(query) || email.includes(query);
      });
    }

    return filtered;
  }, [signups, searchQuery, selectedEventId]);

  // Paginated signups
  const paginatedSignups = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredSignups.slice(startIndex, endIndex);
  }, [filteredSignups, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredSignups.length / itemsPerPage);

  // Reset to page 1 when filters change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleEventFilterChange = (value: string) => {
    setSelectedEventId(value);
    setCurrentPage(1);
  };

  // Calculate signups in the last 7 days
  const recentSignups = useMemo(() => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return signups.filter((signup) => {
      if (!signup.created_at) return false;
      const signupDate = new Date(signup.created_at);
      return signupDate >= sevenDaysAgo;
    });
  }, [signups]);

  return (
    <AdminLayout userEmail={userEmail}>
      <div className="space-y-4 lg:space-y-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-primary mb-2">
            Event Signups
          </h1>
          <p className="text-sm lg:text-base text-base-content/70">
            View all event registrations
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          <div className="card bg-white shadow-lg rounded-2xl border border-base-200 p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base-content/60 text-xs lg:text-sm">
                  Total Signups
                </p>
                <p className="text-2xl lg:text-3xl font-bold text-primary mt-1">
                  {signups.length}
                </p>
              </div>
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary/10 rounded-full flex items-center justify-center">
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="card bg-white shadow-lg rounded-2xl border border-base-200 p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base-content/60 text-xs lg:text-sm">
                  Last 7 Days
                </p>
                <p className="text-2xl lg:text-3xl font-bold text-success mt-1">
                  {recentSignups.length}
                </p>
              </div>
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-success/10 rounded-full flex items-center justify-center">
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
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="card bg-white shadow-lg rounded-2xl border border-base-200 p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base-content/60 text-xs lg:text-sm">
                  Filtered Results
                </p>
                <p className="text-2xl lg:text-3xl font-bold text-info mt-1">
                  {filteredSignups.length}
                </p>
              </div>
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-info/10 rounded-full flex items-center justify-center">
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
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="card bg-white shadow-lg rounded-2xl border border-base-200 p-4 lg:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search Input */}
            <div>
              <label
                htmlFor="search"
                className="block text-sm font-medium text-base-content mb-2"
              >
                Search by Name or Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="input input-bordered w-full pl-10"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-base-content/50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Event Filter */}
            <div>
              <label
                htmlFor="event-filter"
                className="block text-sm font-medium text-base-content mb-2"
              >
                Filter by Event
              </label>
              <select
                id="event-filter"
                value={selectedEventId}
                onChange={(e) => handleEventFilterChange(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="all">All Events</option>
                {events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.title} - {new Date(event.date).toLocaleDateString()}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Clear Filters Button */}
          {(searchQuery || selectedEventId !== "all") && (
            <div className="mt-4">
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedEventId("all");
                  setCurrentPage(1);
                }}
                className="btn btn-sm btn-ghost"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Signups Table */}
        <div className="card bg-white shadow-lg rounded-2xl border border-base-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full text-xs sm:text-sm lg:text-base">
              <thead>
                <tr className="border-b border-base-300">
                  <th className="bg-base-100 p-2 sm:p-3 lg:p-4">Name</th>
                  <th className="bg-base-100 p-2 sm:p-3 lg:p-4">Email</th>
                  <th className="bg-base-100 hidden md:table-cell p-2 sm:p-3 lg:p-4">
                    Mobile
                  </th>
                  <th className="bg-base-100 p-2 sm:p-3 lg:p-4">Event</th>
                  <th className="bg-base-100 hidden lg:table-cell p-2 sm:p-3 lg:p-4">
                    Signup Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedSignups.length > 0 ? (
                  paginatedSignups.map((signup) => (
                    <tr key={signup.id} className="hover:bg-base-100">
                      <td className="font-medium p-2 sm:p-3 lg:p-4">
                        {signup.first_name} {signup.last_name}
                      </td>
                      <td className="break-all p-2 sm:p-3 lg:p-4">
                        {signup.email}
                      </td>
                      <td className="hidden md:table-cell p-2 sm:p-3 lg:p-4">
                        {signup.mobile || "-"}
                      </td>
                      <td className="break-words p-2 sm:p-3 lg:p-4">
                        {signup.event_title}
                      </td>
                      <td className="text-xs sm:text-sm text-base-content/60 hidden lg:table-cell p-2 sm:p-3 lg:p-4">
                        {signup.created_at
                          ? new Date(signup.created_at).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )
                          : "-"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center py-8 text-base-content/60 text-sm"
                    >
                      {searchQuery || selectedEventId !== "all"
                        ? "No signups found matching your filters"
                        : "No signups found"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredSignups.length > 0 && (
            <div className="px-4 pb-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                itemsPerPage={itemsPerPage}
                totalItems={filteredSignups.length}
              />
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
