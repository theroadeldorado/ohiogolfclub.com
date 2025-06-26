'use client';

import { useState, useEffect } from 'react';

interface Review {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  author_url?: string;
  profile_photo_url?: string;
}

export function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews');
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        setError('Failed to load reviews');
        console.error('Error fetching reviews:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Cleanup effect to restore body scroll on component unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="mt-2 text-gray-400">Loading reviews...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">No reviews available</p>
      </div>
    );
  }

  const openModal = (review: Review) => {
    setSelectedReview(review);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedReview(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <div className="">
        <div className="flex justify-center flex-wrap gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-black w-[350px] shrink-0 text-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-white/10 cursor-pointer"
              onClick={() => openModal(review)}
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-lg">{review.author_name}</h4>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-lg ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}>
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-gray-100 line-clamp-3">{review.text}</p>
              <div className="mt-4 text-sm text-gray-100">{new Date(review.time * 1000).toLocaleDateString()}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Modal */}
      {selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50" onClick={closeModal}>
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-black">{selectedReview.author_name}</h3>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-lg ${i < selectedReview.rating ? 'text-yellow-500' : 'text-gray-300'}`}>
                      ★
                    </span>
                  ))}
                  <span className="ml-2 text-sm text-gray-500">{new Date(selectedReview.time * 1000).toLocaleDateString()}</span>
                </div>
              </div>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 text-2xl font-bold leading-none">
                ×
              </button>
            </div>
            <p className="text-gray-700 leading-relaxed">{selectedReview.text}</p>
          </div>
        </div>
      )}
    </>
  );
}
