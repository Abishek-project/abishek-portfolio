import Hero from "./components/main/Hero";
import Skills from "./components/main/Skills";
import Projects from "./components/main/Projects";
import WorkExperience from "./components/main/Workexperience";
import Contact from "./components/main/Contact";

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero />
        <Skills />
        <WorkExperience />
        <Projects />
        <Contact />
      </div>
    </main>
  );
}
