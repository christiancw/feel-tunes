import React from 'react';

import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  gridList: {
    width: '70%',
    height: '50%',
    overflowY: 'auto'
  }
};

export default function CurrentMusic (props) {
  const tracks = props.currentMusic;
  // const tracks = currentMusic.tracks;
  console.log('CurrentMusicPROPS', props)

  return (
    <div style={styles.root}>
      <GridList
        cellHeight={180}
        style={styles.GridList}>

      <Subheader>Tracks</Subheader>
      {tracks && tracks.map(track => {
        return (
          <GridTile
            key={track.id}
            title={track.name}
            subtitle={<span>{track.artists[0].name}</span>}>
            <img src={track.album.images[0].url} />
          </GridTile>
        );
      })}
    </GridList>
    </div>
  );
}
