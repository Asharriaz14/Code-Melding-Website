import { BsArrowDownCircle } from "react-icons/bs";
import {FaqQuestions} from '../home/SeriveNoteBook'


function FaqSection() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
      <div className="max-w-screen-lg mx-auto">
        <div className="px-5">
          <div className="flex flex-col items-center">
            <h2 className="mt-5 text-center text-3xl font-bold tracking-tight md:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="mt-8 grid max-w-screen-lg divide-y divide-neutral-200">
            {FaqQuestions.map((item, index) => (
              <div className="p-5 bg-[#F5F5F5] my-2 rounded-lg" key={index}>
                <details className="group ">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-lg hover:text-Orange">
                    <span>{item.ques}</span>
                    <span className="transition-transform duration-200 group-open:rotate-180">
                      <BsArrowDownCircle className="w-6 h-6" />
                    </span>
                  </summary>
                  <p className="group-open:animate-fadeIn mt-3 text-Content text-sm font-medium">
                    {item.ans}
                  </p>
                </details>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FaqSection;
