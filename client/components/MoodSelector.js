import React from 'react';

export default function MoodSelector (props) {
  const handleChange = props.handleChange;
  const handleSubmit = props.handleSubmit;
  const moodValue = props.moodValue;

  return (
    <form
      onSubmit={handleSubmit}>
      <fieldset>
        <div className="feelings-input">
          <input
            placeholder="I feel..."
            onChange={handleChange}
            type="text"
            value={moodValue}
            />
          <div className="form-button">
          <button
            type="submit"
            disabled={props.buttonDisabled}>
            Make a Playlist!
          </button>
        </div>
          {
            props.buttonDisabled ?
            <div className="warning-box">(At least three words, please)</div>
              : null
            }
        </div>
      </fieldset>
    </form>
  );
}
