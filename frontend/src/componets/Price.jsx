import { useNavigate } from 'react-router-dom';


export default function DisplayPrice({wallet}) {
  

  return (
    <>
      <div className="sticky top-20 z-[9999] mt-4 p-4 bg-mediumGray border border-gray-300 rounded-lg shadow-md max-w-fit">
        <h1 className="text-2xl font-bold text-lightGray">
          Price: <span className="text-paleGray">${wallet}</span>
        </h1>
      </div>
    </>
  )
}