/* js/rdv-confirmation.js */

const RDV_MODAL_ID = 'rdv-invitation-modal';

function getRdvModalHtml() {
    return `
<div id="${RDV_MODAL_ID}" class="fixed inset-0 z-[60] hidden overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <!-- Background backdrop -->
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity backdrop-filter backdrop-blur-sm" onclick="closeRdvInviteModal()"></div>

    <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl opacity-0 scale-95 duration-200 ease-out" id="${RDV_MODAL_ID}-content">
            
            <!-- Modal Header -->
            <div class="bg-gradient-to-r from-saham-red to-red-700 px-4 py-3 sm:px-6 flex justify-between items-center">
                <h3 class="text-base font-semibold leading-6 text-white" id="modal-title">Envoyer l'invitation</h3>
                <button type="button" class="text-red-100 hover:text-white focus:outline-none" onclick="closeRdvInviteModal()">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <!-- Modal Body -->
            <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="flex flex-col md:flex-row gap-6">
                    
                    <!-- Left Side: Email Preview & Compose -->
                    <div class="flex-1 space-y-4">
                        <div class="border-b pb-2">
                            <label class="block text-xs font-medium text-gray-500 uppercase">Sujet</label>
                            <input type="text" id="rdv-email-subject" class="w-full mt-1 border-none p-0 text-sm font-semibold focus:ring-0 text-gray-900" value="Confirmation de rendez-vous - Saham Bank">
                        </div>
                        
                        <div class="border-b pb-2">
                             <label class="block text-xs font-medium text-gray-500 uppercase">Expéditeur</label>
                             <div class="mt-1 flex items-center">
                                <span class="h-6 w-6 rounded-full bg-saham-red text-white flex items-center justify-center text-xs mr-2 font-bold">MB</span>
                                <div class="flex flex-col">
                                    <span class="text-sm font-bold text-gray-900">Mohammed Bensoltana</span>
                                    <span class="text-xs text-gray-500">mohammed.bensoltana@sahambank.com</span>
                                </div>
                             </div>
                        </div>
                        
                        <div class="border-b pb-2">
                             <label class="block text-xs font-medium text-gray-500 uppercase">Destinataire</label>
                             <div class="mt-1 flex items-center">
                                <span class="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500 mr-2">C</span>
                                <span class="text-sm text-gray-900" id="rdv-client-email">client@example.com</span>
                             </div>
                        </div>

                        <div class="pt-2">
                             <label class="block text-xs font-medium text-gray-500 uppercase mb-2">Message</label>
                             <textarea id="rdv-email-body" rows="8" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-saham-red sm:text-sm sm:leading-6 p-2"></textarea>
                        </div>
                    </div>

                    <!-- Right Side: Meeting Card -->
                    <div class="w-full md:w-80 bg-gray-50 rounded-lg p-4 border border-gray-200 flex flex-col justify-between">
                        <div>
                            <div class="text-center mb-6">
                                <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2 text-saham-red">
                                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                </div>
                                <h4 class="font-bold text-gray-900">Rendez-vous</h4>
                                <p class="text-sm text-gray-500">Saham Bank</p>
                            </div>

                            <div class="space-y-4">
                                <div class="flex items-start">
                                     <div class="min-w-[4rem] text-xs font-semibold text-gray-500">CLIENT</div>
                                     <div class="text-sm font-medium text-gray-900" id="rdv-card-client">Amina Benani</div>
                                </div>
                                <div class="flex items-start">
                                     <div class="min-w-[4rem] text-xs font-semibold text-gray-500">DATE</div>
                                     <div class="text-sm font-medium text-gray-900" id="rdv-card-date">Lundi 12 Décembre</div>
                                </div>
                                <div class="flex items-start">
                                     <div class="min-w-[4rem] text-xs font-semibold text-gray-500">HEURE</div>
                                     <div class="text-sm font-medium text-gray-900" id="rdv-card-time">14:30 - 15:30</div>
                                </div>
                                <div class="flex items-start">
                                     <div class="min-w-[4rem] text-xs font-semibold text-gray-500">TYPE</div>
                                     <div class="text-sm font-medium text-gray-900" id="rdv-card-type">Présentiel</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="mt-6 pt-4 border-t border-gray-200">
                             <div class="text-xs text-center text-gray-500">Une invitation calendrier sera jointe à cet email.</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modal Footer -->
            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="button" class="inline-flex w-full justify-center rounded-md bg-saham-red px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 sm:ml-3 sm:w-auto transition-colors" onclick="confirmSendRdvInvite()">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                    Envoyer l'invitation
                </button>
                <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto transition-colors" onclick="closeRdvInviteModal()">
                    Annuler
                </button>
            </div>
        </div>
    </div>
</div>
  `;
}

function ensureRdvModalExists() {
    if (!document.getElementById(RDV_MODAL_ID)) {
        const div = document.createElement('div');
        div.innerHTML = getRdvModalHtml();
        document.body.appendChild(div.firstElementChild);
    }
}

function openRdvInviteModal(details) {
    ensureRdvModalExists();

    // Default details
    const { clientName = 'Client', date = 'Demain', time = '10:00', type = 'Présentiel', email = 'client@example.com' } = details || {};

    // Update UI
    document.getElementById('rdv-client-email').innerText = email;
    document.getElementById('rdv-card-client').innerText = clientName;
    document.getElementById('rdv-card-date').innerText = date;
    document.getElementById('rdv-card-time').innerText = time;
    document.getElementById('rdv-card-type').innerText = type;

    // Smart Body Content
    const bodyText = `Bonjour ${clientName},

Je vous confirme notre rendez-vous prévu le ${date} à ${time} (${type}).

Cordialement,
Mohammed Bensoltana
Saham Bank`;
    document.getElementById('rdv-email-body').value = bodyText;

    // Show Modal
    const modal = document.getElementById(RDV_MODAL_ID);
    const modalContent = document.getElementById(`${RDV_MODAL_ID}-content`);

    modal.classList.remove('hidden');

    // Animation
    setTimeout(() => {
        modalContent.classList.remove('opacity-0', 'scale-95');
        modalContent.classList.add('opacity-100', 'scale-100');
    }, 10);
}

function closeRdvInviteModal() {
    const modal = document.getElementById(RDV_MODAL_ID);
    const modalContent = document.getElementById(`${RDV_MODAL_ID}-content`);

    if (!modal) return;

    modalContent.classList.remove('opacity-100', 'scale-100');
    modalContent.classList.add('opacity-0', 'scale-95');

    setTimeout(() => {
        modal.classList.add('hidden');
    }, 200);
}

function confirmSendRdvInvite() {
    // Here you would normally send the API request

    // Show loading state or just close and alert
    const btn = document.querySelector(`#${RDV_MODAL_ID} .bg-saham-red`);
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Envoi...';
    btn.disabled = true;

    setTimeout(() => {
        closeRdvInviteModal();

        // Reset button
        btn.innerHTML = originalText;
        btn.disabled = false;

        // Show generic success
        // Use existing showAlert if available, otherwise native alert
        if (typeof window.showNotification === 'function') {
            window.showNotification('Invitation envoyée avec succès', 'success');
        } else {
            alert('Invitation envoyée avec succès !');
        }

    }, 800);
}

// Attach to window just in case
window.openRdvInviteModal = openRdvInviteModal;
window.closeRdvInviteModal = closeRdvInviteModal;
