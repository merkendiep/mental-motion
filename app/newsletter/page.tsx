"use client";

import React from "react";
import { HiOutlineMailOpen } from "react-icons/hi";
import TransitionWithBorder from "@/src/components/TransitionWithBorder";

const NewsletterPage = () => {
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
            <form className="space-y-8">
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
                  className="input input-bordered w-full bg-base-200 focus:bg-base-100 focus:border-primary transition"
                />
              </div>

              <fieldset className="bg-base-200 border border-primary rounded-xl p-4">
                <legend className="text-primary font-semibold px-2">
                  Kies nieuwsbrief(s)
                </legend>
                <div className="flex flex-col gap-3 mt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="checkbox checkbox-primary"
                    />
                    Nieuwsbrief 1
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                    />
                    Nieuwsbrief 2
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                    />
                    Nieuwsbrief 3
                  </label>
                </div>
              </fieldset>

              <button
                type="submit"
                className="btn btn-primary w-full text-base font-bold rounded-xl shadow-md hover:scale-105 transition-transform duration-200"
              >
                Verstuur inschrijving
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Decorative Transition */}
      <TransitionWithBorder colorFrom={"bg-base-100"} colorTo={"bg-gray-900"} />
    </div>
  );
};

export default NewsletterPage;
