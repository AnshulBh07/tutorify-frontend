import { IFooterItem, INavItem } from "../services/interfaces";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

const findTeachersList: INavItem[] = [
  { title: "english", path: "/tutors?language=english" },
  { title: "chinese", path: "/tutors?language=chinese" },
  { title: "french", path: "/tutors?language=french" },
  { title: "spanish", path: "/tutors?language=spanish" },
  { title: "other", path: "/tutors" },
];

const findLessonsList: INavItem[] = [
  { title: "english", path: "/lessons?language=english" },
  { title: "chinese", path: "/lessons?language=chinese" },
  { title: "french", path: "/lessons?language=french" },
  { title: "spanish", path: "/lessons?language=spanish" },
  { title: "other", path: "/lessons" },
];

const companyItems: INavItem[] = [
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" },
  { title: "FAQ", path: "/faq" },
  { title: "terms", path: "/terms" },
  { title: "privacy policy", path: "/privacy" },
];

const moreList: INavItem[] = [
  { title: "documentation", path: "/documentation" },
  { title: "license", path: "/license" },
];

export const socialList: INavItem[] = [
  {
    title: "facebook",
    path: "https://facebook.com",
    icon: (
      <FaFacebookF style={{ color: "#fff", width: "50%", height: "50%" }} />
    ),
  },
  {
    title: "twitter",
    path: "https://twitter.com",
    icon: <FaTwitter style={{ color: "#fff", width: "50%", height: "50%" }} />,
  },
  {
    title: "instagram",
    path: "https://instagram.com",
    icon: (
      <FaInstagram style={{ color: "#fff", width: "50%", height: "50%" }} />
    ),
  },
  {
    title: "linkedin",
    path: "https://linkedin.com",
    icon: (
      <FaLinkedinIn style={{ color: "#fff", width: "50%", height: "50%" }} />
    ),
  },
];

export const footerItemsList: IFooterItem[] = [
  {
    heading: "teachers",
    items: findTeachersList,
  },
  {
    heading: "lessons",
    items: findLessonsList,
  },
  {
    heading: "company",
    items: companyItems,
  },
  {
    heading: "more",
    items: moreList,
  },
];
