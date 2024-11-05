import { useLocation, useNavigate } from "react-router-dom"
import Axios from "axios"
import { useState } from "react"

export default function Send() {

  const location = useLocation()
  const { userId, user } = location.state || {}
  const navigate = useNavigate()
  const [price, setPrice] = useState(0)
  const [status, setStatus] = useState(false)

  async function handleClick() {
    const res = await Axios.post('/account/transfer',
      {
        amount: price,
        to: userId
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
      }
    )
    if (res.status == 200) {
      setStatus(true)
    }
  }

  function handleInput(e) {
    const value = e.target.value;
    setPrice(value);
  }
  return (
    <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-md max-w-md mx-auto">
      {status && (
        <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
          <span className="font-medium">Successful Transaction</span>
        </div>

      )}
      <h1 className="text-2xl font-bold text-slate-800 mb-4">To {user || "User"}</h1>
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
      >
        Back
      </button>
      <div className="mb-4">
        <label htmlFor="price" className="block text-slate-700 font-medium mb-2">Price:</label>
        <input
          id="price"
          type="number"
          value={price}
          onKeyPress={(e) => {
            if (!/^[0-9]*$/.test(e.key)) {
              e.preventDefault(); // Only allow numbers
            }
          }}
          onChange={handleInput}
          className="w-full px-3 py-2 border border-gray-300 text-darkGray rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
          placeholder="Enter amount"
        />
      </div>
      <button
        onClick={handleClick}
        className="w-full px-4 py-2 bg-mediumGray text-paleGray rounded-md hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
      >
        Send money
      </button>
    </div>

  )
}