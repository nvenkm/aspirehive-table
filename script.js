// State variables
let perPage = 10;
let currentPage = 1;
let checkBoxesChecked = 0;
let filteredCustomers = customers;
let sortOrder = "asc";

// DOM elements
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const allCheckboxCheck = document.getElementById("all");
const deleteIcon = document.getElementById("delete-icon");
const filterDiv = document.getElementById("filterAndSearch");
const filterOrSearchTd = document.getElementById("filter-or-search-td");
const orderIcon = document.getElementsByClassName("order-icon");
const addButton = document.getElementById("add-button");
const modal = document.getElementById("modal");
const span = document.getElementsByClassName("close")[0];
const closeButton = document.getElementById("close");

// Event listeners
previousButton.addEventListener("click", handlePrevious);
nextButton.addEventListener("click", handleNext);
allCheckboxCheck.addEventListener("change", handleAllCheckboxChange);
for (let i = 0; i < orderIcon.length; i++) {
    orderIcon[i].addEventListener("click", handleOrder);
}
addButton.addEventListener("click", handleShowAddModal);
closeButton.addEventListener("click", handleCloseModal);
populateTable(filteredCustomers);
updateHeader();

// Function to populate table with data
function populateTable(customers) {
    const tableBody = document.getElementById("tbody");
    tableBody.innerHTML = "";
    for (
        let i = 0 + perPage * (currentPage - 1);
        i < currentPage * perPage && i < customers.length;
        i++
    ) {
        console.log(
            0 + perPage * (currentPage - 1),
            " se ",
            currentPage * perPage && i < customers.length
        );
        const customer = customers[i];
        const row = createRow(customer);
        row.classList.add("fade-in");
        tableBody.appendChild(row);
    }

    updatePagination(customers.length);
}

function handleCheckboxChange(event) {
    const checkbox = event.target;
    const row = checkbox.closest("tr");
    if (checkbox.checked) {
        checkBoxesChecked++;
        console.log(checkBoxesChecked);
    } else {
        checkBoxesChecked--;
        console.log(checkBoxesChecked);
    }

    updateHeader();

    Array.from(row.children).forEach((cell, index) => {
        console.log(cell, index);
        if (index === 0) {
            cell.style.borderLeft = "2px solid blue";
        }
        if (checkbox.checked) {
            cell.style.backgroundColor = "rgba(235, 240, 250, 1)";
        } else {
            cell.style.backgroundColor = "";
            cell.style.borderLeft = "";
        }
    });
}

// Function to create a table row for a customer
function createRow(customer) {
    const row = document.createElement("tr");

    const checkboxCell = document.createElement("td");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = customer.id;
    checkbox.addEventListener("change", handleCheckboxChange);
    checkboxCell.appendChild(checkbox);
    row.appendChild(checkboxCell);

    const idCell = document.createElement("td");
    idCell.textContent = customer.id;
    row.appendChild(idCell);

    const nameCell = document.createElement("td");
    const nameDiv = createNameDiv(customer.name, customer.phoneNumber);
    nameCell.appendChild(nameDiv);
    row.appendChild(nameCell);

    const descriptionCell = document.createElement("td");
    if (customer.description.length > 50) {
        let description = customer.description.substring(0, 50) + "...";
        descriptionCell.textContent = description;
    } else {
        descriptionCell.textContent = customer.description;
    }
    row.appendChild(descriptionCell);

    const statusCell = document.createElement("td");
    const statusSpan = document.createElement("span");
    statusSpan.textContent = customer.status;
    statusSpan.classList.add("status");
    statusSpan.classList.add(customer.status);
    statusCell.appendChild(statusSpan);
    row.appendChild(statusCell);

    const rateCell = document.createElement("td");
    const rateDiv = createCurrencyDiv(customer.rate, customer.currency);
    rateCell.appendChild(rateDiv);
    row.appendChild(rateCell);

    const balanceCell = document.createElement("td");
    const balanceDiv = createCurrencyDiv(customer.balance, customer.currency);
    if (customer.balance.startsWith("-")) {
        balanceDiv.classList.add("negative-balance");
    } else {
        balanceDiv.classList.add("positive-balance");
    }
    balanceCell.appendChild(balanceDiv);
    row.appendChild(balanceCell);

    const depositCell = document.createElement("td");
    const depositDiv = createCurrencyDiv(customer.deposit, customer.currency);
    depositCell.appendChild(depositDiv);
    row.appendChild(depositCell);
    return row;
}

