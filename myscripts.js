function generateAndDownloadPDF() {
    const nameInput = document.getElementById('1name').value;
    const surnameInput = document.getElementById('1surname').value;
    const emailInput = document.getElementById('1email').value;

    var tmpData = document.getElementById('1birthdate').value;
    const dataNascitaInput = formattaData(tmpData);

    // test in console
    console.log(nameInput + ' ' + surnameInput + ' ' + emailInput + ' ' + dataNascitaInput);

    // nome e cognome devono essere immessi
    if (nameInput === '') {
        alert('Inserisci il nome');
        document.getElementById('1name').focus();
        return false;
    }

    if (surnameInput === '') {
        alert('Inserisci il cognome');
        document.getElementById('1surname').focus();
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

async function compilaPDF() {
    const name = document.getElementById('2name').value;
    const surname = document.getElementById('2surname').value;
    const email = document.getElementById('2email').value;
    const luogoNascita = document.getElementById('2luogoNascita').value;

    // Carica il modulo PDF da compilare
    const response = await fetch('modulo.pdf');
    const data = await response.arrayBuffer();

    // Carica il PDF con pdf-lib
    const { PDFDocument } = PDFLib;
    const pdfDoc = await PDFDocument.load(data);

    // Compila i campi del modulo PDF con i valori del modulo HTML
    const form = pdfDoc.getForm();

    console.log(name + ' ' + surname + ' ' + email);

    form.getTextField('nome').setText(name);
    form.getTextField('cognome').setText(surname);
    form.getTextField('email').setText(email);
    form.getTextField('luogoNascita').setText(luogoNascita);

    // Salva il PDF compilato
    const pdfBytes = await pdfDoc.save();

    // Crea un oggetto Blob dal byte del PDF
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });

    // Crea un link temporaneo e simula il clic per il download
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'modulo_compilato.pdf';
    link.click();
}