import React, { useEffect, useState } from "react";
import { Circle, CheckCircle } from "lucide-react";

// Define the Step type for clarity and type safety
interface Step {
  name: string;
  description: string;
  value: string;
}

// Props for OrderStepper
interface OrderStepperProps {
  orderStatus?: string;  // Optional to allow undefined
  orderDate?: string;    // Optional ISO string like "2024-12-31"
}

const OrderStepper: React.FC<OrderStepperProps> = ({ 
  orderStatus = "PLACED",  // Default to "PLACED"
  orderDate 
}) => {
  const [statusStep, setStatusStep] = useState<Step[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0); // Default to first step

  const getFormattedDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  useEffect(() => {
    const baseDate = orderDate ? new Date(orderDate) : new Date();

    const addDays = (days: number) => {
      const newDate = new Date(baseDate);
      newDate.setDate(newDate.getDate() + days);
      return newDate;
    };

    const steps: Step[] = [
      { name: "Order Placed", description: `on ${getFormattedDate(baseDate)}`, value: "PLACED" },
      { name: "Packed", description: "Item Packed in Dispatch Warehouse", value: "PACKED" },
      { name: "Shipped", description: `by ${getFormattedDate(addDays(3))}`, value: "SHIPPED" },
      {
        name: "Arriving",
        description: `by ${getFormattedDate(addDays(5))} - ${getFormattedDate(addDays(6))}`,
        value: "ARRIVING",
      },
      { name: "Arrived", description: `by ${getFormattedDate(addDays(7))}`, value: "DELIVERED" },
    ];

    const canceledStep: Step[] = [
      { name: "Order Placed", description: `on ${getFormattedDate(baseDate)}`, value: "PLACED" },
      { name: "Order Canceled", description: `on ${getFormattedDate(baseDate)}`, value: "CANCELLED" },
    ];

    // Use canceled steps if status is CANCELLED, otherwise use regular steps
    const stepsToUse = orderStatus === "CANCELLED" ? canceledStep : steps;
    setStatusStep(stepsToUse);

    // Find the index of the current status in the steps array
    const index = stepsToUse.findIndex((step) => step.value === orderStatus);
    
    // If status is found, use that index; otherwise default to 0 (Order Placed)
    setCurrentStepIndex(index !== -1 ? index : 0);
  }, [orderStatus, orderDate]);

  return (
    <ol className="relative text-gray-500 border-s border-gray-300 ms-4 mt-4">
      {statusStep.map((step, index) => (
        <li
          key={index}
          className={`mb-10 ms-6 ${
            index <= currentStepIndex ? "text-teal-500" : "text-gray-500"
          }`}
        >
          <span className="absolute flex items-center justify-center w-6 h-6 bg-white rounded-full -start-3 ring-4 ring-white">
            {index <= currentStepIndex ? (
              <CheckCircle className="w-5 h-5 text-teal-500" />
            ) : (
              <Circle className="w-5 h-5 text-gray-300" />
            )}
          </span>
          <h3 className="font-medium leading-tight">{step.name}</h3>
          <p className="text-sm">{step.description}</p>
        </li>
      ))}
    </ol>
  );
};

// For demonstration purposes - shows all statuses
const OrderStepperDemo = () => {
  const [status, setStatus] = useState("PLACED");
  
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Order Status: {status}</h2>
      <div className="mb-4">
        <select 
          value={status} 
          onChange={(e) => setStatus(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="PLACED">Order Placed</option>
          <option value="PACKED">Packed</option>
          <option value="SHIPPED">Shipped</option>
          <option value="ARRIVING">Arriving</option>
          <option value="DELIVERED">Delivered</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>
      <div className="border p-6 rounded-lg">
        <OrderStepper orderStatus={status} orderDate="2025-05-02" />
      </div>
    </div>
  );
};

export default OrderStepper;