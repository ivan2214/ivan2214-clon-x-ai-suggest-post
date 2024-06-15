import { SidebarOption } from "./types";
import {
  ArcticonsYahooMail,
  CarbonPortfolio,
  ClarityDollarBillLine,
  HugeiconsArtificialIntelligence06,
  MaterialSymbolsBookmarkOutline,
  MaterialSymbolsLightHome,
  MaterialSymbolsNotificationsOutline,
  MaterialSymbolsPerson,
  MaterialSymbolsSearch,
  PhUsers,
  PrimeTwitter,
  RiAdvertisementFill,
  RiSettings5Fill,
  SolarPodcastBold,
  StreamlineInterfaceFileClipboardWorkPlainClipboardTaskListCompanyOffice,
  StreamlineInterfaceSettingMenuHorizontalCircleNavigationDotsThreeCircleButtonHorizontalMenu,
} from "@components/icons/icons";

export const sidebarOptions: SidebarOption[] = [
  {
    name: "Home",
    href: "/",
    icon: MaterialSymbolsLightHome,
  },
  {
    name: "Explore",
    href: "/explore",
    icon: MaterialSymbolsSearch,
  },
  {
    name: "Notifications",
    href: "/notifications",
    icon: MaterialSymbolsNotificationsOutline,
  },
  {
    name: "Messages",
    href: "/messages",
    icon: ArcticonsYahooMail,
  },
  {
    name: "Grok",
    href: "/grok",
    icon: HugeiconsArtificialIntelligence06,
  },
  {
    name: "communities",
    href: "/communities",
    icon: PhUsers,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: MaterialSymbolsPerson,
  },
  {
    name: "Moreoptions",
    popover: true,
    popoverOptions: [
      {
        name: "Lists",
        href: "/lists",
        icon: StreamlineInterfaceFileClipboardWorkPlainClipboardTaskListCompanyOffice,
      },
      {
        name: "Premium",
        href: "/premium",
        icon: PrimeTwitter,
      },
      {
        name: "Saved",
        href: "/saved",
        icon: MaterialSymbolsBookmarkOutline,
      },
      {
        name: "Monetization",
        href: "/monetization",
        icon: ClarityDollarBillLine,
      },
      {
        name: "Advertisements",
        href: "/advertisements",
        icon: RiAdvertisementFill,
      },
      {
        name: "Works",
        href: "/works",
        icon: CarbonPortfolio,
      },
      {
        name: "Spaces",
        href: "/create-your-space",
        icon: SolarPodcastBold,
      },
      {
        name: "settings",
        href: "/settings-and-privacy",
        icon: RiSettings5Fill,
      },
    ],
    icon: StreamlineInterfaceSettingMenuHorizontalCircleNavigationDotsThreeCircleButtonHorizontalMenu,
  },
  {
    name: "Accounts",
    popover: true,
    popoverOptions: [
      {
        name: "Add existing account",
        href: "/add-existing-account",
      },
      {
        name: "Manage accounts",
        href: "/manage-accounts",
      },
      {
        name: "Logout",
        href: "/logout",
      },
    ],
    icon: MaterialSymbolsPerson,
  },
];
