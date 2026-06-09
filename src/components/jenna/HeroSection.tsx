"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { Link } from "react-scroll";
import { TypeAnimation } from "react-type-animation";
import { hero, socialLinks } from "@/data/jenna";
import { SocialIcons } from "./Shared";

export function HeroSection() {
  return (
    <section className="home-section" id="home" data-scroll-index={0}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="hs-text-box">
              <h6 data-aos="fade-up" data-aos-duration="1200">
                <span>{hero.name}</span>
              </h6>
              <h1 data-aos="fade-up" data-aos-duration="1200" data-aos-delay="100">
                {hero.heading}
              </h1>
              <h2 data-aos="fade-up" data-aos-duration="1200" data-aos-delay="200">
                <TypeAnimation
                  sequence={hero.typingText as (string | number)[]}
                  speed={50}
                  repeat={Infinity}
                />
              </h2>
              <p
                className="text"
                data-aos="fade-up"
                data-aos-duration="1200"
                data-aos-delay="300"
              >
                {hero.description}
              </p>
              <div
                className="btn-bar d-flex align-items-sm-center flex-column flex-sm-row"
                data-aos="fade-up"
                data-aos-duration="1200"
                data-aos-delay="400"
              >
                <Link
                  to={hero.btnUrl}
                  spy
                  smooth
                  offset={-80}
                  duration={500}
                  className="px-btn"
                >
                  <span>{hero.btnText}</span>{" "}
                  <i className="d-flex">
                    <Icon icon="bi:arrow-right" />
                  </i>
                </Link>
                <SocialIcons
                  socialBtns={socialLinks}
                  variant="ps-sm-4 pt-4 pt-sm-0 d-flex justify-content-center justify-content-sm-start"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="hs-banner">
              <Image
                src={hero.imgUrl}
                alt="Hero"
                width={600}
                height={500}
                priority
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
