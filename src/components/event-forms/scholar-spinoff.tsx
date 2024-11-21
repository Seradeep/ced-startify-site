import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { apiCreateScholarSpinOffProject } from "@/api/events";
import {
  FormStepper,
  FormLayout,
  TextInput,
  TextareaInput,
  FormActions,
} from "@/components/ui/form-components";
import { TypographyP } from "@/components/ui/typography";

const formSchema = z.object({
  scholarName: z.string().min(2, { message: "Scholar name is required." }),
  scholarEmail: z.string().email({ message: "Invalid email address." }),
  scholarPhone: z.string().min(10, { message: "Invalid phone number." }),
  university: z.string().min(2, { message: "University name is required." }),
  institution: z.string().min(2, { message: "Institution name is required." }),
  institutionDistrict: z.string().min(2, { message: "District is required." }),
  department: z.string().min(2, { message: "Department is required." }),
  areaOfResearch: z
    .string()
    .min(2, { message: "Area of research is required." }),
  sdg: z.string().min(2, { message: "Sustainable Development Goal is required." }),
  researchProblem: z
    .string()
    .max(1000, { message: "Research problem should not exceed 100 words." }),
  solution: z
    .string()
    .max(1000, { message: "Solution should not exceed 100 words." }),
  trlLevel: z.string().min(1, { message: "TRL level is required." }),
});

export type FormValues = z.infer<typeof formSchema>;

export default function ScholarSpinOffForm({
  onPaymentBtnOpen,
}: {
  onPaymentBtnOpen: (value: boolean) => void;
}) {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const nextStep = async () => {
    const fields = getFieldsForStep(step);
    const isValid = await form.trigger(fields);
    if (isValid) {
      setStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const getFieldsForStep = (step: number): (keyof FormValues)[] => {
    switch (step) {
      case 1:
        return [
          "scholarName",
          "scholarEmail",
          "scholarPhone",
          "university",
          "institution",
        ];
      case 2:
        return ["institutionDistrict", "department", "areaOfResearch", "sdg"];
      case 3:
        return ["researchProblem", "solution", "trlLevel"];
      default:
        return [];
    }
  };

  function handleSubmit(paymentId: string) {
    toast.promise(
      apiCreateScholarSpinOffProject({
        paymentId,
        ...form.getValues(),
      }),
      {
        loading: "Submitting...",
        success: () => {
          window.location.reload();
          return "Application submitted successfully!!";
        },
        error: () => "Failed to submit your application",
      }
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-2">
        Scholar's Spin-Off Application
      </h1>
      <TypographyP className="!mt-0 mb-4">
        You need to pay Rs.625/-(including all taxes) at the time of submission
        of your applications
      </TypographyP>
      <FormStepper currentStep={step} totalSteps={totalSteps} />

      <FormLayout form={form}>
        {step === 1 && (
          <div className="space-y-4">
            <TextInput
              name="scholarName"
              label="Scholar Name"
              placeholder="Enter your full name"
            />
            <TextInput
              name="scholarEmail"
              label="Scholar Email ID"
              placeholder="Enter your email address"
            />
            <TextInput
              name="scholarPhone"
              label="Scholar Phone Number"
              placeholder="Enter your phone number"
            />
            <TextInput
              name="university"
              label="University"
              placeholder="Enter your university name"
            />
            <TextInput
              name="institution"
              label="Institution"
              placeholder="Enter your institution name"
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <TextInput
              name="institutionDistrict"
              label="Institution District"
              placeholder="Enter your institution's district"
            />
            <TextInput
              name="department"
              label="Department"
              placeholder="Enter your department"
            />
            <TextInput
              name="areaOfResearch"
              label="Area of Research"
              placeholder="Enter your area of research"
            />
            <TextInput
              name="sdg"
              label="Under which SDG does your Idea Apply to?"
              placeholder="Enter the relevant SDG"
            />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <TextareaInput
              name="researchProblem"
              label="Research Problem (Not more than 100 words)"
              placeholder="Describe your research problem"
            />
            <TextareaInput
              name="solution"
              label="Solution and Proof of Concept (Not more than 100 words)"
              placeholder="Describe your solution and proof of concept"
            />
            <TextInput
              name="trlLevel"
              label="TRL Level"
              placeholder="Enter the TRL level"
            />
          </div>
        )}

        <FormActions
          currentStep={step}
          totalSteps={totalSteps}
          onPrevious={prevStep}
          onNext={nextStep}
          onOpen={onPaymentBtnOpen}
          callbackFn={handleSubmit}
          event={{
            amount: "625",
            name: "Scholar's Spin-Off",
          }}
        />
      </FormLayout>
    </div>
  );
}
