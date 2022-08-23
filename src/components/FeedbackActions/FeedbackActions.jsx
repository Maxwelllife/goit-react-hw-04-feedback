import PropTypes from 'prop-types';
import s from '../feedback.module.css';
import shortid from 'shortid';
const FeedbackActions = ({ options, onLeaveFeedback }) => {
  return (
    <ul className={s.buttons}>
      {options.map(option => {
        console.log('option: ', option);
        return (
          <li key={shortid.generate()}>
            <button onClick={() => onLeaveFeedback(option)} type="button">
              {option}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

FeedbackActions.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string.isRequired),
  onLeaveFeedback: PropTypes.func.isRequired,
};
export default FeedbackActions;
