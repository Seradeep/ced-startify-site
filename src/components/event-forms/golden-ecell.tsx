import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import {
  FormStepper,
  FormLayout,
  TextInput,
  RadioInput,
  SelectInput,
  FormActions,
  InfiniteMemberDetails,
  MultiImageUpload,
  MemberDetails,
} from "@/components/ui/form-components";
import { TypographyP } from "@/components/ui/typography";

const formSchema = z.object({
  institutionName: z
    .string()
    .min(2, { message: "Institution name is required." }),
  institutionDistrict: z
    .string()
    .min(2, { message: "Institution district is required." }),
  phoneNumber: z.string().min(10, { message: "Invalid phone number." }),
  email: z.string().email({ message: "Invalid email address." }),
  institutionCategory: z.enum([
    "Engineering",
    "Arts & Sciences",
    "Medical",
    "Management",
    "Polytechnic",
    "Others",
  ]),
  ecellCoordinator: z.object({
    name: z.string().min(2, { message: "Coordinator name is required." }),
    phoneNumber: z.string().min(10, { message: "Invalid phone number." }),
    email: z.string().email({ message: "Invalid email address." }),
  }),
  ecellStartYear: z.string().min(4, { message: "Valid year is required." }),
  entrepreneurshipFacilities: z.array(
    z.enum(["Makers Lab", "Incubator", "Others"])
  ),
  awarenessPrograms: z.object({
    count: z.number().min(0),
    details: z.array(
      z.object({
        name: z.string(),
        beneficiaryCount: z.number(),
        outcomes: z.string(),
        proofImages: z.array(z.string().url()),
      })
    ),
  }),
  workshops: z.object({
    count: z.number().min(0),
    details: z.array(
      z.object({
        name: z.string(),
        beneficiaryCount: z.number(),
        outcomes: z.string(),
        proofImages: z.array(z.string().url()),
      })
    ),
  }),
  otherEvents: z.object({
    count: z.number().min(0),
    details: z.array(
      z.object({
        name: z.string(),
        beneficiaryCount: z.number(),
        outcomes: z.string(),
        proofImages: z.array(z.string().url()),
      })
    ),
  }),
  institutionalFunding: z.object({
    amount: z.number().min(0),
    isYearly: z.boolean(),
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function GoldenStarECellAwardsForm() {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      awarenessPrograms: { count: 0, details: [] },
      workshops: { count: 0, details: [] },
      otherEvents: { count: 0, details: [] },
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
          "institutionName",
          "institutionDistrict",
          "phoneNumber",
          "email",
          "institutionCategory",
          "ecellCoordinator",
          "ecellStartYear",
          "entrepreneurshipFacilities",
        ];
      case 2:
        return ["awarenessPrograms"];
      case 3:
        return ["workshops", "otherEvents"];
      case 4:
        return ["institutionalFunding"];
      default:
        return [];
    }
  };

  const onSubmit = (data: FormValues) => {
    console.log(data);
    toast.success("Form submitted successfully!");
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-2">Golden Star E-Cell Awards</h1>
      <TypographyP className="!mt-0 mb-4">
        Please fill out the form below to apply for the Golden Star E-Cell
        Awards.
      </TypographyP>
      <FormStepper currentStep={step} totalSteps={totalSteps} />

      <FormLayout form={form}>
        {step === 1 && (
          <div className="space-y-4">
            <TextInput
              name="institutionName"
              label="Institution Name"
              placeholder="Enter your institution name"
            />
            <TextInput
              name="institutionDistrict"
              label="Institution District"
              placeholder="Enter your institution district"
            />
            <TextInput
              name="phoneNumber"
              label="Phone Number"
              placeholder="Enter phone number"
            />
            <TextInput
              name="email"
              label="Email"
              placeholder="Enter email address"
            />
            <SelectInput
              name="institutionCategory"
              label="Institution Category"
              options={[
                { value: "Engineering", label: "Engineering" },
                { value: "Arts & Sciences", label: "Arts & Sciences" },
                { value: "Medical", label: "Medical" },
                { value: "Management", label: "Management" },
                { value: "Polytechnic", label: "Polytechnic" },
                { value: "Others", label: "Others" },
              ]}
            />
            <MemberDetails
              name="ecellCoordinator"
              label="E-Cell Coordinator Details"
              schema={z.object({
                name: z
                  .string()
                  .min(2, { message: "Coordinator name is required." }),
                phoneNumber: z
                  .string()
                  .min(10, { message: "Invalid phone number." }),
                email: z.string().email({ message: "Invalid email address." }),
              })}
              form={form}
            />
            <TextInput
              name="ecellStartYear"
              label="E-Cell Start Year"
              placeholder="Enter the year E-Cell was started"
            />
            <SelectInput
              name="entrepreneurshipFacilities"
              label="Entrepreneurship Facilities"
              options={[
                { value: "Makers Lab", label: "Makers Lab" },
                { value: "Incubator", label: "Incubator" },
                { value: "Others", label: "Others" },
              ]}
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <TextInput
              name="awarenessPrograms.count"
              label="Number of Entrepreneurship Awareness Programs"
              placeholder="Enter the number of programs"
              type="number"
            />
            <InfiniteMemberDetails
              name="awarenessPrograms.details"
              label="Awareness Program Details"
              schema={z.object({
                name: z.string(),
                beneficiaryCount: z.number(),
                outcomes: z.string(),
                proofImages: z.array(z.string().url()),
              })}
              form={form}
            />
            <MultiImageUpload
              name="awarenessPrograms.details.0.proofImages"
              label="Upload Proof (Geo-Tagged Photos)"
              form={form}
            />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <TextInput
              name="workshops.count"
              label="Number of Entrepreneurship Workshops"
              placeholder="Enter the number of workshops"
              type="number"
            />
            <InfiniteMemberDetails
              name="workshops.details"
              label="Workshop Details"
              schema={z.object({
                name: z.string(),
                beneficiaryCount: z.number(),
                outcomes: z.string(),
                proofImages: z.array(z.string().url()),
              })}
              form={form}
            />
            <MultiImageUpload
              name="workshops.details.0.proofImages"
              label="Upload Proof (Geo-Tagged Photos)"
              form={form}
            />
            <TextInput
              name="otherEvents.count"
              label="Number of Other Entrepreneurship Events"
              placeholder="Enter the number of other events"
              type="number"
            />
            <InfiniteMemberDetails
              name="otherEvents.details"
              label="Other Event Details"
              schema={z.object({
                name: z.string(),
                beneficiaryCount: z.number(),
                outcomes: z.string(),
                proofImages: z.array(z.string().url()),
              })}
              form={form}
            />
            <MultiImageUpload
              name="otherEvents.details.0.proofImages"
              label="Upload Proof (Geo-Tagged Photos)"
              form={form}
            />
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <TextInput
              name="institutionalFunding.amount"
              label="Institutional Funding Amount"
              placeholder="Enter the funding amount"
              type="number"
            />
            <RadioInput
              name="institutionalFunding.isYearly"
              label="Is the funding provided yearly?"
              options={[
                { value: "true", label: "Yes" },
                { value: "false", label: "No" },
              ]}
            />
          </div>
        )}

        <FormActions
          currentStep={step}
          totalSteps={totalSteps}
          onPrevious={prevStep}
          onNext={nextStep}
          onOpen={() => {}}
          callbackFn={() => onSubmit(form.getValues())}
          event={{
            amount: "0",
            name: "Golden Star E-Cell Awards",
          }}
        />
      </FormLayout>
    </div>
  );
}