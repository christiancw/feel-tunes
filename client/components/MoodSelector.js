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
        <div className="feelings-input">
          <input
            placeholder="Write down some feelings"
            onChange={handleChange}
            type="text"
            value={moodValue}
            />
          <div className="form-button">
          <button
            type="submit"
            disabled={props.buttonDisabled}>
            Make a Spotify Playlist!
          </button>
        </div>
          {props.buttonDisabled ?
            <div className="warning-box">(Please enter at least three words)</div>:
              null}
        </div>
      </fieldset>
    </form>
  );
}
