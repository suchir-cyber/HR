export default function RatingStars({ rating }) {
  return (
    <div className="mt-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= rating ? 'text-warning' : 'text-secondary'}>★</span>
      ))}
    </div>
  );
}
