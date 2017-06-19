import React from 'react';
import TextField from 'material-ui/TextField';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FlatButton from 'material-ui/RaisedButton';
import Button from 'muicss/lib/react/button';

const style = {
  margin: 12,
  color: "#6A8EAE"
};

export default function MoodSelector (props) {
  const handleChange = props.handleChange;
  const handleSubmit = props.handleSubmit;
  const moodValue = props.moodValue;
  console.log('HELOOOOOOO', props)

  return (
    <form
      onSubmit={handleSubmit}>
      <div>
        <TextField
          hintText="Write down some feelings"
          onChange={handleChange}
          value={moodValue}
          />
        <div>
        <FlatButton
          label="GET MUSIC"
          style={style}
          fullWidth={true}
          type="submit">
        </FlatButton>
      </div>
      </div>
    </form>
  );
}