// Function to update pagination
function updatePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / perPage);
    const itemsShowing = `${Math.min(
        perPage * (currentPage - 1) + 1,
        totalItems
    )} to ${Math.min(perPage * currentPage, totalItems)} of ${totalItems}`;
    const currentPageText = `${currentPage} / ${totalPages}`;

    document.getElementById("items-showing").textContent = itemsShowing;
    document.getElementById("current-page").textContent = currentPageText;

    if (currentPage === 1) {
        previousButton.disabled = true;
        previousButton.style.backgroundColor = "#efefef";
        previousButton.style.cursor = "not-allowed";
    } else {
        previousButton.disabled = false;
        previousButton.style.backgroundColor = "white";
        previousButton.style.cursor = "pointer";
    }

    if (currentPage === totalPages) {
        nextButton.disabled = true;
        nextButton.style.backgroundColor = "#efefef";
        nextButton.style.cursor = "not-allowed";
    } else {
        nextButton.disabled = false;
        nextButton.style.backgroundColor = "white";
        nextButton.style.cursor = "pointer";
    }
}

// Function to handle changing rows per page
function changePerPage(value) {
    perPage = value;
    currentPage = 1;
    populateTable(filteredCustomers);
}

// Function to handle going to the previous page
function handlePrevious() {
    if (currentPage > 1) {
        currentPage--;
        populateTable(filteredCustomers);
    }
}

// Function to handle going to the next page
function handleNext() {
    const totalPages = Math.ceil(customers.length / perPage);
    if (currentPage < totalPages) {
        currentPage++;
        populateTable(filteredCustomers);
    }
}

//function to create the div for currencies
function createCurrencyDiv(balance, currency) {
    const currencyDiv = document.createElement("div");
    currencyDiv.classList.add("rate-div");
    const rateSpan = document.createElement("span");
    rateSpan.textContent = balance;
    const currencySpan = document.createElement("span");
    currencySpan.classList.add("currency");
    currencySpan.textContent = currency;
    currencyDiv.appendChild(rateSpan);
    currencyDiv.appendChild(currencySpan);

    return currencyDiv;
}

function createNameDiv(name, pno) {
    const nameDiv = document.createElement("div");
    nameDiv.classList.add("name-div");
    const nameSpan = document.createElement("span");
    nameSpan.classList.add("name");
    nameSpan.textContent = name;
    const pnoSpan = document.createElement("span");
    pnoSpan.classList.add("p-no");
    pnoSpan.textContent = pno;
    nameDiv.appendChild(nameSpan);
    nameDiv.appendChild(pnoSpan);
    return nameDiv;
}

function handleAllCheckboxChange(event) {
    const isChecked = event.target.checked;
    const checkboxes = document.querySelectorAll(
        "#tbody input[type='checkbox']"
    );

    checkboxes.forEach((checkbox) => {
        checkbox.checked = isChecked;
        if (isChecked) {
            checkBoxesChecked++;
            console.log(checkBoxesChecked);
        } else {
            checkBoxesChecked--;
            console.log(checkBoxesChecked);
        }
        const row = checkbox.closest("tr");
        Array.from(row.children).forEach((cell, index) => {
            if (index === 0) {
                cell.style.borderLeft = "2px solid blue";
            }

            if (isChecked) {
                cell.style.backgroundColor = "rgba(235, 240, 250, 1)";
            } else {
                cell.style.backgroundColor = "";
                cell.style.borderLeft = "";
            }
        });
    });

    updateHeader();
}

function handleDelete() {
    const checkboxes = document.querySelectorAll(
        "#tbody input[type='checkbox']:checked"
    );
    checkboxes.forEach((checkbox) => {
        const id = checkbox.id;
        console.log("IODDD:s", id);
        filteredCustomers = filteredCustomers.filter(
            (customer) => customer.id.toString() !== id
        );
        customers = filteredCustomers;
        populateTable(filteredCustomers);
        console.log(filteredCustomers);
    });
    checkBoxesChecked = 0;
    allCheckboxCheck.checked = false;
    updateHeader();
}

