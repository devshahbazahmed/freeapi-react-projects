const QuoteCard = ({ quote, featured = false, index = 0 }) => {
  const cardStyle = {
    animationDelay: `${Math.min(index * 70, 560)}ms`,
  };

  return (
    <article
      className={`quote-card${featured ? ' quote-card-featured' : ''}`}
      style={cardStyle}
    >
      <div className="quote-mark" aria-hidden="true">
        &ldquo;
      </div>
      <p className="quote-content">{quote.content}</p>
      <footer className="quote-footer">
        <span className="author-line" />
        <span>{quote.author || 'Unknown'}</span>
      </footer>
    </article>
  );
};

export default QuoteCard;
