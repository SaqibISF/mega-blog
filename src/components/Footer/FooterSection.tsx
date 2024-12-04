import Link from "next/link";
import React from "react";

const FooterSection: React.FC<{
  title: string;
  items: { text: string; href: string }[];
}> = ({ title, items }) => {
  return (
    <nav>
      <h6 className="footer-title">{title}</h6>
      {items.map((item) => (
        <Link key={item.href} href={item.href} className="link link-hover">
          {item.text}
        </Link>
      ))}
    </nav>
  );
};

export default FooterSection;
