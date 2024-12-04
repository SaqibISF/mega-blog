import SVGIcon, { facebookIcon, linkedInIcon, twitterIcon } from "@/icons";
import Link from "next/link";
import React from "react";

const FooterSocialLinks: React.FC = () => {
  return (
    <nav>
      <h6 className="footer-title">Social</h6>
      <div className="grid grid-flow-col gap-4">
        <Link href="https://facebook.com/MSaqibAliISF" target="_blank">
          <SVGIcon icon={facebookIcon} size="1.5em" />
        </Link>
        <Link href="https://x.com/Saqib_ISF" target="_blank">
          <SVGIcon icon={twitterIcon} size="1.5em" />
        </Link>
        <Link href="https://linkedin.com/SaqibISF" target="_blank">
          <SVGIcon icon={linkedInIcon} size="1.5em" />
        </Link>
      </div>
    </nav>
  );
};

export default FooterSocialLinks;
