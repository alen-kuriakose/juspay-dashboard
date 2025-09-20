import BookOpen from "@/assets/icons/BookOpen.svg";
import ChartPieSlice from "@/assets/icons/ChartPieSlice.svg";
import ChatsTeardrop from "@/assets/icons/ChatsTeardrop.svg";
import FolderNotch from "@/assets/icons/FolderNotch.svg";
import IdentificationBadge from "@/assets/icons/IdentificationBadge.svg";
import IdentificationCard from "@/assets/icons/IdentificationCard.svg";
import Notebook from "@/assets/icons/Notebook.svg";
import ShoppingBagOpen from "@/assets/icons/ShoppingBagOpen.svg";
import UsersThree from "@/assets/icons/UsersThree.svg";
import Bug from "@/assets/icons/BugBeetle.svg";
import User from "@/assets/icons/User.svg";
import Broadcast from "@/assets/icons/Broadcast.svg";
import Act1 from "@/assets/images/3D05.png";
import Act2 from "@/assets/images/Female05.png";
import Act3 from "@/assets/images/3D08.png";
import Act4 from "@/assets/images/Male07.png";
import Act5 from "@/assets/images/Male11.png";
import Contact1 from "@/assets/images/Female15.png";
import Contact2 from "@/assets/images/Male08.png";
import Contact3 from "@/assets/images/Male06.png";
import Contact4 from "@/assets/images/Female08.png";
import Contact5 from "@/assets/images/Female09.png";
import Contact6 from "@/assets/images/3D03.png";

export const dashboardSidemenuContent = [
  {
    title: "Default",
    icon: ChartPieSlice,

    url: "/solutions/digitization",
  },
  {
    title: "eCommerce​",
    icon: ShoppingBagOpen,
    contents: [
      {
        title: "Text",
      },
      {
        title: "Speech",
      },
      {
        title: "Voice Over",
      },
    ],
    url: "/solutions/speech",
  },
  {
    title: "Projects",
    icon: FolderNotch,
    contents: [
      {
        title: "Translation",
      },
      {
        title: "Transliteration",
      },
      {
        title: "Transcription",
      },
      {
        title: "Summarization",
      },
      {
        title: "Quiz ",
      },
      {
        title: "Sentiment ",
      },
    ],
    url: "https://www.tarento.com/case-studies/anuvaad-domain-specific-translation-engine-for-the-supreme-court-of-india/",
  },
  {
    title: "Online Courses",
    icon: BookOpen,
    contents: [
      {
        title: "Digital ",
      },
      {
        title: "Enterprise ",
      },
    ],
    url: "",
  },
];

export const pageSidemenuContent = [
  {
    title: "User Profile",
    icon: IdentificationCard,
    contents: [
      {
        title: "Overview",
      },
      {
        title: "Projects",
      },
      {
        title: "Campaigns",
      },
      {
        title: "Documents",
      },
      {
        title: "Followers",
      },
    ],
    url: "/solutions/digitization",
  },
  {
    title: "Account",
    icon: IdentificationBadge,
    contents: [
      {
        title: "Text",
      },
      {
        title: "Speech",
      },
      {
        title: "Voice ",
      },
    ],
    url: "/solutions/speech",
  },
  {
    title: "Corporate",
    icon: UsersThree,
    contents: [
      {
        title: "Translation",
      },
      {
        title: "Transliteration",
      },
      {
        title: "Transcription",
      },
      {
        title: "Summarization",
      },
      {
        title: "Quiz",
      },
      {
        title: "Sentiment ",
      },
    ],
    url: "https://www.tarento.com/case-studies/anuvaad-domain-specific-translation-engine-for-the-supreme-court-of-india/",
  },
  {
    title: "Blog",
    icon: Notebook,
    contents: [
      {
        title: "Digital ",
      },
      {
        title: "Enterprise ",
      },
    ],
    url: "Social",
  },
  {
    title: "Social",
    icon: ChatsTeardrop,
    contents: [
      {
        title: "Digital ",
      },
      {
        title: "Enterprise",
      },
    ],
    url: "Social",
  },
];

export const notificationGroupContent1 = [
  {
    title: "You have a bug that needs to be fixed.",
    timeStamp: "Just now",
    icon: Bug,
  },
  { title: "New user registered", timeStamp: "59 minutes ago", icon: User },
  {
    title: "You have a bug that needs to be fixed.",
    timeStamp: "12 hours ago",
    icon: Bug,
  },
  {
    title: "Andi Lane subscribed to you",
    timeStamp: "Today, 11:59 AM",
    icon: Broadcast,
  },
];

