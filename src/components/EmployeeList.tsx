import { Employee } from "../types";
import { Trash2, Mail, Briefcase, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface EmployeeListProps {
  employees: Employee[];
  onDelete: (id: string) => void;
}

export default function EmployeeList({ employees, onDelete }: EmployeeListProps) {
  if (employees.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-zinc-300">
        <p className="text-zinc-500">No employee records found. Add your first employee to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence mode="popLayout">
        {employees.map((employee) => (
          <motion.div
            key={employee.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 hover:shadow-md transition-shadow group relative"
          >
            <button
              onClick={() => onDelete(employee.id)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all opacity-0 group-hover:opacity-100"
              title="Delete Record"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-lg">
                {employee.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900">{employee.name}</h3>
                <p className="text-sm text-zinc-500">{employee.position}</p>
              </div>
            </div>

            <div className="space-y-2 text-sm text-zinc-600">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-zinc-400" />
                <span>{employee.department}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-zinc-400" />
                <span className="truncate">{employee.email}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
