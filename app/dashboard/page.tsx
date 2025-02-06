import Link from "next/link";
import {
  ArrowUpNarrowWide,
  Brain,
  Gamepad2,
  GraduationCap,
  Swords,
  TrendingUp,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getOrCreateUser } from "@/lib/getOrCreateUser";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Home() {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();

  // use kinde user id to lookup user in db or create one if it doesn't exist
  await getOrCreateUser(kindeUser);

  return (
    <div className="width-container mb-36">
      <div className="width-inner py-20">
        <Brain
          size={500}
          strokeWidth={0.75}
          color="#fff3eb"
          className="absolute -z-10 -top-20 -right-[100px]"
        />
        <h1 className="text-5xl sm:text-6xl tracking-tight font-semibold max-w-[700px]">
          Master High-Frequency Words
        </h1>
      </div>

      {/* stats */}

      <div className="width-inner flex gap-2 sm:gap-4">
        <Card className="w-[350px] p-2 sm:p-4 flex flex-col gap-1">
          <span className="flex justify-between">
            <span className="text-sm sm:text-base">
              <span className="hidden sm:inline">Weekly </span>Score
            </span>
            <ArrowUpNarrowWide
              size={22}
              strokeWidth={1}
              className="hidden sm:block"
            />
          </span>
          <span className="text-3xl sm:text-5xl font-semibold">203</span>
          <span className="text-sm font-light mt-auto hidden sm:block">
            +12.5% from last week
          </span>
        </Card>
        <Card className="w-[350px] p-2 sm:p-4 flex flex-col gap-1">
          <span className="flex justify-between">
            <span className="text-sm sm:text-base">
              <span className="hidden sm:inline">Daily </span>Streak
            </span>
            <TrendingUp size={22} strokeWidth={1} className="hidden sm:block" />
          </span>
          <span className="text-3xl sm:text-5xl font-semibold">4</span>
          <span className="text-sm font-light mt-auto hidden sm:block">
            Days
          </span>
        </Card>
        <Card className="w-[350px] p-2 sm:p-4 flex flex-col gap-1">
          <span className="flex justify-between">
            <span className="text-sm sm:text-base">Finished</span>
            <Swords size={22} strokeWidth={1} className="hidden sm:block" />
          </span>
          <span className="text-3xl sm:text-5xl font-semibold">88</span>
          <span className="text-sm font-light mt-auto hidden sm:block">
            Games
          </span>
        </Card>
      </div>

      {/* games */}

      <div className="width-inner my-20 sm:my-32">
        <div className="mb-5 flex gap-4">
          <h2 className="text-2xl font-semibold">Games</h2>
          <Badge variant="outline" className="text-green-600">
            New Games Added
          </Badge>
        </div>

        <div className="flex gap-4 pb-6 overflow-x-scroll">
          <Card className="relative overflow-clip min-w-[230px] w-[350px] p-4 flex flex-col gap-4">
            <Gamepad2
              size={200}
              color="#fff3eb"
              strokeWidth={2}
              className="absolute -z-0 -right-10 top-6"
            />
            <span className="flex justify-between z-10">
              <span className="text-lg font-semibold">Flashcards</span>
              <Link
                className={buttonVariants()}
                href="/dashboard/games/flashcards">
                Start
              </Link>
            </span>
            <span className="text-sm font-light z-10">
              Helpful keywords for everyday speaking
            </span>
            <span className="mt-auto flex gap-2 z-10">
              <Badge variant="outline" className="bg-white">
                Flashcards
              </Badge>
              <Badge variant="outline" className="bg-white">
                Spaced Repatition
              </Badge>
            </span>
          </Card>

          <Card className="relative overflow-clip min-w-[230px] w-[350px] p-4 flex flex-col gap-4">
            <Gamepad2
              size={200}
              color="#fff3eb"
              strokeWidth={2}
              className="absolute -z-0 -right-10 top-6"
            />
            <span className="flex justify-between z-10">
              <span className="text-lg font-semibold">Word Guess</span>
              <Link
                className={buttonVariants()}
                href="/dashboard/games/multi-choice">
                Start
              </Link>
            </span>
            <span className="text-sm font-light z-10">
              Date and time related spanish words
            </span>
            <span className="mt-auto flex gap-2 z-10">
              <Badge variant="outline" className="bg-white">
                Multi-choice
              </Badge>
            </span>
          </Card>

          <Card className="relative overflow-clip min-w-[230px] w-[350px] p-4 flex flex-col gap-4">
            <Gamepad2
              size={200}
              color="#fff3eb"
              strokeWidth={2}
              className="absolute -z-0 -right-10 top-6"
            />
            <span className="flex justify-between z-10">
              <span className="text-lg font-semibold">Verb Conjugations</span>
              <Link className={buttonVariants()} href="/dashboard/games/verbs">
                Start
              </Link>
            </span>
            <span className="text-sm font-light z-10">
              Helpful keywords for everyday speaking
            </span>
            <span className="mt-auto flex gap-2 z-10">
              <Badge variant="outline" className="bg-white">
                Verbs
              </Badge>
              <Badge variant="outline" className="bg-white">
                Word Input
              </Badge>
            </span>
          </Card>
        </div>
      </div>

      {/* learning container */}

      <div className="width-inner my-20 sm:my-32">
        <div className="mb-5 flex gap-4">
          <h2 className="text-2xl font-semibold">Learning</h2>
          <Badge variant="outline" className="text-green-600">
            New Material
          </Badge>
        </div>

        <div className="flex gap-4 pb-6 overflow-x-scroll">
          <Card className="relative overflow-clip min-w-[230px] w-[350px] p-4 flex flex-col gap-4">
            <GraduationCap
              size={180}
              color="#fff3eb"
              strokeWidth={2}
              className="absolute -z-0 -right-10 top-4"
            />
            <span className="flex justify-between z-10">
              <span className="text-lg font-semibold">Cheat Sheets</span>
              <Link
                className={buttonVariants()}
                href="/dashboard/learning/cheat-sheets">
                Start
              </Link>
            </span>
            <span className="text-sm font-light z-10">
              Helpful keywords for everyday speaking
            </span>
            <span className="mt-auto flex gap-2 z-10">
              <Badge variant="outline" className="bg-white">
                Multi-choice
              </Badge>
              <Badge variant="outline" className="bg-white">
                Word Input
              </Badge>
            </span>
          </Card>

          <Card className="relative overflow-clip min-w-[230px] w-[350px] p-4 flex flex-col gap-4">
            <GraduationCap
              size={180}
              color="#fff3eb"
              strokeWidth={2}
              className="absolute -z-0 -right-10 top-4"
            />
            <span className="flex justify-between z-10">
              <span className="text-lg font-semibold">Top 100</span>
              <Link
                className={buttonVariants()}
                href="/dashboard/learning/top-100">
                Start
              </Link>
            </span>
            <span className="text-sm font-light z-10">
              Helpful keywords for everyday speaking
            </span>
            <span className="mt-auto flex gap-2 z-10">
              <Badge variant="outline" className="bg-white">
                Multi-choice
              </Badge>
              <Badge variant="outline" className="bg-white">
                Word Input
              </Badge>
            </span>
          </Card>

          <Card className="relative overflow-clip min-w-[230px] w-[350px] p-4 flex flex-col gap-4">
            <GraduationCap
              size={180}
              color="#fff3eb"
              strokeWidth={2}
              className="absolute -z-0 -right-10 top-4"
            />
            <span className="flex justify-between z-10">
              <span className="text-lg font-semibold">Verb Conjugations</span>
              <Link
                className={buttonVariants()}
                href="/dashboard/learing/verb-conjugations">
                Start
              </Link>
            </span>
            <span className="text-sm font-light z-10">
              Date and time related spanish words
            </span>
            <span className="mt-auto flex gap-2 z-10">
              <Badge variant="outline" className="bg-white">
                Multi-choice
              </Badge>
              <Badge variant="outline" className="bg-white">
                Word Input
              </Badge>
            </span>
          </Card>
        </div>
      </div>
    </div>
  );
}
