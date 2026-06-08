const services = [
    { id: 1, category: "Hair", name: "Hair Cut", price: 150, duration: "30 minutes", img: "images/haircut.JPG" },
    { id: 2, category: "Hair", name: "Hair Color", price: 500, duration: "2 hours", img: "images/haircolor.JPG" },
    { id: 3, category: "Hair", name: "Rebond", price: 1500, duration: "4 hours", img: "images/rebond.JPG" },
    { id: 4, category: "Hair", name: "Brazilian", price: 1000, duration: "3 hours", img: "images/brazilian.JPG" },
    { id: 5, category: "Hair", name: "Cellophane", price: 500, duration: "2 hours", img: "images/cellophane.JPG" },
    { id: 6, category: "Hair", name: "Highlights", price: 500, duration: "2 hours", img: "images/highlights.JPG" },
    { id: 7, category: "Hair", name: "Hair Mask / Hair Spa", price: 500, duration: "1 hour", img: "images/hairspa.JPG" },
    { id: 8, category: "Nail", name: "Manicure", price: 200, duration: "45 minutes", img: "images/manicure.JPG" },
    { id: 9, category: "Nail", name: "Pedicure", price: 250, duration: "45 minutes", img: "images/pedicure.JPG" },
    { id: 10, category: "Nail", name: "Foot Spa", price: 350, duration: "1 hour", img: "images/footspa.JPG" },
    { id: 11, category: "Nail", name: "Mani/Pedi Gel", price: 600, duration: "1.5 hours", img: "images/gel.jpg" },
    { id: 12, category: "Nail", name: "Soft Gel Extension", price: 700, duration: "2 hours", img: "images/softgel.jpg" }
];

const staff = [
    { name: "Ronald", role: "Hair Services Specialist", category: "Hair", img: "images/ronald.jpg" },
    { name: "Sharmaine", role: "Hair Color and Rebond Specialist", category: "Hair", img: "images/sharmaine.jpg" },
    { name: "Melody", role: "Nail Technician", category: "Nail", img: "images/melody.jpg" },
    { name: "Nelly", role: "Hair and Beauty Specialist", category: "Hair", img: "images/nelly.jpg" },
    { name: "Vilma", role: "Pedicure and Foot Spa Specialist", category: "Nail", img: "images/vilma.jpg" },
    { name: "Alice", role: "Soft Gel and Nail Art Specialist", category: "Nail", img: "images/alice.jpg" }
];

const defaultAppointments = [
    { id: 1001, customerName: "Nina Raiza Belen", contactNumber: "09083200637", email: "nina@example.com", service: "Hair Color", services: ["Hair Color"], price: 500, date: "2026-05-30", time: "09:00", staff: "Ronald", paymentMethod: "GCash", referenceNumber: "GCASH-NINA-001", proofImage: "images/proof-nina.jpg", status: "Pending", createdAt: "2026-05-28T08:00:00" },
    { id: 1002, customerName: "Ashleigh Francisco", contactNumber: "09627824292", email: "ashleigh@example.com", service: "Hair Cut", services: ["Hair Cut"], price: 150, date: "2026-05-30", time: "10:30", staff: "Sharmaine", paymentMethod: "Cash", referenceNumber: "", proofImage: "", status: "Approved", createdAt: "2026-05-28T08:15:00" },
    { id: 1003, customerName: "Alyanna Yesha Galang", contactNumber: "09751133006", email: "alyanna@example.com", service: "Manicure", services: ["Manicure"], price: 200, date: "2026-05-30", time: "13:00", staff: "Melody", paymentMethod: "GCash", referenceNumber: "GCASH-ALYANNA-002", proofImage: "images/proof-hannah(1).jpg", status: "Approved", createdAt: "2026-05-28T08:30:00" },
    { id: 1004, customerName: "Melvin Soliman", contactNumber: "09691092146", email: "melvin@example.com", service: "Rebond", services: ["Rebond"], price: 1500, date: "2026-05-31", time: "11:00", staff: "Nelly", paymentMethod: "Cash", referenceNumber: "", proofImage: "", status: "Cancelled", createdAt: "2026-05-28T08:45:00" },
    { id: 1005, customerName: "Hannah Mae Francisco", contactNumber: "09478541768", email: "hannah@example.com", service: "Soft Gel Extension", services: ["Soft Gel Extension"], price: 700, date: "2026-05-31", time: "15:00", staff: "Alice", paymentMethod: "GCash", referenceNumber: "GCASH-HANNAH-003", proofImage: "images/proof-hannah.jpg", status: "Completed", createdAt: "2026-05-28T09:00:00" }
];

