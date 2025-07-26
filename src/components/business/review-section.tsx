// src/components/business/review-section.tsx - Updated with real API calls
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  StarIcon,
  UserIcon,
  PencilIcon,
  TrashIcon,
  FlagIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { useAuth } from '@/hooks/use-auth';
import { api, Review } from '@/lib/api';
import { formatDate, timeAgo } from '@/lib/utils';
import toast from 'react-hot-toast';

interface ReviewSectionProps {
  businessId: number;
  businessName: string;
  averageRating: number;
  totalReviews: number;
}

export function ReviewSection({ 
  businessId, 
  businessName, 
  averageRating, 
  totalReviews 
}: ReviewSectionProps) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [sortBy, setSortBy] = useState('newest');
  const [reviewStats, setReviewStats] = useState({
    average_rating: averageRating,
    total_reviews: totalReviews,
    rating_distribution: {} as Record<number, number>
  });

  useEffect(() => {
    fetchReviews();
  }, [businessId, sortBy]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await api.reviews.list(businessId, { 
        sort_by: sortBy as any,
        per_page: 20
      });
      
      setReviews(response.data.data.reviews || []);
      
      if (response.data.data.summary) {
        setReviewStats(response.data.data.summary);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (reviewData: {
    rating: number;
    title: string;
    text: string;
  }) => {
    try {
      await api.reviews.create(businessId, {
        rating: reviewData.rating,
        review_title: reviewData.title,
        review_text: reviewData.text
      });
      
      toast.success('Review submitted successfully!');
      setShowReviewForm(false);
      fetchReviews(); // Refresh reviews
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to submit review';
      toast.error(message);
    }
  };

  const handleReviewUpdate = async (reviewId: number, reviewData: {
    rating: number;
    title: string;
    text: string;
  }) => {
    try {
      await api.reviews.update(businessId, reviewId, {
        rating: reviewData.rating,
        review_title: reviewData.title,
        review_text: reviewData.text
      });
      
      toast.success('Review updated successfully!');
      setEditingReview(null);
      fetchReviews(); // Refresh reviews
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to update review';
      toast.error(message);
    }
  };

  const handleReviewDelete = async (reviewId: number) => {
    if (!confirm('Are you sure you want to delete your review?')) return;
    
    try {
      await api.reviews.delete(businessId, reviewId);
      
      toast.success('Review deleted successfully!');
      fetchReviews(); // Refresh reviews
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to delete review';
      toast.error(message);
    }
  };

  const handleHelpful = async (reviewId: number) => {
    if (!user) {
      toast.error('Please sign in to mark reviews as helpful');
      return;
    }

    try {
      const response = await api.reviews.markHelpful(businessId, reviewId);
      
      // Update the specific review in state
      setReviews(prevReviews => 
        prevReviews.map(review => 
          review.id === reviewId 
            ? { 
                ...review, 
                helpful_count: response.data.data.helpful_count,
                user_found_helpful: response.data.data.user_voted
              }
            : review
        )
      );
      
      toast.success(response.data.data.user_voted ? 'Marked as helpful' : 'Removed from helpful');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to update helpful vote';
      toast.error(message);
    }
  };

  const handleReport = async (reviewId: number, reason: string) => {
    if (!user) {
      toast.error('Please sign in to report reviews');
      return;
    }

    try {
      await api.reviews.report(businessId, reviewId, { reason });
      toast.success('Review reported successfully');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to report review';
      toast.error(message);
    }
  };

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6'
    };
    const className = sizeClasses[size];

    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <div key={i}>
          {i <= rating ? (
            <StarIconSolid className={`${className} text-yellow-400`} />
          ) : (
            <StarIcon className={`${className} text-gray-300`} />
          )}
        </div>
      );
    }
    return <div className="flex">{stars}</div>;
  };

  const userHasReviewed = reviews.some(review => review.user?.id === user?.id);

  return (
    <div className="space-y-6">
      {/* Review Summary */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer Reviews</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {renderStars(Math.round(reviewStats.average_rating), 'md')}
                <span className="ml-2 text-2xl font-bold text-gray-900">
                  {reviewStats.average_rating.toFixed(1)}
                </span>
              </div>
              <span className="text-gray-600">
                Based on {reviewStats.total_reviews} review{reviewStats.total_reviews !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
          
          {/* Write Review Button */}
          {user && !userHasReviewed && (
            <button
              onClick={() => setShowReviewForm(true)}
              className="btn-primary"
            >
              Write a Review
            </button>
          )}
          
          {!user && (
            <p className="text-sm text-gray-500">
              <a href="/login" className="text-primary-600 hover:text-primary-700">
                Sign in
              </a> to write a review
            </p>
          )}
        </div>

        {/* Rating Distribution */}
        <div className="grid grid-cols-5 gap-2 mb-4">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = reviewStats.rating_distribution[stars] || 0;
            const percentage = reviewStats.total_reviews > 0 ? (count / reviewStats.total_reviews) * 100 : 0;
            
            return (
              <div key={stars} className="flex items-center text-sm">
                <span className="w-3">{stars}</span>
                <StarIconSolid className="h-3 w-3 text-yellow-400 mx-1" />
                <div className="flex-1 bg-gray-200 rounded-full h-2 mx-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-8 text-gray-600">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review Form */}
      <AnimatePresence>
        {showReviewForm && (
          <ReviewForm
            businessName={businessName}
            onSubmit={handleReviewSubmit}
            onCancel={() => setShowReviewForm(false)}
          />
        )}
      </AnimatePresence>

      {/* Edit Review Form */}
      <AnimatePresence>
        {editingReview && (
          <ReviewForm
            businessName={businessName}
            initialData={{
              rating: editingReview.rating,
              title: editingReview.review_title || '',
              text: editingReview.review_text || ''
            }}
            onSubmit={(data) => handleReviewUpdate(editingReview.id, data)}
            onCancel={() => setEditingReview(null)}
            isEditing
          />
        )}
      </AnimatePresence>

      {/* Sort Controls */}
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-medium text-gray-900">
          All Reviews ({reviewStats.total_reviews})
        </h4>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="form-select text-sm"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="highest">Highest Rated</option>
          <option value="lowest">Lowest Rated</option>
          <option value="helpful">Most Helpful</option>
        </select>
      </div>

      {/* Reviews List */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white border rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="skeleton h-10 w-10 rounded-full"></div>
                <div className="flex-1">
                  <div className="skeleton h-4 w-32 mb-2"></div>
                  <div className="skeleton h-4 w-24 mb-3"></div>
                  <div className="skeleton h-4 w-full mb-2"></div>
                  <div className="skeleton h-4 w-3/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-12">
          <StarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
          <p className="text-gray-600 mb-6">
            Be the first to review {businessName}
          </p>
          {user && (
            <button
              onClick={() => setShowReviewForm(true)}
              className="btn-primary"
            >
              Write the First Review
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              currentUserId={user?.id}
              onEdit={() => setEditingReview(review)}
              onDelete={() => handleReviewDelete(review.id)}
              onHelpful={() => handleHelpful(review.id)}
              onReport={(reason) => handleReport(review.id, reason)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Review Form Component
interface ReviewFormProps {
  businessName: string;
  initialData?: {
    rating: number;
    title: string;
    text: string;
  };
  onSubmit: (data: { rating: number; title: string; text: string }) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

function ReviewForm({ 
  businessName, 
  initialData, 
  onSubmit, 
  onCancel, 
  isEditing = false 
}: ReviewFormProps) {
  const [rating, setRating] = useState(initialData?.rating || 0);
  const [title, setTitle] = useState(initialData?.title || '');
  const [text, setText] = useState(initialData?.text || '');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    
    if (!title.trim()) {
      toast.error('Please add a review title');
      return;
    }
    
    if (!text.trim()) {
      toast.error('Please write a review');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({ rating, title: title.trim(), text: text.trim() });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white border rounded-lg p-6"
    >
      <h4 className="text-lg font-medium text-gray-900 mb-4">
        {isEditing ? 'Edit Your Review' : `Write a Review for ${businessName}`}
      </h4>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Rating Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Overall Rating *
          </label>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="p-1 transition-colors duration-150 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {star <= (hoveredRating || rating) ? (
                  <StarIconSolid className="h-8 w-8 text-yellow-400" />
                ) : (
                  <StarIcon className="h-8 w-8 text-gray-300 hover:text-yellow-400" />
                )}
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {rating > 0 && (
                <>
                  {rating} star{rating !== 1 ? 's' : ''} - 
                  {rating === 5 && ' Excellent'}
                  {rating === 4 && ' Good'}
                  {rating === 3 && ' Average'}
                  {rating === 2 && ' Poor'}
                  {rating === 1 && ' Terrible'}
                </>
              )}
            </span>
          </div>
        </div>

        {/* Title Input */}
        <div>
          <label htmlFor="review-title" className="block text-sm font-medium text-gray-700 mb-1">
            Review Title *
          </label>
          <input
            id="review-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            placeholder="Summarize your experience"
            maxLength={100}
            disabled={isSubmitting}
          />
          <p className="text-xs text-gray-500 mt-1">{title.length}/100 characters</p>
        </div>

        {/* Review Text */}
        <div>
          <label htmlFor="review-text" className="block text-sm font-medium text-gray-700 mb-1">
            Your Review *
          </label>
          <textarea
            id="review-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="form-textarea"
            placeholder="Tell others about your experience with this business..."
            maxLength={1000}
            disabled={isSubmitting}
          />
          <p className="text-xs text-gray-500 mt-1">{text.length}/1000 characters</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {isEditing ? 'Updating...' : 'Submitting...'}
              </div>
            ) : (
              isEditing ? 'Update Review' : 'Submit Review'
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}

// Review Card Component
interface ReviewCardProps {
  review: Review;
  currentUserId?: number;
  onEdit: () => void;
  onDelete: () => void;
  onHelpful: () => void;
  onReport: (reason: string) => void;
}

function ReviewCard({ review, currentUserId, onEdit, onDelete, onHelpful, onReport }: ReviewCardProps) {
  const [showFullText, setShowFullText] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  
  const isOwner = currentUserId === review.user?.id;
  const isLongText = (review.review_text?.length || 0) > 200;
  const displayText = showFullText ? review.review_text : review.review_text?.slice(0, 200);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <div key={i}>
          {i <= rating ? (
            <StarIconSolid className="h-4 w-4 text-yellow-400" />
          ) : (
            <StarIcon className="h-4 w-4 text-gray-300" />
          )}
        </div>
      );
    }
    return <div className="flex">{stars}</div>;
  };

  const reportReasons = [
    'Inappropriate content',
    'Spam or fake review',
    'Personal information',
    'Offensive language',
    'Not relevant to business',
    'Other'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border rounded-lg p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          {/* User Avatar */}
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <UserIcon className="h-5 w-5 text-gray-500" />
          </div>
          
          {/* User Info and Rating */}
          <div>
            <div className="flex items-center space-x-2">
              <h5 className="font-medium text-gray-900">{review.user?.name}</h5>
              <span className={`text-xs px-2 py-1 rounded-full ${
                review.user?.membership_status === 'veteran' 
                  ? 'bg-military-100 text-military-800'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {review.user?.membership_status}
              </span>
              {review.verified_purchase && (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  Verified Customer
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2 mt-1">
              {renderStars(review.rating)}
              <span className="text-sm text-gray-500">
                {timeAgo(review.created_at)}
              </span>
              {review.edited && (
                <span className="text-sm text-gray-500">(edited)</span>
              )}
            </div>
          </div>
        </div>

        {/* Action Menu */}
        {isOwner && (
          <div className="flex space-x-2">
            <button
              onClick={onEdit}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              title="Edit review"
            >
              <PencilIcon className="h-4 w-4" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
              title="Delete review"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Review Content */}
      <div className="mb-4">
        {review.review_title && (
          <h6 className="font-medium text-gray-900 mb-2">{review.review_title}</h6>
        )}
        {review.review_text && (
          <>
            <p className="text-gray-700 leading-relaxed">
              {displayText}
              {isLongText && !showFullText && '...'}
            </p>
            {isLongText && (
              <button
                onClick={() => setShowFullText(!showFullText)}
                className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-2 flex items-center"
              >
                {showFullText ? (
                  <>
                    Show Less <ChevronUpIcon className="h-4 w-4 ml-1" />
                  </>
                ) : (
                  <>
                    Read More <ChevronDownIcon className="h-4 w-4 ml-1" />
                  </>
                )}
              </button>
            )}
          </>
        )}
      </div>

      {/* Review Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-4">
          <button
            onClick={onHelpful}
            className={`flex items-center space-x-1 text-sm transition-colors ${
              review.user_found_helpful ? 'text-primary-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <span>Helpful ({review.helpful_count})</span>
          </button>
        </div>
        
        {!isOwner && currentUserId && (
          <button 
            onClick={() => setShowReportModal(true)}
            className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FlagIcon className="h-4 w-4" />
            <span>Report</span>
          </button>
        )}
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Report Review</h3>
            <p className="text-sm text-gray-600 mb-4">
              Why are you reporting this review?
            </p>
            <div className="space-y-2">
              {reportReasons.map((reason) => (
                <button
                  key={reason}
                  onClick={() => {
                    onReport(reason);
                    setShowReportModal(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition-colors"
                >
                  {reason}
                </button>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowReportModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}