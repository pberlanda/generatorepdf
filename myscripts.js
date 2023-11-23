function generateAndDownloadPDF() {
    const nameInput = document.getElementById('form1_name').value;
    const surnameInput = document.getElementById('form1_username').value;
    let emailInput;
    emailInput = document.getElementById('form1_email').value;

    let dataNascitaInput;
    //dataNascitaInput = formattaData(document.getElementById('form1_birthday').value);
    //dataNascitaInput = document.getElementById('form1_birthday').value;
    dataNascitaInput = visualizzaData(document.getElementById('form1_birthday').value);

    // test in console
    console.log(nameInput + ' ' + surnameInput + ' ' + emailInput + ' data di nascita ' + dataNascitaInput);

    // nome e cognome devono essere immessi
    if (nameInput === '') {
        alert('Inserisci il nome');
        document.getElementById('form1_name').focus();
        return false;
    }

    if (surnameInput === '') {
        alert('Inserisci il cognome');
        document.getElementById('form1_username').focus();
        return false;
    }

    // email deve essere valida
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailInput.match(emailPattern)) {
        alert('Email non immessa oppure non valida');
        return false;
    }

    // data di nascita deve essere immessa
    if (dataNascitaInput === '') {
        alert('Data non selezionata');
        document.getElementById('form1_birthday').focus();
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
    
    var formattedDate;

    // se la data non è immessa termina
    if (date === "") {
        console.log("eto was here " + date);
        formattedDate = "";
        return formattedDate;
    }

    var tmpDate = new Date(date);

    var giorno = tmpDate.getDay();
    var mese = tmpDate.getMonth() + 1;
    var anno = tmpDate.getFullYear();

    /*if (giorno < 10) {
        giorno = '0' + giorno;
    }

    if (mese < 10) {
        mese = '0' + mese;
    }*/

    console.log('giorno ' + giorno + ' mese ' + mese + ' anno ' + anno);

    formattedDate = giorno + '/' + mese + '/' + anno;

    return formattedDate;
}

function visualizzaData(data) {

    let tmpData = new Date(data);
    let options = {day:'2-digit', month:'2-digit', year:'numeric'};
    let dataFormatatta = tmpData.toLocaleDateString('it-IT', options);

    return dataFormatatta;
}

async function compilaPDF() {
    const name = document.getElementById('form2_name').value;
    const surname = document.getElementById('form2_surname').value;
    const email = document.getElementById('form2_email').value;
    const luogoNascita = document.getElementById('form2_luogoNascita').value;

    let dataNascita;
    //dataNascita = formattaData(document.getElementById('form2_birthdate').value);
    //dataNascita = document.getElementById('form2_birthdate').value;
    dataNascita = visualizzaData(document.getElementById('form2_birthdate').value);

    // nome e cognome devono essere immessi
    if (name === '') {
        alert('Inserisci il nome');
        document.getElementById('form2_name').focus();
        return false;
    }

    if (surname === '') {
        alert('Inserisci il cognome');
        document.getElementById('form2_surname').focus();
        return false;
    }

    // email deve essere valida
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.match(emailPattern)) {
        alert('Email non immessa oppure non valida');
        document.getElementById('form2_email').focus();
        return false;
    }

    if (luogoNascita === '') {
        alert('Inserisci il luogo di nascita');
        document.getElementById('form2_luogoNascita').focus();
        return false;
    }

    // data di nascita deve essere immessa
    if (dataNascita === '') {
        alert('Data non selezionata');
        document.getElementById('form2_birthdate').focus();
        return false;
    }

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
    form.getTextField('dataNascita').setText(dataNascita);

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