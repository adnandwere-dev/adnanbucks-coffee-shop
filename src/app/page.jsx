"use client";

import React from "react";

import HeroSection from "@/components/home-page/HeroSection";
import FeaturedDrinks from "@/components/home-page/FeaturedDrinks";
import PopularBakery from "@/components/home-page/PopularBakery";
import StorySection from "@/components/home-page/StorySection";
import ValuesSection from "@/components/home-page/ValuesSection";
// ==========================================
// 1. قسم الواجهة الرئيسية (Hero Section)
// ==========================================


// ==========================================
// 2. قسم المشروبات المميزة (Featured Drinks)
// ==========================================


// ==========================================
// 3. قسم المخبوزات (Popular Bakery)
// ==========================================


// ==========================================
// 4. قسم قصة العلامة التجارية (Story)
// ==========================================


// ==========================================
// 5. قسم القيم (Values Section)
// ==========================================


// ==========================================
// الصفحة الرئيسية الجامعة لجميع الأقسام
// ==========================================
export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedDrinks />
      <PopularBakery />
      <StorySection />
      <ValuesSection />
    </>
  );
}
