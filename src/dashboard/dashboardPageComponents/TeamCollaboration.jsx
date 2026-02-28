import { Plus } from "lucide-react";

const statusColors = {
  Completed: "text-[#4f8f5c] bg-[#edf8f2] border border-[#cfe9db]",
  "In Progress": "text-[#d28b2a] bg-[#fff7ea] border border-[#f2deb9]",
  Pending: "text-[#7b8599] bg-[#f1f4f8] border border-[#dce3ec]",
};

const colorMap = ["bg-emerald-700", "bg-yellow-500", "bg-blue-500", "bg-red-500"];

const TeamCollaboration = ({ data }) => {
  const fallbackMembers = [
    {
      name: "Alexandra Deff",
      task: "Github Project Repository",
      status: "Completed",
    },
    {
      name: "Edwin Adenike",
      task: "Integrate User Authentication System",
      status: "In Progress",
    },
    {
      name: "Isaac Oluwatemilorum",
      task: "Develop Search and Filter Functionality",
      status: "Pending",
    },
    {
      name: "David Oshodi",
      task: "Responsive Layout for Homepage",
      status: "In Progress",
    },
  ];

  const members = data?.users?.length
    ? data.users.slice(0, 4).map((user, i) => ({
        name: user.name,
        task: user.task || fallbackMembers[i]?.task || "Project Task",
        status:
          user.status === "active"
            ? "In Progress"
            : user.status === "inactive"
              ? "Pending"
              : user.status || fallbackMembers[i]?.status || "Pending",
      }))
    : fallbackMembers;

  return (
    <div className="bg-white rounded-2xl p-5 h-full">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-gray-900 text-lg">Team Collaboration</h3>
        <button className="flex items-center gap-1.5 text-sm font-semibold text-[#2f9a78] border border-[#b8dfcb] bg-transparent px-4 py-1.5 rounded-xl hover:bg-[#f6fbf9] transition-colors cursor-pointer">
          <Plus className="w-3.5 h-3.5" /> Add Member
        </button>
      </div>

      <div className="space-y-4">
        {members.map((member, i) => (
          <div
            key={member.name}
            className="flex items-center gap-3"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${colorMap[i % colorMap.length]}`}
            >
              {member.name.charAt(0)}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold leading-tight text-gray-900">{member.name}</p>
              <p className="text-xs text-gray-500 truncate">
                Working on: <span className="font-semibold text-gray-600">{member.task}</span>
              </p>
            </div>

            <span
              className={`text-xs font-medium px-2.5 py-0.5 rounded-full capitalize whitespace-nowrap ${
                statusColors[member.status] || "text-gray-500 bg-gray-100 border border-gray-200"
              }`}
            >
              {member.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamCollaboration;