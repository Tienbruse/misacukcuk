using EmployeeManagement.DTOs;
using EmployeeManagement.Models;

namespace EmployeeManagement.Repositories.Interfaces;

public interface IEmployeeRepository
{
    Task Create(CreateEmployeeRequest request);

    Task Remove(string employeeId);

    Task Update(string employeeId, UpdateEmployeeRequest request);

    Task<Employee?> GetEmployeeDetailByEmployeeId(string employeeId);

    Task<ListEmployee> SearchEmployee(SearchEmployeesRequest request);
}