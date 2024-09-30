import {
  FaHome,
  FaInfo,
  FaCog,
  FaEnvelope,
  FaUser,
  FaLink,
} from "react-icons/fa";
import { BsLaptop } from "react-icons/bs";
import { BsLayoutWtf } from "react-icons/bs";
import { GrCloudComputer } from "react-icons/gr";
import { FaMobileAlt } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { IoWatch } from "react-icons/io5";
import { GiBrain } from "react-icons/gi";
import { SlScreenDesktop } from "react-icons/sl";
import { GiMagicHat } from "react-icons/gi";
import { SiBlockchaindotcom } from "react-icons/si";
import { BsAndroid2 } from "react-icons/bs";
import { RiStackLine } from "react-icons/ri";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaFontAwesomeFlag } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";
import CaseStudyImage from "../../assets/CaseStudyImage.webp";

export const caseStudies = [
  {
    image: CaseStudyImage,
    heading: "Achieving Over 1 Million Users",
    description:
      "This case study explores the remarkable journey of Instant VPN, a privacy-focused mobile application, in reaching over 1 million users. It delves into the strategies employed, challenges overcome, and key factors that contributed to its rapid growth and widespread adoption.",
    points: [
      {
        icon: <RiStackLine />,
        text: "Node.js, React, Saga, Redux, Azure, AWS",
      },
      {
        icon: <FaPeopleGroup />,
        text: "10 Team Members",
      },
      {
        icon: <FaFontAwesomeFlag />,
        text: "Canada",
      },
      {
        icon: <FaRegClock />,
        text: "1 + Year",
      },
    ],
    links: [
      {
        text: "View Case",
        to: "#",
      },
      {
        text: "Get Estimate",
        url: "#",
      },
    ],
  },
  {
    image: CaseStudyImage,

    heading: "Another Case Study Title",
    description:
      "This case study explores another success story, focusing on innovative strategies and achievements in the industry.",
    points: [
      {
        icon: <RiStackLine />,
        text: "Node.js, React, Saga, Redux, Azure, AWS",
      },
      {
        icon: <FaPeopleGroup />,
        text: "10 Team Members",
      },
      {
        icon: <FaFontAwesomeFlag />,
        text: "Canada",
      },
      {
        icon: <FaRegClock />,
        text: "1 + Year",
      },
    ],
    links: [
      {
        text: "View Case",
        url: "#view-case",
      },
      {
        text: "Get Estimate",
        url: "#get-estimate",
      },
    ],
  },
];

export const tabs = [
  { name: "Web App Development", icon: <GrCloudComputer /> },
  { name: "Web Development", icon: <BsLaptop /> },
  { name: "Android App Development", icon: <BsAndroid2 /> },
  { name: "UI/UX Designing", icon: <BsLayoutWtf /> },
  { name: "AI Development", icon: <GiMagicHat /> },
  { name: "Blockchain Development", icon: <SiBlockchaindotcom /> },
];

export const tabContent = [
  {
    heading: "Welcome to Home",
    paragraph:
      "This is the home section. Here you can find various details about our services and offers.",
    icons: [
      { icon: <FaLink />, name: "Home Link", to: "#" },
      { icon: <FaCog />, name: "Settings", to: "#" },
      { icon: <FaUser />, name: "Profile", to: "#" },
    ],
  },
  {
    heading: "About Us",
    paragraph:
      "Learn more about our company. We value transparency and customer satisfaction.",
    icons: [
      { icon: <FaLink />, name: "About Link", to: "#" },
      { icon: <FaEnvelope />, name: "Contact", to: "#" },
      { icon: <FaInfo />, name: "Info", to: "#" },
    ],
  },
  {
    heading: "Our Services",
    paragraph:
      "Discover our wide range of services designed to meet your needs.",
    icons: [
      { icon: <FaLink />, name: "Service Link", to: "#" },
      { icon: <FaCog />, name: "Settings", to: "#" },
      { icon: <FaHome />, name: "Home", to: "#" },
    ],
  },
  {
    heading: "UI/UX DESIGNING",
    paragraph:
      "Potter ipsum wand elf parchment wingardium. House floor feather hungarian nitwit flame half-giant hungarian sticking. Match lemon stairs viktor unwilling remem.",
    icons: [
      { icon: <FaMobileAlt />, name: "Apps", to: "#" },
      { icon: <MdOutlineDashboard />, name: "Dashboard", to: "#" },
      { icon: <IoWatch />, name: "Wearable", to: "#" },
      { icon: <GiBrain />, name: "Ai", to: "#" },
      { icon: <SlScreenDesktop />, name: "Websites", to: "#" },
    ],
  },
  {
    heading: "User Profile",
    paragraph:
      "Manage your profile settings and personal information from here.",
    icons: [
      { icon: <FaLink />, name: "Profile Link", to: "#" },
      { icon: <FaCog />, name: "Settings", to: "#" },
      { icon: <FaUser />, name: "Profile", to: "#" },
    ],
  },
];

export const FaqQuestions = [
  {
    ques: "How does the billing work?",
    ans: "Springerdata offers a variety of billing options, including monthly and annual subscription plans, as well as pay-as-you-go pricing for certain services. Payment is typically made through a credit card or other secure online payment method.",
  },
  {
    ques: "Can I get a refund for my subscription?",
    ans: "We offer a 30-day money-back guarantee for most of its subscription plans. If you are not satisfied with your subscription within the first 30 days, you can request a full refund.",
  },
  {
    ques: "How do I cancel my subscription?",
    ans: "To cancel your subscription, you can log in to your account and navigate to the subscription management page. From there, you should be able to cancel your subscription and stop future billing.",
  },
  {
    ques: "Is there a free trial?",
    ans: "We offer a free trial of our software for a limited time. During the trial period, you will have access to a limited set of features and functionality, but you will not be charged.",
  },
  {
    ques: "How do I contact support?",
    ans: "If you need help with our platform or have any other questions, you can contact the company's support team by submitting a support request through the website or by emailing support@ourwebsite.com.",
  },
  {
    ques: "Do you offer any discounts or promotions?",
    ans: "We may offer discounts or promotions from time to time. To stay up-to-date on the latest deals and special offers, you can sign up for the company's newsletter or follow it on social media.",
  },
];
