import PhotoShowcase from './PhotoShowcase';
import ProductInfo from './ProductInfo';
import { useUser } from '../../../context/user';
import StatusButton from './StatusButton';
import { findWinner } from '../../../services/giveaway';
import { useRouter } from 'next/router';
import { ModalUndi } from './ModalUndi';
import { useState, useEffect } from 'react';
import { Alert } from '@mui/material';

const ProductDetail = ({ id, data, products }) => {
  const user = useUser();
  const isOwner = data.ownerId === user.uid;
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleModalUndi = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };

  function closeModal() {
    setIsOpen(false);
  }

  const handleUndi = async () => {
    try {
      await findWinner(id, user.token);
      setIsOpen(false);
      setIsSuccess(true);
      setTimeout(() => {
        router.replace('/profile/giveaway-history');
      }, 3500);
    } catch (e) {
      console.error(e);
      setIsError(true);
    }
  };

  // useEffect(() => {
  //   if(isSuccess){
  //     setTimeout(() => {
  //       setIsSuccess(false);
  //     }, 3000)
  //   }
  // }, [isSuccess]);

  useEffect(() => {
    if(isError){
      setTimeout(() => {
        setIsError(false);
      }, 5000)
    }
  }, [isError]);

  return (
    <section className="container p-5 mx-auto">
      <div className="border border-red-600 w-full min-h-[400px] rounded-lg h-full flex p-8">
        {/* <div className='relative'> */}
          {isSuccess && (
            <div className='fixed left-0 bottom-0 z-10 mb-2 ml-2'>
              <Alert variant='filled' severity='success'>
                Anda telah berhasil mengundi pemenang!
              </Alert>
            </div>
          )}
          {isError && (
            <div className='fixed left-0 bottom-0 z-10 mb-2 ml-2'>
              <Alert variant='filled' severity='error'>
                Anda tidak dapat mengundi pemenang!
              </Alert>
            </div>
          )}
        {/* </div> */}
        <div className="items-center w-full text-center align-middle">
          <PhotoShowcase products={products} />
        </div>
        <div className="relative w-full px-3 pb-3 flex-column">
          <div className="flex">
            <div className="w-full p-3 align-middle rounded-lg bg-red-600">
              <h3 className="text-xl font-bold text-white ">{data.name}</h3>
              <p className="text-sm text-white opacity-70">{data.owner}</p>
              <div className="flex items-center gap-2 mt-2">
                <img src="/icons/map-pin.svg" />
                <p className="text-sm text-white">{data.location}</p>
              </div>
            </div>
            {isOwner && (
              <div className="pl-3 basis-1/4 ">
                <button
                  onClick={handleModalUndi}
                  className="inline-block w-full h-full m-auto text-lg leading-none text-white border rounded-lg bg-red-600 hover:border-red-600 hover:text-red-600 hover:bg-white duration-300"
                >
                  UNDI
                </button>
              </div>
            )}
          </div>
          <ProductInfo id={id} products={products} />
          <StatusButton id={id} user={user} isOwner={isOwner} data={data} />
        </div>
      </div>
      {isOpen && (
        <ModalUndi
          closeModal={closeModal}
          isOpen={isOpen}
          handleUndi={handleUndi}
        />
      )}
    </section>
  );
};

export default ProductDetail;
