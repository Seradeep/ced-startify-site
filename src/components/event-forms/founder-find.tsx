import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { apiCreateFounderFindProject } from "@/api/events";
import {
  FormStepper,
  FormLayout,
  TextInput,
  RadioInput,
  MultiSelect,
  FormActions,
  SelectInput,
} from "@/components/ui/form-components";
import { TypographyP } from "@/components/ui/typography";
import { events } from "@/data";

const formSchema = z
  .object({
    founderType: z.enum(["founder", "cofounder", "both"], {
      required_error: "Please select your role.",
    }),
    name: z.string().min(2, { message: "Name is required." }),
    email: z.string().email({ message: "Invalid email address." }),
    phone: z.string().min(10, { message: "Invalid phone number." }),
    currentStatus: z.enum(
      [
        "student",
        "studentEntrepreneur",
        "workingProfessional",
        "faculty",
        "fullTimeEntrepreneur",
      ],
      { required_error: "Please select your current status." }
    ),
    startupStatus: z.enum(["registered", "inProcess", "notApplicable"], {
      required_error: "Please select your startup status.",
    }),
    startupName: z.string().optional(),
    designation: z.string().optional(),
    cityOfOperation: z
      .string()
      .min(2, { message: "City of operation is required." }),
    startupKeyVertical: z
      .string()
      .min(2, { message: "Startup key vertical is required." }),
    otherStartupKeyVertical: z.string().optional(),
    interestedStartupAreas: z.array(z.string()).min(1, {
      message: "Please select at least one interested startup area.",
    }),
    otherInterestedStartupAreas: z.string().optional(),
    cofounderCount: z.string().optional(),
    interestedRoles: z
      .array(z.string())
      .min(1, { message: "Please select at least one interested role." }),
    otherInterestedRoles: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.startupKeyVertical === "other") {
        return !!data.otherStartupKeyVertical;
      }
      return true;
    },
    {
      message: "Please specify the other startup key vertical.",
      path: ["otherStartupKeyVertical"],
    }
  )
  .refine(
    (data) => {
      if (data.interestedStartupAreas.includes("other")) {
        return !!data.otherInterestedStartupAreas;
      }
      return true;
    },
    {
      message: "Please specify the other interested startup areas.",
      path: ["otherInterestedStartupAreas"],
    }
  )
  .refine(
    (data) => {
      if (data.interestedRoles.includes("other")) {
        return !!data.otherInterestedRoles;
      }
      return true;
    },
    {
      message: "Please specify the other interested roles.",
      path: ["otherInterestedRoles"],
    }
  );

export type FormValues = z.infer<typeof formSchema>;

const startupVerticals = [
  "E-commerce",
  "Healthcare",
  "Fintech",
  "Edtech",
  "Logistics",
  "Real Estate",
  "Foodtech",
  "Agritech",
  "Cleantech",
  "Transportation",
  "Social Media",
  "Gaming",
  "Marketing Tech",
  "AI",
  "Cybersecurity",
  "Travel",
  "Fashion Tech",
  "SaaS",
  "Other",
];

const roles = ["CEO", "CFO", "CTO", "COO", "CMO", "Other"];

