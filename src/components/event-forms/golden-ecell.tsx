import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import * as z from "zod";
import { AlertCircle } from "lucide-react";

import { apiCreateGoldenStarECellProject } from "@/api/events";
import {
  eCellAwards,
  eCellRegFee,
  indianStates,
  tamilNaduDistricts,
  countries,
} from "@/data";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  FormStepper,
  FormLayout,
  TextInput,
  RadioInput,
  SelectInput,
  FileInput,
  FormActions,
  MultiSelect,
} from "@/components/ui/form-components";
import {
  TypographyH2,
  TypographyLead,
  TypographyP,
} from "@/components/ui/typography";
import { cn, UploadToCloudinary } from "@/lib/utils";

const formSchema = z.object({
  region: z.enum(["International", "Tamil Nadu", "Other State"]),
  state: z.string().optional(),
  district: z.string().optional(),
  country: z.string().optional(),
  institutionType: z.enum(["College", "University"]).optional(),
  participateInDistrictLevel: z.boolean().optional(),
  numberOfAwards: z.enum(["1", "8", "15", "16", "19"]),
  selectedAwards: z.array(z.string()),
  institutionName: z
    .string()
    .min(2, { message: "Institution name is required" }),
  institutionDistrict: z
    .string()
    .min(2, { message: "Institution district is required" }),
  phoneNumber: z.string().min(10, { message: "Invalid phone number" }),
  email: z.string().email({ message: "Invalid email address" }),
  institutionCategory: z.enum([
    "Engineering",
    "Arts & Sciences",
    "Medical",
    "Management",
    "Polytechnic",
    "Others",
  ]),
  ecellCoordinator: z.object({
    name: z.string().min(2, { message: "Coordinator name is required" }),
    phoneNumber: z.string().min(10, { message: "Invalid phone number" }),
    email: z.string().email({ message: "Invalid email address" }),
  }),
  ecellStartYear: z.string({
    required_error: "E-Cell start year is required",
  }),
  entrepreneurshipFacilities: z.array(
    z.enum(["Makers Lab", "Incubator", "Others"])
  ),
  institutionalFunding: z.string({
    required_error: "Institutional Funding is required",
  }),
  payment: z.object({
    bankScreenshot: z.string().url({ message: "Invalid drive url" }),
    paymentId: z.string().min(1, "Payment ID is required"),
  }),
});

export type FormValues = z.infer<typeof formSchema>;

