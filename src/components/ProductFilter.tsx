
import React, { useState } from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { 
  Filter, 
  X 
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface FilterOption {
  id: string;
  label: string;
  checked: boolean;
}

interface ProductFilterProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (isOpen: boolean) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ 
  categories, 
  selectedCategory, 
  setSelectedCategory,
  isMobileOpen,
  setIsMobileOpen
}) => {
  // Filter states
  const [sizeOptions, setSizeOptions] = useState<FilterOption[]>([
    { id: 'xs', label: 'XS', checked: false },
    { id: 's', label: 'S', checked: false },
    { id: 'm', label: 'M', checked: false },
    { id: 'l', label: 'L', checked: false },
    { id: 'xl', label: 'XL', checked: false },
    { id: 'xxl', label: '2XL', checked: false },
  ]);

  const [colorOptions, setColorOptions] = useState<FilterOption[]>([
    { id: 'black', label: 'Black', checked: false },
    { id: 'white', label: 'White', checked: false },
    { id: 'gray', label: 'Gray', checked: false },
    { id: 'red', label: 'Red', checked: false },
    { id: 'blue', label: 'Blue', checked: false },
    { id: 'green', label: 'Green', checked: false },
  ]);

  const [priceRange, setPriceRange] = useState<number[]>([0, 100]);

  // Count applied filters
  const getAppliedFiltersCount = () => {
    const sizeCount = sizeOptions.filter(option => option.checked).length;
    const colorCount = colorOptions.filter(option => option.checked).length;
    const categoryCount = selectedCategory !== 'all' ? 1 : 0;
    
    return sizeCount + colorCount + categoryCount;
  };

  // Handle checkbox changes
  const handleSizeChange = (id: string) => {
    setSizeOptions(prev => 
      prev.map(option => 
        option.id === id ? { ...option, checked: !option.checked } : option
      )
    );
  };

  const handleColorChange = (id: string) => {
    setColorOptions(prev => 
      prev.map(option => 
        option.id === id ? { ...option, checked: !option.checked } : option
      )
    );
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSizeOptions(prev => prev.map(option => ({ ...option, checked: false })));
    setColorOptions(prev => prev.map(option => ({ ...option, checked: false })));
    setPriceRange([0, 100]);
    setSelectedCategory('all');
  };

  return (
    <>
      {/* Mobile filter button */}
      <div className="md:hidden mb-4 w-full">
        <Button 
          variant="outline" 
          className="w-full flex justify-between items-center border-black text-black"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          <div className="flex items-center">
            <Filter size={16} className="mr-2" />
            Filter Products
          </div>
          {getAppliedFiltersCount() > 0 && (
            <span className="bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {getAppliedFiltersCount()}
            </span>
          )}
        </Button>
      </div>
      
      {/* Filter sidebar - hidden on mobile unless opened */}
      <div className={`
        ${isMobileOpen ? 'fixed inset-0 z-50 bg-black/50 md:bg-transparent md:static' : 'hidden md:block'} 
        md:sticky md:top-[124px] md:self-start md:h-[calc(100vh-124px)]
      `}>
        {/* Mobile header */}
        <div className="md:hidden flex justify-between items-center p-4 bg-white">
          <h2 className="text-lg font-medium">Filters</h2>
          <Button variant="ghost" onClick={() => setIsMobileOpen(false)}>
            <X size={20} />
          </Button>
        </div>
        
        {/* Filter content */}
        <div className={`
          bg-white p-4 overflow-y-auto
          ${isMobileOpen ? 'w-[85vw] h-full' : 'w-full'}
          md:w-[250px] md:max-h-[calc(100vh-124px)] md:border-r md:border-zinc-200
        `}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-md font-medium hidden md:block">Filters</h2>
            {getAppliedFiltersCount() > 0 && (
              <Button 
                variant="link" 
                className="text-black text-sm p-0 h-auto underline"
                onClick={clearAllFilters}
              >
                Clear All
              </Button>
            )}
          </div>
          
          <Accordion type="multiple" defaultValue={['categories', 'sizes', 'colors', 'price']} className="w-full">
            {/* Categories */}
            <AccordionItem value="categories" className="border-b border-zinc-200">
              <AccordionTrigger className="py-4 text-sm">Categories</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-1">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="category-all" 
                      checked={selectedCategory === 'all'}
                      onCheckedChange={() => setSelectedCategory('all')}
                    />
                    <Label htmlFor="category-all" className="text-sm font-normal">All Products</Label>
                  </div>
                  
                  {categories.filter(cat => cat !== 'all').map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`category-${category}`} 
                        checked={selectedCategory === category}
                        onCheckedChange={() => setSelectedCategory(category)}
                      />
                      <Label htmlFor={`category-${category}`} className="text-sm font-normal capitalize">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Sizes */}
            <AccordionItem value="sizes" className="border-b border-zinc-200">
              <AccordionTrigger className="py-4 text-sm">Size</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {sizeOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`size-${option.id}`} 
                        checked={option.checked}
                        onCheckedChange={() => handleSizeChange(option.id)}
                      />
                      <Label htmlFor={`size-${option.id}`} className="text-sm font-normal">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Colors */}
            <AccordionItem value="colors" className="border-b border-zinc-200">
              <AccordionTrigger className="py-4 text-sm">Color</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {colorOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`color-${option.id}`} 
                        checked={option.checked}
                        onCheckedChange={() => handleColorChange(option.id)}
                      />
                      <Label htmlFor={`color-${option.id}`} className="text-sm font-normal">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Price Range */}
            <AccordionItem value="price" className="border-b border-zinc-200">
              <AccordionTrigger className="py-4 text-sm">Price</AccordionTrigger>
              <AccordionContent>
                <div className="pt-4 px-1">
                  <Slider
                    defaultValue={[0, 100]}
                    max={100}
                    step={1}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="my-6"
                  />
                  <div className="flex justify-between">
                    <span className="text-sm">${priceRange[0]}</span>
                    <span className="text-sm">${priceRange[1]}</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          {/* Mobile view apply and clear buttons */}
          <div className="mt-6 flex space-x-2 md:hidden">
            <Button 
              className="flex-1" 
              variant="outline"
              onClick={clearAllFilters}
            >
              Clear All
            </Button>
            <Button 
              className="flex-1 bg-black hover:bg-zinc-800"
              onClick={() => setIsMobileOpen(false)}
            >
              Apply
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductFilter;