export const notificationGroupContent2 = [
  {
    title: "You have a bug that needs to be fixed.",
    timeStamp: "Just now",
    icon: Act1,
  },
  { title: "Released a new version", timeStamp: "59 minutes ago", icon: Act2 },
  {
    title: "Submitted a bug",
    timeStamp: "12 hours ago",
    icon: Act3,
  },
  {
    title: "Modified A data in Page X",
    timeStamp: "Today, 11:59 AM",
    icon: Act4,
  },
  {
    title: "Deleted a page in Project X",
    timeStamp: "Feb 2, 2023",
    icon: Act5,
  },
];

export const notificationGroupContent3 = [
  {
    title: "Natali Craig",
    timeStamp: "Just now",
    icon: Contact1,
  },
  { title: "Drew Cano", timeStamp: "59 minutes ago", icon: Contact2 },
  {
    title: "Orlando Diggs",
    timeStamp: "12 hours ago",
    icon: Contact3,
  },
  {
    title: "Andi Lane",
    timeStamp: "Today, 11:59 AM",
    icon: Contact4,
  },
  {
    title: "Kate Morrison",
    timeStamp: "Today, 11:59 AM",
    icon: Contact5,
  },
  {
    title: "Koray Okumus",
    timeStamp: "Today, 11:59 AM",
    icon: Contact6,
  },
];

export const favourites = ["Overview", "Projects"];
export const recents = ["Campaigns", "Documents", "Followers"];

export const WidgetChartData = [
  {
    widgetName: "Customers",
    mainValue: "3,781",
    growth: "11.01",
    isRevRelated: false,
    fontClass: "text-dark dark:text-dark",
    className: "bg-primary-blue",
    icnClr: "",
  },
  {
    widgetName: "Orders",
    mainValue: "1,219",
    growth: "0.03",
    isRevRelated: false,
    fontClass: "text-dark dark:text-white dark;invert",
    className: "bg-primary-light dark:bg-white/15",
    icnClr: "dark:invert",
  },
  {
    widgetName: "Revenue",
    mainValue: "695",
    growth: "15.03",
    isRevRelated: true,
    fontClass: "text-dark dark:text-white",
    className: "bg-primary-light dark:bg-white/15 ",
    icnClr: "dark:invert",
  },
  {
    widgetName: "Growth",
    mainValue: "30.1%",
    growth: "6.08",
    isRevRelated: false,
    fontClass: "text-dark dark:text-dark",
    className: "bg-primary-purple",
    icnClr: "",
  },
];

type Location = {
  city: string;
  coordinates: [number, number]; // Ensures that coordinates will always be a tuple
  value: number;
  progress: number;
};
export const locations: Location[] = [
  {
    city: "New York",
    coordinates: [40.7128, -74.006],
    value: 72000,
    progress: 78,
  },
  {
    city: "San Francisco",
    coordinates: [37.7749, -122.4194],
    value: 39000,
    progress: 26,
  },
  {
    city: "Sydney",
    coordinates: [-33.8688, 151.2093],
    value: 25000,
    progress: 34,
  },
  {
    city: "Singapore",
    coordinates: [1.3521, 103.8198],
    value: 61000,
    progress: 70,
  },
];

export const invoices = [
  {
    item: "ASOS Ridley High Waist",
    price: "$79.49",
    quantity: 82,
    total: 6518.18,
  },
  {
    item: "Marco Lightweight Shirt",
    price: "$128.50",
    quantity: 37,
    total: 4754.5,
  },
  {
    item: "Half Sleeve Shirt",
    price: "$39.99",
    quantity: 64,
    total: 2559.36,
  },
  {
    item: "Lightweight Jacket",
    price: "$20.00",
    quantity: 184,
    total: 3680.0,
  },
  {
    item: "Marco Shoes",
    price: "$79.49",
    quantity: 64,
    total: 1965.81,
  },
];

