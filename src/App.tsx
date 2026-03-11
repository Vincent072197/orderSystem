import { useEffect, useRef, useState } from "react";
import Header from "./component/Header";
import NavBar from "./component/NavBar";
import FoodSection from "./component/FoodSection";

export const MenuTitle = ["soup", "noodle", "dishes", "rice"] as const;
export type SectionType = (typeof MenuTitle)[number];
function App() {
  const [currentSection, setCurrentSection] = useState<SectionType | null>(
    MenuTitle[0],
  );
  const navRef = useRef<HTMLElement>(null);
  const sectionRef = useRef<Map<string, HTMLDivElement>>(null);
  function getMap() {
    if (!sectionRef.current) {
      sectionRef.current = new Map();
    }
    return sectionRef.current;
  }
  function scrollToSection(section) {
    const map = getMap();
    const node = map.get(section);
    node.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setCurrentSection(section);
  }
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: `0px 0px -0px 0px`,
      threshold: [0, 1],
    };
    const observer = new IntersectionObserver((entries) => {
      console.log(entries);
      // if (entries[0].isIntersecting) {
      //   setCurrentSection(entries[0].target.id as (typeof MenuTitle)[number]);
      // }
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          entry.boundingClientRect.top >= entry.rootBounds.top
        ) {
          setCurrentSection(entry.target.id as (typeof MenuTitle)[number]);
        }
      });
    }, options);
    sectionRef.current.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return (
    <div className="pt-32 min-h-screen">
      <Header />
      <NavBar
        navRef={navRef}
        scrollToSection={scrollToSection}
        currentSection={currentSection}
      />
      <main className=" border-2 border-red-500 pb-[100vh] fixed top-32 w-full overflow-y-auto h-[calc(100vh-8rem)]">
        {MenuTitle.map((section, index) => (
          <FoodSection
            ref={(node) => {
              const map = getMap();
              map.set(section, node);
              return () => {
                map.delete(section);
              };
            }}
            title={section}
            key={`section_${index}`}
          />
        ))}
      </main>
    </div>
  );
}

export default App;
