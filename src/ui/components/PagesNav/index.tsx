import React from 'react';
import {Pagination, Stack} from '@mui/material';
import './pagesnav.scss';

type Props = {
  pagesCount: number;
  defaultPage: number;
  onPaginate: (page: number) => void;
};

export default function PagesNav(props: Props) {
  const {defaultPage, pagesCount, onPaginate} = props;

  return (
    <section className="section">
      <Stack alignItems="center">
        <Pagination
          defaultPage={defaultPage}
          count={pagesCount}
          onChange={(event, page) => onPaginate(page)}
          shape="rounded"
          className="nav"
        />
      </Stack>
    </section>
  );
}
