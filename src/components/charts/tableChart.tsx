import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { invoices } from "@/utils/helper";



export function TableChart() {
  return (
    <div className="bg-primary-light p-6 rounded-2xl dark:bg-white/15 shadow-none h-full">
      <Table className="">
        <TableHeader className="">
          <TableRow className="text-dark dark:text-white/40 text-xs dark:border-white/20 border-b-[1px]">
            <TableHead className="">Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-dark dark:text-white text-xs">
          {invoices.map((invoice) => (
            <TableRow key={invoice.item} className="border-0">
              <TableCell className="font-medium">{invoice.item}</TableCell>
              <TableCell>{invoice.price}</TableCell>
              <TableCell>{invoice.quantity}</TableCell>
              <TableCell className="">{invoice.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
