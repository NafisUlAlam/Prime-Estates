import {
  FaBuilding,
  FaUsers,
  FaHandshake,
  FaHistory,
  FaPhoneAlt,
  FaMapMarkedAlt,
} from "react-icons/fa";
import { Card, CardContent } from "./AboutUsCard";

const AboutUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-text mb-6">
        About PrimeEstates
      </h1>
      <p className="text-lg text-text  text-center max-w-3xl mx-auto">
        PrimeEstates is dedicated to helping you find your dream property with
        ease. Whether you are buying, selling, or renting, we provide expert
        guidance and seamless experiences tailored to your needs.
      </p>

      <div className="grid md:grid-cols-3 gap-8 mt-12">
        <Card className="shadow-lg p-6 text-center">
          <FaBuilding className="text-5xl text-text mx-auto" />
          <CardContent>
            <h2 className="text-2xl font-semibold text-text mt-4">
              Our Mission
            </h2>
            <p className="text-text mt-2">
              To connect people with the best real estate opportunities through
              innovation and dedication.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg p-6 text-center">
          <FaUsers className="text-5xl text-text mx-auto" />
          <CardContent>
            <h2 className="text-2xl font-semibold text-text mt-4">Our Team</h2>
            <p className="text-text mt-2">
              A team of experienced real estate professionals committed to
              excellence and customer satisfaction.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg p-6 text-center">
          <FaHandshake className="text-5xl text-text mx-auto" />
          <CardContent>
            <h2 className="text-2xl font-semibold text-text mt-4">
              Our Promise
            </h2>
            <p className="text-text mt-2">
              To provide transparent, reliable, and hassle-free property
              solutions for buyers, sellers, and renters.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg p-6 text-center">
          <FaMapMarkedAlt className="text-5xl text-text mx-auto" />
          <CardContent>
            <h2 className="text-2xl font-semibold text-text mt-4">
              Our Locations
            </h2>
            <p className="text-text mt-2">
              We operate in major cities across the country, providing prime
              real estate options in the best locations.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg p-6 text-center">
          <FaPhoneAlt className="text-5xl text-text mx-auto" />
          <CardContent>
            <h2 className="text-2xl font-semibold text-text mt-4">
              Contact Us
            </h2>
            <p className="text-text mt-2">
              Reach out to our support team for any inquiries. We are here to
              assist you every step of the way.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg p-6 text-center">
          <FaHistory className="text-5xl text-text mx-auto" />
          <CardContent>
            <h2 className="text-2xl font-semibold text-text mt-4">
              Our History
            </h2>
            <p className="text-text mt-2">
              Founded in 2010, PrimeEstates has grown from a small local agency
              into a nationwide leader in real estate services, known for
              innovation, integrity, and a commitment to customer satisfaction.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutUs;
