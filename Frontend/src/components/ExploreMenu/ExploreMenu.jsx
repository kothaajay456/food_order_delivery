import React from 'react'
import './ExploreMenu.css'
import {menu_list} from '../../assets/assets'
const ExploreMenu = ({category,setcategory}) => {
  return (
    <div className='ExploreMenu' id='explore-menu'>
      <h1>
        Explore our menu
      </h1>
      <p className='ExploreMenu-text'>
        Choose form a diverse menu featuring menu dishes.Our misson to satisfy you.
      </p>
      <div className='ExploreMenu-list'>
       {menu_list.map((item,index)=>{
        return (
            <div onClick={()=>setcategory(prev=>prev===item.menu_name?"All":item.menu_name)} className='ExploreMenu-list-item' key={index}>
              <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="menu-image" />
              <p>
                {item.menu_name}
              </p>
            </div>
        )
       })}
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu
