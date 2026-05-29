import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set, get) => ({
      // Cart
      cart: [],
      addToCart: (item) => {
        const existing = get().cart.find((c) => c.id === item.id)
        if (existing) {
          set({ cart: get().cart.map((c) => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c) })
        } else {
          set({ cart: [...get().cart, { ...item, quantity: 1 }] })
        }
      },
      removeFromCart: (id) => set({ cart: get().cart.filter((c) => c.id !== id) }),
      clearCart: () => set({ cart: [] }),
      cartTotal: () => get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0),

      // Wishlist
      wishlist: [],
      toggleWishlist: (item) => {
        const exists = get().wishlist.find((w) => w.id === item.id)
        if (exists) {
          set({ wishlist: get().wishlist.filter((w) => w.id !== item.id) })
        } else {
          set({ wishlist: [...get().wishlist, item] })
        }
      },
      isWishlisted: (id) => get().wishlist.some((w) => w.id === id),

      // PC Builder state
      currentBuild: {
        cpu: null,
        gpu: null,
        ram: null,
        storage: null,
        motherboard: null,
        cooling: null,
        psu: null,
        case: null,
      },
      builderStep: 0,
      setBuilderComponent: (category, component) =>
        set({ currentBuild: { ...get().currentBuild, [category]: component } }),
      setBuilderStep: (step) => set({ builderStep: step }),
      resetBuild: () => set({
        currentBuild: { cpu: null, gpu: null, ram: null, storage: null, motherboard: null, cooling: null, psu: null, case: null },
        builderStep: 0,
      }),
      getBuildPrice: () => {
        const build = get().currentBuild
        return Object.values(build).reduce((sum, c) => sum + (c?.price || 0), 0)
      },
      getBuildWattage: () => {
        const build = get().currentBuild
        return Object.values(build).reduce((sum, c) => sum + (c?.wattage || 0), 0)
      },
      getBuildScore: () => {
        const build = get().currentBuild
        const components = Object.values(build).filter(Boolean)
        if (!components.length) return 0
        return Math.round(components.reduce((sum, c) => sum + (c?.score || 0), 0) / components.length)
      },

      // Saved builds
      savedBuilds: [],
      saveBuild: (name) => {
        const build = { id: Date.now(), name, components: get().currentBuild, price: get().getBuildPrice(), date: new Date().toISOString() }
        set({ savedBuilds: [...get().savedBuilds, build] })
      },
      deleteSavedBuild: (id) => set({ savedBuilds: get().savedBuilds.filter((b) => b.id !== id) }),

      // Auth
      user: null,
      isAdmin: false,
      login: (userData) => set({ user: userData, isAdmin: userData.email === 'admin@zaidinfo.in' }),
      logout: () => set({ user: null, isAdmin: false }),

      // UI
      isCartOpen: false,
      setCartOpen: (v) => set({ isCartOpen: v }),
      isNavOpen: false,
      setNavOpen: (v) => set({ isNavOpen: v }),

      // Notifications
      notifications: [],
      addNotification: (n) => set({ notifications: [...get().notifications, { id: Date.now(), ...n }] }),
      removeNotification: (id) => set({ notifications: get().notifications.filter((n) => n.id !== id) }),
    }),
    { name: 'zaid-info-store', partialize: (s) => ({ cart: s.cart, wishlist: s.wishlist, savedBuilds: s.savedBuilds, user: s.user }) }
  )
)

export default useStore
