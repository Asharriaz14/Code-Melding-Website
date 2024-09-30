import React, { Suspense, useEffect } from "react";
import Layout from "../../layout/Layout";
import DiscoverMore from "./DiscoverMoreSection";
import Hero from "./HeroSection";
import CtaSection from "./CtaSection";
import Companies from "./CompaniesSection";
import Calculator from "./CalcutorSection";
import Contact from "./ContactSection";
import "../../App.css";
import Logo from "../../assets/Logo.webp";
import { useNavigate } from "react-router-dom";
// Lazy load components
const LazyBrandSection = React.lazy(() => import("./BrandSection"));
const LazyServiceSection = React.lazy(() => import("./ServiceSection"));
const LazyCaseStudies = React.lazy(() => import("./CaseStudiesSection"));
const LazyTestimonialSection = React.lazy(() => import("./TestimonialSection"));
const LazyBlogSection = React.lazy(() => import("./BlogSection"));
import { useSelector } from "react-redux";

function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser && currentUser.isAdmin) {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
  }, [currentUser, navigate]);

  return (
    <Layout>
      <Hero />
      <Suspense
        fallback={
          <div className="centered">
            <img src={Logo} alt="Logo" className="spin-image" />
          </div>
        }
      >
        <LazyBrandSection />
      </Suspense>
      <DiscoverMore />
      <CtaSection />
      <Suspense
        fallback={
          <div className="centered">
            <img src={Logo} alt="Logo" className="spin-image" />
          </div>
        }
      >
        <LazyServiceSection />
      </Suspense>
      <Companies />
      <Suspense
        fallback={
          <div className="centered">
            <img src={Logo} alt="Logo" className="spin-image" />
          </div>
        }
      >
        <LazyCaseStudies />
      </Suspense>
      <Calculator />
      <Suspense
        fallback={
          <div className="centered">
            <img src={Logo} alt="Logo" className="spin-image" />
          </div>
        }
      >
        <LazyTestimonialSection />
      </Suspense>
      <Suspense
        fallback={
          <div className="centered">
            <img src={Logo} alt="Logo" className="spin-image" />
          </div>
        }
      >
        <LazyBlogSection />
      </Suspense>
      <Contact />
    </Layout>
  );
}

export default React.memo(Home);
