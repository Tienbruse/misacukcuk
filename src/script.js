function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let total = 101

const removeVietnameseTones = (str) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
    str = str.replace(/\u02C6|\u0306|\u031B/g, "");
    str = str.replace(/ + /g, " ");
    str = str.trim();
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
    return str;
}
const tableBody = document.getElementById("table-body");
let editBtnS = document.querySelectorAll(".edit-button")
const totalBlock = document.getElementById("total")
const nav = document.getElementById("navbar")
const content = document.getElementById("content")
const menuBtn = document.getElementById("menuBtn")
const collapseBtn = document.getElementById("collapseBtn")
const ul = document.getElementById("ul")
const prevPageBtn = document.getElementById("prevPage");
const nextPageBtn = document.getElementById("nextPage");
const pageSizeSelect = document.getElementById("pageSize");
const addButton = document.getElementById("addButton");

const editModal = document.getElementById("editModal");
const confirmModal = document.getElementById("confirmModal");
const closeBtn = document.querySelector(".close-button");
const cancelBtn = document.getElementById("cancelButton");
const editForm = document.getElementById("editForm");
const confirmCancelButton = document.getElementById("confirmCancelButton")
const confirmButton = document.getElementById("confirmButton")

const loadingTable = document.getElementById("loaderTable")
const loadingModal = document.getElementById("loaderModal")
let isLoading = false


let closeByClick = false
let page = 0
let pageSize = parseInt(pageSizeSelect.value);

