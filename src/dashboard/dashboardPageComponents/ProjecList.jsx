import { Plus, Globe2, Flower2, PieChart, UsersRound } from "lucide-react";

const ProjectList = ({ data }) => {
  const iconNodes = [
    <svg viewBox="0 0 20 20" className="w-5 h-5 text-blue-600" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 13L8 10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M8 16L12 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M8 8L11 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M11 11L15 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>,
    <Globe2 className="w-5 h-5 text-cyan-600" />,
    <Flower2 className="w-5 h-5 text-emerald-500" />,
    <PieChart className="w-5 h-5 text-amber-500" />,
    <UsersRound className="w-5 h-5 text-violet-600" />,
  ];
  const projects = data?.projects?.length
    ? data.projects.slice(0, 5).map((project, index) => ({
        name: project.name,
        due: project.dueDate || ["Nov 25, 2024", "Nov 28, 2024", "Nov 30, 2024", "Dec 05, 2024", "Dec 06, 2024"][index],
        iconNode: iconNodes[index],
      }))
    : [
        { name: "Develop API Endpoints", due: "Nov 25, 2024", iconNode: iconNodes[0] },
        { name: "Onboarding Flow", due: "Nov 28, 2024", iconNode: iconNodes[1] },
        { name: "Build Dashboard", due: "Nov 30, 2024", iconNode: iconNodes[2] },
        { name: "Optimize Page Load", due: "Dec 05, 2024", iconNode: iconNodes[3] },
        { name: "Cross-Browser Testing", due: "Dec 06, 2024", iconNode: iconNodes[4] },
      ];

  return (
    <div className="bg-white rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900 text-lg">Project</h3>
        <button className="flex items-center gap-1 text-sm font-medium text-emerald-700 border border-emerald-700/55 px-3 py-1 rounded-3xl hover:bg-emerald-50 transition-colors cursor-pointer">
          <Plus className="w-3.5 h-3.5" /> New
        </button>
      </div>

      <div className="space-y-3">
        {projects.map((project) => (
          <div
            key={project.name}
            className="flex items-start gap-3"
          >
            <span className="mt-0.5">{project.iconNode}</span>
            <div className="flex-1">
              <p className="text-[15px] leading-tight font-medium text-gray-900">{project.name}</p>
              <p className="text-xs text-gray-400">Due date: {project.due}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;