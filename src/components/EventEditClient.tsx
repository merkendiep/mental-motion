"use client";

import { useState } from 'react';
import { Event } from '@/src/lib/supabase';
import RichTextEditor from './RichTextEditor';
import { signOut } from '@/src/lib/auth';
import { useRouter } from 'next/navigation';

interface EventEditClientProps {
  events: Event[];
  userEmail: string;
}

export default function EventEditClient({ events, userEmail }: EventEditClientProps) {
  const router = useRouter();
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEventSelect = (eventId: string) => {
    setSelectedEventId(eventId);
    const event = events.find(e => e.id === eventId);
    if (event) {
      setEditingEvent(event);
      setFormData({
        title: event.title,
        date: event.date,
        time: event.time,
        location: event.location,
        description: event.description,
      });
      setSubmitStatus('idle');
      setErrorMessage('');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingEvent) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/events/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: editingEvent.id,
          ...formData,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        // Refresh the page to get updated data
        setTimeout(() => {
          router.refresh();
        }, 2000);
      } else {
        throw new Error(result.error || 'Failed to update event');
      }
    } catch (error: any) {
      setSubmitStatus('error');
      setErrorMessage(error.message || 'Er ging iets mis. Probeer het opnieuw.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with user info and sign out */}
      <div className="card bg-white shadow-lg rounded-2xl border border-base-200 p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm">
            Logged in as: <span className="font-semibold">{userEmail}</span>
          </div>
          <button onClick={handleSignOut} className="btn btn-sm btn-ghost">
            Sign Out
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Event List */}
        <div className="lg:col-span-1">
          <div className="card bg-white shadow-lg rounded-2xl border border-base-200 p-6">
            <h2 className="text-xl font-bold text-primary mb-4">Select Event</h2>
            
            {events.length === 0 ? (
              <p className="text-base-content/60 text-center py-8">
                No events found
              </p>
            ) : (
              <div className="space-y-2">
                {events.map((event) => (
                  <button
                    key={event.id}
                    onClick={() => handleEventSelect(event.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      selectedEventId === event.id
                        ? 'bg-primary text-primary-content border-primary shadow-md'
                        : 'bg-base-100 border-base-300 hover:border-primary hover:bg-primary/5'
                    }`}
                  >
                    <div className="font-semibold truncate">{event.title}</div>
                    <div className="text-sm opacity-80 mt-1">
                      {event.date} • {event.time}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2">
          {editingEvent ? (
            <div className="card bg-white shadow-lg rounded-2xl border border-base-200 p-6">
              <h2 className="text-2xl font-bold text-primary mb-6">
                Edit Event
              </h2>

              {submitStatus === 'success' ? (
                <div className="alert alert-success">
                  <svg
                    className="w-6 h-6"
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
                  <span>Event successfully updated!</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Title</span>
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="input input-bordered input-primary w-full"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Date</span>
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                        className="input input-bordered input-primary w-full"
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Time</span>
                      </label>
                      <input
                        type="text"
                        value={formData.time}
                        onChange={(e) => handleInputChange('time', e.target.value)}
                        className="input input-bordered input-primary w-full"
                        required
                        placeholder="e.g., 11:00-13:00"
                      />
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Location</span>
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="input input-bordered input-primary w-full"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Description</span>
                    </label>
                    <RichTextEditor
                      content={formData.description}
                      onChange={(content) => handleInputChange('description', content)}
                      placeholder="Enter event description..."
                    />
                  </div>

                  {submitStatus === 'error' && errorMessage && (
                    <div className="alert alert-error">
                      <svg
                        className="w-6 h-6"
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
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`btn btn-primary flex-1 ${isSubmitting ? 'loading' : ''}`}
                    >
                      {isSubmitting ? 'Updating...' : 'Update Event'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingEvent(null);
                        setSelectedEventId('');
                      }}
                      className="btn btn-ghost"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            <div className="card bg-white shadow-lg rounded-2xl border border-base-200 p-6">
              <div className="text-center py-16">
                <svg
                  className="mx-auto h-24 w-24 text-primary/30 mb-4"
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
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No Event Selected
                </h3>
                <p className="text-base-content/60">
                  Select an event from the list to start editing
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
