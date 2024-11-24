import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { apiCreateStartupDistrictProject } from "@/api/events";
import {
  FormStepper,
  FormLayout,
  TextInput,
  SelectInput,
  TextareaInput,
  FormActions,
  InfiniteMemberDetails,
} from "@/components/ui/form-components";
import { TypographyP } from "@/components/ui/typography";
import { events } from "@/data";

const formSchema = z.object({
  startupName: z.string().min(2, { message: "Startup name is required." }),
  registrationNumber: z.string().optional(),
  founderName: z.string().min(2, { message: "Founder name is required." }),
  founderEmail: z.string().email({ message: "Invalid email address." }),
  founderPhone: z.string().min(10, { message: "Invalid phone number." }),
  coFounders: z.array(
    z.object({
      name: z.string().min(2, { message: "Co-founder name is required." }),
      email: z.string().email({ message: "Invalid email address." }),
      phone: z.string().min(10, { message: "Invalid phone number." }),
    })
  ),
  aboutCompany: z
    .string()
    .min(10, {
      message: "Please provide some information about your company.",
    }),
  sdg: z.string().min(2, { message: "SDG selection is required." }),
  startupType: z.enum(["Manufacturing", "Services"], {
    required_error: "Startup type is required.",
  }),
  sector: z.string().min(2, { message: "Sector is required." }),
  productDetails: z
    .string()
    .min(10, { message: "Please provide some details about your product." }),
});

export type FormValues = z.infer<typeof formSchema>;

export default function StartupDistrictForm({
  onPaymentBtnOpen,
}: {
  onPaymentBtnOpen: (value: boolean) => void;
}) {
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const event = events.find((event) => event.id === "startup-district");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      coFounders: [],
    },
  });

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
        return [
          "startupName",
          "registrationNumber",
          "founderName",
          "founderEmail",
          "founderPhone",
          "coFounders",
        ];
      case 2:
        return ["aboutCompany", "sdg", "startupType", "sector"];
      case 3:
        return ["productDetails"];
      default:
        return [];
    }
  };

  function handleSubmit(paymentId: string) {
    toast.promise(
      apiCreateStartupDistrictProject({
        paymentId,
        ...form.getValues(),
      }),
      {
        loading: "Submitting...",
        success: () => {
          window.location.reload();
          return "Application submitted successfully!";
        },
        error: () => "Failed to submit your application",
      }
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-2">Startup District</h1>
      <TypographyP className="!mt-0 mb-4">
        {`You need to pay Rs.${event?.regFee}/-(including all taxes) at the time of submission
        of your applications`}
      </TypographyP>
      <FormStepper currentStep={step} totalSteps={totalSteps} />

      <FormLayout form={form}>
        {step === 1 && (
          <div className="space-y-4">
            <TextInput
              name="startupName"
              label="Startup Name/Innovative Product Name"
              placeholder="Enter your startup or product name"
            />
            <TextInput
              name="registrationNumber"
              label="Company Registration Number (if available)"
              placeholder="Enter registration number"
            />
            <TextInput
              name="founderName"
              label="Founder Name"
              placeholder="Enter founder's name"
            />
            <TextInput
              name="founderEmail"
              label="Founder Email"
              placeholder="Enter founder's email"
            />
            <TextInput
              name="founderPhone"
              label="Founder Phone"
              placeholder="Enter founder's phone number"
            />
            <InfiniteMemberDetails
              name="coFounders"
              label="Co-founders"
              description="Add details of co-founders (if any)"
              schema={z.object({
                name: z
                  .string()
                  .min(2, { message: "Co-founder name is required." }),
                email: z.string().email({ message: "Invalid email address." }),
                phone: z.string().min(10, { message: "Invalid phone number." }),
              })}
              form={form}
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <TextareaInput
              name="aboutCompany"
              label="About your Company"
              placeholder="Provide a brief description of your company"
            />
            <TextInput
              name="sdg"
              label="Under which SDG does your Startup/Product Apply to?"
              placeholder="Enter the relevant SDG"
            />
            <SelectInput
              name="startupType"
              label="Startup Type"
              options={[
                { value: "Manufacturing", label: "Manufacturing" },
                { value: "Services", label: "Services" },
              ]}
            />
            <TextInput
              name="sector"
              label="Sector"
              placeholder="Enter your startup's sector"
            />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <TextareaInput
              name="productDetails"
              label="Product Details"
              placeholder="Provide details about your product or service"
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
            amount: event?.regFee!,
            name: "Startup District",
          }}
        />
      </FormLayout>
    </div>
  );
}
