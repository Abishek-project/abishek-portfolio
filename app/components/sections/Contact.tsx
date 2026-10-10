"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Profile, Socials } from "@/constants";
import SplitReveal from "../SplitReveal";
import Magnetic from "../Magnetic";
import { RollText } from "../Navbar";

const useLocalTime = () => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: Profile.timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
};

const Field = ({
  id,
  label,
  textarea,
  ...props
}: {
  id: string;
  label: string;
  textarea?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  const cls =
    "peer w-full resize-none border-b border-ink/20 bg-transparent pb-3 pt-7 text-lg text-ink placeholder-transparent outline-none transition-colors focus:border-ink";
  return (
    <div className="ct-field relative">
      {textarea ? (
        <textarea id={id} rows={4} placeholder={label} className={cls} {...props} />
      ) : (
        <input id={id} placeholder={label} className={cls} {...props} />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 top-0 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50"
      >
        {label}
      </label>
      <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-violet to-cyan transition-transform duration-500 peer-focus:scale-x-100" />
    </div>
  );
};

const Contact = () => {
  const root = useRef<HTMLElement>(null);
  const time = useLocalTime();
  const [status, setStatus] = useState<string | null>(null);

  useGSAP(
    () => {
      // Curved edge flattens as the section slides up
      gsap.fromTo(
        ".ct-curve",
        { scaleY: 1 },
        {
          scaleY: 0,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "top 20%", scrub: true },
        }
      );

      gsap.from(".ct-field, .ct-info", {
        y: 40,
        autoAlpha: 0,
        duration: 1,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".ct-grid", start: "top 80%" },
      });

      gsap.from(".ct-big", {
        yPercent: 100,
        duration: 1.4,
        ease: "power4.out",
        scrollTrigger: { trigger: ".ct-footer", start: "top 95%" },
      });
    },
    { scope: root }
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (!name || !email || !message) {
      setStatus("Please fill in all fields.");
      return;
    }
    const subject = encodeURIComponent(`Hello from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${Profile.email}?subject=${subject}&body=${body}`;
    setStatus("Opening your email app…");
    e.currentTarget.reset();
  };

  return (
    <section ref={root} id="contact" className="relative overflow-x-clip bg-paper text-ink">
      <div
        aria-hidden
        className="ct-curve pointer-events-none absolute -left-[10%] -top-[6vw] h-[12vw] w-[120%] origin-bottom rounded-[50%] bg-paper"
      />

      <div className="relative px-5 pb-10 pt-24 md:px-10 md:pt-32">
        <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.18em] text-ink/50">
          <span>( 05 )</span>
          <span>Contact</span>
        </div>

        <SplitReveal
          by="chars"
          className="mt-12 font-display text-[calc((100vw-2.5rem)/9.8)] font-extrabold uppercase leading-[0.9] tracking-[-0.04em] md:text-[calc((100vw-5rem)/9.8)]"
        >
          Let&apos;s build
          <br />
          something great
        </SplitReveal>

        <div className="ct-grid mt-20 grid gap-16 lg:grid-cols-12">
          <form onSubmit={handleSubmit} className="flex flex-col gap-8 lg:col-span-7" noValidate>
            <div className="grid gap-8 md:grid-cols-2">
              <Field id="name" name="name" label="Your name" autoComplete="name" />
              <Field id="email" name="email" type="email" label="Your email" autoComplete="email" />
            </div>
            <Field id="message" name="message" label="Tell me about your project" textarea />
            <div className="ct-field flex flex-wrap items-center gap-6">
              <Magnetic>
                <button
                  type="submit"
                  data-cursor="Send"
                  className="flex h-32 w-32 items-center justify-center rounded-full bg-ink font-mono text-xs uppercase tracking-[0.18em] text-paper transition-transform duration-500 hover:scale-105"
                >
                  Send ↗
                </button>
              </Magnetic>
              {status && <p className="text-sm text-ink/60">{status}</p>}
            </div>
          </form>

          <div className="flex flex-col gap-10 lg:col-span-4 lg:col-start-9">
            {[
              { label: "Email", value: Profile.email, href: `mailto:${Profile.email}` },
              { label: "Phone", value: Profile.phone, href: `tel:${Profile.phone.replace(/\s/g, "")}` },
              { label: "Location", value: Profile.location },
            ].map((item) => (
              <div key={item.label} className="ct-info border-t border-ink/15 pt-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50">
                  {item.label}
                </p>
                {item.href ? (
                  <a href={item.href} className="group mt-2 block break-all text-xl font-medium md:text-2xl">
                    <RollText>{item.value}</RollText>
                  </a>
                ) : (
                  <p className="mt-2 text-xl font-medium md:text-2xl">{item.value}</p>
                )}
              </div>
            ))}
            <div className="ct-info border-t border-ink/15 pt-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50">Socials</p>
              <div className="mt-2 flex gap-6 text-xl font-medium md:text-2xl">
                {Socials.map((s) => (
                  <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="group">
                    <RollText>{`${s.name} ↗`}</RollText>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <footer className="ct-footer mt-32">
          <div className="flex flex-wrap items-end justify-between gap-6 border-t border-ink/15 pt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50">
            <span>© {new Date().getFullYear()} {Profile.name}</span>
            <span>
              Chennai — <span className="tabular-nums text-ink">{time || "--:--:--"}</span> IST
            </span>
            <a href="#top" className="group text-ink">
              <RollText>Back to top ↑</RollText>
            </a>
          </div>
          <div className="mt-6 overflow-hidden">
            <p className="ct-big whitespace-nowrap font-display text-[calc((100vw-2.5rem)/7.3)] font-extrabold uppercase leading-[0.8] tracking-[-0.04em] md:text-[calc((100vw-5rem)/7.3)]">
              {Profile.firstName}
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