function updateHeader() {
    filterOrSearchTd.innerHTML = "";

    if (checkBoxesChecked > 0) {
        console.log("Delete div");
        const deleteDiv = document.createElement("div");
        deleteDiv.classList.add("delete-div");

        const deleteSpan = document.createElement("span");
        deleteSpan.classList.add("selected-span");
        deleteSpan.textContent = `${checkBoxesChecked} selected`;

        const deleteIconSpan = document.createElement("span");
        deleteIconSpan.classList.add("delete-icon");
        deleteIconSpan.innerHTML = `<svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 12 14"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M2.75 2.75V3.25H0.75C0.335786 3.25 0 3.58579 0 4C0 4.41421 0.335786 4.75 0.75 4.75H1.51389L1.89504 11.6109C1.95392 12.6708 2.8305 13.5 3.89196 13.5H8.10802C9.16948 13.5 10.0461 12.6708 10.1049 11.6109L10.4861 4.75H11.25C11.6642 4.75 12 4.41421 12 4C12 3.58579 11.6642 3.25 11.25 3.25H9.25V2.75C9.25 1.50736 8.24264 0.5 7 0.5H5C3.75736 0.5 2.75 1.50736 2.75 2.75ZM5 2C4.58579 2 4.25 2.33579 4.25 2.75V3.25H7.75V2.75C7.75 2.33579 7.41421 2 7 2H5ZM5.25 6.75C5.25 6.33579 4.91421 6 4.5 6C4.08579 6 3.75 6.33579 3.75 6.75V11.25C3.75 11.6642 4.08579 12 4.5 12C4.91421 12 5.25 11.6642 5.25 11.25V6.75ZM8.25 6.75C8.25 6.33579 7.91421 6 7.5 6C7.08579 6 6.75 6.33579 6.75 6.75V11.25C6.75 11.6642 7.08579 12 7.5 12C7.91421 12 8.25 11.6642 8.25 11.25V6.75Z"
                                                    fill="#dc4067"
                                                />
                                            </svg>`;
        deleteIconSpan.addEventListener("click", handleDelete);
        deleteDiv.appendChild(deleteSpan);
        deleteDiv.appendChild(deleteIconSpan);

        filterOrSearchTd.appendChild(deleteDiv);
    } else {
        console.log("Filter and Search");
        const filterAndSearchDiv = document.createElement("div");
        filterAndSearchDiv.classList.add("filterAndSearch");
        const filterIcon = document.createElement("svg");
        filterIcon.innerHTML = `<svg
                                            class="filter-svg"
                                            width="40"
                                            height="32"
                                            viewBox="0 0 50 42"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g
                                                filter="url(#filter0_ddd_1376_3190)"
                                            >
                                                <rect
                                                    x="5"
                                                    y="3"
                                                    width="40"
                                                    height="32"
                                                    rx="6"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M30.79 13.6156C31.3029 12.9591 30.8351 12 30.002 12H20.0019C19.1687 12 18.7009 12.9591 19.2138 13.6156L24.0398 19.7287C24.1772 19.9045 24.2518 20.1212 24.2518 20.3443V25.7961C24.2518 25.9743 24.4672 26.0635 24.5932 25.9375L25.6054 24.9254C25.6991 24.8316 25.7518 24.7044 25.7518 24.5718V20.3443C25.7518 20.1212 25.8264 19.9045 25.9638 19.7287L30.79 13.6156Z"
                                                    fill="#464F60"
                                                />
                                            </g>
                                            <defs>
                                                <filter
                                                    id="filter0_ddd_1376_3190"
                                                    x="0"
                                                    y="0"
                                                    width="50"
                                                    height="42"
                                                    filterUnits="userSpaceOnUse"
                                                    color-interpolation-filters="sRGB"
                                                >
                                                    <feFlood
                                                        flood-opacity="0"
                                                        result="BackgroundImageFix"
                                                    />
                                                    <feColorMatrix
                                                        in="SourceAlpha"
                                                        type="matrix"
                                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                        result="hardAlpha"
                                                    />
                                                    <feOffset dy="2" />
                                                    <feGaussianBlur
                                                        stdDeviation="2.5"
                                                    />
                                                    <feColorMatrix
                                                        type="matrix"
                                                        values="0 0 0 0 0.34902 0 0 0 0 0.376471 0 0 0 0 0.470588 0 0 0 0.1 0"
                                                    />
                                                    <feBlend
                                                        mode="normal"
                                                        in2="BackgroundImageFix"
                                                        result="effect1_dropShadow_1376_3190"
                                                    />
                                                    <feColorMatrix
                                                        in="SourceAlpha"
                                                        type="matrix"
                                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                        result="hardAlpha"
                                                    />
                                                    <feMorphology
                                                        radius="1"
                                                        operator="dilate"
                                                        in="SourceAlpha"
                                                        result="effect2_dropShadow_1376_3190"
                                                    />
                                                    <feOffset />
                                                    <feColorMatrix
                                                        type="matrix"
                                                        values="0 0 0 0 0.27451 0 0 0 0 0.308497 0 0 0 0 0.376471 0 0 0 0.16 0"
                                                    />
                                                    <feBlend
                                                        mode="normal"
                                                        in2="effect1_dropShadow_1376_3190"
                                                        result="effect2_dropShadow_1376_3190"
                                                    />
                                                    <feColorMatrix
                                                        in="SourceAlpha"
                                                        type="matrix"
                                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                        result="hardAlpha"
                                                    />
                                                    <feOffset dy="1" />
                                                    <feGaussianBlur
                                                        stdDeviation="0.5"
                                                    />
                                                    <feColorMatrix
                                                        type="matrix"
                                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                                                    />
                                                    <feBlend
                                                        mode="normal"
                                                        in2="effect2_dropShadow_1376_3190"
                                                        result="effect3_dropShadow_1376_3190"
                                                    />
                                                    <feBlend
                                                        mode="normal"
                                                        in="SourceGraphic"
                                                        in2="effect3_dropShadow_1376_3190"
                                                        result="shape"
                                                    />
                                                </filter>
                                            </defs>
                                        </svg>`;

        const inputDiv = document.createElement("div");
        inputDiv.classList.add("input-div");

        const searchIcon = document.createElement("svg");
        searchIcon.innerHTML = `<svg
                                                class="search-svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M10.6821 11.7458C9.66576 12.5361 8.38866 13.0067 7.00167 13.0067C3.68704 13.0067 1 10.3189 1 7.00335C1 3.68779 3.68704 1 7.00167 1C10.3163 1 13.0033 3.68779 13.0033 7.00335C13.0033 8.39059 12.533 9.66794 11.743 10.6845L14.7799 13.7186C15.0731 14.0115 15.0734 14.4867 14.7806 14.7799C14.4878 15.0731 14.0128 15.0734 13.7196 14.7805L10.6821 11.7458ZM11.5029 7.00335C11.5029 9.49002 9.48765 11.5059 7.00167 11.5059C4.5157 11.5059 2.50042 9.49002 2.50042 7.00335C2.50042 4.51668 4.5157 2.50084 7.00167 2.50084C9.48765 2.50084 11.5029 4.51668 11.5029 7.00335Z"
                                                    fill="#868FA0"
                                                />
                                            </svg>`;

        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Search...";
        input.classList.add("search");
        input.addEventListener("input", handleSearch);

        inputDiv.appendChild(searchIcon);
        inputDiv.appendChild(input);

        filterAndSearchDiv.appendChild(filterIcon);
        filterAndSearchDiv.appendChild(inputDiv);
        filterOrSearchTd.appendChild(filterAndSearchDiv);
    }
}

