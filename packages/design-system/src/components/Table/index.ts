import { styled } from '../../themed-styled-components';
import { insetSquish } from '../../mixings';

export interface TableCellProps {
  align?: 'left' | 'center' | 'right';
}

const TableCell = styled.td<TableCellProps>`
  ${insetSquish('small')}

  text-align: ${props => props.align!};
`;

TableCell.defaultProps = {
  align: 'center',
} as Partial<TableCellProps>;

const TableRow = styled.tr``;

const TableHead = styled.thead``;

const TableBody = styled.tbody``;

const StyledTable = styled.table`
  width: 100%;
`;

type TableComponent = typeof StyledTable & {
  Head: typeof TableHead;
  Body: typeof TableBody;
  Row: typeof TableRow;
  Cell: typeof TableCell;
};

export const Table: TableComponent = StyledTable as TableComponent;

Table.Head = TableHead;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;
