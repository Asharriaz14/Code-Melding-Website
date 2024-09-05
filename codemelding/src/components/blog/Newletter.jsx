import Button from "../buttons/button";

function Newsletter() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="rounded-3xl bg-gray-900 py-10  sm:py-16 sm:px-12 lg:flex lg:items-center lg:p-20">
        <div className="lg:w-0 lg:flex-1">
          <h2 className="text-3xl font-bold tracking-tight text-white">
          Want to know more? — Subscribe
          </h2>
         
        </div>
        <div className="mt-12 sm:w-full sm:max-w-md lg:mt-0 lg:ml-8 lg:flex-1">
          <form method="post" className="sm:flex sm:space-y-0 space-y-4">
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              className="w-full rounded-md sm:mr-3 border-white px-5 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-700"
              placeholder="Your name"
            />
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
           
            <Button
              type="submit"
              className="mt-3 sm:mt-0 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-500 px-5 py-3 text-base font-medium text-white hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-700 sm:ml-3 sm:w-auto sm:flex-shrink-0"
            >
              Subscribe
            </Button>
          </form>
         
        </div>
      </div>
    </div>
  );
}

export default Newsletter;
