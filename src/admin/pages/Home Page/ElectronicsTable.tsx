import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from "../../../Redux Toolkit/Store";
import HomeCategoryTable from "./HomeCategoryTable";
import { fetchHomeCategories } from '../../../Redux Toolkit/Admin/AdminSlice';

function ElectronicsTable() {
  const dispatch = useAppDispatch();

  const { categories = [], loading, error } = useAppSelector((state) => state.homeCategory || {});

  useEffect(() => {
    dispatch(fetchHomeCategories());
  }, [dispatch]);

  // Only filter categories with section === "ELECTRIC_CATEGORIES"
  const electricCategories = categories.filter(cat => 
    cat?.section?.toLowerCase() === 'electric_categories'
  );

  return (
    <div className="p-4">
      {loading ? (
        <div className="flex justify-center items-center p-8">
          <div className="text-gray-600">Loading electric categories...</div>
        </div>
      ) : error ? (
        <div className="p-4 text-red-600 bg-red-100 rounded">
          Error: {error}
        </div>
      ) : categories.length === 0 ? (
        <div className="p-4 text-amber-600 bg-amber-100 rounded">
          No categories found. Data might be loading or empty.
        </div>
      ) : electricCategories.length === 0 ? (
        <div className="p-4 text-blue-600 bg-blue-100 rounded">
          No electric categories found. Total categories: {categories.length}
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Electric Categories ({electricCategories.length})
          </h2>
          <HomeCategoryTable categories={electricCategories} />
        </div>
      )}
    </div>
  );
}

export default ElectronicsTable;
