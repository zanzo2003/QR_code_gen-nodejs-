import inquirer from 'inquirer';
import writeFile, { appendFileSync, createWriteStream, writeFileSync } from 'fs';
import { image, imageSync } from 'qr-image';

// this is the object which hold all the questions 
const questions = [{
    type: 'input',
    name: 'userName',
    message: 'Enter name : '
},
{
    type: 'input',
    name: 'Link',
    message: 'Enter profile link : '
}
]

// this snippet prompts questions in the terminal and call the functions to save data and generate the QR code for the profile

inquirer
    .prompt(questions)
    .then((answers) => {

        saveLink(answers);

        qrGenarator(answers);

    })
    .catch((error) => {
        if (error.isTtyError) {
            throw error;
        } else {
            console.error(error);
        }
    });



// fucntion which saves the name and the profile link in the savedList text file
function saveLink(link) {
    const names = link.userName + ' - ' + link.Link + '\n';
    appendFileSync("savedLink.txt", names, (err) => {
        if (err) throw err;
        console.log("Name has been saved!!");
    })
}

// function which generates the QR code for the profile
function qrGenarator(link) {
    const Url = link.Link;
    const names = link.userName;
    var qr_png = image(Url, { type: 'png' });
    qr_png.pipe(createWriteStream(`${names}.png`));
    var png_string = imageSync(`${names}`, { type: 'png' });
}