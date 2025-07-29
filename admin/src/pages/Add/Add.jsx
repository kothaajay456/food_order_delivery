import React, { useEffect, useState } from 'react'
import "./Add.css"
import { assets } from '../../assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify';
const Add = () => {
    const url = " http://localhost:4000";
    const [image, setimage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad",
    })
    const OnchangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    }
    //  useEffect(()=>{
    //  console.log(data);
    //  },[data])
    const onSubmitHandle = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);
        const res = await axios.post(`${url}/api/food/add`, formData);
        if (res.data.success) {
            setData({
                name: "",
                description: "",
                price: "",
                category: "Salad",
            })
            setimage(false);
            toast.success(res.data.message);
        }
        else
        {
        toast.error(res.data.message);
        }
    }
    return (
        <div className='add'>
            <form onSubmit={onSubmitHandle} className='flex-col'>
                <div className='add-img-upload flex-col'>
                    <p>
                        Upload image
                    </p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setimage(e.target.files[0])} type="file" id='image' hidden required />
                </div>
                <div className='add-product-name flex-col'>
                    <p>product name</p>
                    <input onChange={OnchangeHandler} value={data.name} type="text" name="name" id="" placeholder='Type here' />
                </div>
                <div className='add-product-description flex-col'>
                    <p>Product Description</p>
                    <textarea onChange={OnchangeHandler} value={data.description} name="description" id="" rows="6" placeholder='Write content here' required></textarea>
                </div>
                <div className='add-category-price'>
                    <div className='add-category flex-col'>
                        <p>Product Category</p>
                        <select onChange={OnchangeHandler} name="category" value={data.category} id="">
                            <option value="Salad">Salad </option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Desert</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className='add-price flex-col'>
                        <p>Product Price</p>
                        <input onChange={OnchangeHandler} value={data.price} type="Number" name='price' placeholder='$20' />
                    </div>
                </div>
                <button type='submit' className='add-btn'>Add</button>
            </form>
        </div>
    )
}

export default Add
