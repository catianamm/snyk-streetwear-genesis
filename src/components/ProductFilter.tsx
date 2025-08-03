import { useState } from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { 
  Filter, 
  X 
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterOption {
  id: string;
  label: string;
  checked: boolean;
}
interface TagInfo { // For the availableTags prop
  slug: string;
  name: string;
}

interface ProductFilterProps {
  availableTags: TagInfo[]; 
  selectedTagSlug: string; 
  setSelectedTagSlug: (tagSlug: string) => void; 
  onResetTag: (tagSlug: string) => void; 
  isMobileOpen: boolean;
  setIsMobileOpen: (isOpen: boolean) => void;
  priceSortOrder: 'none' | 'asc' | 'desc';
  setPriceSortOrder: (order: 'none' | 'asc' | 'desc') => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ 
  availableTags, 
  selectedTagSlug, 
  setSelectedTagSlug,
  onResetTag,
  isMobileOpen,
  setIsMobileOpen,
  priceSortOrder,
  setPriceSortOrder
}) => {
  // Filter states
  const [sizeOptions, setSizeOptions] = useState<FilterOption[]>([
   
    { id: 's', label: 'S', checked: false },
      { id: 'l', label: 'L', checked: false },
    { id: 'm', label: 'M', checked: false },  
    { id: 'xl', label: 'XL', checked: false },
   
  ]);

  const [colorOptions, setColorOptions] = useState<FilterOption[]>([
    { id: 'black', label: 'Black', checked: false },
     { id: 'blue', label: 'Blue', checked: false },
    { id: 'white', label: 'White', checked: false },
     { id: 'red', label: 'Red', checked: false },
    { id: 'gray', label: 'Gray', checked: false },
     
    { id: 'green', label: 'Green', checked: false },
  ]);

  const [priceRange, setPriceRange] = useState<number[]>([0, 100]); // Changed initial range

  // Count applied filters
  const getAppliedFiltersCount = () => {
    const sizeCount = sizeOptions.filter(option => option.checked).length;
    const colorCount = colorOptions.filter(option => option.checked).length;
    const tagCount = selectedTagSlug !== 'all' ? 1 : 0; // Changed to selectedTagSlug
    
    // Price range and sort order are not counted as "filters" in the badge for simplicity
    return sizeCount + colorCount + tagCount; 
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
    setPriceRange([0, 100]); // Reset to initial desired range, e.g., 0-100
    onResetTag('all'); // Use the new prop to reset tag filter to 'all'
    setPriceSortOrder('none'); // Reset sort order
  };

  return (
    <>
      {/* Removed the top-level mobile filter button, as triggering is handled by Products.tsx SheetTrigger */}
      
      {/* Filter sidebar - hidden on mobile unless opened */}
      <div className={` px-4
        ${isMobileOpen 
          ? 'flex flex-col h-full w-full bg-black text-zinc-200' // Dark theme for sheet
          : 'hidden md:block md:sticky md:top-[124px] md:self-start md:h-[calc(100vh-124px)] md:w-[250px] md:border-r md:border-zinc-200 bg-white' // Styles for desktop sticky sidebar
        }
      `}>
        {/* The SheetContent in Products.tsx provides its own close button, so we only need the title area here */}
        {/* This header is now always visible, styled conditionally */}
        <div className={`flex justify-between items-center p-4 border-b ${isMobileOpen ? 'bg-black border-zinc-700' : 'bg-white border-zinc-200'}`}>
          <h2 className={`text-xl font-display uppercase ${isMobileOpen ? 'text-purple-500' : 'text-purple-500'}`}>Filters</h2>
          
        </div>
        
        {/* Filter content */}
        <div className={`
          p-4 overflow-y-auto flex-grow ${isMobileOpen ? 'bg-black' : 'bg-white'}
          ${isMobileOpen ? 'w-full' : '' /* Takes full width of parent (SheetContent or desktop column) */}
        `}>
          <Accordion type="multiple" defaultValue={['categories', 'sizes', 'colors', 'price']} className="w-full">
            {/* Categories */}
            <AccordionItem value="tags" className={`border-b ${isMobileOpen ? 'border-zinc-700' : 'border-zinc-200'}`}>
              <AccordionTrigger className={`py-4 text-sm ${isMobileOpen ? 'text-zinc-200 hover:text-white [&[data-state=open]]:text-purple-400' : 'text-black'}`}>Tags</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-1">
                  {availableTags.map((tag) => (
                    <div key={tag.slug} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`tag-${tag.slug}`} 
                        checked={selectedTagSlug === tag.slug.toLowerCase()}
                        onCheckedChange={() => setSelectedTagSlug(tag.slug.toLowerCase())}
                        className={`${isMobileOpen ? 'border-zinc-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600' : ''}`}
                      />
                      <Label htmlFor={`tag-${tag.slug}`} className={`text-sm font-normal capitalize ${isMobileOpen ? 'text-zinc-300' : 'text-black'}`}>
                        {tag.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Sizes */}
            <AccordionItem value="sizes" className={`border-b ${isMobileOpen ? 'border-zinc-700' : 'border-zinc-200'}`}>
              <AccordionTrigger className={`py-4 text-sm ${isMobileOpen ? 'text-zinc-200 hover:text-white [&[data-state=open]]:text-purple-400' : 'text-black'}`}>Size</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {sizeOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`size-${option.id}`} 
                        checked={option.checked}
                        onCheckedChange={() => handleSizeChange(option.id)}
                        className={`${isMobileOpen ? 'border-zinc-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600' : ''}`}
                      />
                      <Label htmlFor={`size-${option.id}`} className={`text-sm font-normal ${isMobileOpen ? 'text-zinc-300' : 'text-black'}`}>
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Colors */}
            <AccordionItem value="colors" className={`border-b ${isMobileOpen ? 'border-zinc-700' : 'border-zinc-200'}`}>
              <AccordionTrigger className={`py-4 text-sm ${isMobileOpen ? 'text-zinc-200 hover:text-white [&[data-state=open]]:text-purple-400' : 'text-black'}`}>Color</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {colorOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`color-${option.id}`} 
                        checked={option.checked}
                        onCheckedChange={() => handleColorChange(option.id)}
                        className={`${isMobileOpen ? 'border-zinc-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600' : ''}`}
                      />
                      <Label htmlFor={`color-${option.id}`} className={`text-sm font-normal ${isMobileOpen ? 'text-zinc-300' : 'text-black'}`}>
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Price Range */}
            <AccordionItem value="price" className={`border-b ${isMobileOpen ? 'border-zinc-700' : 'border-zinc-200'}`}>
              <AccordionTrigger className={`py-4 text-sm ${isMobileOpen ? 'text-zinc-200 hover:text-white [&[data-state=open]]:text-purple-400' : 'text-black'}`}>Price</AccordionTrigger>
              <AccordionContent>
                <div className="pt-4 px-1">
                  <Slider
                    // defaultValue can be removed if value is controlled, or set to initial range
                    max={300}
                    step={1}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className={`mb-4 ${isMobileOpen ? '[&>span:first-child]:bg-zinc-700' : ''}`} // Target track for dark theme
                  />
                  <div className="flex justify-between text-sm mb-6">
                    <span className={`text-sm ${isMobileOpen ? 'text-zinc-300' : 'text-zinc-700'}`}>${priceRange[0]}</span>
                    <span className={`text-sm ${isMobileOpen ? 'text-zinc-300' : 'text-zinc-700'}`}>${priceRange[1]}</span>
                  </div>

                  {/* Sort by Dropdown */}
                  <div className="space-y-1 ">
                    <Label htmlFor="sort-price" className={`text-xs ${isMobileOpen ? 'text-zinc-400' : 'text-zinc-700'}`}>Sort by Price</Label>
                    <Select
                      value={priceSortOrder}
                      onValueChange={(value: 'none' | 'asc' | 'desc') => setPriceSortOrder(value)}
                    >
                      <SelectTrigger id="sort-price" className={`w-full text-sm ${isMobileOpen ? 'bg-zinc-900 border-zinc-700 text-zinc-200 focus:ring-purple-500 [&>span]:text-zinc-200' : 'bg-white border-input'}`}>
                        <SelectValue placeholder="Default" />
                      </SelectTrigger>
                      <SelectContent className={`${isMobileOpen ? 'bg-zinc-900 border-zinc-700 text-zinc-200' : ''}`}>
                        <SelectItem value="none">Default</SelectItem>
                        <SelectItem value="asc">Price ascending</SelectItem>
                        <SelectItem value="desc">Price descending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Mobile view action buttons - fixed at the bottom of the sheet */}
        {isMobileOpen && (
          <div className="p-4 border-t border-zinc-700 bg-black"> {/* Dark border and bg */}
            <div className="flex space-x-2">
              <Button
                variant="outline" // Keep variant for potential base styles
                onClick={clearAllFilters}
                className={`flex-1 border-zinc-600 text-black hover:bg-zinc-800 hover:text-white`}
              >
                Clear All
              </Button>
              <Button
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => setIsMobileOpen(false)}
              >
                Apply Filters
              </Button>
            </div>
        </div>
        )}
      </div>
    </>
  );
};

export default ProductFilter;
