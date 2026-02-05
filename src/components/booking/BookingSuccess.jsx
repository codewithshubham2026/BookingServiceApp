import Button from "../ui/Button"
import { formatCurrency, formatDate } from "../../utils/format"

const BookingSuccess = ({ booking, onClose }) => (
  <div className="flex flex-col gap-4 text-center">
    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
      OK
    </div>
    <div>
      <h3 className="text-xl font-semibold">Booking confirmed!</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        We saved your booking and sent a confirmation.
      </p>
    </div>
    <div className="rounded-2xl border bg-slate-50 p-4 text-left text-sm dark:border-slate-800 dark:bg-slate-950">
      <div className="flex items-center justify-between">
        <span className="font-semibold">{booking.serviceTitle}</span>
        <span className="text-brand-600">
          {formatCurrency(booking.price)}
        </span>
      </div>
      <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
        {formatDate(booking.date)} - {booking.time}
      </div>
    </div>
    <Button onClick={onClose}>Close</Button>
  </div>
)

export default BookingSuccess
