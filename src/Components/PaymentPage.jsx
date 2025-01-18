import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../hooks/useAxiosSecure";
import TitleAndSubTitle from "./TitleAndSubTitle";
import { useParams } from "react-router-dom";
import PageLoading from "./PageLoading";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const PaymentPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { data: offer = {}, isLoading: isOfferLoading } = useQuery({
    queryKey: ["offers", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/offers/${id}`);
      return data[0];
    },
  });

  if (isOfferLoading) return <PageLoading></PageLoading>;
  console.log(offer);
  const { offerAmount, propertyDetails, sellerDetails } = offer;
  return (
    <div>
      <TitleAndSubTitle
        title={"Finalize Your Purchase"}
        subtitle={`Complete your payment securely and take the final step toward owning your dream property. Review your order details and proceed with confidence.`}
      ></TitleAndSubTitle>

      <div className="space-y-4 flex flex-col items-center justify-center">
        <div>
          <h2 className="lg:text-3xl">
            Pay:
            <span className="font-extrabold lg:text-3xl"> ${offerAmount}</span>
          </h2>
        </div>
        <h2 className="font-bold lg:text-xl">{propertyDetails.title}</h2>
        <img
          src={propertyDetails.photoURL}
          className="h-60 object-cover rounded-lg"
          alt=""
        />
        <div className="flex items-center gap-2">
          <img
            src={sellerDetails.photoURL}
            className="size-8 rounded-full"
            alt=""
          />
          <div>
            <p className="font-semibold">{sellerDetails.name}</p>
            <p className="font-semibold opacity-60">
              @{sellerDetails.email.split("@")[0]}
            </p>
          </div>
        </div>
      </div>

      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm offer={offer}></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default PaymentPage;
