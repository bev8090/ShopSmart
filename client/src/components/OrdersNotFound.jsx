import { CircleAlertIcon } from "lucide-react";

const OrdersNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center text-black">
      <div className="bg-primary/10 rounded-full p-8">
        <CircleAlertIcon className="size-10" />
      </div>
      <h3 className="text-2xl font-bold">No Orders Found</h3>
      <p className="text-black/70">
        Select from a range of products and make an order to see your order history here.
      </p>
    </div>
  );
};

export default OrdersNotFound;