export const orderHistory = [
  {
    orderId: "#CM9801",
    user: "Natali Craig",
    project: "Landing Page",
    address: "Meadow Lane Oakland",
    date: "Just now",
    status: "In Progress",
    icon: Contact1,
  },
  {
    orderId: "#CM9802",
    user: "Kate Morrison",
    project: "CRM Admin pages",
    address: "Larry San Francisco",
    date: "A minute ago",
    status: "Complete",
    icon: Contact5,
  },
  {
    orderId: "#CM9803",
    user: "Drew Cano",
    project: "Client Project",
    address: "Bagwell Avenue Ocala",
    date: "1 hour ago",
    status: "Pending",
    icon: Contact2,
  },
  {
    orderId: "#CM9804",
    user: "Orlando Diggs",
    project: "Admin Dashboard",
    address: "Washburn Baton Rouge",
    date: "Yesterday",
    status: "Approved",
    icon: Contact3,
  },
  {
    orderId: "#CM9805",
    user: "Andi Lane",
    project: "App Landing Page",
    address: "Nest Lane Olivette",
    date: "Feb 2, 2023",
    status: "Rejected",
    icon: Contact4,
  },
  {
    orderId: "#CM9801",
    user: "Natali Craig",
    project: "Landing Page",
    address: "Meadow Lane Oakland",
    date: "Just now",
    status: "In Progress",
    icon: Contact1,
  },
  {
    orderId: "#CM9802",
    user: "Kate Morrison",
    project: "CRM Admin pages",
    address: "Larry San Francisco",
    date: "A minute ago",
    status: "Complete",
    icon: Contact5,
  },
  {
    orderId: "#CM9803",
    user: "Drew Cano",
    project: "Client Project",
    address: "Bagwell Avenue Ocala",
    date: "1 hour ago",
    status: "Pending",
    icon: Contact2,
  },
  {
    orderId: "#CM9804",
    user: "Orlando Diggs",
    project: "Admin Dashboard",
    address: "Washburn Baton Rouge",
    date: "Yesterday",
    status: "Approved",
    icon: Contact3,
  },
  {
    orderId: "#CM9805",
    user: "Andi Lane",
    project: "App Landing Page",
    address: "Nest Lane Olivette",
    date: "Feb 2, 2023",
    status: "Rejected",
    icon: Contact4,
  },
  {
    orderId: "#CM9801",
    user: "Natali Craig",
    project: "Landing Page",
    address: "Meadow Lane Oakland",
    date: "Just now",
    status: "In Progress",
    icon: Contact1,
  },
  {
    orderId: "#CM9802",
    user: "Kate Morrison",
    project: "CRM Admin pages",
    address: "Larry San Francisco",
    date: "A minute ago",
    status: "Complete",
    icon: Contact5,
  },
  {
    orderId: "#CM9803",
    user: "Drew Cano",
    project: "Client Project",
    address: "Bagwell Avenue Ocala",
    date: "1 hour ago",
    status: "Pending",
    icon: Contact2,
  },
  {
    orderId: "#CM9804",
    user: "Orlando Diggs",
    project: "Admin Dashboard",
    address: "Washburn Baton Rouge",
    date: "Yesterday",
    status: "Approved",
    icon: Contact3,
  },
  {
    orderId: "#CM9805",
    user: "Andi Lane",
    project: "App Landing Page",
    address: "Nest Lane Olivette",
    date: "Feb 2, 2023",
    status: "Rejected",
    icon: Contact4,
  },
  {
    orderId: "#CM9802",
    user: "Kate Morrison",
    project: "CRM Admin pages",
    address: "Larry San Francisco",
    date: "A minute ago",
    status: "Complete",
    icon: Contact5,
  },
  {
    orderId: "#CM9803",
    user: "Drew Cano",
    project: "Client Project",
    address: "Bagwell Avenue Ocala",
    date: "1 hour ago",
    status: "Pending",
    icon: Contact2,
  },
  {
    orderId: "#CM9804",
    user: "Orlando Diggs",
    project: "Admin Dashboard",
    address: "Washburn Baton Rouge",
    date: "Yesterday",
    status: "Approved",
    icon: Contact3,
  },
  {
    orderId: "#CM9805",
    user: "Andi Lane",
    project: "App Landing Page",
    address: "Nest Lane Olivette",
    date: "Feb 2, 2023",
    status: "Rejected",
    icon: Contact4,
  },
  {
    orderId: "#CM9801",
    user: "Natali Craig",
    project: "Landing Page",
    address: "Meadow Lane Oakland",
    date: "Just now",
    status: "In Progress",
    icon: Contact1,
  },{
    orderId: "#CM9801",
    user: "Natali Craig",
    project: "Landing Page",
    address: "Meadow Lane Oakland",
    date: "Just now",
    status: "In Progress",
    icon: Contact1,
  },
  {
    orderId: "#CM9802",
    user: "Kate Morrison",
    project: "CRM Admin pages",
    address: "Larry San Francisco",
    date: "A minute ago",
    status: "Complete",
    icon: Contact5,
  },
  {
    orderId: "#CM9803",
    user: "Drew Cano",
    project: "Client Project",
    address: "Bagwell Avenue Ocala",
    date: "1 hour ago",
    status: "Pending",
    icon: Contact2,
  },
  {
    orderId: "#CM9804",
    user: "Orlando Diggs",
    project: "Admin Dashboard",
    address: "Washburn Baton Rouge",
    date: "Yesterday",
    status: "Approved",
    icon: Contact3,
  },
  {
    orderId: "#CM9805",
    user: "Andi Lane",
    project: "App Landing Page",
    address: "Nest Lane Olivette",
    date: "Feb 2, 2023",
    status: "Rejected",
    icon: Contact4,
  },
];


export const status = {
  "In Progress": "inprogress",
  'Approved': "approved",
  "Rejected": "rejected",
  "Pending": "pending",
  "Complete": "complete",
}as const;
