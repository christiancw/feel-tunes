import React from 'react';

export default function MoodSelector (props) {

  const { handleChange, handleSubmit, moodValue, buttonDisabled } = props;

  return (
    <form
      className="main-form"
      onSubmit={handleSubmit}>
        <fieldset className="container">
          {
            props.buttonDisabled ?
            <div className="row">
              <div className="col-12 warning-box">(At least five words, please)</div>
            </div>
            : null
          }
          <div className="row">
            <input
              className="col-12"
              placeholder="I feel..."
              onChange={handleChange}
              type="text"
              value={moodValue}
              />
          </div>
          <div className="row">
            <button
              type="submit"
              disabled={buttonDisabled}
              name="submittingbutton"
              className="col col-sm-3"
              >
              Make a Playlist!
            </button>
          </div>
        </fieldset>
    </form>
  );
}
