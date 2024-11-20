import { apiCreateOrder, apiVerifyPayment } from "@/api/payment";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaymentButtonProps {
  amount: string;
  eventName: string;
  onOpen: (value: boolean) => void;
  callbackFn: (paymentId: string) => void;
}

export default function PaymentButton({
  amount,
  eventName,
  onOpen,
  callbackFn,
}: PaymentButtonProps) {
  const { isLoading, Razorpay } = useRazorpay();

  async function handlePayment(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    onOpen(false);
    try {
      const order = await apiCreateOrder({
        amount,
      });

      const options: RazorpayOrderOptions = {
        key: import.meta.env.RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Startify 3.0",
        description: eventName,
        order_id: order.id,
        handler: async (response: {
          razorpay_signature: string;
          razorpay_order_id: string;
          razorpay_payment_id: string;
        }) => {
          console.log(response);
          try {
            await apiVerifyPayment({
              order_id: response.razorpay_order_id,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            });

            callbackFn(response.razorpay_payment_id);
          } catch (error: any) {
            toast.error("Server error, try again later!!");
          }
        },
      };
      const razorpayInstance = new Razorpay(options);
      razorpayInstance.open();
    } catch (error: any) {
      toast.error("Server error, try again later!!");
    }
  }

  return (
    <Button
      className={cn(isLoading && "cursor-not-allowed")}
      onClick={handlePayment}
      disabled={isLoading}
    >
      Submit
    </Button>
  );
}
