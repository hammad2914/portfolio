"use client";

import Image from "next/image";
import parse from "html-react-parser";
import { Icon } from "@iconify/react";
import { Link } from "react-scroll";
import { about } from "@/data/content";

export function AboutSection() {
  return (
    <section className="about-section section" id="about">
      <div className="container">
        {/* Decorative SVG shapes — no optimization to do, so next/image adds
            nothing here. Marked aria-hidden via empty alt. */}
        {/* eslint-disable @next/next/no-img-element */}
        <div className="effect-1">
          <img
            src="/images/effect-1.svg"
            alt=""
            data-aos="zoom-in"
            data-aos-duration="1200"
            data-aos-delay="500"
          />
        </div>
        <div className="effect-2">
          <img
            src="/images/effect-2.svg"
            alt=""
            data-aos="zoom-in"
            data-aos-duration="1200"
            data-aos-delay="400"
          />
        </div>
        {/* eslint-enable @next/next/no-img-element */}
        <div className="row align-items-center justify-content-center gy-5">
          <div
            className="col-lg-6 col-xl-5"
            data-aos="fade-right"
            data-aos-duration="1200"
            data-aos-delay="500"
          >
            <div className="about-banner text-center">
              <Image
                src={about.imgSrc}
                alt="Hammad Ali, Full Stack Software Engineer"
                width={480}
                height={600}
                className="img-fluid about-profile-img"
                priority
              />
            </div>
            {/* The stats sit under the photo rather than under the copy: the
                portrait is close to square, so it can never grow tall enough
                to match a column holding heading, paragraphs and a button.
                Moving them here splits the height between the two columns
                instead of stacking it all on one side. */}
            <div className="review-box">
              {about.funfacts.map((fact) => (
                <div className="r-box" key={fact.title}>
                  <h3>
                    {fact.number}
                    <span>+</span>
                  </h3>
                  <label>{fact.title}</label>
                </div>
              ))}
            </div>
          </div>
          {/* no px-lg-5: the extra 96px of padding squeezed the measure hard
              enough to add four lines to the heading and the paragraph */}
          <div className="col-lg-6 col-xl-5">
            <div
              className="about-text"
              data-aos="fade"
              data-aos-duration="1200"
              data-aos-delay="400"
            >
              <div className="section-heading">
                {about.miniTitle ? (
                  <h6>
                    <i aria-hidden="true" />
                    <span>{about.miniTitle}</span>
                  </h6>
                ) : null}
                {about.title ? <h2>{parse(about.title)}</h2> : null}
              </div>
              <p>{parse(about.description)}</p>
              <div className="btn-bar">
                <Link
                  to={about.btnUrl}
                  spy
                  smooth
                  offset={-80}
                  duration={300}
                  className="px-btn"
                >
                  <span>{about.btnText}</span>{" "}
                  <i>
                    <Icon icon="bi:arrow-right" />
                  </i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
