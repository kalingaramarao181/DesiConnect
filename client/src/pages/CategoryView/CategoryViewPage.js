import React, { useEffect, useState } from "react";
import "../styles/CategoryView.css";
import HeroSection from "./HeroSection";
import FilterSidebar from "./FilterSidebar";
import AdsGrid from "./AdsGrid";
import Pagination from "./Pagination";
import { getAdsByCategory } from "../../api/AdApi";
import { useParams } from "react-router-dom";

const CategoryViewPage = () => {
  const { categoryId } = useParams();
  const [ads, setAds] = useState([]);
  const [filteredAds, setFilteredAds] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const adsPerPage = 6; // Number of ads per page

  // Store filters here
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchAds(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  // ✅ Fetch Ads function
  const fetchAds = async (appliedFilters = {}) => {
    setLoading(true);
    try {
      const res = await getAdsByCategory(categoryId, appliedFilters);
      if (res?.data) {
        setAds(res.data);
        setFilteredAds(res.data);
        setCurrentPage(1); // Reset page when new filters applied
      }
    } catch (error) {
      console.error("Error loading ads:", error);
    } finally {
      setLoading(false);
    }
  };

  // Pagination
  const totalPages = Math.ceil(filteredAds.length / adsPerPage);
  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = filteredAds.slice(indexOfFirstAd, indexOfLastAd);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // ✅ Apply filters from sidebar
  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    fetchAds(newFilters);
  };

  return (
    <div className="category-page1">
      {/* Hero Section */}
      <HeroSection
        title="Used Cars in Georgia"
        subtitle="Browse affordable vehicles from the community"
        imageUrl="/assets/hero-car-bg.jpg"
      />

      <div className="category-layout">
        {/* Fixed Sidebar */}
        <FilterSidebar
          ads={ads}
          onApplyFilters={handleApplyFilters}
        />

        {/* Ads Grid + Pagination */}
        <div className="ads-section">
          {loading ? (
            <div className="loading">Loading Ads...</div>
          ) : (
            <>
              <div className="ads-container">
                <AdsGrid ads={currentAds} />
              </div>

              {/* Pagination BELOW ads-container */}
              {totalPages > 1 && (
                <div className="pagination-wrapper">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryViewPage;
