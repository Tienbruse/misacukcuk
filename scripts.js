document.addEventListener('DOMContentLoaded', function() {
    const employeeTableBody = document.getElementById('employee-table-body');
    const employeeModal = document.getElementById('employeeModal');
    const employeeForm = document.getElementById('employeeForm');
    const closeModalButton = document.querySelector('.close');
    const cancelButton = document.getElementById('cancelButton');
    const newButton = document.querySelector('.new-button');
    let editingEmployee = null;
    const employees = [
        {
            CustomerId: '001',
            LastName: 'John Doe',
            Gender: 'Nam',
            DateOfBirth: '1990-01-01',
            Email: 'john.doe@example.com',
            Address: '123 Main St',
            position: 'Developer',
            department: 'IT'
        },
        {
            CustomerId: '002',
            LastName: 'Jane Smith',
            Gender: 'Nữ',
            DateOfBirth: '1992-02-02',
            Email: 'jane.smith@example.com',
            Address: '456 Elm St',
            position: 'Manager',
            department: 'HR'
        }
    ];

    function renderTable() {
        employeeTableBody.innerHTML = '';
        employees.forEach((employee, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${employee.id}</td>
                <td>${employee.name}</td>
                <td>${employee.gender}</td>
                <td>${employee.dob}</td>
                <td>${employee.email}</td>
                <td>${employee.address}</td>
                <td>
                    <button class="edit-button" data-id="${employee.id}">Edit</button>
                    <button class="delete-button" data-id="${employee.id}">Delete</button>
                </td>
            `;
            employeeTableBody.appendChild(row);
        });
    }

    function openModal() {
        employeeModal.style.display = 'block';
    }

    function closeModal() {
        employeeModal.style.display = 'none';
        employeeForm.reset();
        editingEmployee = null;
    }

    employeeForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(employeeForm);
        const employeeData = {
            id: formData.get('employeeId'),
            name: formData.get('employeeName'),
            gender: formData.get('gender'),
            birthDate: formData.get('birthDate'),
            email: formData.get('email'),
            address: formData.get('address'),
            position: formData.get('position'),
            department: formData.get('department')
        };

        if (editingEmployee) {
            const index = employees.findIndex(emp => emp.id === editingEmployee.CustomerId);
            employees[index] = employeeData;
        } else {
            employees.push(employeeData);
        }
        console.log(employeeData)
        console.log(employees)

        renderTable();
        closeModal();
    });

    employeeTableBody.addEventListener('click', function(event) {
        if (event.target.classList.contains('edit-button')) {
            const employeeId = event.target.getAttribute('data-id');
            editingEmployee = employees.find(emp => emp.CustomerId === employeeId);
            openModal();

            for (let key in editingEmployee) {
                if (employeeForm[key]) {
                    employeeForm[key].value = editingEmployee[key];
                }
            }
        } else if (event.target.classList.contains('delete-button')) {
            const employeeId = event.target.getAttribute('data-id');
            const index = employees.findIndex(emp => emp.id === employeeId);
            employees.splice(index, 1);
            renderTable();
        }
    });

    newButton.addEventListener('click', openModal);
    closeModalButton.addEventListener('click', closeModal);
    cancelButton.addEventListener('click', closeModal);

    window.addEventListener('click', function(event) {
        if (event.target === employeeModal) {
            closeModal();
        }
    });

    renderTable();
});
