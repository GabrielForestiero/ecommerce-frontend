import { Suspense } from "react";
import OrderConfirmationClient from "./OrderConfirmationClient";

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <p className="text-center pt-20 text-gray-600 text-lg">
          Cargando confirmación de la orden...
        </p>
      }
    >
      <OrderConfirmationClient />
    </Suspense>
  );
}
