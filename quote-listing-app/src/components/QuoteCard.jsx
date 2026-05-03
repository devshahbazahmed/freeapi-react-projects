const QuoteCard = ({ quote }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
      <p className="text-lg font-medium text-gray-800 mb-4">
        “{quote.content}”
      </p>
      <p className="text-right text-sm text-gray-500">
        — {quote.author || 'Unknown'}
      </p>
    </div>
  );
};

export default QuoteCard;
