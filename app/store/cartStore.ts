import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../types/product";

export type CartItem = Product & {
  quantity: number;
};

type CartState = {
  items: CartItem[];
  hasHydrated: boolean;
  isDrawerOpen: boolean;
  
  setHasHydrated: (state: boolean) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;

  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void; 
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      hasHydrated: false,
      isDrawerOpen: false,

      setHasHydrated: (state) =>
        set({ hasHydrated: state }),

      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),

      addToCart: (product) =>
        set((state) => {
          const existing = state.items.find(
            (item) => item.id === product.id
          );

          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? {
                      ...item,
                      quantity: item.quantity + 1,
                    }
                  : item
              ),
              isDrawerOpen: true,
            };
          }

          return {
            items: [
              ...state.items,
              { ...product, quantity: 1 },
            ],
            isDrawerOpen: true,
          };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          items: state.items.filter(
            (item) => item.id !== id
          ),
        })),

      
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          ),
        })),

      clearCart: () => set({ items: [] }),

      totalItems: () =>
        get().items.reduce(
          (acc, item) => acc + item.quantity,
          0
        ),

      totalPrice: () =>
        get().items.reduce(
          (acc, item) =>
            acc + item.price * item.quantity,
          0
        ),
    }),
    {
      name: "cart-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);