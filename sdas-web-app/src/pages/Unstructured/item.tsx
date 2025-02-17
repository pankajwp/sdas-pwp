// import { Button } from "@/components/ui/button";
// import { ArrowRight, Blocks, Settings2 } from "lucide-react";
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowUpDown, FileText, FolderOpen } from 'lucide-react';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';

import BreadcrumbsWithBackground from '@/components/layout/Breadcrums';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const data: AppContent[] = [
  {
    item_id: 1,
    item_name: 'Folder_111',
    item_type: 'pdf',
    last_accessed: '2023-10-01',
    size: 12345,
  },
  {
    item_id: 2,
    item_name: 'Folder_222',
    item_type: 'docx',
    last_accessed: '2023-10-01',
    size: 12345,
  },
  {
    item_id: 3,
    item_name: 'Folder_3333',
    item_type: '',
    last_accessed: '2023-10-01',
    size: 12345,
  },
  {
    item_id: 4,
    item_name: 'Folder_4444',
    item_type: 'zip',
    last_accessed: '2023-10-01',
    size: 12345,
  },
];

export type AppContent = {
  item_id: number;
  item_name: string;
  item_type: 'pdf' | 'zip' | 'docx' | '';
  last_accessed: string;
  size: number;
};

export const columns: ColumnDef<AppContent>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'item_name',
    header: 'Item name',
    cell: ({ row }) => {
      const itemType = row.getValue('item_type');
      const itemId = row.original.item_id;

      return (
        <div className='flex items-center'>
          {itemType === 'pdf' || itemType === 'zip' || itemType === 'doc' ? (
            <FileText className='mr-2' />
          ) : (
            <FolderOpen className='mr-2' />
          )}
          <Link to={`/unstructured-item/${itemId}`} className='capitalize'>
            {row.getValue('item_name')}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: 'item_type',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Type
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className='capitalize'>{row.getValue('item_type')}</div>,
  },
  {
    accessorKey: 'last_accessed',
    header: 'last accessed',
    cell: ({ row }) => <div className='capitalize'>{row.getValue('last_accessed')}</div>,
  },
  {
    accessorKey: 'size',
    header: 'Size',
    cell: ({ row }) => <div className='capitalize'>{row.getValue('size')}</div>,
  },
];

const Item = () => {
  const params = useParams();
  console.log(params);
  console.log('=======');

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className='flex items-center justify-center'>
      <div className='mx-auto w-full max-w-screen-lg px-6'>
        <h1>Hello {params.id}</h1>
        <BreadcrumbsWithBackground currentPage='APP0001-Application_name_123' />
        <div className='w-full'>
          <div className='flex items-center gap-2 py-4'>
            <Input
              placeholder='Filter apps...'
              value={(table.getColumn('item_name')?.getFilterValue() as string) ?? ''}
              onChange={(event) => table.getColumn('item_name')?.setFilterValue(event.target.value)}
              className='max-w-sm'
            />
          </div>
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'} className='odd:bg-muted/50'>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className='h-24 text-center'>
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className='flex items-center justify-end space-x-2 py-4'>
            <div className='flex-1 text-sm text-muted-foreground'>
              {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
              selected.
            </div>
            <div className='space-x-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button variant='outline' size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