function handleSearch(e) {
    console.log(e.target.value);
    const searchText = e.target.value.trim().toLowerCase();
    filteredCustomers = customers.filter((customer) => {
        return (
            customer.name.toLowerCase().includes(searchText) ||
            customer.description.toLowerCase().includes(searchText) ||
            customer.status.toLowerCase().includes(searchText) ||
            customer.rate.toLowerCase().includes(searchText) ||
            customer.balance.toLowerCase().includes(searchText) ||
            customer.deposit.toLowerCase().includes(searchText) ||
            customer.phoneNumber.toLowerCase().includes(searchText)
        );
    });
    currentPage = 1;
    customers = filteredCustomers;
    populateTable(filteredCustomers);
}

function handleOrder(e) {
    const currentTarget = e.currentTarget.getAttribute("data-order");
    //possible values - id,name,description, status, rate, balance, deposit
    filterData(currentTarget);
}

function filterData(currentTarget) {
    // Clear sorting indicators from other columns
    const allIcons = document.querySelectorAll("[data-order]");
    allIcons.forEach((icon) => {
        if (icon.getAttribute("data-order") !== currentTarget) {
            icon.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.40962 13.4148C8.21057 13.6992 7.78943 13.6992 7.59038 13.4148L5.05071 9.78673C4.81874 9.45534 5.05582 9 5.46033 9H10.5397C10.9442 9 11.1813 9.45534 10.9493 9.78673L8.40962 13.4148Z" fill="#BCC2CE"/>
            <path d="M8.40962 2.58517C8.21057 2.30081 7.78943 2.30081 7.59038 2.58517L5.05071 6.21327C4.81874 6.54466 5.05582 7 5.46033 7H10.5397C10.9442 7 11.1813 6.54466 10.9493 6.21327L8.40962 2.58517Z" fill="#BCC2CE"/>
        </svg>`;
        }
    });

    if (sortOrder === "none" || sortOrder === "desc") {
        sortOrder = "asc";
    } else if (sortOrder === "asc") {
        sortOrder = "desc";
    }

    filteredCustomers.sort((a, b) => {
        let valA = a[currentTarget];
        let valB = b[currentTarget];

        if (typeof valA === "string") {
            valA = valA.toLowerCase();
        }
        if (typeof valB === "string") {
            valB = valB.toLowerCase();
        }

        if (valA < valB) {
            return sortOrder === "asc" ? -1 : 1;
        }
        if (valA > valB) {
            return sortOrder === "asc" ? 1 : -1;
        }
        return 0;
    });

    customers = filteredCustomers;

    populateTable(filteredCustomers);

    updateSvg(sortOrder, currentTarget);
}

function updateSvg(sortOrder, currentTarget) {
    console.log(currentTarget);
    const element = document.querySelector(`[data-order="${currentTarget}"]`);
    if (sortOrder === "asc") {
        element.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.40962 13.4148C8.21057 13.6992 7.78943 13.6992 7.59038 13.4148L5.05071 9.78673C4.81874 9.45534 5.05582 9 5.46033 9H10.5397C10.9442 9 11.1813 9.45534 10.9493 9.78673L8.40962 13.4148Z" fill="#BCC2CE"/>
            <path d="M8.40962 2.58517C8.21057 2.30081 7.78943 2.30081 7.59038 2.58517L5.05071 6.21327C4.81874 6.54466 5.05582 7 5.46033 7H10.5397C10.9442 7 11.1813 6.54466 10.9493 6.21327L8.40962 2.58517Z" fill="#171C26"/>
        </svg>
        `;
    } else if (sortOrder === "desc") {
        element.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.40962 13.4148C8.21057 13.6992 7.78943 13.6992 7.59038 13.4148L5.05071 9.78673C4.81874 9.45534 5.05582 9 5.46033 9H10.5397C10.9442 9 11.1813 9.45534 10.9493 9.78673L8.40962 13.4148Z" fill="#171C26"/>
            <path d="M8.40962 2.58517C8.21057 2.30081 7.78943 2.30081 7.59038 2.58517L5.05071 6.21327C4.81874 6.54466 5.05582 7 5.46033 7H10.5397C10.9442 7 11.1813 6.54466 10.9493 6.21327L8.40962 2.58517Z" fill="#BCC2CE"/>
        </svg>
        `;
    } else if (sortOrder === "none") {
        element.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.40962 13.4148C8.21057 13.6992 7.78943 13.6992 7.59038 13.4148L5.05071 9.78673C4.81874 9.45534 5.05582 9 5.46033 9H10.5397C10.9442 9 11.1813 9.45534 10.9493 9.78673L8.40962 13.4148Z" fill="#BCC2CE"/>
            <path d="M8.40962 2.58517C8.21057 2.30081 7.78943 2.30081 7.59038 2.58517L5.05071 6.21327C4.81874 6.54466 5.05582 7 5.46033 7H10.5397C10.9442 7 11.1813 6.54466 10.9493 6.21327L8.40962 2.58517Z" fill="#BCC2CE"/>
        </svg>
        `;
    }
}

function handleShowAddModal() {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
};

function handleCloseModal(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Submit form event listener
document
    .getElementById("customer-form")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        const form = event.target;

        const formData = {};

        for (let element of form.elements) {
            if (
                element.tagName === "INPUT" ||
                element.tagName === "TEXTAREA" ||
                element.tagName === "SELECT"
            ) {
                if (element.tagName === "SELECT") {
                    formData[element.name] =
                        element.options[element.selectedIndex].value;
                } else if (element.tagName === "TEXTAREA") {
                    formData.description = element.value;
                } else {
                    formData[element.name] = element.value;
                }
            }
        }
        formData.id = customers.length + 1;

        console.log(formData);

        // Handle form submission
        customers.push(formData);

        populateTable(customers);

        // Reset form
        form.reset();

        modal.style.display = "none"; // Close modal after form submission
    });
