import React, { useState } from "react";

const projects = [
  {
    id: 1,
    category: "Real Estate",
    title: "Luxury Villa Showcase",
    description:
      "Cinematic property showcase highlighting architecture, interiors and premium lifestyle.",
    tags: ["Real Estate", "Cinematic", "Color Grading"],
    image: "/assets/reference-home.jpeg",
  },
  {
    id: 2,
    category: "Motion Graphics",
    title: "Brand Motion Identity",
    description:
      "Dynamic motion graphics created for a modern and powerful brand identity.",
    tags: ["Motion Graphics", "After Effects", "Branding"],
    image: "/assets/reference-pages.jpeg",
  },
  {
    id: 3,
    category: "Wedding",
    title: "A Story of Love",
    description:
      "Emotional wedding film capturing unforgettable moments and memories.",
    tags: ["Wedding", "Storytelling", "Film"],
    image: "/assets/reference-home.jpeg",
  },
  {
    id: 4,
    category: "Documentary",
    title: "Stories That Matter",
    description:
      "Story-driven documentary editing with cinematic pacing and powerful storytelling.",
    tags: ["Documentary", "Editing", "Storytelling"],
    image: "/assets/reference-pages.jpeg",
  },
  {
    id: 5,
    category: "Commercial",
    title: "Brand Promotional Film",
    description:
      "High-impact promotional video designed to communicate a brand message effectively.",
    tags: ["Commercial", "Advertising", "Color"],
    image: "/assets/reference-home.jpeg",
  },
  {
    id: 6,
    category: "Reels",
    title: "Social Media Campaign",
    description:
      "Fast, engaging short-form content designed for modern social platforms.",
    tags: ["Reels", "Shorts", "Social Media"],
    image: "/assets/reference-pages.jpeg",
  },
];

const filters = [
  "All",
  "Real Estate",
  "Motion Graphics",
  "Wedding",
  "Documentary",
  "Commercial",
  "Reels",
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <>
      <section className="portfolio-section" id="portfolio">
        <div className="section-heading">
          <div>
            <span className="section-kicker">OUR WORK</span>

            <h2>
              Creative Work.
              <span> Powerful Results.</span>
            </h2>

            <p>
              Explore a selection of cinematic edits, motion graphics,
              commercials and visual stories created by Lucky FX Studio.
            </p>
          </div>

          <div className="portfolio-count">
            <strong>{String(filteredProjects.length).padStart(2, "0")}</strong>
            <span>PROJECTS</span>
          </div>
        </div>

        <div className="portfolio-filters">
          {filters.map((filter) => (
            <button
              key={filter}
              className={activeFilter === filter ? "active" : ""}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="portfolio-grid">
          {filteredProjects.map((project, index) => (
            <article
              className={`portfolio-card ${
                index === 0 ? "portfolio-featured" : ""
              }`}
              key={project.id}
              onClick={() => setSelectedProject(project)}
            >
              <div className="portfolio-image">
                <img src={project.image} alt={project.title} />

                <div className="portfolio-overlay">
                  <div className="play-button">▶</div>

                  <span>VIEW PROJECT</span>
                </div>

                <div className="project-number">
                  {String(project.id).padStart(2, "0")}
                </div>

                <div className="project-category">
                  {project.category}
                </div>
              </div>

              <div className="portfolio-info">
                <h3>{project.title}</h3>

                <p>{project.description}</p>

                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <button className="project-link">
                  Explore Project <span>↗</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="portfolio-cta">
          <div>
            <span>HAVE A PROJECT IN MIND?</span>
            <h3>Let's create something unforgettable.</h3>
          </div>

          <a href="#contact">
            Start Your Project <span>→</span>
          </a>
        </div>
      </section>

      {selectedProject && (
        <div
          className="project-modal"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="project-modal-content"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedProject(null)}
            >
              ×
            </button>

            <div className="modal-image">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
              />

              <div className="modal-play">▶</div>
            </div>

            <div className="modal-details">
              <span>{selectedProject.category}</span>

              <h2>{selectedProject.title}</h2>

              <p>{selectedProject.description}</p>

              <div className="modal-tags">
                {selectedProject.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <button
                className="modal-cta"
                onClick={() => {
                  setSelectedProject(null);
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Start Similar Project →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}