import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NoData from "@/components/ui/no-data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useBookingReservation from "@/hooks/useBookingReservation";
import { BookingStatus } from "@/models/booking";
import routerPaths from "@/router/paths";
import { formatCurrency, formatDate } from "@/utils/formatters";

import { FilePenIcon, XIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DeleteButtonAlert = ({ onConfirm }: { onConfirm: () => void }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="outline" size="icon" aria-label="Cancel">
          <XIcon className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            booking reservation
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const BookingsPage = () => {
  const navigate = useNavigate();
  const { bookings, handleRemoveBooking } = useBookingReservation();

  const showNoResults = bookings.length === 0;

  const sortedBookings = [...bookings]?.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const getBadgeVariant = (status: BookingStatus) => {
    const destructive = {
      [BookingStatus.PENDING]: "outline" as const,
      [BookingStatus.CONFIRMED]: "secondary" as const,
      [BookingStatus.CANCELLED]: "destructive" as const,
    };

    return destructive[status] || "outline";
  };

  if (showNoResults) {
    return (
      <NoData
        className="bg-background container"
        buttonLabel="Find your next stay"
        onClick={() => navigate(routerPaths.home)}
        description="You haven't made any booking reservations yet."
      />
    );
  }

  return (
    <div className="container mx-auto px-8 mt-10 lg:mt-14">
      <Card>
        <CardHeader>
          <CardTitle>Booking Reservations</CardTitle>
          <CardDescription>
            Manage your booking reservations here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Check In</TableHead>
                <TableHead>Check Out</TableHead>
                <TableHead>Property ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedBookings.map((book) => (
                <TableRow key={book.id}>
                  <TableCell className="font-medium">{book.id}</TableCell>
                  <TableCell>
                    {formatDate(book.createdAt, {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </TableCell>
                  <TableCell>{formatDate(book.checkIn)}</TableCell>
                  <TableCell>{formatDate(book.checkOut)}</TableCell>
                  <TableCell>{book.propertyId}</TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(book.status)}>
                      {book.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatCurrency(book.price)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {}}
                        aria-label="Edit"
                      >
                        <FilePenIcon className="h-4 w-4" />
                      </Button>

                      <DeleteButtonAlert
                        onConfirm={() => handleRemoveBooking(book.id)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingsPage;