const populateTable = (data) => {
    loadingTable.style.display = "flex"
    tableBody.innerHTML = "";
    updateTotal()
    data.forEach((employee, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                <td>${employee.id}</td>
                <td>${employee.code}</td>
                <td>${employee.name}</td>
                <td>${employee.gender}</td>
                <td>${employee.dob}</td>
                <td>${employee.email}</td>
                <td>${employee.address}</td>
                <td>
                    <span class="button-container">
                        <button class="edit-button" data-id="${employee.id}">
                            <img src="/assets/image/editing.png" alt="Edit" style="pointer-events: none;">
                        </button>
                        <button class="delete-button" data-id="${employee.id}">
                            <img src="/assets/image/remove.png" alt="Edit" style="pointer-events: none;">
                        </button>
                    </span>
                </td>
            `;
        tableBody.appendChild(row);
    });
    editBtnS = document.querySelectorAll(".edit-button")
    loadingTable.style.display = "none"
}

const generateFakeData = (count) => {
    const data = [];
    for (let i = 1; i <= count; i++) {
        data.push({
            id: `${i}`,
            code: `NV-${i}`,
            name: `Employee ${i}`,
            gender: i % 2 === 0 ? "Nam" : "Nữ",
            dob: `${1970 + i}-01-01`,
            email: `employee${i}@example.com`,
            address: `Address ${i}`,
            searchText: removeVietnameseTones(`NV-${i}` + `Employee ${i}`),
            identifierId: `${i}-${i}-${i}`,
            dataRange: `01/01/${1980 + i}`,
            issuedBy: `Hanoi-${i}`,
            mobilePhone: `012345678${i}`,
            landlinePhone: `098765432${i}`,
            bankAccount: `12345${i}`,
            bankName: `Tienbruse`,
            branch: `VP`,
            position: `position-${i}`,
            department: `department-${i}`
        });
    }
    return data;
}

const fakeApiGet = async (page, pageSize) => {
    await sleep(2000);
    const index = page * pageSize
    let resEmployee = [];
    for (let i = index; i < Math.min(index + pageSize, employees.length); i++) {
        resEmployee.push(employees[i])
    }
    console.log(resEmployee)
    return {
        page: page,
        page_size: pageSize,
        total: employees.length,
        employees: resEmployee,
    }
}

const fakeApiSearch = async (query) => {
    await sleep(1000)
    const searchText = removeVietnameseTones(query.toLowerCase());
    return employees.filter(employee =>
        employee.searchText.toLowerCase().includes(searchText)
    )
}

const fakeApiUpsertData = async (updatedData) => {
    await sleep(2000);
    const index = employees.findIndex(emp => emp.id === updatedData.id);
    if (index >= 0)
        employees[index] = updatedData;
    else
        employees.push(updatedData)
}

const fakeApiDeleteData = async (index) => {
    await sleep(2000);
    employees.splice(index, 1);
}

const fakeApiGetPosition = async () => {
    await sleep(2000);
    return {
        data: [
            "Developer",
            "Designer",
            "Other",
        ]
    }
}

const fakeApiGetDepartment = async () => {
    await sleep(2000);
    return {
        data: [
            "HR",
            "IT",
            "Sales",
            "Other",
        ]
    }
}

const updatePagination = () => {
    prevPageBtn.disabled = page === 0;
    nextPageBtn.disabled = page === Math.ceil(total / pageSize) - 1;
}

const navSlide = () => {
    window.onresize = function () {
        const w = window.outerWidth;
        if (w < 800 && !closeByClick) {
            rmNavBar()
        }
        if (w >= 800 && !closeByClick) {
            addNavBar()
        }
    };
}

const addNavBar = () => {
    nav.classList.remove("hidden")
    ul.classList.remove("hidden")
    content.classList.remove("extend")
}

const rmNavBar = () => {
    nav.classList.add("hidden")
    ul.classList.add("hidden")
    content.classList.add("extend")
}

const toggleNavBar = () => {
    nav.classList.toggle("hidden")
    ul.classList.toggle("hidden")
    content.classList.toggle("extend")
    closeByClick = nav.classList.contains("hidden");
}

const updatePositionAndDepartment = (positions, departments) => {
    const selectPosition = document.getElementById("position");
    selectPosition.innerHTML = "<option value=\"\" disabled selected>Chọn phòng ban</option>";
    console.log(positions)
    positions.data.forEach((position, index) => {
        const row = document.createElement("option");
        row.innerHTML = `<option value="${position}">${position}</option>`;
        selectPosition.appendChild(row);
    });
    const selectDepartment = document.getElementById("department")
    selectDepartment.innerHTML = "<option value=\"\" disabled selected>Chọn phòng ban</option>";
    departments.data.forEach((department, index) => {
        const row = document.createElement("option");
        row.innerHTML = `<option value="${department}">${department}</option>`;
        selectDepartment.appendChild(row);
    });
    // loadingModal.style.display = "none"
}

const upsertData = (editForm) => {
    const formData = new FormData(editForm);
    const employeeData = {
        id: formData.get('id'),
        code: formData.get('code'),
        name: formData.get('name'),
        gender: formData.get('gender'),
        dob: formData.get('dob'),
        email: formData.get('email'),
        address: formData.get('address'),
        position: formData.get('position'),
        department: formData.get('department'),
        identifierId: formData.get('identifierId'),
        dataRange: formData.get('dataRange'),
        issuedBy: formData.get('issuedBy'),
        mobilePhone: formData.get('mobilePhone'),
        landlinePhone: formData.get('landlinePhone'),
        bankAccount: formData.get('bankAccount'),
        bankName: formData.get('bankName'),
        branch: formData.get('branch'),
        searchText: formData.get('code') + formData.get('name'),
    }
    loadingTable.style.display = "flex"
    tableBody.style.display = "none"
    isLoading = true
    fakeApiUpsertData(employeeData)
        .then(() => {
            fillDataToTable()
        })
}

const employees = generateFakeData(total);

const updateTotal = () => {
    totalBlock.innerHTML = total
}

const fillForm = (employee, positions, department) => {
    editForm.id.value = employee.id;
    editForm.code.value = employee.code;
    editForm.name.value = employee.name || "";
    ;
    editForm.dob.value = employee.dob || "";
    ;
    editForm.gender.value = employee.gender || "";
    ;
    if (positions.data.includes(employee.position)) {
        editForm.position.value = employee.position
    } else {
        editForm.position.value = "Other"
    }
    if (department.data.includes(employee.department)) {
        editForm.department.value = employee.department
    } else {
        editForm.department.value = "Other"
    }
    editForm.address.value = employee.address || "";
    editForm.mobilePhone.value = employee.mobilePhone || "";
    editForm.landlinePhone.value = employee.landlinePhone || "";
    editForm.email.value = employee.email || "";
    editForm.bankAccount.value = employee.bankAccount || "";
    editForm.bankName.value = employee.bankName || "";
    editForm.branch.value = employee.branch || "";
}

const fillDataToTable = () => {
    loadingTable.style.display = "flex"
    tableBody.style.display = "none"
    isLoading = true
    fakeApiGet(page, pageSize)
        .then(data => {
            populateTable(data.employees);
        }).then(() => {
        loadingTable.style.display = "none"
        isLoading = false
        tableBody.style.display = ""
    });
}

navSlide();
fillDataToTable();

document.addEventListener("DOMContentLoaded", function () {
    menuBtn.addEventListener('click', function () {
        toggleNavBar()
    })

    collapseBtn.addEventListener('click', function () {
        toggleNavBar()
    })

    prevPageBtn.addEventListener("click", function () {
        if (page > 0 && !isLoading) {
            page--;
            fillDataToTable()
            updatePagination();
        }
    });

    nextPageBtn.addEventListener("click", function () {
        if (page < Math.ceil(total / pageSize) - 1&& !isLoading) {
            page++;
            fillDataToTable()
            updatePagination();
        }
    });

    pageSizeSelect.addEventListener("change", function () {
        if (!isLoading) {
            pageSize = parseInt(pageSizeSelect.value);
            page = 0;
            fillDataToTable()
            updatePagination();
        }
    });

    document.getElementById("search").addEventListener("input", function (event) {
        fakeApiSearch(event.target.value.toLowerCase())
            .then(data => {
                console.log(data)
                populateTable(data);
            }).then(() => {
                loadingTable.style.display = "none"
                isLoading = false
            }).catch(error => {
            console.error('Error fetching data:', error);
            });
    });

    closeBtn.addEventListener("click", () => {
        editModal.style.display = "none";
    });

    cancelBtn.addEventListener("click", () => {
        editModal.style.display = "none";
    });

    confirmCancelButton.addEventListener("click", () => {
        confirmModal.style.display = "none";
    })

    confirmButton.addEventListener("click", () => {
        confirmModal.style.display = "none";
        loadingTable.style.display = "flex"
        tableBody.style.display = "none"
        isLoading = true
        fakeApiDeleteData(confirmModal.getAttribute("delete-id"))
            .then(() => {
                fillDataToTable()
            })
    })

    editForm.addEventListener("submit", (e) => {
        e.preventDefault();
        editModal.style.display = "none";
        upsertData(editForm)
    });

    addButton.addEventListener("click", () => {
        let position, department
        editModal.style.display = "block";
        loadingModal.style.display = "flex"
        editForm.style.display = "none"
        fakeApiGetPosition()
            .then((data) => {
                position = data
            }).then(() => {
            fakeApiGetDepartment()
                .then((data) => {
                    department = data
                    updatePositionAndDepartment(position, department)
                    const initEmployee = {
                        id: total,
                        code: `NV-${total + 1}`
                    }
                    fillForm(initEmployee, position, department);
                    editModal.style.display = "block";
                    editForm.style.display = ""
                    loadingModal.style.display = "none"
                })
        })
    })

    tableBody.addEventListener('click', function (event) {
        if (event.target.classList.contains('edit-button')) {
            let position, department
            editModal.style.display = "block";
            loadingModal.style.display = "flex"
            editForm.style.display = "none"
            fakeApiGetPosition()
                .then((data) => {
                    position = data
                }).then(() => {
                    fakeApiGetDepartment()
                        .then((data) => {
                            department = data
                            updatePositionAndDepartment(position, department)
                            const employeeId = event.target.getAttribute("data-id");
                            const employee = employees.find(employee => employee.id === employeeId);
                            fillForm(employee, position, department);
                            editModal.style.display = "block";
                            editForm.style.display = ""
                            loadingModal.style.display = "none"
                        })
            })
        } else if (event.target.classList.contains('delete-button')) {
            const employeeId = event.target.getAttribute('data-id');
            const index = employees.findIndex(emp => emp.id === employeeId);
            confirmModal.style.display = "block";
            confirmModal.setAttribute("delete-id", index.toString())
        }
    })
})