import { useAppSelector } from "../../../Redux Toolkit/Store";
import HomeCategoryTable from "./HomeCategoryTable";

function DealsCategoryTable() {
  // grab the array of deals
  const { deals } = useAppSelector(store => store.deal);

  // map them into the shape HomeCategoryTable expects
  const categories = deals.map(d => ({
    id:         d.category.id,
    image:      d.category.image,
    categoryId: d.category.categoryId,
    name:       d.category.name,
  }));

  return <HomeCategoryTable categories={categories} />;
}

export default DealsCategoryTable;
