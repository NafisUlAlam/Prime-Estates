const ContactUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 text-text">
      <h1 className="text-xl lg:text-5xl font-bold text-center mb-6">
        Contact Us
      </h1>
      <p className="text-lg text-center max-w-3xl mx-auto">
        Have questions or need assistance? Our team is here to help you find the
        perfect property. Reach out to us via phone, email, or visit our office
        for personalized support.
      </p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 lg:place-items-center">
        <div className="space-y-6">
          <h2 className="text-lg lg:text-3xl font-semibold ">Our Office</h2>
          <p className="text-sm lg:text-lg">
            PrimeEstates HQ, <br />
            1234 Real Estate Street, <br />
            City, Country
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-lg lg:text-3xl font-semibold ">Get in Touch</h2>
          <p className="text-sm lg:text-lg">
            <strong>Phone:</strong> +123 456 7890 <br />
            <strong>Email:</strong> contact@primeestates.com
          </p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl lg:text-3xl font-semibold  text-center mb-4">
          Send Us a Message
        </h2>
        <form className="max-w-3xl mx-auto space-y-6">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border rounded-lg"
          />
          <textarea
            placeholder="Your Message"
            className="w-full p-3 border rounded-lg h-32"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-primary py-3 rounded-lg font-semibold"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
