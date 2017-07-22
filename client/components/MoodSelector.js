import React from 'react';

export default function MoodSelector (props) {
  const handleChange = props.handleChange;
  const handleSubmit = props.handleSubmit;
  const moodValue = props.moodValue;
  console.log('HELOOOOOOO', props)

  return (
    <form
      onSubmit={handleSubmit}>
      <fieldset>
        <div>
          <input
            placeholder="Write down some feelings"
            onChange={handleChange}
            type="text"
            value={moodValue}
            />
          <div>
          <button
            type="submit">
            GET MUSIC
          </button>
        </div>
        </div>
      </fieldset>
    </form>
  );
}
