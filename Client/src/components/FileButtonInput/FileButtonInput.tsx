import React, { FC, Fragment, ChangeEvent } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AttachFileIcon from '@material-ui/icons/AttachFile';

const useStyles = makeStyles(() =>
  createStyles({
    input: {
      display: 'none',
    },
  })
);

interface IFileButtonInput {
  id: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FileButtonInput: FC<IFileButtonInput> = ({ id, onChange }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <input
        onChange={onChange}
        accept="text/plain"
        type="file"
        id={id}
        className={classes.input}
      />
      <label htmlFor={id}>
        <Button component="span">
          <AttachFileIcon />
        </Button>
      </label>
    </Fragment>
  );
};

export default FileButtonInput;
