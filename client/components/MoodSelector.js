import React from 'react';

export default function MoodSelector (props) {
  const handleChange = props.handleChange;
  const handleSubmit = props.handleSubmit;
  const moodValue = props.moodValue;
  console.log('HELOOOOOOO', props)

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>How are you feeling?</legend>
        <input
          type="text"
          onChange={handleChange}
          value={moodValue}
        />
      <button
        type="submit">
        Submit
      </button>
      </fieldset>
    </form>
  );
}