document.addEventListener("DOMContentLoaded", function () {
    setActiveNav();
    seedAppointments();
    setupStrictContactInputs();
    renderPublicSections();
    setupBookingPage();
    setupAdminLogin();
    setupAdminCredentialsForm();
    renderAdminDashboard();
    renderAdminAppointments();
    renderCustomerStatus();
    renderRecords();
    renderReports();
    renderConfirmation();
});

function toggleMenu() {
    const nav = document.getElementById("mainNav");
    if (nav) nav.classList.toggle("open");
}

function setActiveNav() {
    const page = document.body.dataset.page;
    document.querySelectorAll("[data-page]").forEach(link => {
        if (link.dataset.page === page) link.classList.add("active");
    });
    const current = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".side-menu a").forEach(link => {
        if (link.getAttribute("href") === current) link.classList.add("active");
    });
}

function setupStrictContactInputs() {
    document.querySelectorAll('input[type="tel"]').forEach(input => {
        input.setAttribute("maxlength", "11");
        input.setAttribute("pattern", "[0-9]{11}");
        input.setAttribute("inputmode", "numeric");
        input.addEventListener("input", () => {
            input.value = input.value.replace(/\D/g, "").slice(0, 11);
        });
    });
}

function isValidContact(number) {
    return /^\d{11}$/.test(String(number || "").trim());
}

function isValidAppointmentTime(time) {
    return String(time || "") >= "08:00" && String(time || "") <= "17:00";
}

function formatCurrency(amount) {
    return "PHP " + Number(amount || 0).toLocaleString("en-PH");
}

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function statusClass(status) {
    return String(status || "Pending").toLowerCase();
}

function statusBadge(status) {
    return `<span class="status ${statusClass(status)}">${escapeHtml(status)}</span>`;
}

function getAppointments() {
    return JSON.parse(localStorage.getItem("updatesysAppointments") || "[]");
}

function saveAppointments(appointments) {
    localStorage.setItem("updatesysAppointments", JSON.stringify(appointments));
}

function seedAppointments() {
    const saved = JSON.parse(localStorage.getItem("updatesysAppointments") || "null");
    const sampleContacts = defaultAppointments.map(a => a.contactNumber);
    const hasCurrentSamples = saved && sampleContacts.every(contact => saved.some(a => a.contactNumber === contact));
    if (!saved || saved.length === 0 || !hasCurrentSamples) {
        saveAppointments(defaultAppointments);
    }
}

function renderPublicSections() {
    const homeServices = document.getElementById("homeServices");
    const homeStaff = document.getElementById("homeStaff");
    const hairServices = document.getElementById("hairServices");
    const nailServices = document.getElementById("nailServices");

    if (homeServices) homeServices.innerHTML = services.slice(0, 3).map(serviceCard).join("");
    if (homeStaff) homeStaff.innerHTML = staff.map(staffCard).join("");
    if (hairServices) hairServices.innerHTML = services.filter(s => s.category === "Hair").map(serviceCard).join("");
    if (nailServices) nailServices.innerHTML = services.filter(s => s.category === "Nail").map(serviceCard).join("");
}

function toggleHomeServices() {
    const homeServices = document.getElementById("homeServices");
    const toggle = document.getElementById("homeServicesToggle");
    if (!homeServices || !toggle) return;
    const expanded = homeServices.dataset.expanded === "true";
    homeServices.dataset.expanded = String(!expanded);
    homeServices.innerHTML = (expanded ? services.slice(0, 3) : services).map(serviceCard).join("");
    toggle.textContent = expanded ? "See More" : "See Less";
}

function serviceCard(service) {
    return `
        <article class="service-card">
            <img src="${service.img}" alt="${escapeHtml(service.name)}">
            <div class="card-body">
                <h3>${service.name}</h3>
                <p class="muted">Duration: ${service.duration}</p>
                <div class="price-row">
                    <span class="price">${formatCurrency(service.price)}</span>
                    <button class="btn btn-primary" onclick="bookService('${service.name}')">Book Now</button>
                </div>
            </div>
        </article>`;
}

function staffCard(person) {
    return `
        <article class="staff-card">
            <img src="${person.img}" alt="${escapeHtml(person.name)}">
            <div class="card-body">
                <h3>${person.name}</h3>
                <p class="muted">${person.role}</p>
            </div>
        </article>`;
}

