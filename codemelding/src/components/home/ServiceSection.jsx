import { useState } from 'react';
import { tabs } from './SeriveNoteBook';
import { tabContent } from './SeriveNoteBook';
import { Link } from 'react-router-dom';
import '../../App.css';

function ServiceSection() {
  const [activeTab, setActiveTab] = useState(3);

  return (
    <div className="h-auto md:h-[500px] max-w-screen-xl px-8 mx-auto my-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center pb-12">
        Our Main Areas of Focus
      </h2>
      <div className="flex flex-col-reverse md:flex-row h-2/3 overflow-hidden">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 overflow-y-auto custom-scrollbar h-[300px]">
          <div className="flex flex-col">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex items-center text-left w-full transition-colors duration-300 ease-in-out my-2 py-4 px-6 rounded-lg
                  ${activeTab === index ? 'bg-[#FF3D00] text-white' : 'bg-[#FAFAFA] text-gray-900'}
                  ${activeTab !== index ? 'hover:bg-[#fb7f58] hover:text-white' : ''}
                `}
              >
                <span
                  className={`mr-3 text-3xl ${activeTab === index ? 'text-white' : 'text-Orange'}`}
                >
                  {tab.icon}
                </span>
                <span
                  className={`text-base font-semibold ${activeTab === index ? 'text-white' : 'text-gray-900'}`}
                >
                  {tab.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="w-full md:w-3/4 p-1 overflow-y-auto flex items-center justify-center rounded-lg h-auto">
          <div className="bg-Content p-12 rounded-lg shadow-lg w-full max-w-2xl border-4 border-Orange">
            <h4 className="text-2xl font-semibold text-White mb-4 uppercase">
              {tabContent[activeTab].heading}
            </h4>
            <p className="text-sm text-White mb-4 font-thin">
              {tabContent[activeTab].paragraph}
            </p>
            <div className="flex flex-wrap gap-4">
              {tabContent[activeTab].icons.map((icon, index) => (
                <Link
                  key={index}
                  to={icon.to}
                  className="flex flex-col items-center space-x-2 text-White hover:text-orange-500"
                >
                  <span
                    className="bg-[#2f2f2f] text-2xl p-4 rounded-lg mb-2 transition-colors duration-300 ease-in-out 
                    hover:bg-[#33201a]"
                  >
                    {icon.icon}
                  </span>
                  <span className="text-sm">{icon.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceSection;
