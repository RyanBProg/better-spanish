"use client";

import { useState } from "react";
import CookiePolicy from "./_components/CookiePolicy";
import PrivacyPolicy from "./_components/PrivacyPolicy";
import Footer from "@/components/layout/Footer";
import LandingHeader from "@/components/layout/LandingHeader";

type Tabs = "cookie" | "privacy";

export default function Page() {
  const [activeTab, setActiveTab] = useState<Tabs>("privacy");

  return (
    <>
      <LandingHeader />
      <main>
        <div className="px-5 sm:px-10 py-20">
          <div className="container max-w-2xl  mx-auto">
            <h1 className="text-3xl font-bold mb-10 text-center">
              Better Spanish Policies
            </h1>
            <ul className="flex flex-wrap text-sm font-medium text-center border-b border-neutral-300">
              <li className="me-2">
                <button
                  onClick={() => setActiveTab("cookie")}
                  className={`inline-block p-4 text-primary-content rounded-t-lg transition-colors ${
                    activeTab === "cookie" ? "bg-neutral-300" : "bg-base-100"
                  }`}>
                  Cookies
                </button>
              </li>
              <li className="me-2">
                <button
                  onClick={() => setActiveTab("privacy")}
                  aria-current="page"
                  className={`inline-block p-4 text-primary-content rounded-t-lg transition-colors ${
                    activeTab === "privacy" ? "bg-neutral-300" : "bg-base-100"
                  }`}>
                  Privacy Policy
                </button>
              </li>
            </ul>
            {activeTab === "cookie" && <CookiePolicy />}
            {activeTab === "privacy" && <PrivacyPolicy />}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
