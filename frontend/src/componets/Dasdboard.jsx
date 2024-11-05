import { useEffect, useState } from "react"
import Axios from "axios"
import Navbar from "./Navbar"
import DisplayPrice from "./Price"
import Searchbar from "./Searchbar"
import Users from "./Users"

export default function Dashboard() {
  const [filter, setFilter] = useState('')
  const [user, setUser] = useState([])
  const [wallet, setWallet] = useState(0)
  const walletInt = Math.floor(wallet)


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
      try {
        const res = await Axios.get('account/balance', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setWallet(res.data.balance);
      } catch (error) {
        console.error("Error fetching wallet data:", error);
      }
    }
    fetchWalletData();
  }, []);

  async function handleSearch(e) {
    setFilter(e.target.value)
  }

  return (
    <>
      <Navbar />
      <DisplayPrice wallet={walletInt} />
      <Searchbar searchInput={handleSearch} />
      <Users user={user} />
    </>
  )
}