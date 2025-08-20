"use client";

import React, { useState } from "react";
import {
  HiOutlineMailOpen,
  HiCheckCircle,
  HiExclamationCircle,
} from "react-icons/hi";
import TransitionWithBorder from "@/src/components/TransitionWithBorder";
import { newsletterService } from "@/src/lib/pocketbase";

type SubmissionStatus = "idle" | "loading" | "success" | "error";

const NewsletterPage = () => {
  const [email, setEmail] = useState("");
  const [selectedNewsletters, setSelectedNewsletters] = useState<string[]>([
    "algemeen",
  ]);
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Newsletter options
  const newsletterOptions = [
    {
      id: "algemeen",
      label: "Algemene nieuwsbrief",
      description: "Belangrijke updates en nieuws",
    },
    {
      id: "evenementen",
      label: "Evenementen",
      description: "Uitnodigingen voor evenementen en workshops",
    },
    {
      id: "tips",
      label: "Tips & Artikelen",
      description: "Handige tips en interessante artikelen",
    },
  ];

  const handleNewsletterChange = (newsletterId: string, checked: boolean) => {
    setSelectedNewsletters((prev) => {
      if (checked) {
        return [...prev, newsletterId];
      } else {
        return prev.filter((id) => id !== newsletterId);
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMessage("Voer een geldig e-mailadres in.");
      return;
    }

    if (selectedNewsletters.length === 0) {
      setStatus("error");
      setErrorMessage("Selecteer minimaal één nieuwsbrief.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      await newsletterService.subscribe(email, selectedNewsletters);
      setStatus("success");
      // Reset form
      setEmail("");
      setSelectedNewsletters(["algemeen"]);
    } catch (error: any) {
      setStatus("error");

      // Handle PocketBase specific errors
      if (error?.data?.data?.email?.message) {
        setErrorMessage("Dit e-mailadres is al geregistreerd.");
      } else if (error?.message) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Er ging iets mis. Probeer het opnieuw.");
      }
    }
  };
  return (
    <div className="flex flex-col bg-base-100 pt-32 lg:pt-44">
      {/* Hero Section */}
      <div className="flex flex-col items-center px-4">
        <div className="flex flex-col items-center gap-2">
          <span className="bg-primary rounded-full p-4 shadow-lg mb-2 animate-bounce hidden md:block">
            <HiOutlineMailOpen className="text-primary-content text-5xl" />
          </span>
          <h1 className="text-center text-4xl md:text-5xl font-extrabold text-primary drop-shadow-sm">
            Meld je aan voor de nieuwsbrief!
          </h1>
          <span className="badge badge-secondary badge-lg mt-2 mb-1 shadow">
            Altijd als eerste op de hoogte!
          </span>
          <p className="mt-2 text-center text-lg text-base-content max-w-xl">
            Blijf op de hoogte van het laatste nieuws, tips en exclusieve
            acties.
            <br />
            Kies hieronder voor welke nieuwsbrieven je je wilt inschrijven.
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="flex justify-center mt-12 mb-16">
        <div className="card w-full max-w-xl shadow-2xl bg-base-100 border border-base-300/70">
          <div className="card-body px-8 py-10">
            {status === "success" ? (
              // Success Message
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <HiCheckCircle className="text-success text-6xl" />
                </div>
                <h3 className="text-xl font-bold text-success">
                  Bedankt voor je aanmelding!
                </h3>
                <p className="text-base-content">
                  Je bent succesvol aangemeld voor de geselecteerde
                  nieuwsbrieven. Je ontvangt binnenkort een bevestigingsmail.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="btn btn-primary"
                >
                  Nog een aanmelding doen
                </button>
              </div>
            ) : (
              // Form
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-base font-semibold text-primary mb-1"
                  >
                    E-mailadres
                  </label>
                  <input
                    id="email"
                    autoComplete="email"
                    type="email"
                    placeholder="jouw@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`input input-bordered w-full bg-base-200 focus:bg-base-100 focus:border-primary transition ${
                      status === "error" && !email ? "input-error" : ""
                    }`}
                    required
                  />
                </div>

                <fieldset className="bg-base-200 border border-primary rounded-xl p-4">
                  <legend className="text-primary font-semibold px-2">
                    Kies nieuwsbrief(s)
                  </legend>
                  <div className="flex flex-col gap-3 mt-2">
                    {newsletterOptions.map((newsletter) => (
                      <label
                        key={newsletter.id}
                        className="flex items-start gap-3 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedNewsletters.includes(newsletter.id)}
                          onChange={(e) =>
                            handleNewsletterChange(
                              newsletter.id,
                              e.target.checked
                            )
                          }
                          className="checkbox checkbox-primary mt-1"
                        />
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {newsletter.label}
                          </span>
                          <span className="text-sm text-base-content/70">
                            {newsletter.description}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </fieldset>

                {/* Error Message */}
                {status === "error" && errorMessage && (
                  <div className="alert alert-error">
                    <HiExclamationCircle className="w-6 h-6" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className={`btn btn-primary w-full text-base font-bold rounded-xl shadow-md hover:scale-105 transition-transform duration-200 ${
                    status === "loading" ? "loading" : ""
                  }`}
                >
                  {status === "loading"
                    ? "Versturen..."
                    : "Verstuur inschrijving"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Decorative Transition */}
      <TransitionWithBorder colorFrom={"bg-base-100"} colorTo={"bg-gray-900"} />
    </div>
  );
};

export default NewsletterPage;
