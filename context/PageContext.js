import { createContext, useState } from "react";

export const PageContext = createContext();

export const PageProvider = ({ children }) => {
  // Search state
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // Dropdown state
  const [showDropdown, setShowDropdown] = useState(false);

  // Check if current page is view pages
  const [isPageView, setIsPageView] = useState(false);

  // Notify state
  const [notify, setNotify] = useState({ show: false, text: "" });

  // Loading useState
  const [loading, setLoading] = useState(false);

  return (
    <PageContext.Provider
      value={{
        search,
        setSearch,
        showSearch,
        setShowSearch,
        showDropdown,
        setShowDropdown,
        isPageView,
        setIsPageView,
        notify,
        setNotify,
        loading,
        setLoading,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
