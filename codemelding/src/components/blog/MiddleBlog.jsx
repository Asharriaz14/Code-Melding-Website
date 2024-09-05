
function ViewBlog() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">

  <div className="max-w-screen-lg mx-auto">
    <div className="flex flex-wrap -mx-4">
      <div className="w-full lg:w-2/3 px-4">
        <h2 className="text-xl font-bold mb-4">Main Content</h2>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rhoncus ultrices nunc, in sagittis nulla
          dapibus non. Sed convallis fermentum ante quis gravida. Morbi finibus lorem eu eros consequat venenatis.
          Vestibulum at tristique neque. Fusce non sem auctor, sagittis arcu eget, euismod nisl. Curabitur et
          bibendum sapien. Cras luctus suscipit magna ac bibendum. Vivamus eu semper urna. Sed ullamcorper nisl vel
          dolor rhoncus facilisis. Donec vehicula nibh vitae est facilisis varius.
        </p>
      </div>
      <div className="w-full lg:w-1/3 px-4">
        <h3 className="text-lg font-bold mb-4">Sidebar</h3>
        <ul className="list-disc pl-4">
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>
    </div>
  </div>
  </div>
  )
}

export default ViewBlog