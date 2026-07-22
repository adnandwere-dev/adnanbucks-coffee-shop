"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // في صفحة الدفع، يظهر تذييل مبسط فقط لتقليل التشتت
  if (pathname === "/checkout") {
    return (
      <footer className="w-full py-6 bg-surface border-t border-outline-variant/30 mt-auto transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center font-body text-xs text-outline">
          © 2024 AdnanBucks Artisanal Roastery. Secure Checkout.
        </div>
      </footer>
    );
  }

  // التذييل الكامل لبقية الصفحات
  return (
    <footer className="bg-surface-container-low text-on-surface w-full py-12 mt-auto border-t border-outline-variant/30 transition-colors duration-300">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* معلومات العلامة التجارية */}
        <div className="col-span-1">
          <div className="font-headline text-2xl text-primary mb-4 font-bold tracking-tight">
            AdnanBucks
          </div>
          <p className="font-body text-sm text-on-surface-variant leading-relaxed">
            © 2024 AdnanBucks Artisanal Roastery.
            <br />
            All rights reserved.
          </p>
        </div>

        {/* روابط الشركة */}
        <div className="flex flex-col space-y-3 font-body text-sm">
          <span className="font-bold text-on-surface mb-1">Company</span>
          <Link href="#" className="text-on-surface-variant hover:text-primary transition-colors">Our Story</Link>
          <Link href="#" className="text-on-surface-variant hover:text-primary transition-colors">Sustainability</Link>
          <Link href="#" className="text-on-surface-variant hover:text-primary transition-colors">Careers</Link>
        </div>

        {/* روابط العملاء */}
        <div className="flex flex-col space-y-3 font-body text-sm">
          <span className="font-bold text-on-surface mb-1">Customers</span>
          <Link href="#" className="text-on-surface-variant hover:text-primary transition-colors">Locations</Link>
          <Link href="#" className="text-on-surface-variant hover:text-primary transition-colors">Gift Cards</Link>
          <Link href="#" className="text-on-surface-variant hover:text-primary transition-colors">Loyalty Program</Link>
        </div>

        {/* روابط قانونية */}
        <div className="flex flex-col space-y-3 font-body text-sm">
          <span className="font-bold text-on-surface mb-1">Legal</span>
          <Link href="#" className="text-on-surface-variant hover:text-primary transition-colors">Privacy Policy</Link>
          <Link href="#" className="text-on-surface-variant hover:text-primary transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
