"use client";

import React, { useState } from "react";
import { Event } from "@/src/lib/supabase";

interface EventFormProps {
  event: Event;
}

export default function EventForm({ event }: EventFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState("");

  // Email validation function
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle email change with validation
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    // Clear any previous email error
    setEmailError("");

    // Only validate if there's a value and it's not empty
    if (value.trim() && !isValidEmail(value.trim())) {
      setEmailError(
        "Voer een geldig e-mailadres in (bijvoorbeeld: naam@voorbeeld.nl)"
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Client-side validation
    if (!firstName.trim() || !lastName.trim()) {
      setSubmitStatus("error");
      setErrorMessage("Voornaam en achternaam zijn verplicht.");
      return;
    }

    if (!email.trim()) {
      setSubmitStatus("error");
      setErrorMessage("E-mailadres is verplicht.");
      return;
    }

    if (!isValidEmail(email.trim())) {
      setSubmitStatus("error");
      setErrorMessage(
        "Voer een geldig e-mailadres in (bijvoorbeeld: naam@voorbeeld.nl)."
      );
      return;
    }

    // Optional mobile validation (if provided)
    if (mobile.trim() && !/^[\+]?[\d\s\-\(\)]{8,}$/.test(mobile.trim())) {
      setSubmitStatus("error");
      setErrorMessage("Voer een geldig mobiel nummer in.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/events/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          mobile: mobile,
          event_id: event.id,
          event_title: event.title,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        // Reset form
        setFirstName("");
        setLastName("");
        setEmail("");
        setMobile("");
        setEmailError("");
      } else {
        throw new Error(result.error || "Failed to submit event signup");
      }
    } catch (error: any) {
      setSubmitStatus("error");
      setErrorMessage(
        error.message || "Er ging iets mis. Probeer het opnieuw."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card bg-white shadow-lg rounded-3xl border border-base-200 px-8 py-8">
      <div className="card-body">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">
          Aanmelden voor dit event
        </h2>

        {submitStatus === "success" ? (
          // Success Message
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <svg
                className="w-16 h-16 text-success"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-success">
              Aanmelding succesvol!
            </h3>
            <p className="text-base-content">
              Bedankt voor je aanmelding voor <strong>{event.title}</strong>. We
              hebben je gegevens ontvangen en nemen binnenkort contact met je
              op.
            </p>
            <button
              onClick={() => setSubmitStatus("idle")}
              className="btn btn-primary"
            >
              Nog een aanmelding doen
            </button>
          </div>
        ) : (
          // Form
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <label className="form-control w-full">
                <span className="label-text font-semibold mb-1">Voornaam</span>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input input-bordered input-primary w-full bg-base-100"
                  required
                  placeholder="Voornaam"
                />
              </label>
              <label className="form-control w-full">
                <span className="label-text font-semibold mb-1">
                  Achternaam
                </span>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input input-bordered input-primary w-full bg-base-100"
                  required
                  placeholder="Achternaam"
                />
              </label>
            </div>

            <label className="form-control w-full">
              <span className="label-text font-semibold mb-1">
                E-mailadres
              </span>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className={`input input-bordered w-full bg-base-100 ${
                  emailError ? "input-error border-error" : "input-primary"
                }`}
                required
                placeholder="jij@email.com"
              />
              {emailError && (
                <div className="label">
                  <span className="label-text-alt text-error">
                    {emailError}
                  </span>
                </div>
              )}
            </label>

            <label className="form-control w-full">
              <span className="label-text font-semibold mb-1">
                Mobiel nummer
                <span className="text-base-content/60 font-normal">
                  (optioneel)
                </span>
              </span>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="input input-bordered input-primary w-full bg-base-100"
                placeholder="+31 6 12345678"
              />
            </label>

            {/* Error Message */}
            {submitStatus === "error" && errorMessage && (
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
                  ></path>
                </svg>
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn btn-primary btn-lg mt-2 rounded-full shadow hover:scale-105 transition-transform text-lg tracking-wide ${
                isSubmitting ? "loading" : ""
              }`}
            >
              {isSubmitting ? "Versturen..." : "🎉 Aanmelden"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