export default function GoldenStarECellAwardsForm({
  onPaymentBtnOpen,
}: {
  onPaymentBtnOpen: (value: boolean) => void;
}) {
  const [step, setStep] = useState<number>(1);
  const [regFee, setRegFee] = useState<string | null>(null);
  const [awardOptions, setAwardOptions] = useState<string[]>();
  const totalSteps = 6;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      region: "International",
      numberOfAwards: "16",
      selectedAwards: [],
      institutionType: "College",
      entrepreneurshipFacilities: [],
    },
  });

  const region = form.watch("region");
  const numberOfAwards = form.watch("numberOfAwards");
  const institutionType = form.watch("institutionType");
  const participateInDistrictLevel = form.watch("participateInDistrictLevel");

  useEffect(() => {
    function calculateRegFee(): string | null {
      const { international, other, tamilnadu } = eCellRegFee;
      if (region === "International") {
        return international;
      } else if (region === "Other State") {
        switch (numberOfAwards) {
          case "1":
            return other["1award"];
          case "8":
            return other["8awards"];
          case "15":
            return institutionType === "College"
              ? other["15awards"].college
              : other["15awards"].university;
        }
      } else if (region === "Tamil Nadu") {
        const { stateLevel, districtLevel } = tamilnadu;
        if (participateInDistrictLevel) {
          switch (numberOfAwards) {
            case "1":
              return districtLevel["1award"];
            case "8":
              return districtLevel["8awards"];
            case "19":
              return institutionType === "College"
                ? districtLevel["19awards"].college
                : null;
          }
        } else {
          switch (numberOfAwards) {
            case "1":
              return stateLevel["1award"];
            case "8":
              return stateLevel["8awards"];
            case "19":
              return institutionType === "College"
                ? stateLevel["19awards"].college
                : stateLevel["19awards"].university;
          }
        }
      }
      return null;
    }

    const fees = calculateRegFee();

    setRegFee(fees);
  }, [region, institutionType, participateInDistrictLevel, numberOfAwards]);

  useEffect(() => {
    function filterAwards() {
      const awards = eCellAwards.filter((eCellAward) => {
        const { international, other, tamilnadu } = eCellAward.region;
        switch (region) {
          case "International":
            return international;
          case "Tamil Nadu":
            return tamilnadu;
          case "Other State":
            return other;
        }
      });

      return awards.map((award) => award.award);
    }

    const awards = filterAwards();

    if (region === "International") {
      form.setValue("numberOfAwards", "16");
      form.setValue("selectedAwards", awards);
    } else {
      form.setValue("country", "India");
      if (region === "Tamil Nadu") {
        form.setValue("state", "Tamil Nadu");
        if (institutionType === "University") {
          form.setValue("numberOfAwards", "19");
          form.setValue("selectedAwards", awards);
        } else {
          form.setValue("selectedAwards", []);
        }
      } else if (region === "Other State" && institutionType === "University") {
        form.setValue("numberOfAwards", "15");
        form.setValue("selectedAwards", awards);
      } else {
        form.setValue("selectedAwards", []);
      }
    }

    setAwardOptions(awards);
  }, [region, institutionType]);

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
          "region",
          "state",
          "district",
          "country",
          "institutionType",
          "numberOfAwards",
          "selectedAwards",
          "participateInDistrictLevel",
        ];
      case 2:
        return [];
      case 3:
        return [
          "institutionName",
          "institutionDistrict",
          "phoneNumber",
          "email",
          "institutionCategory",
        ];
      case 4:
        return [
          "ecellCoordinator",
          "ecellStartYear",
          "entrepreneurshipFacilities",
        ];
      case 5:
        return ["institutionalFunding"];
      case 6:
        return ["payment"];
      default:
        return [];
    }
  };

  function handleSubmit() {
    toast.promise(apiCreateGoldenStarECellProject(form.getValues()), {
      loading: "Submitting...",
      success: () => {
        window.location.reload();
        return "Application submitted successfully!";
      },
      error: () => "Failed to submit your application",
    });
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-2">Golden Star E-Cell Awards</h1>
      <TypographyP className="!mt-0 mb-4">
        Fill out this form to apply for the Golden Star E-Cell Awards.
      </TypographyP>
      <FormStepper currentStep={step} totalSteps={totalSteps} />

      <FormLayout form={form}>
        {step === 1 && (
          <div className="space-y-4">
            <RadioInput
              name="region"
              label="Region"
              options={[
                { value: "International", label: "International" },
                { value: "Tamil Nadu", label: "Tamil Nadu" },
                { value: "Other State", label: "Other State" },
              ]}
            />
            {region === "Tamil Nadu" && (
              <>
                <RadioInput
                  name="participateInDistrictLevel"
                  label="Would you like to participate at the district level?"
                  options={[
                    { value: true, label: "Yes" },
                    { value: false, label: "No" },
                  ]}
                  description="If you are participating in district level, you cannot participate in Tamil Nadu level and University cannot participate."
                />
                <SelectInput
                  name="district"
                  label="District"
                  options={tamilNaduDistricts.map((district) => ({
                    value: district,
                    label: district,
                  }))}
                />
                <RadioInput
                  name="institutionType"
                  label="Institution Type"
                  options={[
                    { value: "College", label: "College" },
                    { value: "University", label: "University" },
                  ].filter((option) => {
                    if (participateInDistrictLevel) {
                      return option.value === "College";
                    }
                    return true;
                  })}
                />
                <SelectInput
                  name="numberOfAwards"
                  label="How many awards category would you like to participate in?"
                  options={[
                    { value: "1", label: "1 Award" },
                    { value: "8", label: "8 Awards" },
                    { value: "19", label: "19 Awards" },
                  ].filter((option) => {
                    if (institutionType === "University") {
                      return option.value === "19";
                    }
                    return true;
                  })}
                />
              </>
            )}
            {region === "Other State" && (
              <>
                <SelectInput
                  name="state"
                  label="State"
                  options={indianStates.map((state) => ({
                    value: state,
                    label: state,
                  }))}
                />
                <RadioInput
                  name="institutionType"
                  label="Institution Type"
                  options={[
                    { value: "College", label: "College" },
                    { value: "University", label: "University" },
                  ]}
                />
                <SelectInput
                  name="numberOfAwards"
                  label="How many awards category would you like to participate in?"
                  options={[
                    { value: "1", label: "1 Award" },
                    { value: "8", label: "8 Awards" },
                    { value: "15", label: "15 Awards" },
                  ].filter((option) => {
                    if (institutionType === "University") {
                      return option.value === "15";
                    }
                    return true;
                  })}
                />
              </>
            )}
            {region === "International" && (
              <>
                <SelectInput
                  name="country"
                  label="Country"
                  description="Select your country"
                  options={countries.map((country) => ({
                    value: country.name,
                    label: country.name,
                  }))}
                />
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Information</AlertTitle>
                  <AlertDescription>
                    You are participating for 16 awards.
                  </AlertDescription>
                </Alert>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      What will be the award category you will be participating?
                    </AccordionTrigger>
                    <AccordionContent>
                      {awardOptions?.join(", ")}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </>
            )}
            {region !== "International" && (
              <div className="space-y-2">
                <MultiSelect
                  name="selectedAwards"
                  label="Select Awards"
                  options={
                    awardOptions?.map((awardOption) => ({
                      value: awardOption,
                      label: awardOption,
                    }))!
                  }
                  placeholder="Select awards..."
                  description="Choose the awards you want to participate in"
                  limit={parseInt(numberOfAwards)}
                />
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <TypographyH2 className="text-xl font-semibold">
              Registration Fee
            </TypographyH2>
            <TypographyP className={cn(regFee === null && "text-destructive")}>
              <strong>Fee:</strong>{" "}
              {regFee ? regFee : "Fill the previous step to calculate the fee"}
            </TypographyP>
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Important</AlertTitle>
              <AlertDescription>
                Please ensure you have a screenshot of your payment and your
                payment ID ready. You will need to upload the screenshot and
                provide the payment ID in the final step of this form.
              </AlertDescription>
            </Alert>
            <div>
              <TypographyH2 className="text-lg font-semibold mt-4 mb-2">
                Payment Details:
              </TypographyH2>
              {[
                {
                  label: "Account Name",
                  value: "CENTRE FOR ENTREPRENEURSHIP DEVELOPMENT",
                },
                { label: "Account Number", value: "10496977837" },
                { label: "Bank", value: "STATE BANK OF INDIA" },
                { label: "IFSC", value: "SBIN0006463" },
                {
                  label: "Swift Code",
                  value: "SBININBB291",
                },
                {
                  label: "Branch",
                  value: "ANNA UNIVERSITY COLLEGE CAMPUS CHENNAI",
                },
              ].map((info, index) => (
                <TypographyP className="!mt-2" key={index}>
                  <strong>{info.label}:</strong> {info.value}
                </TypographyP>
              ))}
            </div>
            
          </div>
        )}

        {step === 3 && (
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
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <TextInput
              name="ecellCoordinator.name"
              label="E-Cell Coordinator Name"
              placeholder="Enter coordinator name"
            />
            <TextInput
              name="ecellCoordinator.phoneNumber"
              label="E-Cell Coordinator Phone Number"
              placeholder="Enter coordinator phone number"
            />
            <TextInput
              name="ecellCoordinator.email"
              label="E-Cell Coordinator Email"
              placeholder="Enter coordinator email"
            />
            <TextInput
              name="ecellStartYear"
              label="E-Cell Start Year"
              placeholder="Enter E-Cell start year"
            />
            <MultiSelect
              name="entrepreneurshipFacilities"
              label="Entrepreneurship Facilities"
              description="Select all that apply"
              options={[
                { value: "Makers Lab", label: "Makers Lab" },
                { value: "Incubator", label: "Incubator" },
                { value: "Others", label: "Others" },
              ]}
            />
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <TextInput
              name="institutionalFunding"
              label="Institutional Funding for E-Cells (2024-25)"
              placeholder="Enter funding amount"
            />
          </div>
        )}

        {step === 6 && (
          <div className="space-y-4">
            <FileInput
              name="payment.bankScreenshot"
              label="Bank Payment Screenshot"
              accept="image/*"
              description="Upload a screenshot of your bank payment. Wait until the image is uploaded successfully."
              onFileSelect={async (file) => {
                const { success, url } = await UploadToCloudinary(file);
                if (success) {
                  form.setValue("payment.bankScreenshot", url!);
                  toast.success("Screenshot uploaded successfully");
                } else {
                  toast.error("Failed to upload screenshot");
                }
              }}
            />
            <TextInput
              name="payment.paymentId"
              label="Payment ID"
              placeholder="Enter your payment ID"
            />
            <Button
              onClick={() => window.open("/forms/ecell-form.pdf", "_blank")}
            >
              Download Document
            </Button>
            <TypographyLead className="text-md">
              **Kindly download this document and fill in the necessary
              information mentioned in the document for the awards which you
              have opted previously. You will receive the submission link for
              the document in your email after submitting your application.
              <span className="text-red-600 block">
                The deadline for submission is January 30, 2025.
              </span>
            </TypographyLead>
          </div>
        )}

        <FormActions
          currentStep={step}
          totalSteps={totalSteps}
          onPrevious={prevStep}
          onNext={nextStep}
          onOpen={onPaymentBtnOpen}
          callbackFn={handleSubmit}
          hasPayment={false}
        />
      </FormLayout>
    </div>
  );
}
