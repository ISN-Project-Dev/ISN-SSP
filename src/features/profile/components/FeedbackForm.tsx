"use client";

import { useActionState, useState, useTransition } from "react";
import { submitFeedback } from "../servers/submitFeedbackAction";
import { Button } from "@/components/ui/button";
import TextareaField from "@/components/common/TextareaField";
import { Star } from "lucide-react";

type FeedbackFormProps = {
  eventId: string;
  eventRegistrationId: string;
  initialData?: {
    rating?: number;
    comment?: string;
  };
};

const FeedbackForm = ({
  eventId,
  eventRegistrationId,
  initialData,
}: FeedbackFormProps) => {
  const [rating, setRating] = useState(initialData?.rating ?? 0);
  const [hover, setHover] = useState<number | null>(null);
  const [state, formAction] = useActionState(
    async (_prev: any, formData: FormData) => {
      return await submitFeedback(_prev, formData);
    },
    undefined
  );

  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    if (rating) formData.set("rating", String(rating));

    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="eventId" value={eventId} />
      <input type="hidden" name="eventRegistrationId" value={eventRegistrationId} />
      <div className="space-y-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Rating
          </label>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(null)}
                className="focus:outline-none"
              >
                <Star
                  className={`h-8 w-8 transition-colors ${(hover || rating) >= star
                      ? "text-yellow-300 fill-yellow-300"
                      : "text-gray-300"
                    }`}
                />
              </button>
            ))}
            {rating > 0 && (
              <span className="pl-5 text-sm text-gray-500">
                {rating}/5 stars
              </span>
            )}
          </div>
          {state?.ratingError && (<p className="text-sm text-red-700 mt-1">{state.ratingError}</p>)}
        </div>
        <TextareaField
          label="Feedback"
          name="comment"
          rows={4}
          defaultValue={state?.fieldData?.comment ?? initialData?.comment ?? ""}
          error={state?.commentError}
          placeholder="Write your feedback here..."
        />
        <Button
          type="submit"
          disabled={isPending}
          className="mx-auto block rounded-lg bg-[#192f59] text-white hover:bg-[#2f4369] focus:ring-1 focus:ring-[#2f4369] focus:ring-offset-1"
        >
          {isPending ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default FeedbackForm;
