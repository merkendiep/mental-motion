"use client";

import { useState, useMemo } from "react";
import { Event, EventSignup } from "@/src/lib/supabase";
import RichTextEditor from "./RichTextEditor";
import { useRouter } from "next/navigation";

interface EventEditClientProps {
  events: Event[];
  signups: EventSignup[];
}

export default function EventEditClient({
  events,
  signups,
}: EventEditClientProps) {
  const router = useRouter();
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  
  // Filter and search states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "upcoming" | "past">("all");

  // Get today's date for filtering (memoized to avoid recalculation)
  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  // Filter and search events
  const filteredEvents = useMemo(() => {
    let filtered = [...events];
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(query) ||
          (event.location && event.location.toLowerCase().includes(query)) ||
          event.date.includes(query)
      );
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((event) => {
        if (statusFilter === "upcoming") {
          return event.date >= today;
        } else if (statusFilter === "past") {
          return event.date < today;
        }
        return true;
      });
    }
    
    return filtered;
  }, [events, searchQuery, statusFilter, today]);

  // Filter signups for the selected event
  const eventSignups = useMemo(() => {
    if (!selectedEventId) return [];
    return signups.filter((signup) => signup.event_id === selectedEventId);
  }, [selectedEventId, signups]);

  const handleEventSelect = (eventId: string) => {
    setSelectedEventId(eventId);
    setIsCreatingNew(false);
    const event = events.find((e) => e.id === eventId);
    if (event) {
      setEditingEvent(event);
      setFormData({
        title: event.title,
        date: event.date,
        time: event.time,
        location: event.location,
        description: event.description,
      });
      setSubmitStatus("idle");
      setErrorMessage("");
    }
  };

  const handleCreateNew = () => {
    setSelectedEventId("");
    setEditingEvent(null);
    setIsCreatingNew(true);
    setFormData({
      title: "",
      date: "",
      time: "",
      location: "",
      description: "",
    });
    setSubmitStatus("idle");
    setErrorMessage("");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      if (isCreatingNew) {
        // Create new event
        const response = await fetch("/api/events/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
          setSubmitStatus("success");
          // Refresh the page to get updated data
          setTimeout(() => {
            router.refresh();
            setIsCreatingNew(false);
          }, 2000);
        } else {
          throw new Error(result.error || "Failed to create event");
        }
      } else if (editingEvent) {
        // Update existing event
        const response = await fetch("/api/events/update", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: editingEvent.id,
            ...formData,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          setSubmitStatus("success");
          // Refresh the page to get updated data
          setTimeout(() => {
            router.refresh();
          }, 2000);
        } else {
          throw new Error(result.error || "Failed to update event");
        }
      }
    } catch (error: any) {
      setSubmitStatus("error");
      setErrorMessage(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!editingEvent) return;

    setIsDeleting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/events/update", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingEvent.id,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setShowDeleteConfirm(false);
        // Refresh the page to get updated data
        setTimeout(() => {
          router.refresh();
          setEditingEvent(null);
          setSelectedEventId("");
        }, 1500);
      } else {
        throw new Error(result.error || "Failed to delete event");
      }
    } catch (error: any) {
      setSubmitStatus("error");
      setErrorMessage(
        error.message || "Something went wrong. Please try again."
      );
      setShowDeleteConfirm(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
      {/* Event List */}
      <div className="lg:col-span-1">
        <div className="card bg-white shadow-lg rounded-2xl border border-base-200 p-4 lg:p-6 flex flex-col h-[calc(100vh-12rem)] lg:h-[calc(100vh-8rem)]">
          <div className="flex justify-between items-center mb-4 flex-shrink-0">
            <h2 className="text-lg lg:text-xl font-bold text-primary">
              Select Event
            </h2>
            <button
              onClick={handleCreateNew}
              className="btn btn-primary btn-sm"
              title="Create New Event"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              New
            </button>
          </div>

          {/* Search and Filter Controls */}
          <div className="space-y-2 mb-4 flex-shrink-0">
            <div className="form-control">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input input-bordered input-sm w-full pl-9 text-sm"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as "all" | "upcoming" | "past")}
              className="select select-bordered select-sm w-full text-sm"
            >
              <option value="all">All Events</option>
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
            </select>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-base-content/60 text-center py-8 text-sm">
                {searchQuery || statusFilter !== "all" 
                  ? "No events match your filters" 
                  : "No events found"}
              </p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto space-y-2 min-h-0">
              {filteredEvents.map((event) => {
                const eventSignupCount = signups.filter(
                  (signup) => signup.event_id === event.id
                ).length;
                const isPastEvent = event.date < today;
                
                return (
                  <button
                    key={event.id}
                    onClick={() => handleEventSelect(event.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      selectedEventId === event.id
                        ? "bg-primary text-primary-content border-primary shadow-md"
                        : "bg-base-100 border-base-300 hover:border-primary hover:bg-primary/5"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold truncate text-sm lg:text-base">
                          {event.title}
                        </div>
                        <div className="text-xs lg:text-sm opacity-80 mt-1">
                          {event.date} • {event.time}
                        </div>
                        <div className="text-xs opacity-70 mt-0.5 truncate">
                          {event.location}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        {eventSignupCount > 0 && (
                          <div
                            className={`badge badge-sm ${
                              selectedEventId === event.id
                                ? "badge-secondary"
                                : "badge-primary"
                            }`}
                          >
                            {eventSignupCount}
                          </div>
                        )}
                        {isPastEvent && (
                          <div className={`badge badge-xs ${
                            selectedEventId === event.id
                              ? "badge-neutral"
                              : "badge-ghost"
                          }`}>
                            Past
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Edit/Create Form */}
      <div className="lg:col-span-2">
        {editingEvent || isCreatingNew ? (
          <div className="card bg-white shadow-lg rounded-2xl border border-base-200 p-4 lg:p-6">
            <h2 className="text-xl lg:text-2xl font-bold text-primary mb-4 lg:mb-6">
              {isCreatingNew ? "Create New Event" : "Edit Event"}
            </h2>

            {submitStatus === "success" ? (
              <div className="alert alert-success">
                <svg
                  className="w-5 h-5 lg:w-6 lg:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm lg:text-base">
                  Event successfully {isCreatingNew ? "created" : "updated"}!
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-sm lg:text-base">
                      Title
                    </span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="input input-bordered input-primary w-full text-sm lg:text-base"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-sm lg:text-base">
                        Date
                      </span>
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        handleInputChange("date", e.target.value)
                      }
                      className="input input-bordered input-primary w-full text-sm lg:text-base"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-sm lg:text-base">
                        Time
                      </span>
                    </label>
                    <input
                      type="text"
                      value={formData.time}
                      onChange={(e) =>
                        handleInputChange("time", e.target.value)
                      }
                      className="input input-bordered input-primary w-full text-sm lg:text-base"
                      required
                      placeholder="e.g., 11:00-13:00"
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-sm lg:text-base">
                      Location
                    </span>
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    className="input input-bordered input-primary w-full text-sm lg:text-base"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-sm lg:text-base">
                      Description
                    </span>
                  </label>
                  <RichTextEditor
                    content={formData.description}
                    onChange={(content) =>
                      handleInputChange("description", content)
                    }
                    placeholder="Enter event description..."
                  />
                </div>

                {submitStatus === "error" && errorMessage && (
                  <div className="alert alert-error">
                    <svg
                      className="w-5 h-5 lg:w-6 lg:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                    <span className="text-sm lg:text-base">{errorMessage}</span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting || isDeleting}
                    className={`btn btn-primary flex-1 text-sm lg:text-base ${
                      isSubmitting ? "loading" : ""
                    }`}
                  >
                    {isSubmitting
                      ? isCreatingNew
                        ? "Creating..."
                        : "Updating..."
                      : isCreatingNew
                      ? "Create Event"
                      : "Update Event"}
                  </button>

                  {!isCreatingNew && editingEvent && (
                    <button
                      type="button"
                      onClick={() => setShowDeleteConfirm(true)}
                      disabled={isSubmitting || isDeleting}
                      className="btn btn-error text-sm lg:text-base"
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
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Delete
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setEditingEvent(null);
                      setSelectedEventId("");
                      setIsCreatingNew(false);
                    }}
                    disabled={isSubmitting || isDeleting}
                    className="btn btn-ghost text-sm lg:text-base"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          <div className="card bg-white shadow-lg rounded-2xl border border-base-200 p-6 lg:p-8">
            <div className="text-center py-12 lg:py-16">
              <svg
                className="mx-auto h-16 w-16 lg:h-24 lg:w-24 text-primary/30 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-700 mb-2">
                No Event Selected
              </h3>
              <p className="text-base-content/60 text-sm lg:text-base mb-4">
                Select an event from the list to edit or create a new event
              </p>
              <button
                onClick={handleCreateNew}
                className="btn btn-primary btn-sm"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create New Event
              </button>
            </div>
          </div>
        )}

        {/* Event Signups Table - Only show when an event is selected */}
        {editingEvent && eventSignups.length > 0 && (
          <div className="card bg-white shadow-lg rounded-2xl border border-base-200 overflow-hidden mt-4 lg:mt-6">
            <div className="p-4 lg:p-6 border-b border-base-200">
              <h3 className="text-lg lg:text-xl font-bold text-primary">
                Event Signups ({eventSignups.length})
              </h3>
              <p className="text-sm text-base-content/70 mt-1">
                People registered for this event
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="table w-full text-xs sm:text-sm lg:text-base">
                <thead>
                  <tr className="border-b border-base-300">
                    <th className="bg-base-100 p-2 sm:p-3 lg:p-4">Name</th>
                    <th className="bg-base-100 p-2 sm:p-3 lg:p-4">Email</th>
                    <th className="bg-base-100 hidden md:table-cell p-2 sm:p-3 lg:p-4">
                      Mobile
                    </th>
                    <th className="bg-base-100 hidden lg:table-cell p-2 sm:p-3 lg:p-4">
                      Signup Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {eventSignups.map((signup) => (
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
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* No Signups Message */}
        {editingEvent && eventSignups.length === 0 && (
          <div className="card bg-white shadow-lg rounded-2xl border border-base-200 p-6 mt-4 lg:mt-6">
            <div className="text-center py-8">
              <svg
                className="mx-auto h-12 w-12 text-base-content/20 mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <p className="text-base-content/60 text-sm lg:text-base">
                No signups yet for this event
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-error"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Delete Event
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  This action cannot be undone
                </p>
              </div>
            </div>

            <p className="text-gray-700 mb-6">
              Are you sure you want to delete{" "}
              <strong>{editingEvent?.title}</strong>? All associated signups
              will remain in the database but this event will no longer be
              visible.
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className={`btn btn-error flex-1 ${
                  isDeleting ? "loading" : ""
                }`}
              >
                {isDeleting ? "Deleting..." : "Delete Event"}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
                className="btn btn-ghost flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
