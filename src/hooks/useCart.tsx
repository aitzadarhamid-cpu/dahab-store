"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { CartItem, CartState, CartAction } from "@/types";

const CART_STORAGE_KEY = "dahab-cart";

function cartReducer(state: CartState, action: CartAction): CartState {
  let newItems: CartItem[];

  switch (action.type) {
    case "ADD_ITEM": {
      const existingIndex = state.items.findIndex(
        (item) =>
          item.id === action.payload.id &&
          item.selectedSize === action.payload.selectedSize
      );
      if (existingIndex > -1) {
        newItems = state.items.map((item, i) =>
          i === existingIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        newItems = [...state.items, action.payload];
      }
      break;
    }
    case "REMOVE_ITEM":
      newItems = state.items.filter(
        (item) =>
          !(
            item.id === action.payload.id &&
            item.selectedSize === action.payload.selectedSize
          )
      );
      break;
    case "UPDATE_QUANTITY":
      if (action.payload.quantity <= 0) {
        newItems = state.items.filter(
          (item) =>
            !(
              item.id === action.payload.id &&
              item.selectedSize === action.payload.selectedSize
            )
        );
      } else {
        newItems = state.items.map((item) =>
          item.id === action.payload.id &&
          item.selectedSize === action.payload.selectedSize
            ? { ...item, quantity: action.payload.quantity }
            : item
        );
      }
      break;
    case "CLEAR_CART":
      newItems = [];
      break;
    case "LOAD_CART":
      newItems = action.payload;
      break;
    default:
      return state;
  }

  const total = newItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

  return { items: newItems, total, itemCount };
}

const initialState: CartState = { items: [], total: 0, itemCount: 0 };

interface CartContextType extends CartState {
  addItem: (item: CartItem) => void;
  removeItem: (id: string, selectedSize?: string) => void;
  updateQuantity: (
    id: string,
    quantity: number,
    selectedSize?: string
  ) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const items = JSON.parse(saved) as CartItem[];
        dispatch({ type: "LOAD_CART", payload: items });
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (state.items.length > 0 || localStorage.getItem(CART_STORAGE_KEY)) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    }
  }, [state.items]);

  const addItem = useCallback((item: CartItem) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  }, []);

  const removeItem = useCallback((id: string, selectedSize?: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id, selectedSize } });
  }, []);

  const updateQuantity = useCallback(
    (id: string, quantity: number, selectedSize?: string) => {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { id, selectedSize, quantity },
      });
    },
    []
  );

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
    localStorage.removeItem(CART_STORAGE_KEY);
  }, []);

  return (
    <CartContext.Provider
      value={{ ...state, addItem, removeItem, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
