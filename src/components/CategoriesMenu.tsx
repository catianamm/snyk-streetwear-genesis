import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menubar, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';
import { fetchFromWooCommerce } from '@/lib/woocommerce';

interface CategoriesMenuProps {
  selectedFilter: string; // Renamed from selectedCategory
  setSelectedFilter: (filter: string) => void; // Renamed from setSelectedCategory
}

interface WooCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

const CategoriesMenu: React.FC<CategoriesMenuProps> = ({ selectedFilter, setSelectedFilter }) => {
  const [categories, setCategories] = useState<WooCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetchFromWooCommerce('/products/categories?per_page=100&orderby=name&order=asc');
        
        if (Array.isArray(response)) {
          const validCategories = response.filter(cat => cat.count > 0 && cat.slug !== 'uncategorized'); // Exclude uncategorized
          setCategories(validCategories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryIdentifier: string) => {
    // This will set the active filter in Products.tsx
    setSelectedFilter(categoryIdentifier.toLowerCase());
  };

  return (
    <Menubar className="bg-transparent border-0 flex">
      {/* All Products Menu Item */}
      <MenubarMenu>
        <MenubarTrigger
          className={`uppercase text-xs tracking-wider px-4 py-2 ${
            selectedFilter === 'all' ? 'text-purple-400 border-b-2 border-purple-400' : 'hover:text-purple-400'
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
              selectedFilter === category.slug.toLowerCase() // Compare with category slug
                ? 'text-purple-400 border-b-2 border-purple-400' 
                : 'hover:text-purple-400'
            }`}
            onClick={() => handleCategoryClick(category.slug)} // Pass slug
            >
            {category.name}
            </MenubarTrigger>
        </MenubarMenu>
      ))}

      {/* Collections View Menu Item */}
      <MenubarMenu>
        <MenubarTrigger
          className={`uppercase text-xs tracking-wider px-4 py-2 ${
            selectedFilter === 'collections_view' ? 'text-purple-400 border-b-2 border-purple-400' : 'hover:text-purple-400'
          }`}
          onClick={() => handleCategoryClick('collections_view')}
        >
          Collections
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>

      

  );
};

export default CategoriesMenu;
