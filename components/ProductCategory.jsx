import CardCategory from './CardCategory';
import { category } from '../data/category';
// import { fetchCategory } from '../services/filter';
import { useEffect,useState } from 'react';
import images from '../assets/category'
import { fetchCategory, fetchProducts, filteringProducts  } from "../services/filter";

const ICON_PATH = '/icons/category';

export default function ProductCategory({ categoryDataFunc }) {


  const [dataCategories, setDataCategories] = useState([]);
  
  async function fetchData(){
    let response = await fetchCategory();

    console.log(response);
    setDataCategories(response);
  }
  

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="flex flex-col mt-14 gap-y-12 max-w-[1100px]">
      <h1 className="font-bold text-ruddy-pink text-center text-4xl">
        GIVEAWAY LIST
      </h1>
      <div className="flex flex-wrap gap-8 mx-auto mt-8">
        {console.log(dataCategories)}
        {dataCategories.map((data, index) => {
          return (
            <button
              key={index}
              onClick={() => categoryDataFunc(data.name)}
              //index+1 -> bisa di ganti API filter dari backend
            >
              <CardCategory
                key={index}
                name={data.name}
                title={data.title}
                src={`${ICON_PATH}/${data.name}3.png`}
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}
