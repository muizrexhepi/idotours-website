"use client";

import React from "react";
import moment from "moment-timezone";
import type { Ticket as TicketType } from "@/models/ticket";
import { Button } from "@/components/ui/button";
import useSearchStore, { useCheckoutStore, useLoadingStore } from "@/store";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FaCalendarAlt } from "react-icons/fa";

export interface TicketProps {
  ticket: TicketType;
  isReturn?: boolean;
}

const TicketBlock: React.FC<TicketProps> = ({ ticket, isReturn }) => {
  const {
    setOutboundTicket,
    outboundTicket,
    setReturnTicket,
    returnTicket,
    isSelectingReturn,
    setIsSelectingReturn,
  } = useCheckoutStore();
  const { tripType } = useSearchStore();
  const router = useRouter();
  const { t } = useTranslation();
  const { setIsLoading, isLoading } = useLoadingStore();

  // Check if route is bookable
  const isBookable = ticket.route?.metadata?.bookable !== false;

  const handleTicketSelection = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!isBookable) {
      return; // Don't proceed if not bookable
    }

    setIsLoading(true);

    if (isSelectingReturn) {
      if (ticket._id !== returnTicket?._id) {
        setReturnTicket(ticket);
      }
      router.push(`/checkout`);
    } else {
      if (ticket._id !== outboundTicket?._id) {
        setOutboundTicket(ticket);
      }
      if (tripType === "round-trip") {
        setIsLoading(false);
        setIsSelectingReturn(true);
      } else {
        router.push(`/checkout`);
      }
    }
  };

  const departureDate = moment.utc(ticket.stops[0].departure_date);
  const arrivalTime = moment.utc(
    ticket.stops[ticket.stops.length - 1].arrival_time,
  );

  const duration = moment.duration(arrivalTime.diff(departureDate));
  const totalHours = Math.floor(duration.asHours());
  const minutes = duration.minutes();

  const durationFormatted = `${totalHours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} hrs`;

  return (
    <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden shrink-0 mb-4">
      {/* Header: Operator & Date */}
      <div className="bg-gray-50 px-5 py-3 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <span className="font-semibold text-gray-900">
          {ticket.operatorInfo?.name}
        </span>
        <div className="flex items-center text-sm text-gray-600 font-medium">
          <FaCalendarAlt className="w-4 h-4 mr-2 text-gray-400" />
          {departureDate.format("ddd, MMMM D, YYYY")}
        </div>
      </div>

      {/* Body: Journey Details & Pricing */}
      <div className="p-5 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
          {/* Timeline Section */}
          <div className="flex-1 w-full flex items-center justify-between">
            {/* Departure */}
            <div className="flex flex-col text-left w-24 sm:w-32">
              <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                {departureDate.format("HH:mm")}
              </span>
              <span className="text-base font-medium text-gray-800 capitalize mt-1">
                {ticket.stops[0].from.city}
              </span>
              <span
                className="text-xs text-gray-500 truncate"
                title={ticket.stops[0].from.name}
              >
                {ticket.stops[0].from.name}
              </span>
            </div>

            {/* Duration Visualizer */}
            <div className="flex-1 px-2 sm:px-6 flex flex-col items-center">
              <span className="text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full mb-2">
                {durationFormatted !== "NaN:NaN hrs"
                  ? durationFormatted
                  : "00:00"}
              </span>
              <div className="w-full flex items-center">
                <div className="w-2 h-2 rounded-full bg-gray-300" />
                <div className="flex-1 h-px bg-gray-300" />
                <div className="w-2 h-2 rounded-full border-2 border-gray-300 bg-white" />
              </div>
            </div>

            {/* Arrival */}
            <div className="flex flex-col text-right w-24 sm:w-32">
              <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                {arrivalTime.format("HH:mm") !== "Invalid date"
                  ? arrivalTime.format("HH:mm")
                  : "00:00"}
              </span>
              <span className="text-base font-medium text-gray-800 capitalize mt-1">
                {ticket.stops[ticket.stops.length - 1].to.city}
              </span>
              <span
                className="text-xs text-gray-500 truncate ml-auto"
                title={ticket.stops[ticket.stops.length - 1].to.name}
              >
                {ticket.stops[ticket.stops.length - 1].to.name}
              </span>
            </div>
          </div>

          {/* Vertical Divider (Desktop only) */}
          <div className="hidden md:block w-px h-16 bg-gray-200" />

          {/* Pricing & Action Section */}
          <div className="w-full md:w-auto flex flex-row md:flex-col justify-between items-center md:items-end gap-3 min-w-[140px] pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
            <div className="flex flex-col items-start md:items-end">
              <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                €{ticket.stops[0].other_prices.our_price.toFixed(2)}
              </span>
            </div>

            <div className="flex flex-col items-end gap-1.5 w-auto">
              <Button
                variant={isBookable ? "primary" : "secondary"}
                className="w-full sm:w-auto min-w-[120px]"
                onClick={handleTicketSelection}
                disabled={!isBookable || isLoading}
              >
                {isLoading && isBookable ? (
                  <Loader2 className="w-4 h-4 animate-spin text-white mx-auto" />
                ) : !isBookable ? (
                  t("actions.viewDetails", "Not Available")
                ) : isReturn && outboundTicket ? (
                  t("ticket.selectReturn", "Select Return")
                ) : tripType !== "round-trip" ? (
                  t("ticket.continue", "Continue")
                ) : (
                  t("ticket.selectOutbound", "Select Outbound")
                )}
              </Button>

              {/* Status Indicators */}
              {ticket.number_of_tickets <= 3 && isBookable && (
                <span className="text-xs font-medium text-orange-600">
                  {ticket.number_of_tickets}{" "}
                  {t("ticket.seatsLeft", "Seats Left")}
                </span>
              )}

              {!isBookable && (
                <span className="text-xs font-medium text-red-500">
                  {t("ticket.notBookable", "Not Available")}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketBlock;
