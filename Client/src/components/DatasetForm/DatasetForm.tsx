import React, { FC, useState, ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FileButtonInput from '../FileButtonInput';

interface IFields {
  name: string;
  files: FileList | null;
}

interface IDatasetProps {
  addDataset: (name: string, file: File) => void;
}

const initFields: IFields = {
  name: '',
  files: null,
};

const DatasetForm: FC<IDatasetProps> = ({ addDataset }) => {
  const [fields, setFields] = useState<IFields>(initFields);

  const handleChange = (name: string) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (name === 'files') {
      setFields({
        ...fields,
        files: event.target.files,
      });
    } else {
      setFields({
        ...fields,
        name: event.target.value,
      });
    }
  };

  const handleSend = () => {
    if (!!fields.name && !!fields.files) {
      addDataset(fields.name, fields.files![0]!);
      setFields(initFields);
    }
  };

  return (
    <Grid alignItems="center" container spacing={2}>
      <Grid item xs>
        <TextField
          fullWidth
          label="Name"
          onChange={handleChange('name')}
          value={fields.name}
        />
      </Grid>
      <Grid item>
        <FileButtonInput id="file-input" onChange={handleChange('files')} />
      </Grid>
      <Grid item>
        <Button
          disabled={!fields.name || !fields.files}
          onClick={handleSend}
          variant="contained"
          color="primary"
        >
          Add
        </Button>
      </Grid>
    </Grid>
  );
};

export default DatasetForm;
