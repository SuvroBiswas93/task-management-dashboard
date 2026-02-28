import { Video } from "lucide-react";

const Reminders = () => {
  return (
    <div className="bg-white rounded-2xl p-5 h-full">
      <h3 className="font-semibold text-gray-900 mb-5">Reminders</h3>

      <p className="font-semibold text-[#174a35] text-[34px] leading-[1.1]">
        Meeting with Arc Company
      </p>
      <p className="text-[16px] text-gray-400 mt-2">Time : 02.00 pm - 04.00 pm</p>

      <button className="mt-6 w-full flex items-center justify-center gap-2.5 bg-linear-to-r from-[#0e5d3b] via-[#17774b] to-[#1f8d59] text-white px-4 py-3 rounded-full text-[18px] font-medium hover:opacity-95 transition-opacity cursor-pointer">
        <Video className="w-4.5 h-4.5" />
        Start Meeting
      </button>
    </div>
  );
};

export default Reminders;