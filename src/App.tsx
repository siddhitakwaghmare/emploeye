import { useState, useEffect } from "react";
import { Employee } from "./types";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import { Plus, Users, Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch("/api/employees");
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  const addEmployee = async (newEmployee: Omit<Employee, "id">) => {
    try {
      const response = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEmployee),
      });
      const data = await response.json();
      setEmployees([...employees, data]);
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const deleteEmployee = async (id: string) => {
    try {
      await fetch(`/api/employees/${id}`, { method: "DELETE" });
      setEmployees(employees.filter((emp) => emp.id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-zinc-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-600 p-2 rounded-lg">
              <Users className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">EmployEye</h1>
          </div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl font-medium transition-all shadow-sm active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Add Employee
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats & Search */}
        <div className="flex flex-col md:flex-row gap-6 mb-8 items-center justify-between">
          <div className="flex gap-4 w-full md:w-auto">
            <div className="bg-white p-4 rounded-2xl border border-zinc-200 flex-1 md:w-48 shadow-sm">
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">Total Employees</p>
              <p className="text-2xl font-bold text-emerald-600">{employees.length}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-zinc-200 flex-1 md:w-48 shadow-sm">
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">Departments</p>
              <p className="text-2xl font-bold text-zinc-900">
                {new Set(employees.map(e => e.department)).size}
              </p>
            </div>
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search by name, position, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
          </div>
        ) : (
          <EmployeeList employees={filteredEmployees} onDelete={deleteEmployee} />
        )}
      </main>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormOpen(false)}
              className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm"
            />
            <EmployeeForm
              onAdd={addEmployee}
              onClose={() => setIsFormOpen(false)}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

