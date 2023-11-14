function generateAndDownloadPDF() {
    const nameInput = document.getElementById('name').value;
    const surnameInput = document.getElementById('surname').value;
    const emailInput = document.getElementById('email').value;

    var tmpData = document.getElementById('birthdate').value;
    const dataNascitaInput = formattaData(tmpData);

    // test in console
    console.log(nameInput + ' ' + surnameInput + ' ' + emailInput + ' ' + dataNascitaInput);

    // nome e cognome devono essere immessi
    if (nameInput === '') {
        alert('Inserisci il nome');
        document.getElementById('name').focus();
        return false;
    }

    if (surnameInput === '') {
        alert('Inserisci il cognome');
        document.getElementById('surname').focus();
        return false;
    }

    // email deve essere valida
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailInput.match(emailPattern)) {
        alert('Email non immessa oppure non valida');
        return false;
    }

    // data di nascita
    if (!dataNascitaInput === '') {
        alert('Data non selezionata');
        return false;
    }

    const doc = new jsPDF();

    doc.text(20, 20, 'Nome: ' + nameInput);
    doc.text(20, 40, 'Cognome: ' + surnameInput);
    doc.text(20, 60, 'Email: ' + emailInput);
    doc.text(20, 80, 'Data di nascita: ' + dataNascitaInput);
    doc.save('mioPDF.pdf');

    const overlay = document.getElementById('overlay');
    overlay.style.display = 'block';

    setTimeout(function() {
        overlay.style.display = 'none';
    }, 2000);
}

function formattaData(date) {
    var tmpDate = new Date(date);

    var giorno = tmpDate.getDay();
    var mese = tmpDate.getMonth() + 1;
    var anno = tmpDate.getFullYear();

    if (giorno < 10) {
        giorno = '0' + giorno;
    }

    if (mese < 10) {
        mese = '0' + mese;
    }

    var formattedDate;

    formattedDate = giorno + '/' + mese + '/' + anno;

    return formattedDate;
}
