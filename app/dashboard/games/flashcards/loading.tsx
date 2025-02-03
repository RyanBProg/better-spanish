import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Loading() {
  return (
    <div className="my-10 sm:my-20">
      <h1 className="text-center mb-10 font-bold text-4xl">Flashcards</h1>
      <div className="mx-auto w-fit mb-12 sm:mb-20">
        <Select disabled={true}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
        </Select>
      </div>

      <div className="mt-20 sm:mt-44 flex justify-center items-center">
        <LoadingSpinner size="lg" />
      </div>
    </div>
  );
}
