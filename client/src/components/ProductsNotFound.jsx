import { CircleAlertIcon } from "lucide-react";
import { Link } from "react-router";

const ProductsNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center min-h-screen text-black">
      <div className="bg-primary/10 rounded-full p-8">
        <CircleAlertIcon className="size-10" />
      </div>
      <h3 className="text-2xl font-bold">No Products Found</h3>
      <p className="text-black/70">
        The products you may be looking for is not available at the moment. Please check back again later.
      </p>
      <Link to="/" className="btn btn-primary">Back to Home Page</Link>
    </div>
  );
};
export default ProductsNotFound;