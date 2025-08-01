import React, { useState } from 'react'
import "./Home.css"
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import Appdownload from '../../components/Appdownload/Appdownload'
const Home = () => {
  const[category,setcategory]=useState("All");
  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setcategory={setcategory}/>
      <FoodDisplay  category={category}/>
      <Appdownload/>
    </div>
  )
}

export default Home
