import FooterSection from "./FooterSection";
import FooterSocialLinks from "./FooterSocialLinks";
import { Container } from "@/components";

const Footer: React.FC = () => {
  return (
    <>
      <Container className="bg-base-300">
        <footer className="footer text-base-content p-10">
          <FooterSection
            title="Services"
            items={[
              { text: "Branding", href: "/branding" },
              { text: "Design", href: "/design" },
              { text: "Marketing", href: "/marketing" },
              { text: "Advertisement", href: "/advertisement" },
            ]}
          />

          <FooterSection
            title="Company"
            items={[
              { text: "About us", href: "/About us" },
              { text: "Contact", href: "/Contact" },
              { text: "Jobs", href: "/Jobs" },
            ]}
          />

          <FooterSocialLinks />
        </footer>
      </Container>
      <p className="footer footer-center bg-base-200 text-base-content py-4">
        Copyright © {new Date().getFullYear()} - All right reserved by ISF
        Faisalabad
      </p>
    </>
  );
};

// const Footer1: React.FC = () => {
//   return (
//     <footer className="relative overflow-hidden py-10 bg-gray-400 border border-t-2 border-t-black">
//       <div className="relative z-10 mx-auto max-w-7xl px-4">
//         <div className="-m-6 flex flex-wrap">
//           <div className="w-full p-6 md:w-1/2 lg:w-5/12">
//             <div className="flex h-full flex-col justify-between">
//               <div className="mb-4 inline-flex items-center">
//                 <Logo />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">
//                   &copy; Copyright 2024. All Rights Reserved by DevUI.
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="w-full p-6 md:w-1/2 lg:w-2/12">
//             <div className="h-full">
//               <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-gray-500">
//                 Company
//               </h3>
//               <ul>
//                 <li className="mb-4">
//                   <Link
//                     href={"/"}
//                     className="text-base font-medium text-gray-900 hover:text-gray-700"
//                   >
//                     Features
//                   </Link>
//                 </li>
//                 <li className="mb-4">
//                   <Link
//                     href={"/"}
//                     className="text-base font-medium text-gray-900 hover:text-gray-700"
//                   >
//                     Pricing
//                   </Link>
//                 </li>
//                 <li className="mb-4">
//                   <Link
//                     href={"/"}
//                     className="text-base font-medium text-gray-900 hover:text-gray-700"
//                   >
//                     Affiliate Programs
//                   </Link>
//                 </li>
//                 <li className="mb-4">
//                   <Link
//                     href={"/"}
//                     className="text-base font-medium text-gray-900 hover:text-gray-700"
//                   >
//                     Press Kit
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className="w-full p-6 md:w-1/2 lg:w-2/12">
//             <div className="w-full">
//               <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-gray-500">
//                 Support
//               </h3>
//               <ul>
//                 <li className="mb-4">
//                   <Link
//                     href={"/"}
//                     className="text-base font-medium text-gray-900 hover:text-gray-700"
//                   >
//                     Account
//                   </Link>
//                 </li>
//                 <li className="mb-4">
//                   <Link
//                     href={"/"}
//                     className="text-base font-medium text-gray-900 hover:text-gray-700"
//                   >
//                     Help
//                   </Link>
//                 </li>
//                 <li className="mb-4">
//                   <Link
//                     href={"/"}
//                     className="text-base font-medium text-gray-900 hover:text-gray-700"
//                   >
//                     Contact Us
//                   </Link>
//                 </li>
//                 <li className="mb-4">
//                   <Link
//                     href={"/"}
//                     className="text-base font-medium text-gray-900 hover:text-gray-700"
//                   >
//                     Customer Support
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className="w-full p-6 md:w-1/2 lg:w-3/12">
//             <div className="h-full">
//               <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-gray-500">
//                 Legals
//               </h3>
//               <ul>
//                 <li className="mb-4">
//                   <Link
//                     href={"/"}
//                     className="text-base font-medium text-gray-900 hover:text-gray-700"
//                   >
//                     Terms &amp; Conditions
//                   </Link>
//                 </li>
//                 <li className="mb-4">
//                   <Link
//                     href={"/"}
//                     className="text-base font-medium text-gray-900 hover:text-gray-700"
//                   >
//                     Privacy Policy
//                   </Link>
//                 </li>
//                 <li className="mb-4">
//                   <Link
//                     href={"/"}
//                     className="text-base font-medium text-gray-900 hover:text-gray-700"
//                   >
//                     Licensing
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

export default Footer;
