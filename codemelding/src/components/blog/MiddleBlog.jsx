import { useEffect, useState } from "react";
import { Link as ScrollLink, Element as ScrollElement } from "react-scroll";

const PostDetail = ({ post }) => {
  const { content, sections } = post || {};
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    if (content) {
      // Parse the content and extract headings
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, "text/html");
      const extractedHeadings = Array.from(
        doc.querySelectorAll("h1, h2, h3")
      ).map((heading, index) => ({
        id: `heading-${index}`, // Generate an ID for each heading
        text: heading.innerText,
        tagName: heading.tagName,
      }));
      setHeadings(extractedHeadings);
    }
  }, [content]);

  // Function to replace headings in content with scrollable elements
  const getModifiedContent = () => {
    if (!content) return "";
    let modifiedContent = content;

    headings.forEach((heading) => {
      const regex = new RegExp(`(${heading.text})`, "g");
      modifiedContent = modifiedContent.replace(
        regex,
        `<ScrollElement name="${heading.id}" id="${heading.id}">$1</ScrollElement>`
      );
    });

    return modifiedContent;
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-wrap -mx-4">
          {/* Main Content Section */}
          <div className="w-full lg:w-2/3 px-4">
            <div className="my-4">
              {/* Render HTML content with scrollable elements */}
              <div
                className="text-gray-700 post-content "
                dangerouslySetInnerHTML={{ __html: getModifiedContent() }}
              ></div>
              {sections && sections.length > 0 && (
                <div className="sections">
                  {sections.map((section) => (
                    <div key={section._id} className=" ">
                      {section.image && (
                        <img
                          src={`http://localhost:3000/uploads/${section.image}`}
                          alt={section.text}
                          className="w-full h-auto  mb-4"
                        />
                      )}
                      <div
                        className="content mb-4 post-content"
                        dangerouslySetInnerHTML={{ __html: section.text }}
                      ></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Section */}
          <div className="hidden md:block w-full lg:w-1/3 px-4">
            <div className="bg-[#F5F5F5] max-h-full py-6">
              <h3 className="text-2xl font-bold mb-4 px-6">Contents</h3>
              <ul className="list-none px-4">
                {headings.map((heading, index) => (
                  <li
                    key={index}
                    className={`text-sm p-2 my-1 font-medium ${
                      heading.tagName === "H2" ? "font-bold" : ""
                    }`}
                  >
                    <ScrollLink
                      to={heading.id}
                      smooth={true}
                      duration={500}
                      offset={-100} // Offset for fixed header
                      className="cursor-pointer"
                    >
                      {heading.text}
                    </ScrollLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
