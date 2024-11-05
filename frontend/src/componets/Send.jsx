import { useLocation } from "react-router-dom"
import Axios from "axios"

export default function Send() {

  const location = useLocation()
  const { userId } = location.state || {}

 async function handleClick() {
    const res = await Axios.post('/account/transfer',
      {
        amount: 100,
        to: userId
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
      }
    )
    console.log(res)
  }
  return (
    <div>
      <h1>User</h1>
      <button onClick={handleClick} >Send money</button>
    </div>
  )
}