function bookService(serviceName) {
    localStorage.setItem("updatesysSelectedService", serviceName);
    window.location.href = "booking.html";
}

function setupBookingPage() {
    const form = document.getElementById("bookingForm");
    const serviceSelect = document.getElementById("serviceSelect");
    const servicePrice = document.getElementById("servicePrice");
    const serviceCards = document.getElementById("bookingServiceCards");
    const staffCards = document.getElementById("bookingStaffCards");
    const referenceNumber = document.getElementById("referenceNumber");
    const referenceGroup = document.getElementById("gcashReferenceGroup");
    const paymentProof = document.getElementById("paymentProof");
    const paymentProofGroup = document.getElementById("paymentProofGroup");
    const gcashDetails = document.getElementById("gcashDetails");

    if (!form || !serviceSelect) return;

    serviceSelect.innerHTML = services.map(s => `<option value="${s.name}">${s.name} - ${formatCurrency(s.price)}</option>`).join("");

    if (serviceCards) {
        serviceCards.innerHTML = services.map(service => `
            <article class="service-card service-option" data-service-name="${escapeHtml(service.name)}" onclick="selectBookingService(${service.id})">
                <img src="${service.img}" alt="${escapeHtml(service.name)}">
                <div class="card-body">
                    <h3>${service.name}</h3>
                    <p class="muted">${service.duration}</p>
                    <div class="price-row"><span class="price">${formatCurrency(service.price)}</span></div>
                </div>
            </article>`).join("");
    }

    const selectedService = localStorage.getItem("updatesysSelectedService");
    if (selectedService && services.some(s => s.name === selectedService)) setSelectedServiceNames([selectedService]);

    if (staffCards) {
        staffCards.innerHTML = staff.map(person => `
            <article class="staff-card staff-option" onclick="selectStaff('${person.name}')">
                <img src="${person.img}" alt="${escapeHtml(person.name)}">
                <div class="card-body">
                    <h3>${person.name}</h3>
                    <p class="muted">${person.role}</p>
                </div>
            </article>`).join("");
    }

    const today = new Date().toISOString().split("T")[0];
    const dateInput = document.getElementById("appointmentDate");
    const timeInput = document.getElementById("appointmentTime");
    if (dateInput) dateInput.min = today;
    if (timeInput) {
        timeInput.min = "08:00";
        timeInput.max = "17:00";
        timeInput.step = "1800";
    }

    function updateSummary() {
        const selected = getSelectedServices();
        const name = document.getElementById("customerName").value || "Not yet entered";
        const contact = document.getElementById("contactNumber").value || "Not yet entered";
        const date = document.getElementById("appointmentDate").value || "Not yet selected";
        const time = document.getElementById("appointmentTime").value || "Not yet selected";
        const selectedStaff = document.getElementById("selectedStaff").value || "Any Available Staff";
        const payment = document.getElementById("paymentMethod")?.value || "Not yet selected";
        const totalPrice = selected.reduce((sum, service) => sum + Number(service.price || 0), 0);

        servicePrice.value = selected.length ? formatCurrency(totalPrice) : "";
        updateSelectedServiceCards();
        updatePaymentFields();

        const summary = document.getElementById("appointmentSummary");
        if (summary) {
            summary.innerHTML = `
                <div class="summary-row"><b>Customer</b><span>${escapeHtml(name)}</span></div>
                <div class="summary-row"><b>Contact</b><span>${escapeHtml(contact)}</span></div>
                <div class="summary-row"><b>Services</b><span>${selected.length ? selected.map(s => s.name).join(", ") : "Not selected"}</span></div>
                <div class="summary-row"><b>Total Price</b><span>${selected.length ? formatCurrency(totalPrice) : "PHP 0"}</span></div>
                <div class="summary-row"><b>Date</b><span>${escapeHtml(date)}</span></div>
                <div class="summary-row"><b>Time</b><span>${escapeHtml(time)}</span></div>
                <div class="summary-row"><b>Staff</b><span>${escapeHtml(selectedStaff)}</span></div>
                <div class="summary-row"><b>Payment</b><span>${escapeHtml(payment)}</span></div>
                <div class="summary-row"><b>Status</b><span>${statusBadge("Pending")}</span></div>`;
        }
    }

    form.addEventListener("input", updateSummary);
    form.addEventListener("change", updateSummary);
    form.addEventListener("reset", function () {
        setTimeout(() => {
            setSelectedServiceNames([]);
            selectAnyStaff();
            const paymentInput = document.getElementById("paymentMethod");
            if (paymentInput) paymentInput.value = "";
            document.querySelectorAll(".payment-card").forEach(card => card.classList.remove("selected"));
            if (referenceNumber) referenceNumber.value = "";
            if (paymentProof) paymentProof.value = "";
            updateSummary();
        }, 0);
    });

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        const contact = document.getElementById("contactNumber").value.trim();
        if (!isValidContact(contact)) {
            alert("Contact number must contain numbers only and be exactly 11 digits.");
            return;
        }
        const selected = getSelectedServices();
        if (selected.length === 0) return alert("Please select at least one service.");
        const appointmentTime = document.getElementById("appointmentTime").value;
        if (!isValidAppointmentTime(appointmentTime)) return alert("Appointment time must be between 8:00 AM and 5:00 PM only.");
        const paymentMethod = document.getElementById("paymentMethod")?.value || "";
        if (!paymentMethod) return alert("Please select a payment method.");

        let proof = null;
        try {
            proof = paymentMethod === "GCash" ? await readPaymentProof(paymentProof) : null;
        } catch (error) { return; }

        const totalPrice = selected.reduce((sum, service) => sum + Number(service.price || 0), 0);
        const appointment = {
            id: Date.now(),
            customerName: document.getElementById("customerName").value.trim(),
            contactNumber: contact,
            email: document.getElementById("customerEmail").value.trim(),
            service: selected.map(service => service.name).join(", "),
            services: selected.map(service => service.name),
            price: totalPrice,
            date: document.getElementById("appointmentDate").value,
            time: document.getElementById("appointmentTime").value,
            staff: document.getElementById("selectedStaff").value || "Any Available Staff",
            paymentMethod,
            referenceNumber: paymentMethod === "GCash" ? document.getElementById("referenceNumber").value.trim() : "",
            proofImage: proof?.isImage ? proof.dataUrl : "",
            proofFileName: proof?.fileName || "",
            proofFileType: proof?.fileType || "",
            proofFileData: proof?.dataUrl || "",
            status: "Pending",
            createdAt: new Date().toISOString()
        };

        const appointments = getAppointments();
        appointments.unshift(appointment);
        saveAppointments(appointments);
        localStorage.setItem("updatesysLastBooking", JSON.stringify(appointment));
        sessionStorage.setItem("updatesysBookingSubmitted", "true");
        localStorage.removeItem("updatesysSelectedService");
        window.location.href = "confirmation.html";
    });

    window.addEventListener("beforeunload", function () {
        if (sessionStorage.getItem("updatesysBookingSubmitted") !== "true") localStorage.removeItem("updatesysSelectedService");
    });
    sessionStorage.removeItem("updatesysBookingSubmitted");
    updateSummary();

    function updatePaymentFields() {
        const payment = document.getElementById("paymentMethod")?.value || "";
        const isGCash = payment === "GCash";
        if (gcashDetails) gcashDetails.hidden = !isGCash;
        if (referenceGroup) referenceGroup.hidden = !isGCash;
        if (paymentProofGroup) paymentProofGroup.hidden = !isGCash;
        if (referenceNumber) {
            referenceNumber.required = isGCash;
            if (!isGCash) referenceNumber.value = "";
        }
        if (paymentProof) {
            paymentProof.required = isGCash;
            if (!isGCash) paymentProof.value = "";
        }
    }
}

