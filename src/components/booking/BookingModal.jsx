import { useCallback, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import {
  selectBookingError,
  selectBookingStatus,
  selectLastBooking,
  createBooking,
  clearLastBooking,
} from "../../store/bookingSlice"
import {
  closeBooking,
  selectBookingOpen,
  showToast,
} from "../../store/uiSlice"
import { selectSelectedService } from "../../store/servicesSlice"
import BookingForm from "./BookingForm"
import BookingSuccess from "./BookingSuccess"

const MotionDiv = motion.div

const BookingModal = () => {
  const dispatch = useDispatch()
  const isOpen = useSelector(selectBookingOpen)
  const service = useSelector(selectSelectedService)
  const status = useSelector(selectBookingStatus)
  const error = useSelector(selectBookingError)
  const lastBooking = useSelector(selectLastBooking)

  const handleClose = useCallback(() => {
    dispatch(closeBooking())
    dispatch(clearLastBooking())
  }, [dispatch])

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, handleClose])

  const handleSubmit = async (values) => {
    if (!service) return
    const payload = {
      serviceId: service.id,
      serviceTitle: service.title,
      price: service.price,
      ...values,
    }
    const result = await dispatch(createBooking(payload))
    if (result.meta.requestStatus === "fulfilled") {
      dispatch(
        showToast({
          tone: "success",
          message: "Booking confirmed! Check My Bookings for details.",
        })
      )
    }
  }

  return (
    <AnimatePresence>
      {isOpen && service ? (
        <MotionDiv
          className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50 px-4 py-10 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              handleClose()
            }
          }}
        >
          <MotionDiv
            className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-soft dark:bg-slate-900"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold">Book your service</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Confirm the details below to lock in your slot.
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="rounded-full border px-3 py-1 text-xs font-semibold text-slate-500 transition hover:text-slate-700 dark:border-slate-700"
              >
                Close
              </button>
            </div>
            <div className="mt-6">
              {lastBooking ? (
                <BookingSuccess booking={lastBooking} onClose={handleClose} />
              ) : (
                <BookingForm
                  service={service}
                  onSubmit={handleSubmit}
                  isLoading={status === "loading"}
                  error={error}
                />
              )}
            </div>
          </MotionDiv>
        </MotionDiv>
      ) : null}
    </AnimatePresence>
  )
}

export default BookingModal
