import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../Redux Toolkit/Store";
import HomeCategoryTable from "./HomeCategoryTable";
import { fetchHomeCategories } from "../../../Redux Toolkit/Admin/AdminSlice"; // If needed, import fetcher

export default function GridTable() {
  const dispatch = useAppDispatch();
  const { homeCategory } = useAppSelector((store) => store);

  const { categories = [], loading, error } = homeCategory || {};

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchHomeCategories());
    }
  }, [dispatch, categories.length]);

  // Filter only categories with section = GRID
  const gridCategories = categories.filter(
    (cat) => cat?.section?.toLowerCase() === "grid"
  );

  return (
    <div className="p-4">
      {loading ? (
        <div className="flex justify-center items-center p-8">
          <div className="text-gray-600">Loading grid categories...</div>
        </div>
      ) : error ? (
        <div className="p-4 text-red-600 bg-red-100 rounded">
          Error: {error}
        </div>
      ) : categories.length === 0 ? (
        <div className="p-4 text-amber-600 bg-amber-100 rounded">
          No categories found.
        </div>
      ) : gridCategories.length === 0 ? (
        <div className="p-4 text-blue-600 bg-blue-100 rounded">
          No grid categories found. Total categories: {categories.length}
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Grid Categories ({gridCategories.length})
          </h2>
          <HomeCategoryTable categories={gridCategories} />
        </div>
      )}
    </div>
  );
}