function getSelectedServiceNames() {
    const serviceSelect = document.getElementById("serviceSelect");
    if (!serviceSelect) return [];
    return Array.from(serviceSelect.selectedOptions).map(option => option.value);
}

function setSelectedServiceNames(serviceNames) {
    const serviceSelect = document.getElementById("serviceSelect");
    if (!serviceSelect) return;
    Array.from(serviceSelect.options).forEach(option => { option.selected = serviceNames.includes(option.value); });
}

function getSelectedServices() {
    const selectedNames = getSelectedServiceNames();
    return services.filter(service => selectedNames.includes(service.name));
}

function selectBookingService(serviceId) {
    const service = services.find(item => item.id === serviceId);
    if (!service) return;
    const selectedNames = getSelectedServiceNames();
    const nextNames = selectedNames.includes(service.name) ? selectedNames.filter(name => name !== service.name) : [...selectedNames, service.name];
    setSelectedServiceNames(nextNames);
    updateSelectedServiceCards();
    document.getElementById("bookingForm")?.dispatchEvent(new Event("change"));
}

function updateSelectedServiceCards() {
    const selectedNames = getSelectedServiceNames();
    document.querySelectorAll(".service-option").forEach(card => {
        card.classList.toggle("selected", selectedNames.includes(card.dataset.serviceName));
    });
}

