import Footer from "@/components/layout/Footer";
import LandingHeader from "@/components/layout/LandingHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import {
  Brain,
  ChartColumnDecreasing,
  ClockArrowUp,
  Dock,
  Gamepad2,
  GraduationCap,
  School,
  ShieldCheck,
  Sparkles,
  UserRoundPen,
  WalletCards,
} from "lucide-react";
import Image from "next/image";

export default function page() {
  return (
    <>
      <LandingHeader />
      <main>
        <section className="width-container relative min-h-screen flex items-center">
          <Brain
            size={700}
            strokeWidth={0.75}
            color="#fdceaf"
            className="absolute -z-10 top-20 -right-[300px]"
          />
          <div className="absolute bottom-20 right-4 rounded-lg overflow-clip">
            <Image
              src="/icons/spain-flag-96x96.png"
              height={66}
              width={66}
              alt="spain flag"
            />
          </div>
          <div className="width-inner w-full">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-6 relative w-fit">
                <h1 className="text-7xl sm:text-8xl font-bold tracking-tight">
                  Better
                  <br />
                  Spanish
                </h1>
                <p className="text-lg font-medium max-w-prose text-neutral-600">
                  Become Fluent Faster with the Power of High-Frequency Words
                </p>
                <Badge
                  variant="outline"
                  className="text-green-600 absolute -top-8 left-0">
                  New Features
                </Badge>
              </div>
              <LoginLink className={cn(buttonVariants(), "w-fit")}>
                Get Started
              </LoginLink>
            </div>
          </div>
        </section>

        <section className="width-container my-20">
          <div className="width-inner relative">
            <h2 className="text-center mb-10 font-bold text-2xl">Why Us?</h2>
            <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-transparent to-white/50"></div>
            <div className="flex justify-center gap-4 flex-wrap">
              <Badge
                className={cn(
                  badgeVariants({ variant: "secondary" }),
                  "text-md px-4 py-2"
                )}>
                <ShieldCheck size={32} strokeWidth={1} className="mr-2" />
                Daily Challenges
              </Badge>
              <Badge
                className={cn(
                  badgeVariants({ variant: "secondary" }),
                  "text-md px-4 py-2"
                )}>
                <ChartColumnDecreasing
                  size={32}
                  strokeWidth={1}
                  className="mr-2"
                />
                Track Your Progress
              </Badge>
              <Badge
                className={cn(
                  badgeVariants({ variant: "secondary" }),
                  "text-md px-4 py-2"
                )}>
                <UserRoundPen size={32} strokeWidth={1} className="mr-2" />
                Personalized Learning
              </Badge>
              <Badge
                className={cn(
                  badgeVariants({ variant: "secondary" }),
                  "text-md px-4 py-2"
                )}>
                <WalletCards size={32} strokeWidth={1} className="mr-2" />
                Flashcards
              </Badge>
              <Badge
                className={cn(
                  badgeVariants({ variant: "secondary" }),
                  "text-md px-4 py-2"
                )}>
                <Sparkles size={32} strokeWidth={1} className="mr-2" />
                Updated Content
              </Badge>
              <Badge
                className={cn(
                  badgeVariants({ variant: "secondary" }),
                  "text-md px-4 py-2"
                )}>
                <Gamepad2 size={32} strokeWidth={1} className="mr-2" />
                Interactive Games
              </Badge>
            </div>
          </div>
        </section>

        <section className="width-container relative my-44 md:my-64">
          <School
            size={500}
            color="#fff6f0"
            strokeWidth={0.75}
            className="hidden lg:block absolute -z-10 -top-44 -right-[150px]"
          />
          <GraduationCap
            size={500}
            color="#fff6f0"
            strokeWidth={0.75}
            className="hidden lg:block absolute -z-10 -bottom-64 -left-[150px]"
          />
          <div className="width-inner flex flex-col gap-44">
            <div className="flex flex-col gap-20 lg:flex-row items-center lg:gap-32">
              <div className="relative">
                <Dock size={300} strokeWidth={0.75} />
                <Dock
                  size={300}
                  color="#fdceaf"
                  strokeWidth={0.75}
                  className="absolute top-3 left-3 -z-10"
                />
              </div>
              <div>
                <h2 className="font-bold text-4xl tracking-tight max-w-prose mb-5">
                  Reach Fluency Faster
                </h2>
                <p className="font-normal text-lg text-neutral-600 max-w-prose">
                  Our app focuses on real-world situations, not just vocabulary.
                  You'll learn words that you'll actually use when speaking with
                  native Spanish speakers, so you'll be ready to engage in
                  meaningful conversations.
                </p>
              </div>
            </div>
            <div className="flex flex-col-reverse gap-20 lg:flex-row items-center lg:gap-32">
              <div>
                <h2 className="font-bold text-4xl tracking-tight max-w-prose mb-5">
                  Save Time Learning
                </h2>
                <p className="font-normal text-lg text-neutral-600 max-w-prose">
                  Studies show that learning the 100 most common words in any
                  language covers over 50% of everyday conversations. That's why
                  we've built our app to help you focus on the{" "}
                  <span className="font-medium">high-frequency words</span> that
                  will boost your fluency.
                </p>
              </div>
              <div className="relative">
                <ClockArrowUp size={300} strokeWidth={0.75} />
                <ClockArrowUp
                  size={300}
                  color="#fdceaf"
                  strokeWidth={0.75}
                  className="absolute top-3 left-3 -z-10"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="width-container my-20">
          <div className="width-inner">
            <Accordion
              type="single"
              collapsible
              className="mx-auto max-w-screen-lg">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it beginner-friendly?</AccordionTrigger>
                <AccordionContent>
                  Absolutely! Our app is designed for learners of all levels,
                  including complete beginners. We start with the{" "}
                  <span className="font-medium">
                    most essential words and phrases
                  </span>
                  , gradually helping you build confidence and fluency with
                  real-world examples.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Can I cancel anytime?</AccordionTrigger>
                <AccordionContent>
                  Yes! There are{" "}
                  <span className="font-medium">no long-term commitments</span>.
                  You can cancel your subscription anytime directly from your
                  account settings, and you won't be charged for the next
                  billing cycle.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Is there a free tier?</AccordionTrigger>
                <AccordionContent>
                  Yes! You can start learning Spanish{" "}
                  <span className="font-medium">for free</span> with our basic
                  plan, which includes access to high-frequency words,
                  interactive exercises, and daily practice challenges. Upgrade
                  anytime for more advanced features and personalized learning
                  tools!
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
