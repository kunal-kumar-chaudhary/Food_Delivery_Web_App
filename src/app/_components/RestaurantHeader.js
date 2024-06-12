import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

const RestaurantHeader = () => {
  const [details, setDetails] = useState();
  const router = useRouter();
  const pathName = usePathname(); 
  // we will take out the data from local storage
  useEffect(()=>{
        let data = localStorage.getItem("restaurantUser");
        // if there is no data in localStorage, that means user is not logged in
        // in this case, we will redirect the user to login page if user is logged in or registered and trying to access the dashboard page
        if (!data && pathName !== "/restaurant/dashboard"){
            router.push("/restaurant");
        }
        // if user is registered, there is no point going to registration or login page
        // in this case, we will redirect the user to dashboard page
        else if(data && pathName === "/restaurant"){
            router.push("/restaurant/dashboard");
        }
        else{
          setDetails(JSON.parse(data));
        }
  }, []);

  const logout = ()=>{
    localStorage.removeItem("restaurantUser");
    router.push("/restaurant");
  }

  return (
    <div className='header-wrapper'>
      <div className='logo'>
        <img style={{width:100}} src="http://s.tmimgcdn.com/scr/1200x627/242400/food-delivery-custom-design-logo-template_242462-original.png"/>
      </div>
      <ul>
        <li>
            <Link href="/">Home</Link>
        </li>
        {details && details.name ?
        <>
        <li><Link href="/">Profile</Link></li>
        <li><button onClick={logout}>Logout</button></li>
        </>:
        <li><Link href="/restaurant">Login</Link></li>
      }
      </ul>
    </div>
  )
}

export default RestaurantHeader