function selectPaymentMethod(method) {
    const paymentInput = document.getElementById("paymentMethod");
    if (paymentInput) paymentInput.value = method;
    document.querySelectorAll(".payment-card").forEach(card => card.classList.toggle("selected", card.dataset.payment === method));
    document.getElementById("bookingForm")?.dispatchEvent(new Event("change"));
}

function readPaymentProof(input) {
    return new Promise((resolve, reject) => {
        const file = input?.files?.[0];
        if (!file) return resolve(null);
        if (file.size > 2 * 1024 * 1024) {
            alert("Please upload a proof of payment file up to 2 MB only.");
            reject(new Error("Payment proof file is too large."));
            return;
        }
        const reader = new FileReader();
        reader.onload = () => resolve({ dataUrl: reader.result, fileName: file.name, fileType: file.type || "application/octet-stream", isImage: file.type.startsWith("image/") });
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
    });
}

function selectStaff(name) {
    document.getElementById("selectedStaff").value = name;
    document.getElementById("selectedStaffText").textContent = "Selected: " + name;
    document.querySelectorAll(".staff-option").forEach(card => card.classList.toggle("selected", card.textContent.includes(name)));
    document.getElementById("bookingForm")?.dispatchEvent(new Event("change"));
}

function selectAnyStaff() {
    const selectedStaff = document.getElementById("selectedStaff");
    const selectedStaffText = document.getElementById("selectedStaffText");
    if (selectedStaff) selectedStaff.value = "Any Available Staff";
    if (selectedStaffText) selectedStaffText.textContent = "Selected: Any Available Staff";
    document.querySelectorAll(".staff-option").forEach(card => card.classList.remove("selected"));
    document.getElementById("bookingForm")?.dispatchEvent(new Event("change"));
}

function setupAdminLogin() {
    const form = document.getElementById("adminLoginForm");
    if (!form) return;
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const username = document.getElementById("adminUsername").value.trim();
        const password = document.getElementById("adminPassword").value.trim();
        const credentials = getAdminCredentials();
        if (username === credentials.username && password === credentials.password) {
            localStorage.setItem("updatesysAdminLoggedIn", "true");
            window.location.href = "admin-dashboard.html";
        } else {
            alert("Invalid admin username or password.");
        }
    });
}

function getAdminCredentials() {
    return JSON.parse(localStorage.getItem("updatesysAdminCredentials") || "null") || { username: "admin", password: "admin123" };
}

function saveAdminCredentials(username, password) {
    localStorage.setItem("updatesysAdminCredentials", JSON.stringify({ username, password }));
}

function logout() {
    localStorage.removeItem("updatesysAdminLoggedIn");
    window.location.href = "admin-login.html";
}

function setupAdminCredentialsForm() {
    const form = document.getElementById("adminCredentialsForm");
    if (!form || form.dataset.ready === "true") return;
    const credentials = getAdminCredentials();
    const usernameInput = document.getElementById("newAdminUsername");
    const message = document.getElementById("credentialsMessage");
    if (usernameInput) usernameInput.value = credentials.username;
    form.dataset.ready = "true";
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const currentPassword = document.getElementById("currentAdminPassword").value;
        const newUsername = document.getElementById("newAdminUsername").value.trim();
        const newPassword = document.getElementById("newAdminPassword").value;
        const confirmPassword = document.getElementById("confirmAdminPassword").value;
        const activeCredentials = getAdminCredentials();
        if (currentPassword !== activeCredentials.password) return setCredentialsMessage("Current password is incorrect.", false);
        if (newUsername.length < 3) return setCredentialsMessage("Username must be at least 3 characters.", false);
        if (newPassword.length < 6) return setCredentialsMessage("Password must be at least 6 characters.", false);
        if (newPassword !== confirmPassword) return setCredentialsMessage("New passwords do not match.", false);
        saveAdminCredentials(newUsername, newPassword);
        form.reset();
        document.getElementById("newAdminUsername").value = newUsername;
        setCredentialsMessage("Admin credentials updated successfully.", true);
    });
    function setCredentialsMessage(text, success) {
        if (!message) return;
        message.textContent = text;
        message.classList.toggle("success-message", success);
        message.classList.toggle("error-message", !success);
    }
}

