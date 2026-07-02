import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getProviderAvailability } from "../services/availabilityService";
import { createAppointment } from "../services/appointmentService";

export default function ProviderDetailPage() {
  const { id } = useParams();

  const [availability, setAvailability] = useState([]);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const [appointmentDate, setAppointmentDate] = useState("");
  const [sessionType, setSessionType] = useState("video");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    loadProviderData();
  }, [id]);

  const loadProviderData = async () => {
    try {
      setLoading(true);

      const availabilityRes =
        await getProviderAvailability(id);

      setAvailability(
        availabilityRes.data.data
      );

      if (
        availabilityRes.data.data.length
      ) {
        setSelectedDay(
          availabilityRes.data.data[0].day
        );

        setSelectedTime(
          availabilityRes.data.data[0]
            .startTime
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async (e) => {
    e.preventDefault();

    try {
      setBooking(true);

      await createAppointment({
        providerId: id,
        appointmentDate,
        day: selectedDay,
        startTime: selectedTime,
        sessionType,
        notes,
      });

      alert(
        "Appointment booked successfully"
      );

      setAppointmentDate("");
      setNotes("");
    } catch (err) {
      console.log(err);
    } finally {
      setBooking(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">

      {/* Back */}
      <Link
        to="/providers"
        className="
          text-cyan-600
          font-medium
          hover:underline
        "
      >
        ← Back to providers
      </Link>

      {/* Provider Card */}
      <section className="
        rounded-3xl
        bg-gradient-to-br
        from-cyan-50
        via-white
        to-emerald-50
        border
        border-slate-200
        p-8
        shadow-sm
      ">
        <h1 className="text-3xl font-bold text-slate-500">
          Provider Name
        </h1>

        <p className="text-slate-500 mt-2">
          Mental Health Therapist
        </p>

        <div className="mt-4 flex gap-4">
          <span className="text-amber-500">
            ★ 4.8
          </span>

          <span className="text-slate-500">
            125 reviews
          </span>
        </div>
      </section>

      {/* Availability */}
      <section className="
        rounded-3xl
        bg-white
        border
        border-slate-200
        p-8
        shadow-sm
      ">
        <h2 className="
          text-xl
          font-semibold
          text-slate-500
          mb-6
        ">
          Available Slots
        </h2>

        <div className="
          grid
          md:grid-cols-3
          gap-4
        ">
          {availability.map((slot) => (
            <button
              key={slot._id}
              onClick={() => {
                setSelectedDay(
                  slot.day
                );

                setSelectedTime(
                  slot.startTime
                );
              }}
              className={`
                rounded-2xl
                border
                p-4
                text-left
                transition
                ${
                  selectedDay ===
                    slot.day &&
                  selectedTime ===
                    slot.startTime
                    ? `
                      bg-gradient-to-r
                      from-cyan-500
                      to-emerald-500
                      text-white
                      border-transparent
                    `
                    : `
                      bg-white
                      border-slate-200
                      hover:border-cyan-300
                      text-slate-500
                    `
                }
              `}
            >
              <div className="font-semibold">
                {slot.day}
              </div>

              <div className="text-sm mt-1">
                {slot.startTime}
                {" - "}
                {slot.endTime}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Appointment Form */}
      <section className="
        rounded-3xl
        bg-white
        border
        border-slate-200
        p-8
        shadow-sm
      ">
        <h2 className="
          text-xl
          font-semibold
          text-slate-500
          mb-6
        ">
          Book Appointment
        </h2>

        <form
          onSubmit={handleBook}
          className="space-y-5"
        >
          <div>
            <label className="
              block
              mb-2
              text-sm
              font-medium
              text-slate-500
            ">
              Appointment Date
            </label>

            <input
              type="date"
              required
              value={
                appointmentDate
              }
              onChange={(e) =>
                setAppointmentDate(
                  e.target.value
                )
              }
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                text-black
                px-4
                py-3
              "
            />
          </div>

          <div>
            <label className="
              block
              mb-2
              text-sm
              font-medium
              text-slate-500
            ">
              Selected Slot
            </label>

            <div className="
              rounded-xl
              bg-slate-50
              text-black
              p-4
            ">
              {selectedDay}
              {" • "}
              {selectedTime}
            </div>
          </div>

          <div>
            <label className="
              block
              mb-2
              text-sm
              font-medium
              text-slate-500
            ">
              Session Type
            </label>

            <select
              value={sessionType}
              onChange={(e) =>
                setSessionType(
                  e.target.value
                )
              }
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                text-black
                px-4
                py-3
              "
            >
              <option value="video">
                Video Call
              </option>

              <option value="audio">
                Audio Call
              </option>

              <option value="chat">
                Chat Session
              </option>
            </select>
          </div>

          <div>
            <label className="
              block
              mb-2
              text-sm
              font-medium
              text-slate-500
            ">
              Notes
            </label>

            <textarea
              rows={4}
              value={notes}
              onChange={(e) =>
                setNotes(
                  e.target.value
                )
              }
              placeholder="
                Tell the provider
                about your concerns...
              "
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                text-black
                px-4
                py-3
              "
            />
          </div>

          <button
            type="submit"
            disabled={booking}
            className="
              w-full
              rounded-xl
              bg-gradient-to-r
              from-cyan-500
              to-emerald-500
              text-white
              py-4
              font-semibold
              hover:opacity-90
            "
          >
            {booking
              ? "Booking..."
              : "Book Appointment"}
          </button>
        </form>
      </section>
    </div>
  );
}