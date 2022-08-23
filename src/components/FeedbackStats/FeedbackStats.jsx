import PropTypes from 'prop-types';
const FeedbackStats = ({ good, neutral, bad, total, positivePercentage }) => {
  return (
    <ul>
      <li>Good: {good}</li>
      <li>Neutral: {neutral}</li>
      <li>Bad: {bad}</li>
      <li>total: {total}</li>
      <li>Positive feedback: {positivePercentage}%</li>
    </ul>
  );
};

FeedbackStats.propTypes = {
  good: PropTypes.number.isRequired,
  neutral: PropTypes.number.isRequired,
  bad: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  positivePercentage: PropTypes.number.isRequired,
};

export default FeedbackStats;
