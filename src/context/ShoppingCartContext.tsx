import React, {ReactNode, useContext, useEffect, useState} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type CartItem = {
    id: string;
    quantity: number;
}

type ShoppingCartProviderProps = {
    children: ReactNode
};

type ShoppingCartContext = {
    openCart: () => void;
    closeCart: () => void;
    increaseCartQuantity: (id: string) => void;
    clearCart: () => void;
    isOpen: boolean;
    cartQuantity: number;
    isMobile: boolean;
    cartItems: CartItem[];
};

const ShoppingCartContext = React.createContext({} as ShoppingCartContext);

export const useShoppingCart = () => {
    return useContext(ShoppingCartContext)
}
export const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('shopping-cart', []);
    const [isOpen, setIsOpen] = useState(false);
    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    const isMobile = screenWidth <= 414;

    const handleWindowSizeChange = () => {
        setScreenWidth(window.innerWidth);
    }

    const cartQuantity = cartItems.reduce( (quantity, item) => {
        return item.quantity + quantity;
    }, 0);

    const openCart = () => {
        setIsOpen(true);
    }
    const closeCart = () => {
        setIsOpen(false);
    }

    const increaseCartQuantity = (id: string): void => {
        setCartItems((currentItems) => {
            if(currentItems.find(item => item.id === id) == null) {
                return [...currentItems, {id, quantity: 1}];
            } else {
                return currentItems.map(item => {
                    if(item.id === id) {
                        return { ...item, quantity: item.quantity + 1};
                    } else {
                        return item;
                    }
                });
            }
        });
    }


    const clearCart = () => {
        setCartItems([]);
    }

    return <ShoppingCartContext.Provider value={
        {
            openCart,
            closeCart,
            increaseCartQuantity,
            clearCart,
            isOpen,
            cartQuantity,
            isMobile,
            cartItems,
        }
    }>
        {children}
    </ShoppingCartContext.Provider>
};