function renderAdminDashboard() {
    if (!document.body.dataset.page?.includes("admin-dashboard")) return;
    renderAdminCounts();
    renderReports();
}

function renderAdminCounts() {
    const appointments = getAppointments();
    const count = status => appointments.filter(a => a.status === status).length;
    setText("totalAppointmentsCount", appointments.length);
    setText("pendingAppointmentsCount", count("Pending"));
    setText("approvedAppointmentsCount", count("Approved"));
    setText("completedAppointmentsCount", count("Completed"));
    setText("reportCancelled", count("Cancelled"));
    setText("archivedAppointmentsCount", count("Archived"));
}

function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}

function renderAdminAppointments() {
    const tbody = document.getElementById("adminAppointmentsTable");
    if (!tbody) return;
    const search = (document.getElementById("adminSearch")?.value || "").toLowerCase();
    const status = document.getElementById("adminStatusFilter")?.value || "All";
    let appointments = getAppointments();
    if (status !== "All") appointments = appointments.filter(a => a.status === status);
    if (search) appointments = appointments.filter(a => a.customerName.toLowerCase().includes(search) || a.staff.toLowerCase().includes(search));
    if (appointments.length === 0) {
        tbody.innerHTML = `<tr><td colspan="9" class="empty-state">No appointment records found.</td></tr>`;
        return;
    }
    tbody.innerHTML = appointments.map(a => `
        <tr>
            <td><b>${escapeHtml(a.customerName)}</b><br><span class="muted">${escapeHtml(a.email || "No email")}</span></td>
            <td>${escapeHtml(a.contactNumber)}</td>
            <td>${escapeHtml(a.service)}<br><b>${formatCurrency(a.price)}</b></td>
            <td>${escapeHtml(a.staff)}</td>
            <td>${escapeHtml(a.date)}<br>${escapeHtml(a.time)}</td>
            <td>${escapeHtml(a.paymentMethod || "N/A")}</td>
            <td>${paymentReferenceCell(a)}</td>
            <td>${statusBadge(a.status)}</td>
            <td><div class="action-group">
                <button class="mini-btn approve" onclick="updateAppointmentStatus(${a.id}, 'Approved')">Approve</button>
                <button class="mini-btn cancel" onclick="updateAppointmentStatus(${a.id}, 'Cancelled')">Cancel</button>
                <button class="mini-btn complete" onclick="updateAppointmentStatus(${a.id}, 'Completed')">Complete</button>
                <button class="mini-btn archive" onclick="archiveAppointment(${a.id})">Archive</button>
            </div></td>
        </tr>`).join("");
}

function paymentReferenceCell(appointment) {
    const reference = appointment.referenceNumber || "No reference";
    const proofData = appointment.proofFileData || appointment.proofImage;
    const proofName = appointment.proofFileName || "Proof of payment";
    if (!proofData) return `<span class="muted">${escapeHtml(reference)}</span>`;
    if (String(appointment.proofFileType || "").startsWith("image/") || appointment.proofImage) {
        return `<button type="button" class="proof-preview-button" onclick="openProofModal(${appointment.id})"><img class="proof-thumb" src="${proofData}" alt="${escapeHtml(proofName)}"></button><br><span class="muted">${escapeHtml(reference)}</span>`;
    }
    return `<a class="proof-file-link" href="${proofData}" target="_blank" rel="noopener">Open Proof</a><br><span class="muted">${escapeHtml(reference)}</span>`;
}

function openProofModal(appointmentId) {
    const appointment = getAppointments().find(item => item.id === appointmentId);
    if (!appointment) return;
    const imageSrc = appointment.proofFileData || appointment.proofImage;
    const modal = document.getElementById("proofModal");
    const image = document.getElementById("proofModalImage");
    const caption = document.getElementById("proofModalCaption");
    if (!modal || !image || !caption || !imageSrc) return;
    image.src = imageSrc;
    image.alt = appointment.proofFileName || "Proof of payment preview";
    caption.textContent = appointment.referenceNumber || "No reference";
    modal.hidden = false;
    document.body.classList.add("modal-open");
}

function closeProofModal(event) {
    const modal = document.getElementById("proofModal");
    const image = document.getElementById("proofModalImage");
    if (!modal) return;
    if (event && event.target !== modal) return;
    modal.hidden = true;
    if (image) image.src = "";
    document.body.classList.remove("modal-open");
}

