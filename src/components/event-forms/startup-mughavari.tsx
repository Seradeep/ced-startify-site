"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  FormStepper,
  FormLayout,
  TextInput,
  TextareaInput,
  RadioInput,
  FormActions,
  MemberDetails,
  InfiniteMemberDetails,
} from "@/components/ui/form-components";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { apiCreateStartupMughavariProject } from "@/api/events";
import { TypographyP } from "../ui/typography";

const coFounderSchema = z.object({
  name: z.string().min(2, { message: "Co-founder name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, { message: "Invalid phone number." }),
});

const formSchema = z.object({
  founder: z.object({
    name: z.string().min(2, { message: "Founder name is required." }),
    email: z.string().email({ message: "Invalid email address." }),
    phone: z.string().min(10, { message: "Invalid phone number." }),
  }),
  hasCoFounders: z.boolean().default(false),
  coFounders: z.array(coFounderSchema).optional(),
  company: z.object({
    name: z.string().min(2, { message: "Company name is required." }),
    address: z.string().min(5, { message: "Company address is required." }),
    type: z.enum(["Manufacturing", "Services"], {
      required_error: "Please select a company type.",
    }),
    sector: z.string().min(2, { message: "Company sector is required." }),
  }),
});

export type FormValues = z.infer<typeof formSchema>;

export default function StartupMughavariForm({
  onPaymentBtnOpen,
}: {
  onPaymentBtnOpen: (value: boolean) => void;
}) {
  const [step, setStep] = useState(1);
  const totalSteps = 2;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hasCoFounders: false,
      coFounders: [],
    },
  });

  function handleSubmit(paymentId: string) {
    toast.promise(
      apiCreateStartupMughavariProject({
        paymentId,
        ...form.getValues(),
      }),
      {
        loading: "Creating...",
        success: () => "Application submitted successfully!!",
        error: () => "Failed to submit your application",
      }
    );
  }

  const nextStep = async () => {
    const fields = getFieldsForStep(step);
    const isValid = await form.trigger(fields as any);
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
        return ["founder", "hasCoFounders", "coFounders"];
      case 2:
        return ["company"];
      default:
        return [];
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-2">Startup Mughavari Application</h1>
      <TypographyP className="!mt-0 mb-4">
        You need to pay Rs.1250/-(including all taxes) at the time of submission of
        your applications
      </TypographyP>
      <FormStepper currentStep={step} totalSteps={totalSteps} />

      <FormLayout form={form}>
        {step === 1 && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Founder Details</h2>
              <p className="text-gray-600 mb-4">
                Please provide information about the primary founder of the
                startup.
              </p>
              <MemberDetails
                prefix="founder"
                label="Founder"
                schema={coFounderSchema}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="hasCoFounders"
                  checked={form.watch("hasCoFounders")}
                  onCheckedChange={(checked) => {
                    form.setValue("hasCoFounders", checked);
                    if (!checked) {
                      form.setValue("coFounders", []);
                    }
                  }}
                />
                <Label htmlFor="hasCoFounders">I have co-founders</Label>
              </div>

              {form.watch("hasCoFounders") && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Co-Founders Details
                  </h3>
                  <InfiniteMemberDetails<FormValues>
                    name="coFounders"
                    label="Co-Founder"
                    description="Add co-founders to your startup."
                    schema={coFounderSchema}
                    form={form}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Company Details</h2>
            <p className="text-gray-600 mb-4">
              Provide information about your startup company.
            </p>
            <TextInput
              name="company.name"
              label="Name of your company"
              placeholder="Enter company name"
            />
            <TextareaInput
              name="company.address"
              label="Address of Operations"
              placeholder="Enter company address"
            />
            <RadioInput
              name="company.type"
              label="Company Type"
              options={[
                { value: "Manufacturing", label: "Manufacturing" },
                { value: "Services", label: "Services" },
              ]}
            />
            <TextInput
              name="company.sector"
              label="Sector"
              placeholder="Enter company sector"
            />
            <TextareaInput
              name="company.about"
              label="About your Company"
              placeholder="Provide a brief description of your company"
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
            amount: "1250",
            name: "Startup Mughavari Application",
          }}
        />
      </FormLayout>
    </div>
  );
}
