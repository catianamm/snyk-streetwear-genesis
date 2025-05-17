
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menubar, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';
import { fetchFromWooCommerce } from '@/lib/woocommerce';

interface CategoriesMenuProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

interface WooCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

const CategoriesMenu: React.FC<CategoriesMenuProps> = ({ selectedCategory, setSelectedCategory }) => {
  const [categories, setCategories] = useState<WooCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetchFromWooCommerce('/products/categories');
        
        if (Array.isArray(response)) {
          // Only show categories that have products
          const validCategories = response.filter(cat => cat.count > 0);
          setCategories(validCategories);
          console.log('Fetched categories:', validCategories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName.toLowerCase());
  };

  return (
    <div className="sticky top-0 z-30 w-full bg-black text-white py-2 border-b border-zinc-800">
      <div className="container-custom flex justify-center items-center">
        <Menubar className="bg-transparent border-0 flex overflow-x-auto hide-scrollbar">
          {/* All Products Menu Item */}
          <MenubarMenu>
            <MenubarTrigger
              className={`uppercase text-xs tracking-wider px-4 py-2 ${
                selectedCategory === 'all' ? 'text-purple-400 border-b-2 border-purple-400' : 'hover:text-purple-400'
              }`}
              onClick={() => handleCategoryClick('all')}
            >
              All
            </MenubarTrigger>
          </MenubarMenu>

          {/* Dynamic Categories from WooCommerce */}
          {!loading && categories.map((category) => (
            <MenubarMenu key={category.id}>
              <MenubarTrigger
                className={`uppercase text-xs tracking-wider px-4 py-2 whitespace-nowrap ${
                  selectedCategory === category.name.toLowerCase() 
                    ? 'text-purple-400 border-b-2 border-purple-400' 
                    : 'hover:text-purple-400'
                }`}
                onClick={() => handleCategoryClick(category.name)}
              >
                {category.name}
              </MenubarTrigger>
            </MenubarMenu>
          ))}

          {/* Link to Collections Page */}
          <MenubarMenu>
            <Link to="/collections">
              <MenubarTrigger
                className="uppercase text-xs tracking-wider px-4 py-2 hover:text-orange-400"
              >
                Collections
              </MenubarTrigger>
            </Link>
          </MenubarMenu>
        </Menubar>
      </div>
    </div>
  );
};

export default CategoriesMenu;