document.addEventListener("keydown", event => { if (event.key === "Escape") closeProofModal(); });

function clearAdminFilters() {
    const search = document.getElementById("adminSearch");
    const status = document.getElementById("adminStatusFilter");
    if (search) search.value = "";
    if (status) status.value = "All";
    renderAdminAppointments();
}

function updateAppointmentStatus(id, status) {
    const appointments = getAppointments();
    const updated = appointments.map(a => a.id === id ? { ...a, status } : a);
    saveAppointments(updated);
    renderAdminCounts();
    renderAdminAppointments();
    renderRecords();
    renderReports();
}

function archiveAppointment(id) {
    if (!confirm("Archive this appointment record?")) return;
    const appointments = getAppointments();
    const updated = appointments.map(a => a.id === id ? { ...a, status: "Archived", archived: true } : a);
    saveAppointments(updated);
    renderAdminCounts();
    renderAdminAppointments();
    renderRecords();
    renderReports();
}

function renderCustomerStatus() {
    const form = document.getElementById("customerStatusForm");
    const result = document.getElementById("customerStatusResult");
    if (!form || !result || form.dataset.ready === "true") return;
    form.dataset.ready = "true";
    result.innerHTML = "";
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const rawName = document.getElementById("statusCustomerName").value.trim();
        const rawContact = document.getElementById("statusContactNumber").value.trim();
        if (!isValidContact(rawContact)) {
            result.innerHTML = `<div class="card empty-state">Contact number must contain numbers only and be exactly 11 digits.</div>`;
            return;
        }
        const name = rawName.toLowerCase();
        const contact = rawContact.toLowerCase();
        const matches = getAppointments().filter(a => String(a.customerName || "").trim().toLowerCase() === name && String(a.contactNumber || "").trim().toLowerCase() === contact);
        if (matches.length === 0) {
            result.innerHTML = `<div class="card empty-state">No appointment found. Please check if the full name and contact number are exactly the same as your booking details.</div>`;
            return;
        }
        result.innerHTML = matches.map(a => `
            <div class="card appointment-summary-card">
                <div class="section-title left no-margin"><h2>Appointment Summary</h2></div>
                <div class="summary-box">
                    <div class="summary-row"><b>Customer</b><span>${escapeHtml(a.customerName)}</span></div>
                    <div class="summary-row"><b>Contact</b><span>${escapeHtml(a.contactNumber)}</span></div>
                    <div class="summary-row"><b>Service</b><span>${escapeHtml(a.service)}</span></div>
                    <div class="summary-row"><b>Total Price</b><span>${formatCurrency(a.price)}</span></div>
                    <div class="summary-row"><b>Staff</b><span>${escapeHtml(a.staff)}</span></div>
                    <div class="summary-row"><b>Date</b><span>${escapeHtml(a.date)}</span></div>
                    <div class="summary-row"><b>Time</b><span>${escapeHtml(a.time)}</span></div>
                    <div class="summary-row"><b>Payment</b><span>${escapeHtml(a.paymentMethod || "N/A")}</span></div>
                    <div class="summary-row"><b>Status</b><span>${statusBadge(a.status)}</span></div>
                </div>
            </div>`).join("");
    });
}

function renderRecords() {
    const customerRecords = document.getElementById("customerRecords");
    const staffRecords = document.getElementById("staffRecords");
    const paymentRecords = document.getElementById("paymentRecords");
    if (!customerRecords && !staffRecords && !paymentRecords) return;
    const appointments = getAppointments();
    if (customerRecords) customerRecords.innerHTML = appointments.map(a => `<tr><td>${escapeHtml(a.customerName)}</td><td>${escapeHtml(a.contactNumber)}</td><td>${escapeHtml(a.email || "N/A")}</td><td>${escapeHtml(a.service)}</td><td>${statusBadge(a.status)}</td></tr>`).join("") || `<tr><td colspan="5" class="empty-state">No customer records yet.</td></tr>`;
    if (staffRecords) staffRecords.innerHTML = appointments.map(a => `<tr><td>${escapeHtml(a.staff)}</td><td>${escapeHtml(a.service)}</td><td>${escapeHtml(a.date)}</td><td>${statusBadge(a.status)}</td></tr>`).join("") || `<tr><td colspan="4" class="empty-state">No staff records yet.</td></tr>`;
    if (paymentRecords) paymentRecords.innerHTML = appointments.map(a => `<tr><td>${escapeHtml(a.customerName)}</td><td>${escapeHtml(a.paymentMethod || "N/A")}</td><td>${escapeHtml(a.referenceNumber || "N/A")}</td><td>${formatCurrency(a.price)}</td><td>${statusBadge(a.status)}</td></tr>`).join("") || `<tr><td colspan="5" class="empty-state">No payment records yet.</td></tr>`;
}

