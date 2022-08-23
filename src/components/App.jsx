import 'modern-normalize/modern-normalize.css';
import { useState } from 'react';
import s from './feedback.module.css';
import FeedbackActions from './FeedbackActions/FeedbackActions';
import FeedbackStats from './FeedbackStats/FeedbackStats';
import SectionTitle from './Section/SectionTitle';
import Notification from './Notification/Notification';

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const onLeaveFeedback = option => {
    setFeedback(prevState => {
      return {
        ...prevState,
        [option]: prevState[option] + 1,
      };
    });
  };

  const countTotalFeedback = () => {
    const { good, neutral, bad } = feedback;
    return good + neutral + bad;
  };
  console.log('countTotalFeedback: ', countTotalFeedback());

  const countPositiveFeedbackPercentage = () => {
    const { good } = feedback;
    const total = countTotalFeedback();
    return total ? Math.round((good / total) * 100) : 0;
  };

  const { good, neutral, bad } = feedback;

  return (
    <div className={s.feedback}>
      <SectionTitle title="Please leave feedback">
        <FeedbackActions
          options={Object.keys(feedback)}
          onLeaveFeedback={onLeaveFeedback}
        />
      </SectionTitle>

      <SectionTitle title="Statistics">
        {countTotalFeedback() ? (
          <FeedbackStats
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </SectionTitle>
    </div>
  );
};

export default App;
