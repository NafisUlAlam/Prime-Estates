import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";

const CheckoutForm = ({ offer }) => {
  const { _id: offerId, offerAmount } = offer;

  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");

  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  const patchOfferMutation = useMutation({
    mutationFn: async ({ offerId, info }) => {
      console.log(offerId, info);
      const { data } = await axiosSecure.patch(`/offers/${offerId}`, info);
      return data;
    },
  });

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { price: offerAmount })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      });
  }, [axiosSecure, offerAmount]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      console.log("error from stripe", error);
    } else {
      setError("");
      console.log("payment method", paymentMethod);
    }

    //payment now
    const { paymentIntent, error: paymentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "anonymous",
          },
        },
      });

    if (paymentError) {
      console.log("payment error", paymentError);
      Swal.fire({
        title: `${paymentError.message}`,
        text: "Could not complete payment",
        icon: "error",
      });
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        //save to database
        const info = {
          status: "bought",
          transactionId: paymentIntent.id,
        };
        //console.log("info", info);

        patchOfferMutation.mutate(
          { offerId, info },
          {
            onSuccess: () => {
              Swal.fire({
                title: "Payment Successful!",
                text: `Your transaction id : ${paymentIntent.id}!`,
                icon: "success",
              });
            },
            onError: (error) => {
              Swal.fire({
                title: `${error.meesage}`,
                text: "Could not save payment info to the database",
                icon: "error",
              });
            },
          }
        );
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      ></CardElement>
      <button
        type="submit"
        className="btn btn-primary my-4"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      <p className="text-red-500 text-sm">{error}</p>
    </form>
  );
};
CheckoutForm.propTypes = {
  offer: PropTypes.object,
};
export default CheckoutForm;
