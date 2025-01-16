import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import PropTypes from "prop-types";
import { useState } from "react";
import ReactStars from "react-rating-stars-component";

export default function MyModal({ close, isModalOpen, handleAddReview, id }) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(1);
  const handleSubmit = () => {
    //console.log(review);
    console.log(rating);
    handleAddReview(id, review, rating);
  };
  return (
    <>
      <Dialog
        open={isModalOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl  p-6 bg-blue-100 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-center text-2xl font-bold">
                Give your opinion
              </DialogTitle>
              <textarea
                onChange={(e) => setReview(e.target.value)}
                value={review}
                id=""
                className="w-full  mt-8 p-4 rounded-md"
                placeholder="please share your honest review..."
                rows={10}
              ></textarea>
              <ReactStars
                count={5}
                value={rating}
                onChange={(e) => setRating(e)}
                size={24}
                activeColor="#ffd700"
              />
              ,
              <div className="mt-4 text-center flex gap-4 justify-center">
                <button
                  className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 btn"
                  onClick={handleSubmit}
                >
                  Add review
                </button>
                <Button
                  className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 btn"
                  onClick={close}
                >
                  Cancel
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}

MyModal.propTypes = {
  close: PropTypes.func,
  isModalOpen: PropTypes.bool,
  handleAddReview: PropTypes.func,
  id: PropTypes.string,
};
