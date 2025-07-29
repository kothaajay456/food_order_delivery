import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from 'axios';
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, SetCartItems] = useState({});
    const url = "http://localhost:4000";
    const [token, settoken] = useState("");
    const [food_list, setfoodlist] = useState([]);

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            SetCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            SetCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
        }
    }
    const removefromCart = async (itemId) => {

        SetCartItems((prev) => {
            if (!prev[itemId]) return prev;
            const updatedCount = prev[itemId] - 1;
            return {
                ...prev,
                [itemId]: updatedCount > 0 ? updatedCount : 0,
            };

        });
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
    }
    const getTotalcartAmount = () => {
        let totalAmount = 0;

        for (const itemId in cartItems) {
            const quantity = cartItems[itemId];
            if (quantity > 0) {
                const itemInfo = food_list.find(product => product._id === itemId);
                if (itemInfo) {
                    totalAmount += itemInfo.price * quantity;
                }
            }
        }

        return totalAmount;
    };
    const fetchfoodlist = async () => {
        const res = await axios.get(url + "/api/food/list");
        setfoodlist(res.data.data)

    }

    const loadcartdata = async (token) => {
        const res = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
        SetCartItems(res.data.cartData);
    }

   useEffect(() => {
    async function loadData() {
        await fetchfoodlist();
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
            settoken(savedToken);
            await loadcartdata(savedToken); // ✅ key fix
        }
    }
    loadData();
}, []);
    useEffect(() => {
        // console.log(cartItems);
    }, [cartItems]);
    const contextValue = {
        food_list,
        cartItems,
        SetCartItems,
        addToCart,
        removefromCart,
        getTotalcartAmount,
        url,
        token,
        settoken,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
