import { useEffect, useState, useMemo } from 'react'; // Added useMemo
import { Link } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer'; // Keep Footer import
import CategoriesMenu from '@/components/CategoriesMenu';
import ProductFilter from '@/components/ProductFilter';
import { Filter, Loader2 } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { fetchFromWooCommerce } from '@/lib/woocommerce'; // For fetching categories/collections

// Define an interface for the collection data we'll fetch for the "collections_view"
interface CollectionItem {
  id: number;
  name: string;
  slug: string;
  image: { src: string } | null;
  count: number;
  description?: string;
}

const Products = () => {
  const { products, loading: productsLoading, error: productsError } = useProducts();
  const [activeFilter, setActiveFilter] = useState("all"); // "all", "collections_view", or a tag slug
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [priceSortOrder, setPriceSortOrder] = useState<'none' | 'asc' | 'desc'>('none');

  const [collections, setCollections] = useState<CollectionItem[]>([]);
  const [collectionsLoading, setCollectionsLoading] = useState(false);
  const [collectionsError, setCollectionsError] = useState<string | null>(null);

  // Effect to fetch collections data when "collections_view" is selected
  useEffect(() => {
    if (activeFilter === "collections_view") {
      const fetchCollectionsData = async () => {
        setCollectionsLoading(true);
        setCollectionsError(null);
        setCollections([]); // Clear previous collections
        try {
          // Fetching categories from WooCommerce to serve as collections
          const fetchedData = await fetchFromWooCommerce('/products/categories?per_page=100&orderby=name&order=asc&hide_empty=true');
          if (Array.isArray(fetchedData)) {
            const validCollections = fetchedData.filter(cat => cat.slug !== 'uncategorized');
            setCollections(validCollections);
          } else {
            setCollectionsError("Unexpected data format for collections.");
          }
        } catch (err) {
          console.error("Error fetching collections for view:", err);
          setCollectionsError("Could not load collections.");
        } finally {
          setCollectionsLoading(false);
        }
      };
      fetchCollectionsData();
    }
  }, [activeFilter]);

  // Extract unique tags from products (for filter panel)
  const productTagsForFilterPanel = useMemo(() => {
    const allTags = products.flatMap(product => product.tags || []); // Use all products
    // Create a map to ensure unique tags by slug, preferring the first name encountered
    const uniqueTagsMap = new Map<string, { slug: string; name: string }>();
    allTags.forEach(tag => {
      const lowerSlug = tag.slug.toLowerCase();
      if (!uniqueTagsMap.has(lowerSlug)) {
        uniqueTagsMap.set(lowerSlug, { slug: lowerSlug, name: tag.name || lowerSlug }); // Use tag.name
      }
    });
    return [{ slug: "all", name: "All Products" }, ...Array.from(uniqueTagsMap.values())];
  }, [products]); // Depend on all products

  // Filter and sort products (for product grid view)
  const displayedProducts = useMemo(() => {
    if (activeFilter === "collections_view") {
      return []; // No products to show directly in this view
    }
    let tempProducts = activeFilter === "all"
      ? products // Use all products for "all" filter
      : products.filter(product => // Filter all products by tag
          product.tags?.some(tag => tag.slug.toLowerCase() === activeFilter.toLowerCase())
        );

    if (priceSortOrder === 'asc') {
      tempProducts = [...tempProducts].sort((a, b) => a.price - b.price);
    } else if (priceSortOrder === 'desc') {
      tempProducts = [...tempProducts].sort((a, b) => b.price - a.price);
    }
    return tempProducts;
  }, [products, activeFilter, priceSortOrder]); // Depend on all products

  const handleCollectionClick = (collectionSlug: string) => {
    setActiveFilter(collectionSlug.toLowerCase()); // Set activeFilter to the collection's slug (treated as a tag)
  };

  // Function to reset category filter without closing the sheet
  const handleCategoryReset = (categorySlug: string) => {
    setActiveFilter(categorySlug.toLowerCase()); // Reset activeFilter (e.g., to 'all')
  };

  // Lock body scroll when mobile filter is open
  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileFilterOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      {/* Navbar and TopBar are now rendered by App.tsx (DefaultPageHeader) */}
      {/* DefaultPageHeader is fixed top-0, h-18 (72px), z-40 */}

      {/* This div is the main scrollable container for the page content below the fixed DefaultPageHeader */}
      <div className="flex-grow pt-[72px]"> {/* Padding to clear the fixed DefaultPageHeader */}
        {/* Breadcrumbs Section */}
       

        {/* Categories and Filter Button Bar - This will stick to the top of this scrollable container */}
        {/* The top-[72px] makes it stick below the DefaultPageHeader */}
    <div className="sticky top-[72px] z-30 bg-white pb-0">
      <div className="container-custom flex items-center justify-between h-10 py-2"> {/* Removed bg, border from here */}
            {/* CategoriesMenu will take available space */}
            <div className="flex-grow overflow-x-auto hide-scrollbar">
              <CategoriesMenu selectedFilter={activeFilter} setSelectedFilter={setActiveFilter} />
            </div>
            {/* Filter Button */}
            {activeFilter !== "collections_view" && ( // Only show filter button if not in collections view
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="ml-4 flex-shrink-0">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full h-full p-0 bg-black text-zinc-200">
                  <ProductFilter
                    availableTags={productTagsForFilterPanel} // Pass tags
                    selectedTagSlug={activeFilter} // Pass current active filter as selectedTagSlug
                    setSelectedTagSlug={(tagSlug) => { // Expects to set a tag
                      setActiveFilter(tagSlug.toLowerCase());
                      setSheetOpen(false);
                      }}
                    onResetTag={handleCategoryReset} // Renamed prop for clarity
                    
                    isMobileOpen={true}
                    setIsMobileOpen={() => setSheetOpen(false)}
                    priceSortOrder={priceSortOrder}
                    setPriceSortOrder={setPriceSortOrder}
                  />
                </SheetContent>
              </Sheet>
            )}
      </div>
        </div>

        {/* Main Content Area */}
        <main className="pb-20">
          <div className="container-custom bg-transparent py-8 relative">
            {/* Removed the old breadcrumbs and filter button div from here */}
            
            <div className="absolute inset-0 pointer-events-none"></div> {/* Existing effects */}
            <div className="absolute inset-0  pointer-events-none"></div> {/* Existing effects */}

                
            {activeFilter === "collections_view" ? (
              // Render Collections View
              <div>
                <div className="h-px w-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 mb-12"></div>
                <h1 className="text-3xl md:text-4xl font-display uppercase mb-4 text-center text-black">
                  Explore Our Collections
                </h1>
                
                {collectionsLoading && (
                  <div className="text-center py-12"><Loader2 className="h-8 w-8 animate-spin text-zinc-500 mx-auto" /> <p className="text-black">Loading collections...</p></div>
                )}
                {collectionsError && (
                  <div className="text-center py-12 text-red-500"><p>{collectionsError}</p></div>
                )}
                {!collectionsLoading && !collectionsError && collections.length === 0 && (
                  <div className="text-center py-12 text-black"><p>No collections found.</p></div>
                )}
                {!collectionsLoading && !collectionsError && collections.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {collections.map((collection) => (
                      <div
                        key={collection.id}
                        className="group relative overflow-hidden bg-zinc-100 aspect-[4/3] flex items-center justify-center cursor-pointer rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                        onClick={() => handleCollectionClick(collection.slug)}
                      >
                        <img
                          src={collection.image?.src || `https://source.unsplash.com/random/800x600/?fashion,${collection.name.toLowerCase()}`}
                          alt={collection.name}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300"></div>
                        <div className="relative z-10 text-center p-4">
                          <h3 className="text-xl md:text-2xl font-display uppercase text-white mb-1 drop-shadow-md">
                            {collection.name}
                          </h3>
                          <span className="inline-block px-3 py-1 bg-black/50 text-white text-xs uppercase tracking-wider rounded-sm">
                            {collection.count} {collection.count === 1 ? 'Item' : 'Items'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              // Render Product Grid View
              <>
                <div className="h-px w-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 mb-12"></div>
                {productsLoading && (
                  <div className="text-center py-12 flex flex-col items-center justify-center space-y-4">
                    <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
                    <p className="text-lg glitch-text text-black">Loading products...</p>
                  </div>
                )}
                {productsError && !productsLoading && (
                  <div className="text-center py-12 text-zinc-800">
                    <p className="text-lg mb-2 error-text">{productsError}</p>
                    <p className="text-base text-zinc-600">Unable to connect to the store</p>
                  </div>
                )}
                {!productsLoading && !productsError && (
                  <div className="flex flex-col gap-6">
                    <div className="w-full">
                      <div className="mb-6 text-sm text-black">
                        Showing {displayedProducts.length} {displayedProducts.length === 1 ? 'product' : 'products'}
                        {activeFilter !== "all" && activeFilter !== "collections_view" && (
                            <> in <span className="font-semibold capitalize">
                               {/* Find tag name from slug for display */}
                               {productTagsForFilterPanel.find(t => t.slug.toLowerCase() === activeFilter.toLowerCase())?.name || activeFilter}
                               </span>
                            </>
                        )}
                      </div>
                      <div className="product-grid">
                        {displayedProducts.length > 0 ?
                          displayedProducts.map((product, index) => (
                            <div
                              key={product.id}
                              className={`product-card-wrapper ${index % 2 === 0 ? 'even-product' : 'odd-product'}`}
                              style={{ animationDelay: `${index * 0.15}s` }}
                            >
                              <ProductCard product={product} />
                            </div>
                          )) :
                          <div className="col-span-full text-center py-12 text-black">
                            <p>No products found in this category.</p>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                )}
               </>
            )} {/* This closes the main conditional rendering block */}
          </div> {/* This closes div.container-custom.bg-transparent.py-12.relative */}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