function renderDashboardCharts(appointments) {
    renderBarChart("statusChart", [
        { label: "Pending", value: appointments.filter(a => a.status === "Pending").length },
        { label: "Approved", value: appointments.filter(a => a.status === "Approved").length },
        { label: "Completed", value: appointments.filter(a => a.status === "Completed").length },
        { label: "Cancelled", value: appointments.filter(a => a.status === "Cancelled").length },
        { label: "Archived", value: appointments.filter(a => a.status === "Archived").length }
    ]);

    const serviceCounts = {};
    appointments.forEach(a => {
        (a.services && a.services.length ? a.services : [a.service]).forEach(service => {
            serviceCounts[service] = (serviceCounts[service] || 0) + 1;
        });
    });
    const serviceData = Object.entries(serviceCounts)
        .map(([label, value]) => ({ label, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);
    renderBarChart("serviceChart", serviceData);

    renderBarChart("paymentChart", [
        { label: "Cash", value: appointments.filter(a => a.paymentMethod === "Cash").length },
        { label: "GCash", value: appointments.filter(a => a.paymentMethod === "GCash").length }
    ]);
}

function renderBarChart(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const max = Math.max(...data.map(item => item.value), 1);
    container.innerHTML = data.map(item => {
        const width = Math.max((item.value / max) * 100, item.value > 0 ? 8 : 0);
        return `<div class="chart-row">
            <div class="chart-label">${escapeHtml(item.label)}</div>
            <div class="chart-track"><span style="width: ${width}%"></span></div>
            <div class="chart-value">${item.value}</div>
        </div>`;
    }).join("") || `<p class="muted">No data available.</p>`;
}

function renderReports() {
    const appointments = getAppointments();
    const count = status => appointments.filter(a => a.status === status).length;
    const completed = appointments.filter(a => a.status === "Completed");
    const revenue = completed.reduce((sum, a) => sum + Number(a.price || 0), 0);
    setText("reportTotal", appointments.length);
    setText("reportPending", count("Pending"));
    setText("reportApproved", count("Approved"));
    setText("reportCompleted", count("Completed"));
    setText("reportCancelled", count("Cancelled"));
    setText("reportRevenue", formatCurrency(revenue));
    setText("paymentSummaryDetails", `Cash: ${appointments.filter(a => a.paymentMethod === "Cash").length} | GCash: ${appointments.filter(a => a.paymentMethod === "GCash").length}`);

    renderDashboardCharts(appointments);

    const completedTable = document.getElementById("completedReportTable");
    if (completedTable) {
        completedTable.innerHTML = completed.map(a => `<tr><td>${escapeHtml(a.customerName)}</td><td>${escapeHtml(a.service)}</td><td>${escapeHtml(a.staff)}</td><td>${escapeHtml(a.date)}</td><td>${formatCurrency(a.price)}</td></tr>`).join("") || `<tr><td colspan="5" class="empty-state">No completed services yet.</td></tr>`;
    }
}

function renderConfirmation() {
    const box = document.getElementById("confirmationDetails");
    if (!box) return;
    const last = JSON.parse(localStorage.getItem("updatesysLastBooking") || "null");
    if (!last) {
        box.innerHTML = `<p class="muted">No recent booking found.</p>`;
        return;
    }
    box.innerHTML = `
        <div class="summary-row"><b>Customer</b><span>${escapeHtml(last.customerName)}</span></div>
        <div class="summary-row"><b>Contact</b><span>${escapeHtml(last.contactNumber)}</span></div>
        <div class="summary-row"><b>Service</b><span>${escapeHtml(last.service)}</span></div>
        <div class="summary-row"><b>Staff</b><span>${escapeHtml(last.staff)}</span></div>
        <div class="summary-row"><b>Date</b><span>${escapeHtml(last.date)}</span></div>
        <div class="summary-row"><b>Time</b><span>${escapeHtml(last.time)}</span></div>
        <div class="summary-row"><b>Payment</b><span>${escapeHtml(last.paymentMethod)}</span></div>
        <div class="summary-row"><b>Status</b><span>${statusBadge(last.status)}</span></div>`;
}
