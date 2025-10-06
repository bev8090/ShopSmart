import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

const categoryImageLink = (category) => {
  switch(category.toLowerCase()){
    case "clothing":
      return "https://png.pngtree.com/png-clipart/20250105/original/pngtree-stack-of-neatly-folded-clothes-illustration-png-image_20084723.png";
    case "toys":
      return "https://png.pngtree.com/png-clipart/20231003/original/pngtree-cute-bear-teddy-toy-png-image_13229592.png";
    case "pets":
      return "https://png.pngtree.com/png-clipart/20250426/original/pngtree-cat-pet-cat-animal-pet-png-image_20890232.png";
    case "electronics":
      return "https://png.pngtree.com/png-clipart/20250515/original/pngtree-modern-desktop-computer-png-image_20978094.png";
    case "kitchen":
      return "https://png.pngtree.com/png-clipart/20250121/original/pngtree-a-functional-group-of-kitchen-utensils-ready-for-meal-preparation-and-png-image_20034684.png";
    case "grocery":
      return "https://png.pngtree.com/png-clipart/20240828/original/pngtree-fresh-vegetables-with-wicker-basket-png-image_15874535.png";
    case "sports":
      return "https://png.pngtree.com/png-clipart/20250415/original/pngtree-collection-of-various-sports-equipment-png-image_20692908.png";
    case "furniture":
      return "https://png.pngtree.com/png-clipart/20241105/original/pngtree-outdoor-furniture-black-and-white-furniture-png-image_16685080.png";
    case "books":
      return "https://png.pngtree.com/png-clipart/20250420/original/pngtree-old-open-book-with-pages-turning-png-image_20860755.png";
    case "office":
      return "https://png.pngtree.com/png-clipart/20211024/original/pngtree-office-supplies-notebook-office-tools-work-study-png-image_6869211.png";
    case "seasonal":
      return "https://png.pngtree.com/png-clipart/20190611/original/pngtree-four-seasons-health-spring-and-summer-autumn-and-winter-png-image_3148982.jpg";
  }
}

const CategoryCard = ({category}) => {
  return (
    <Link to={`/products/${category.toLowerCase()}`} className="card bg-gradient-to-b from-white to-blue-50 hover:shadow-lg border-2">
      <div className="card-body">
        <div className="flex items-center justify-center">
          <h3 className="card-title text-black">{category}</h3>
          <ArrowRight className="size-4 ml-2"/>
        </div>
        <img src={categoryImageLink(category)} alt="category image" className="size-25"/>
      </div>
    </Link>
  )
}

export default CategoryCard;