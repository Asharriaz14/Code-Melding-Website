import { FaHome, FaInfo, FaCog, FaEnvelope, FaUser, FaLink } from 'react-icons/fa';
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
import CaseStudyImage from '../../assets/CaseStudyImage.png'; // Ensure this path is correct










export const caseStudies = [
  {
    image:  CaseStudyImage,
    heading: 'Achieving Over 1 Million Users',
    description: 'This case study explores the remarkable journey of Instant VPN, a privacy-focused mobile application, in reaching over 1 million users. It delves into the strategies employed, challenges overcome, and key factors that contributed to its rapid growth and widespread adoption.',
    points:[
      {
        icon:  <RiStackLine />,
        text: 'Node.js, React, Saga, Redux, Azure, AWS',
      },
      {
        icon:<FaPeopleGroup />,
        text:'10 Team Members',
      },
      {
        icon:<FaFontAwesomeFlag />,
        text:'Canada',
      },{
        icon:<FaRegClock />,
        text:'1 + Year',
      }
    ],
    links: [
      {
        text: 'View Case',
        to: '#'
      },
      {
        text: 'Get Estimate',
        url: '#'
      }
    ]
  },
  {
    image:  CaseStudyImage,

    heading: 'Another Case Study Title',
    description: 'This case study explores another success story, focusing on innovative strategies and achievements in the industry.',
    points:[
      {
        icon: <RiStackLine />,
        text: 'Node.js, React, Saga, Redux, Azure, AWS',
      },
      {
        icon:<FaPeopleGroup />,
        text:'10 Team Members',
      },
      {
        icon:<FaFontAwesomeFlag />,
        text:'Canada',
      },{
        icon:<FaRegClock />,
        text:'1 + Year',
      }
    ],
    links: [
      {
        text: 'View Case',
        url: '#view-case'
      },
      {
        text: 'Get Estimate',
        url: '#get-estimate'
      }
    ]
  }
];



export const tabs = [
    { name: 'Web App Development', icon: <GrCloudComputer /> },
    { name: 'Web Development', icon: <BsLaptop /> },
    { name: 'Android App Development', icon: <BsAndroid2 /> },
    { name: 'UI/UX Designing', icon: <BsLayoutWtf /> },
    { name: 'AI Development', icon: <GiMagicHat /> },
    { name: 'Blockchain Development', icon: <SiBlockchaindotcom /> },
    
  ];

  export const tabContent = [
    {
      heading: 'Welcome to Home',
      paragraph: 'This is the home section. Here you can find various details about our services and offers.',
      icons: [
        { icon: <FaLink />, name: 'Home Link', to: '#' },
        { icon: <FaCog />, name: 'Settings', to: '#' },
        { icon: <FaUser />, name: 'Profile', to: '#' },
      ],
    },
    {
      heading: 'About Us',
      paragraph: 'Learn more about our company. We value transparency and customer satisfaction.',
      icons: [
        { icon: <FaLink />, name: 'About Link', to: '#' },
        { icon: <FaEnvelope />, name: 'Contact', to: '#' },
        { icon: <FaInfo />, name: 'Info', to: '#' },
      ],
    },
    {
      heading: 'Our Services',
      paragraph: 'Discover our wide range of services designed to meet your needs.',
      icons: [
        { icon: <FaLink />, name: 'Service Link', to: '#' },
        { icon: <FaCog />, name: 'Settings', to: '#' },
        { icon: <FaHome />, name: 'Home', to: '#' },
      ],
    },
    {
      heading: 'UI/UX DESIGNING',
      paragraph: 'Potter ipsum wand elf parchment wingardium. House floor feather hungarian nitwit flame half-giant hungarian sticking. Match lemon stairs viktor unwilling remem.',
      icons: [
        { icon: <FaMobileAlt />, name: 'Apps', to: '#' },
        { icon: <MdOutlineDashboard />, name: 'Dashboard', to: '#' },
        { icon: <IoWatch />, name: 'Wearable', to: '#' },
        { icon: <GiBrain />, name: 'Ai', to: '#' },
        { icon: <SlScreenDesktop />, name: 'Websites', to: '#' },
      ],
    },
    {
      heading: 'User Profile',
      paragraph: 'Manage your profile settings and personal information from here.',
      icons: [
        { icon: <FaLink />, name: 'Profile Link', to: '#' },
        { icon: <FaCog />, name: 'Settings', to: '#' },
        { icon: <FaUser />, name: 'Profile', to: '#' },
      ],
    },
  ];
