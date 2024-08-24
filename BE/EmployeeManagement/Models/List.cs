using System.Collections.Generic;

namespace EmployeeManagement.Models
{
    public class ListEmployee
    {
        public int Total { get; set; }
        public List<Employee> Employees { get; set; }
    }
}