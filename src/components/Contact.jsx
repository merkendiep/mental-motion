import React, { useState } from "react";
import {
  EnvelopeIcon,
  ClockIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const Contact = () => {
  const [result, setResult] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Versturen....");
    const formData = new FormData(event.target);

    formData.append("access_key", "d89495b8-eebc-480b-8cd4-e4e39e82ce92");
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Email verstuurd");
      event.target.reset();
      setName("");
      setEmail("");
      setMessage("");
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  const openingHours = [
    { day: "Maandag", hours: "11:00 - 18:00" },
    { day: "Dinsdag", hours: "Gesloten" },
    { day: "Woensdag", hours: "Gesloten" },
    { day: "Donderdag", hours: "11:00 - 18:00" },
    { day: "Vrijdag", hours: "11:00 - 18:00" },
    { day: "Weekend", hours: "Gesloten" },
  ];

  return (
    <section className="relative">
      {/* Main Content with Form and Info */}
      <div className="container mx-auto px-4 py-16">
        <div className="lg:flex lg:gap-12 lg:items-start">
          {/* Contact Info and Hours */}
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            {/* Opening Hours */}
            <div className="mb-8">
              <h2 className="flex items-center text-xl mb-6 text-base-content/80">
                <ClockIcon className="h-5 w-5 text-primary mr-2" />
                Openingstijden
              </h2>
              <div className="space-y-2 max-w-xs">
                {openingHours.map((item, index) => (
                  <div key={index} className="flex items-center py-2 text-sm">
                    <span className="text-base-content/70 w-20">
                      {item.day}
                    </span>
                    <span className="mx-3 text-base-content/30">–</span>
                    <span
                      className={`${
                        item.day === "Weekend"
                          ? "text-base-content/50"
                          : "text-base-content font-medium"
                      }`}
                    >
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-lg mb-4 text-base-content/80">
                Volg ons op social media
              </h3>
              <p className="text-base-content/60 mb-6 text-sm">
                Blijf op de hoogte van onze activiteiten, tips en verhalen van
                andere studenten.
              </p>
              <div className="flex gap-3">
                <a
                  className="btn btn-circle bg-base-100 hover:bg-base-200 group border border-base-300"
                  href="https://www.instagram.com/mentalmotion_utrecht/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="instagram"
                >
                  <svg
                    className="h-6 w-6 fill-current group-hover:text-pink-500 transition-colors"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.9294 7.72275C9.65868 7.72275 7.82715 9.55428 7.82715 11.825C7.82715 14.0956 9.65868 15.9271 11.9294 15.9271C14.2 15.9271 16.0316 14.0956 16.0316 11.825C16.0316 9.55428 14.2 7.72275 11.9294 7.72275ZM11.9294 14.4919C10.462 14.4919 9.26239 13.2959 9.26239 11.825C9.26239 10.354 10.4584 9.15799 11.9294 9.15799C13.4003 9.15799 14.5963 10.354 14.5963 11.825C14.5963 13.2959 13.3967 14.4919 11.9294 14.4919ZM17.1562 7.55495C17.1562 8.08692 16.7277 8.51178 16.1994 8.51178C15.6674 8.51178 15.2425 8.08335 15.2425 7.55495C15.2425 7.02656 15.671 6.59813 16.1994 6.59813C16.7277 6.59813 17.1562 7.02656 17.1562 7.55495ZM19.8731 8.52606C19.8124 7.24434 19.5197 6.10901 18.5807 5.17361C17.6453 4.23821 16.51 3.94545 15.2282 3.88118C13.9073 3.80621 9.94787 3.80621 8.62689 3.88118C7.34874 3.94188 6.21341 4.23464 5.27444 5.17004C4.33547 6.10544 4.04628 7.24077 3.98201 8.52249C3.90704 9.84347 3.90704 13.8029 3.98201 15.1238C4.04271 16.4056 4.33547 17.5409 5.27444 18.4763C6.21341 19.4117 7.34517 19.7045 8.62689 19.7687C9.94787 19.8437 13.9073 19.8437 15.2282 19.7687C16.51 19.708 17.6453 19.4153 18.5807 18.4763C19.5161 17.5409 19.8089 16.4056 19.8731 15.1238C19.9481 13.8029 19.9481 9.84704 19.8731 8.52606ZM18.1665 16.5412C17.8881 17.241 17.349 17.7801 16.6456 18.0621C15.5924 18.4799 13.0932 18.3835 11.9294 18.3835C10.7655 18.3835 8.26272 18.4763 7.21307 18.0621C6.51331 17.7837 5.9742 17.2446 5.69215 16.5412C5.27444 15.488 5.37083 12.9888 5.37083 11.825C5.37083 10.6611 5.27801 8.15832 5.69215 7.10867C5.97063 6.40891 6.50974 5.8698 7.21307 5.58775C8.26629 5.17004 10.7655 5.26643 11.9294 5.26643C13.0932 5.26643 15.596 5.17361 16.6456 5.58775C17.3454 5.86623 17.8845 6.40534 18.1665 7.10867C17.5843 8.16189 18.4879 10.6611 18.4879 11.825C18.4879 12.9888 18.5843 15.4916 18.1665 16.5412Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>

                <a
                  className="btn btn-circle bg-base-100 hover:bg-base-200 group border border-base-300"
                  href="https://www.linkedin.com/company/mentalmotion-spsc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="linkedin"
                >
                  <svg
                    className="h-6 w-6 fill-current group-hover:text-blue-500 transition-colors"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.2 8.80005C16.4731 8.80005 17.694 9.30576 18.5941 10.2059C19.4943 11.1061 20 12.327 20 13.6V19.2H16.8V13.6C16.8 13.1757 16.6315 12.7687 16.3314 12.4687C16.0313 12.1686 15.6244 12 15.2 12C14.7757 12 14.3687 12.1686 14.0687 12.4687C13.7686 12.7687 13.6 13.1757 13.6 13.6V19.2H10.4V13.6C10.4 12.327 10.9057 11.1061 11.8059 10.2059C12.7061 9.30576 13.927 8.80005 15.2 8.80005Z"
                      fill="currentColor"
                    />
                    <path
                      d="M7.2 9.6001H4V19.2001H7.2V9.6001Z"
                      fill="currentColor"
                    />
                    <path
                      d="M5.6 7.2C6.48366 7.2 7.2 6.48366 7.2 5.6C7.2 4.71634 6.48366 4 5.6 4C4.71634 4 4 4.71634 4 5.6C4 6.48366 4.71634 7.2 5.6 7.2Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-1/2">
            <div className="card bg-gradient-to-br from-base-100 to-base-200/50 shadow-xl">
              <div className="card-body p-8">
                <div className="text-center mb-6">
                  <h2 className="card-title text-3xl justify-center mb-2">
                    Stuur ons een bericht
                  </h2>
                  <p className="text-base-content/70">
                    We reageren binnen 24 uur op je bericht
                  </p>
                </div>

                <form
                  id="contact-form"
                  className="space-y-6"
                  onSubmit={onSubmit}
                >
                  <div className="form-control">
                    <label htmlFor="name" className="label">
                      <span className="label-text font-semibold">Naam *</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      autoComplete="name"
                      type="text"
                      required
                      placeholder="Je volledige naam"
                      className="input input-bordered w-full focus:input-primary transition-colors"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </div>

                  <div className="form-control">
                    <label htmlFor="email" className="label">
                      <span className="label-text font-semibold">Email *</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      autoComplete="email"
                      type="email"
                      required
                      placeholder="je.naam@example.com"
                      className="input input-bordered w-full focus:input-primary transition-colors"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </div>

                  <div className="form-control">
                    <label htmlFor="message" className="label">
                      <span className="label-text font-semibold">
                        Bericht *
                      </span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      autoComplete="message"
                      required
                      rows="5"
                      className="textarea textarea-bordered w-full focus:textarea-primary transition-colors resize-none"
                      placeholder="Vertel ons waar je mee bezig bent, wat je vraag is, of hoe we je kunnen helpen..."
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                    />
                  </div>

                  {result && (
                    <div
                      className={`alert ${
                        result.includes("verstuurd")
                          ? "alert-success"
                          : "alert-info"
                      } mb-4`}
                    >
                      <CheckCircleIcon className="h-6 w-6" />
                      <span>{result}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary w-full btn-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    disabled={result === "Versturen...."}
                  >
                    {result === "Versturen...." ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Versturen...
                      </>
                    ) : (
                      <>
                        <EnvelopeIcon className="h-5 w-5" />
                        Verstuur bericht
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
