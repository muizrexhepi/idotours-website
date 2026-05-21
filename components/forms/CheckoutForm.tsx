"use client";

import PassengerInfo from "@/app/checkout/_components/PassengerInfo";
import PaymentMethod from "@/app/checkout/_components/PaymentMethod";
import OrderSummary from "@/app/checkout/_components/OrderSummary";
import LoginCTA from "@/app/checkout/_components/LoginCTA";

const CheckoutForm = () => {
  return (
    <div className="space-y-6">
      <div className="relative mx-auto flex flex-col-reverse md:flex-row gap-8">
        <div className="flex-[2] flex flex-col gap-4">
          <LoginCTA />
          <PassengerInfo />
          {/* <Extras /> */}
          <PaymentMethod />
        </div>

        <div className="hidden flex-1 md:flex flex-col gap-4 sticky top-10 h-fit">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
