"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/hooks/use-toast";
import type { Ticket } from "@/models/ticket";
import type { ConnectedTicket } from "@/models/connected-ticket";
import useSearchStore, { useCheckoutStore } from "@/store";
import { CreditCard, Loader2, ShieldCheck } from "lucide-react";
import OrderSummary from "./OrderSummary";
import { useAuth } from "@/components/providers/auth-provider";
import { getChildrenPrice, getTicketPrice } from "@/lib/utils";
import {
  initiateHalkbankPayment,
  submitHalkbankForm,
  type CreateBookingsParams,
} from "@/actions/checkout/payment-actions";
import { useTranslation } from "react-i18next";
import {
  calculateDiscountedAmount,
  clearStoredDiscount,
} from "@/actions/checkout/discount-utilies";
import { useAbandonedCheckout } from "@/components/hooks/use-abandoned-checkout";

type LoadingState = "idle" | "initiating-payment" | "redirecting";

const PaymentMethod = () => {
  const [loading, setLoading] = useState<LoadingState>("idle");
  const [showStickyButton, setShowStickyButton] = useState(true);
  const buttonRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { t } = useTranslation();
  const { checkoutId, setBookingInProgress } = useAbandonedCheckout();
  const { passengers: passengerAmount } = useSearchStore();
  const { user } = useAuth();

  const {
    passengers,
    outboundTicket,
    returnTicket,
    selectedFlex,
    flexPrice,
    setSelectedFlex,
  } = useCheckoutStore();

  const isLoading = loading !== "idle";

  useEffect(() => {
    if (!selectedFlex) {
      setSelectedFlex("NO_FLEX");
    }
  }, [selectedFlex, setSelectedFlex]);

  useEffect(() => {
    const handleScroll = () => {
      if (buttonRef.current) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const isButtonVisible =
          buttonRect.top < window.innerHeight && buttonRect.bottom > 0;
        setShowStickyButton(!isButtonVisible);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const calculateTicketTotal = (ticket: Ticket | ConnectedTicket) => {
    const adultPrice = getTicketPrice(ticket);
    const childPrice = getChildrenPrice(ticket);
    return (
      adultPrice * (passengerAmount.adults || 1) +
      childPrice * (passengerAmount.children || 0)
    );
  };

  const outboundTotal = outboundTicket
    ? calculateTicketTotal(outboundTicket)
    : 0;
  const returnTotal = returnTicket ? calculateTicketTotal(returnTicket) : 0;
  const totalPrice = outboundTotal + returnTotal + flexPrice;

  const transformPassengersForBackend = (passengers: any[]) => {
    return passengers.map((passenger) => ({
      ...passenger,
      full_name: [passenger.first_name, passenger.last_name]
        .filter(Boolean)
        .join(" ")
        .trim(),
    }));
  };

  const getLoadingText = () => {
    switch (loading) {
      case "initiating-payment":
        return t("paymentMethod.processingPayment") || "Preparing payment...";
      case "redirecting":
        return "Redirecting to Halkbank...";
      default:
        return t("paymentMethod.completePayment") || "Complete Payment";
    }
  };

  const handlePayment = async () => {
    if (isLoading) return;

    if (!outboundTicket && !returnTicket) {
      toast({
        description: "No ticket selected for payment",
        variant: "destructive",
      });
      return;
    }

    try {
      setBookingInProgress(true);
      setLoading("initiating-payment");

      const discountResult = calculateDiscountedAmount(totalPrice);
      const finalAmount = discountResult?.finalAmount ?? totalPrice;
      const appliedDiscountAmount = discountResult?.amount ?? 0;
      const discountCode = discountResult?.code ?? null;

      if (!Number.isFinite(finalAmount) || finalAmount <= 0) {
        throw new Error("Invalid payment amount");
      }

      const bookingParams: CreateBookingsParams = {
        outboundTicket,
        returnTicket,
        paymentIntentId: "",
        finalAmount,
        discountAmount: appliedDiscountAmount,
        discountCode,
        passengerAmount,
        passengers: transformPassengersForBackend(passengers),
        selectedFlex: selectedFlex || "NO_FLEX",
        flexPrice,
        userId: user?._id,
        abandonedCheckoutId: checkoutId,
      };

      const paymentResponse = await initiateHalkbankPayment(bookingParams);
      const paymentData = paymentResponse.data;

      if (!paymentData?.postUrl || !paymentData?.fields) {
        throw new Error("Payment gateway response is missing required fields");
      }

      if (checkoutId) {
        sessionStorage.setItem("halkbank_checkout_id", checkoutId);
      }

      clearStoredDiscount();
      setLoading("redirecting");
      submitHalkbankForm(paymentData.postUrl, paymentData.fields);
    } catch (err: any) {
      setBookingInProgress(false);
      setLoading("idle");
      toast({
        description:
          err?.response?.data?.message ||
          err?.message ||
          "Payment could not be started",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl overflow-hidden">
        <div className="p-4">
          <div className="flex items-center gap-4">
            <p className="text-[#353535] font-medium text-lg">
              {t("paymentMethod.title")}
            </p>
          </div>
          <p className="text-sm text-gray-600 my-4">
            {t("paymentMethod.description")}
          </p>

          <div className="rounded-lg border border-primary/15 bg-primary-bg/5 p-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="font-medium text-gray-800">
                  Secure card payment
                </h3>
                <p className="text-sm text-gray-600">
                  You will be redirected to Halkbank secure 3D payment to enter
                  your card details and confirm the transaction.
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
              <ShieldCheck className="h-4 w-4 text-green-600" />
              <span>Card details are handled by Halkbank, not stored here.</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:hidden gap-4">
        <OrderSummary />
      </div>

      <div ref={buttonRef} className="flex items-center justify-end gap-2">
        <Button
          variant={"primary"}
          onClick={handlePayment}
          className="px-6 py-3.5 text-white focus:outline-none h-12 rounded-lg w-full sm:w-fit"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="animate-spin h-5 w-5" />
              <span className="hidden sm:inline">{getLoadingText()}</span>
            </div>
          ) : (
            getLoadingText()
          )}
        </Button>
      </div>

      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 z-50 transition-transform duration-300 ${
          showStickyButton ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <p className="text-xl font-bold text-[#353535]">
            EUR {totalPrice.toFixed(2)}
          </p>
          <Button
            onClick={handlePayment}
            variant={"primary"}
            className="flex-1 px-6 py-3.5 h-12 rounded-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin h-5 w-5" />
                <span>{getLoadingText()}</span>
              </div>
            ) : (
              getLoadingText()
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
