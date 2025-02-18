const WhyChooseUs = () => {
  return (
    <div>
      <div className="card text-text lg:card-side bg-primary/20 shadow-xl">
        <figure className="lg:w-1/2">
          <img
            src="https://i.ibb.co.com/6YJBBXG/img-w-text1.jpg"
            className="object-cover  lg:h-full"
          />
        </figure>
        <div className="card-body lg:w-1/2">
          <h2 className="card-title lg:text-4xl font-bold my-2">
            Why Choose Prime Estates
          </h2>
          <p className="lg:text-xl opacity-70 my-2 grow-0">
            Our seasoned team excels in real estate with years of successful
            market navigation, offering informed decisions and optimal results.
          </p>
          <div className="bg-background p-4 flex rounded-2xl items-center gap-4 my-4">
            <div>
              <img
                src={"https://i.ibb.co.com/Hxcy0pj/6747196.png"}
                className="w-24 object-contain"
                alt=""
              />
            </div>
            <div>
              <h2 className="lg:text-2xl font-bold">Proven Expertise</h2>
              <p className="lg:text-xl opacity-70 my-2">
                With years of successful market navigation, we offer informed
                decisions and optimal results
              </p>
            </div>
          </div>
          <div className="bg-background p-4 flex rounded-2xl items-center gap-4 my-4">
            <div>
              <img
                src={"https://i.ibb.co.com/HKLs75j/3146970-200.png"}
                className="w-24 object-contain"
                alt=""
              />
            </div>
            <div>
              <h2 className="lg:text-2xl font-bold">Customized Solutions</h2>
              <p className="lg:text-xl opacity-70 my-2">
                We pride ourselves on crafting specialized strategies to match
                your unique goals, ensuring a seamless real estate journey.
              </p>
            </div>
          </div>
          <div className="bg-background p-4 flex rounded-2xl items-center gap-4 my-4">
            <div>
              <img
                src={"https://i.ibb.co.com/4MDbtsP/9252138.png"}
                className="w-24 object-contain"
                alt=""
              />
            </div>
            <div>
              <h2 className="lg:text-2xl font-bold">
                Transparent Partnerships
              </h2>
              <p className="lg:text-xl opacity-70 my-2">
                We prioritize clear communication and ethical practices,
                fostering trust and reliability throughout.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
