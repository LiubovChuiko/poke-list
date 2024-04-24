import React from 'react';
import {useSelector} from 'react-redux';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import {Config} from 'lib/redux/reducers/mainSlice';
import './select.scss'

type Props = {
  typesList: ObjRecord[];
  onSelect: (typeUid: string) => void;
};

type Store = {main: Config};

export default function TypeSelect(props: Props) {
  const {typesList, onSelect} = props;
  const selectedType = useSelector<Store, string>(
    state => state.main.selectedType,
  );
  const [val, setVal] = React.useState<string>(selectedType);

  const handleChange = (event: SelectChangeEvent) => {
    setVal(event.target.value);
    onSelect(event.target.value);
  };

  return (
    <section className='select-section'>
      <FormControl sx={{ m: 1, minWidth: 290 }}>      
      <InputLabel id="demo-simple-select-helper-label">Select By Type</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={val}
        label="Select By Type"
        onChange={handleChange}>
        <MenuItem key="none" value="none">
          <em>All</em>
        </MenuItem>
        {!!typesList &&
          typesList.map((item: ObjRecord) => (
            <MenuItem key={item.uid} value={item.uid}>{item.name}</MenuItem>
          ))}
      </Select>
      </FormControl>
    </section>
  );
}
