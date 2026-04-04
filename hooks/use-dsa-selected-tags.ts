import { create } from "zustand"
import { persist } from "zustand/middleware"

type DsaSelectedTagsState = {
  selectedTags: string[]
  setSelectedTags: (
    update: string[] | ((prev: string[]) => string[])
  ) => void
}

const useDsaSelectedTagsStore = create<DsaSelectedTagsState>()(
  persist(
    (set) => ({
      selectedTags: [],
      setSelectedTags: (update) =>
        set((state) => ({
          selectedTags:
            typeof update === "function"
              ? update(state.selectedTags)
              : update,
        })),
    }),
    {
      name: "dsa-selected-tags",
      partialize: (state) => ({ selectedTags: state.selectedTags }),
    }
  )
)

/** Persisted DSA tag filter for `/dsa` (localStorage key: `dsa-selected-tags`). */
export function useDsaSelectedTags(): readonly [
  string[],
  (update: string[] | ((prev: string[]) => string[])) => void,
] {
  const selectedTags = useDsaSelectedTagsStore((s) => s.selectedTags)
  const setSelectedTags = useDsaSelectedTagsStore((s) => s.setSelectedTags)
  return [selectedTags, setSelectedTags] as const
}