export default function FounderFindForm({
  onPaymentBtnOpen,
}: {
  onPaymentBtnOpen: (value: boolean) => void;
}) {
  const [step, setStep] = useState<number>(1);
  const totalSteps = 3;

  const event = events.find((event) => event.id === "founder-find");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interestedStartupAreas: [],
      interestedRoles: [],
    },
  });

  const founderType = form.watch("founderType");
  const startupKeyVertical = form.watch("startupKeyVertical");
  const interestedStartupAreas = form.watch("interestedStartupAreas");
  const interestedRoles = form.watch("interestedRoles");

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
          "founderType",
          "name",
          "email",
          "phone",
          "currentStatus",
          "startupStatus",
          "startupName",
          "designation",
        ];
      case 2:
        return [
          "cityOfOperation",
          "startupKeyVertical",
          "otherStartupKeyVertical",
          "interestedStartupAreas",
          "otherInterestedStartupAreas",
        ];
      case 3:
        return ["cofounderCount", "interestedRoles", "otherInterestedRoles"];
      default:
        return [];
    }
  };

  async function onSubmit(paymentId: string) {
    const isValid = await form.trigger();

    if (isValid) handleSubmit(paymentId);
  }

  function handleSubmit(paymentId: string) {
    const formValues = form.getValues();
    const data = {
      ...formValues,
      startupKeyVertical:
        formValues.startupKeyVertical === "other"
          ? formValues.otherStartupKeyVertical || ""
          : formValues.startupKeyVertical || "",
      interestedStartupAreas: formValues.interestedStartupAreas.includes(
        "other"
      )
        ? [
            ...formValues.interestedStartupAreas.filter(
              (area) => area !== "other"
            ),
            formValues.otherInterestedStartupAreas,
          ].filter((area) => area !== undefined)
        : formValues.interestedStartupAreas.filter(
            (area) => area !== undefined
          ),
      interestedRoles: formValues.interestedRoles.includes("other")
        ? [
            ...formValues.interestedRoles.filter((role) => role !== "other"),
            formValues.otherInterestedRoles,
          ].filter((role) => role !== undefined)
        : formValues.interestedRoles.filter((role) => role !== undefined),
    };

    delete data.otherStartupKeyVertical;
    delete data.otherInterestedStartupAreas;
    delete data.otherInterestedRoles;

    toast.promise(
      apiCreateFounderFindProject({
        paymentId,
        ...data,
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
      <h1 className="text-3xl font-bold mb-2">Founder Find</h1>
      <TypographyP className="!mt-0 mb-4">
        You need to pay Rs.{event?.regFee!}/-(including all taxes) at the time
        of submission of your applications
      </TypographyP>
      <FormStepper currentStep={step} totalSteps={totalSteps} />

      <FormLayout form={form}>
        {step === 1 && (
          <div className="space-y-4">
            <RadioInput
              name="founderType"
              label="Are you a Founder/Looking to join as Cofounder/Both?"
              options={[
                { value: "founder", label: "Founder" },
                { value: "cofounder", label: "Looking to join as Cofounder" },
                { value: "both", label: "Both" },
              ]}
            />
            <TextInput
              name="name"
              label="Your Name"
              placeholder="Enter your full name"
            />
            <TextInput
              name="email"
              label="Email"
              placeholder="Enter your email address"
              type="email"
            />
            <TextInput
              name="phone"
              label="Phone Number"
              placeholder="Enter your phone number"
            />
            <RadioInput
              name="currentStatus"
              label="Current Status"
              options={[
                { value: "student", label: "Student" },
                { value: "studentEntrepreneur", label: "Student Entrepreneur" },
                { value: "workingProfessional", label: "Working Professional" },
                { value: "faculty", label: "Faculty" },
                {
                  value: "fullTimeEntrepreneur",
                  label: "Full-time Entrepreneur",
                },
              ]}
            />
            {(founderType === "founder" || founderType === "both") && (
              <>
                <RadioInput
                  name="startupStatus"
                  label="Startup Status"
                  options={[
                    {
                      value: "registered",
                      label: "Registered as firm/startup",
                    },
                    {
                      value: "inProcess",
                      label: "In process of forming a startup",
                    },
                    { value: "notApplicable", label: "Not Applicable" },
                  ]}
                />
                {form.watch("startupStatus") !== "notApplicable" && (
                  <>
                    <TextInput
                      name="startupName"
                      label="Name of your Registered StartUp/firm"
                      placeholder="Enter your startup name"
                    />
                    <TextInput
                      name="designation"
                      label="Designation/Role in your startup/firm"
                      placeholder="Enter your designation"
                    />
                  </>
                )}
              </>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <TextInput
              name="cityOfOperation"
              label="City of Operation"
              placeholder="Enter your city of operation"
            />
            {(founderType === "founder" || founderType === "both") && (
              <>
                <SelectInput
                  name="startupKeyVertical"
                  label="Your Startup Key Vertical"
                  options={startupVerticals.map((vertical) => ({
                    value: vertical.toLowerCase(),
                    label: vertical,
                  }))}
                  description="Select your startup's key vertical"
                />
                {startupKeyVertical?.includes("other") && (
                  <TextInput
                    name="otherStartupKeyVertical"
                    label="Other Startup Key Vertical"
                    placeholder="Enter your custom startup key vertical"
                  />
                )}
              </>
            )}
            <MultiSelect
              name="interestedStartupAreas"
              label="Interested Startup Areas"
              options={startupVerticals.map((vertical) => ({
                value: vertical.toLowerCase(),
                label: vertical,
              }))}
              description="Select all that apply"
            />
            {interestedStartupAreas?.includes("other") && (
              <TextInput
                name="otherInterestedStartupAreas"
                label="Other Interested Startup Areas"
                placeholder="Enter your custom interested startup areas"
              />
            )}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            {(founderType === "founder" || founderType === "both") && (
              <TextInput
                name="cofounderCount"
                label="How many cofounders are you looking for?"
                placeholder="Enter number of cofounders"
                type="number"
              />
            )}
            <MultiSelect
              name="interestedRoles"
              label="Roles/Designations interested in"
              options={roles.map((role) => ({
                value: role.toLowerCase(),
                label: role,
              }))}
              description="Select all that apply"
            />
            {interestedRoles?.includes("other") && (
              <TextInput
                name="otherInterestedRoles"
                label="Other Interested Roles"
                placeholder="Enter other interested roles"
              />
            )}
          </div>
        )}

        <FormActions
          currentStep={step}
          totalSteps={totalSteps}
          onPrevious={prevStep}
          onNext={nextStep}
          onOpen={onPaymentBtnOpen}
          callbackFn={onSubmit}
          event={{
            amount: event?.regFee!,
            name: "Founder Find",
          }}
        />
      </FormLayout>
    </div>
  );
}
