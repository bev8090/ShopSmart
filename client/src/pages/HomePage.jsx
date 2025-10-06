import Navbar from "../components/Navbar";
import CategoryCard from "../components/CategoryCard";
import header_img from "../assets/shopsmart_header.webp";

const HomePage = () => {
  const categories = ["Clothing", "Toys", "Pets", "Electronics", "Kitchen", "Grocery", "Sports", "Furniture", "Books", "Office", "Seasonal"];

  return (
    <div className="min-h-screen container">
      <Navbar />
      <div className="flex flex-col items-center max-w-7xl mx-auto pt-24">
        <div className="mx-auto my-7.5 relative z-0">
          <img src={header_img} alt="Header Image" className="w-5xl rounded-3xl max-h-3/4" />
          <div className="absolute flex flex-col items-start gap-2 max-w-3/4 bottom-1/10 left-6">
            <h2 className="font-extrabold text-6xl font-mono text-white">Explore a variety of items to shop</h2>
            <p className="text-2xl font-serif text-white">Choose from diverse categories of items ranging from clothes to food to electronics and more</p>
          </div>
        </div>
        <h1 className="text-black font-mono font-bold text-2xl">Explore a selection of products across all categories from A-Z!</h1>
        <div className="text-black font-bold text-lg my-5">
          <h2>Explore by category</h2>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 mt-3">
            {categories.map(category => (<CategoryCard category={category} />))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default HomePage;