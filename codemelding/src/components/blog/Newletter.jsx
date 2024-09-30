import Button from "../buttons/button";

function Newsletter() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12  ">
      <div className="max-w-screen-lg mx-auto bg-[#F5F5F5] p-8 rounded-lg">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-8 py-2 md:py-4 text-center lg:text-left">
            <h2 className="text-xl md:text-3xl font-bold tracking-tight text-Content mb-4">
              Want to know more? — Subscribe
            </h2>
          </div>

          <div className="lg:mt-0 lg:w-1/2">
            {/* form  */}
            <div
              // method="post"
              className="flex flex-row items-start  sm:items-center"
            >
              <input
                id="name"
                type="text"
                autoComplete="name"
                className="w-full sm:w-full flex-grow rounded-md mr-2 md:mr-0 border-white px-5 py-2 placeholder-[#6D6E76] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-[Orange] mb-4 sm:mb-0"
                placeholder="Your name"
              />
              <Button
                type="submit"
                className="sm:ml-3 rounded-md px-5 py-5"
                onClick={() => console.log("Btn is Clicked")}
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Newsletter;
