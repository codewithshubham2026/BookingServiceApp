import { Controller, useForm } from "react-hook-form"
import Button from "../ui/Button"
import { formatCurrency } from "../../utils/format"
import DatePicker from "./DatePicker"
import TimePicker from "./TimePicker"

const inputStyles =
  "w-full rounded-2xl border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500 dark:border-slate-700 dark:bg-slate-950"

const BookingForm = ({ service, onSubmit, isLoading, error }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-2xl border bg-slate-50 p-4 text-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold">{service.title}</div>
            <div className="text-xs text-slate-500">{service.location}</div>
          </div>
          <div className="font-semibold text-brand-600">
            {formatCurrency(service.price)}
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1 text-sm">
            <label className="text-xs font-semibold text-slate-500">Full name</label>
            <input
              className={inputStyles}
              placeholder="Alex Johnson"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name ? (
              <span className="text-xs text-rose-500">{errors.name.message}</span>
            ) : null}
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <label className="text-xs font-semibold text-slate-500">Email</label>
            <input
              className={inputStyles}
              placeholder="alex@email.com"
              type="email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email ? (
              <span className="text-xs text-rose-500">
                {errors.email.message}
              </span>
            ) : null}
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <label className="text-xs font-semibold text-slate-500">Phone</label>
            <input
              className={inputStyles}
              placeholder="+1 (000) 123-4567"
              {...register("phone", { required: "Phone is required" })}
            />
            {errors.phone ? (
              <span className="text-xs text-rose-500">
                {errors.phone.message}
              </span>
            ) : null}
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <label className="text-xs font-semibold text-slate-500">Time</label>
            <Controller
              control={control}
              name="time"
              rules={{ required: "Time is required" }}
              render={({ field }) => (
                <TimePicker value={field.value} onChange={field.onChange} />
              )}
            />
            {errors.time ? (
              <span className="text-xs text-rose-500">{errors.time.message}</span>
            ) : null}
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <label className="text-xs font-semibold text-slate-500">Notes</label>
            <input
              className={inputStyles}
              placeholder="Any special request?"
              {...register("notes")}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <label className="text-xs font-semibold text-slate-500">Date</label>
          <Controller
            control={control}
            name="date"
            rules={{ required: "Date is required" }}
            render={({ field }) => (
              <DatePicker value={field.value} onChange={field.onChange} />
            )}
          />
          {errors.date ? (
            <span className="text-xs text-rose-500">{errors.date.message}</span>
          ) : null}
        </div>
      </div>
      {error ? (
        <div className="rounded-2xl bg-rose-50 px-3 py-2 text-xs text-rose-600 dark:bg-rose-950/40 dark:text-rose-200">
          {error}
        </div>
      ) : null}
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Booking..." : "Confirm booking"}
      </Button>
    </form>
  )
}

export default BookingForm
