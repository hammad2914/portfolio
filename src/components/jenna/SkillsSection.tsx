"use client";

import { Icon } from "@iconify/react";
import { skills, type SkillItem } from "@/data/jenna";
import { useTheme } from "./ThemeProvider";
import { SectionHeading } from "./SectionHeading";

const themeIcons: Record<string, { dark: string; light: string }> = {
  "mdi:github": {
    dark: "skill-icons:github-light",
    light: "skill-icons:github-dark",
  },
};

function resolveIcon(item: SkillItem, theme: "dark" | "light") {
  const mapped = themeIcons[item.icon];
  if (mapped) return theme === "dark" ? mapped.dark : mapped.light;
  return item.icon;
}

function SkillIcon({ item }: { item: SkillItem }) {
  const { theme } = useTheme();

  return (
    <div className="skill-tile__icon">
      <Icon icon={resolveIcon(item, theme)} />
    </div>
  );
}

export function SkillsSection() {
  return (
    <section className="section skills-section" id="skills">
      <div className="container">
        <SectionHeading
          miniTitle={skills.sectionHeading.miniTitle}
          title={skills.sectionHeading.title}
        />

        <div
          className="skills-showcase"
          data-aos="fade-up"
          data-aos-duration="1200"
          data-aos-delay="200"
        >
          <div className="skills-showcase__glow" aria-hidden="true" />

          <div className="row g-4 g-xl-5">
            {skills.categories.map((category, index) => (
              <div
                className="col-lg-6"
                key={category.title}
                data-aos="fade-up"
                data-aos-duration="1200"
                data-aos-delay={120 * index}
              >
                <div className="skills-group">
                  <div className="skills-group__head">
                    <span className="skills-group__index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h5>{category.title}</h5>
                    <span className="skills-group__line" />
                  </div>

                  <div className="skills-grid">
                    {category.items.map((item) => (
                      <div className="skill-tile" key={item.name}>
                        <SkillIcon item={item} />
                        <span className="skill-tile__name">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
