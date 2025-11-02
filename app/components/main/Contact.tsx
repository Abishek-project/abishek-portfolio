"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setIsVisible(true)),
      { threshold: 0.1 }
    );

    if (sectionRef.current) sectionObserver.observe(sectionRef.current);

    const cardObservers = cardRefs.current.map((ref, index) => {
      if (!ref) return null;
      const observer = new IntersectionObserver(
        (entries) =>
          entries.forEach(
            (entry) =>
              entry.isIntersecting &&
              setVisibleCards((prev) => new Set(prev).add(index))
          ),
        { threshold: 0.2 }
      );
      observer.observe(ref);
      return observer;
    });

    return () => {
      sectionObserver.disconnect();
      cardObservers.forEach((o) => o?.disconnect());
    };
  }, []);

  const handleSubmit = () => {
    if (!name || !email || !message) {
      setStatus("Please fill in all fields.");
      return;
    }

    console.log("Form submitted:", { name, email, message });
    setStatus("Thank you! Your message has been sent.");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section
      id="contact"
      className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-[#050510] to-[#0b0b15] min-h-screen"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
        <div
          className="absolute bottom-10 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse pointer-events-none"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div
        ref={sectionRef}
        className="relative z-10 max-w-6xl mx-auto flex flex-col items-center"
      >
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            Let's Connect
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Have an idea or opportunity? Let's bring it to life together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 w-full">
          <div
            ref={(el) => {
              cardRefs.current[0] = el;
            }}
            className={`transition-all duration-700 ${
              visibleCards.has(0)
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-20"
            }`}
          >
            <div className="rounded-2xl border border-[#7042f88b] bg-[#0b0b15]/80 backdrop-blur-md shadow-lg transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(112,66,248,0.3)] p-8 relative z-20">
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name-input"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="name-input"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => {
                      console.log("Name changed:", e.target.value);
                      setName(e.target.value);
                    }}
                    className="flex h-10 w-full rounded-md border border-[#7042f88b] bg-[#0b0b15] backdrop-blur-md px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all relative z-30"
                    style={{ pointerEvents: "auto" }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email-input"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="email-input"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => {
                      console.log("Email changed:", e.target.value);
                      setEmail(e.target.value);
                    }}
                    className="flex h-10 w-full rounded-md border border-[#7042f88b] bg-[#0b0b15] backdrop-blur-md px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all relative z-30"
                    style={{ pointerEvents: "auto" }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="message-input"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message-input"
                    placeholder="Tell me about your project..."
                    rows={6}
                    value={message}
                    onChange={(e) => {
                      console.log("Message changed:", e.target.value);
                      setMessage(e.target.value);
                    }}
                    className="flex w-full min-h-[100px] rounded-md border border-[#7042f88b] bg-[#0b0b15] backdrop-blur-md px-3 py-2 text-sm text-gray-200 placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all relative z-30"
                    style={{ pointerEvents: "auto" }}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-[0_0_15px_rgba(112,66,248,0.4)] hover:from-purple-500 hover:to-cyan-400 hover:scale-[1.03] h-10 px-4 py-2 relative z-30"
                >
                  Send Message
                </button>

                {status && (
                  <p className="text-center text-sm text-gray-400 mt-2">
                    {status}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div
            ref={(el) => {
              cardRefs.current[1] = el;
            }}
            className={`space-y-6 transition-all duration-700 ${
              visibleCards.has(1)
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-20"
            }`}
            style={{ transitionDelay: "0.2s" }}
          >
            {[
              {
                icon: <Mail className="text-cyan-400" size={24} />,
                title: "Email",
                value: "abishekabi992@gmail.com",
              },
              {
                icon: <Phone className="text-cyan-400" size={24} />,
                title: "Phone",
                value: "+91 7339174247",
              },
              {
                icon: <MapPin className="text-cyan-400" size={24} />,
                title: "Location",
                value: "Chennai, India",
              },
            ].map((info, i) => (
              <div
                key={i}
                className="rounded-2xl border border-[#7042f88b] bg-[#0b0b15]/80 backdrop-blur-md shadow-lg transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(112,66,248,0.3)] p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-[#1a1a25]/70">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-white mb-1">
                      {info.title}
                    </h3>
                    <p className="text-gray-400">{info.value}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-6 text-gray-400 text-sm leading-relaxed">
              <p className="mb-4">
                I'm always open to discuss new projects, creative ideas or
                opportunities to be part of your visions.
              </p>
              <div className="flex gap-2 justify-center">
                <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded" />
                <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
