import { useEffect, useState } from "react"
import Axios from "axios"
import { Link } from "react-router-dom"

export default function Dashboard() {
  const [filter, setFilter] = useState('')
  const [user, setUser] = useState([])
  const [wallet, setWallet] = useState(0)


  useEffect(() => {
    async function fetchData() {
      const response = await Axios.get('user/bulk?filter=' + filter)
      setUser(response.data.users)
      console.log(response.data.users)
    }
    fetchData()
  }, [filter])

  useEffect(() => {
    async function fetchWalletData() {
      const res = await Axios.get('/account/balance',{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setWallet(res.data.balance)
    }
    fetchWalletData()
  },[wallet])

  async function handleSearch(e) {
    setFilter(e.target.value)
  }

  return (
    <>
      {/* NAVBAR */}
      <nav className="block w-full max-w-screen-lg px-4 py-2 mx-auto bg-white bg-opacity-90 sticky top-3 shadow lg:px-8 lg:py-3 backdrop-blur-lg backdrop-saturate-150 z-[9999]">
        <div className="container flex flex-wrap items-center justify-between mx-auto text-slate-800">
          <a href="#"
            className="mr-4 block cursor-pointer py-1.5 text-base text-slate-800 font-semibold">
            PayTM
          </a>
          <div className="hidden lg:block">
            <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
              <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
                <a href="#" className="flex items-center">Pages</a>
              </li>
              <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
                <a href="#" className="flex items-center">Account</a>
              </li>
              <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
                <a href="#" className="flex items-center">Blocks</a>
              </li>
              <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
                <a href="#" className="flex items-center">Docs</a>
              </li>
            </ul>
          </div>
          <button
            className="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
            type="button">
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </span>
          </button>
        </div>
      </nav>
      {/* show the Price */}
      <div>
        <h1>Price: ${wallet}</h1>
      </div>

      {/* search component */}
      <div className="bg-white mt-4 flex px-4 py-3 border-b border-[#333] focus-within:border-blue-500 overflow-hidden max-w-md mx-auto font-[sans-serif]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="18px" className="fill-gray-600 mr-3">
          <path
            d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
          </path>
        </svg>
        <input type="email" placeholder="Search Users..." className="w-full outline-none text-sm" onChange={handleSearch} />
      </div>

      {/* display THE SEARCH RESULT */}
      {user.map((draft) => (
                    <div key={draft._id}>
                    <h1> name:  {draft.firstName}</h1>
                    <Link 
                    to="/send"
                    state={{
                      userId: draft._id
                    }}
                    >Send money</Link>
                  </div>
      ))}
    </>


  )
}