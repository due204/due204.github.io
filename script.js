// script.js

const outputDiv = document.getElementById('output');
const commandInput = document.getElementById('commandInput');

const commands = {
    ayuda: 'src/man',
    contacto: 'src/contactos',
    estudios: 'src/estudios',
    habilidades: 'src/habilidades',
    help: 'src/man',
    info: 'src/informacion',
    man: 'src/man',
    proyectos: 'src/proyectos',
    clear: '',
    date: '',
    exit: '',
    ls: '',
    pwd: '',
    whoami: ''
};

// Mantiene el foco constante en el input
//document.addEventListener('click', () => {
//    commandInput.focus(); // Vuelve a enfocar el input al hacer clic fuera de él
//});

// Escucha para la entrada de comandos
commandInput.addEventListener('keydown', async function (event) {
    if (event.key === 'Enter') {
        const input = commandInput.value.trim().toLowerCase();

        // Comando 'clear'
        if (input === 'clear') {
            outputDiv.textContent = ''; // Limpia la salida
            commandInput.value = ''; // Limpia el input
            return; // Detiene el procesamiento adicional
        }

        else if (input === 'cv') {
            outputDiv.textContent += `due204@debian:~$ ${input}\nAbriendo CV en una nueva pestaña...\n`;
            setTimeout(() => {
                window.open('src/cv.pdf', '_blank'); // Abre el archivo en una nueva pestaña
            }, 3000); // Retraso de 3 segundos
        }

        else if (input === 'cv -d' || input === 'cv --download') {
            outputDiv.textContent += `due204@debian:~$ ${input}\nDescargando CV...\n`;
        
            const link = document.createElement('a'); // Crea un enlace
            link.href = 'src/cv.pdf'; // Ruta al archivo PDF
            link.download = 'Corach_Walter_CV.pdf'; // Nombre del archivo al descargar
            link.click(); // Simula un clic para iniciar la descarga
        }

        // Comando 'exit'
        else if (input === 'exit') {
            outputDiv.textContent += `due204@debian:~$ ${input}\nSaliendo de la terminal...\n`;
            setTimeout(() => {
                window.location.href = 'about:blank'; // Redirige a una página vacía
            }, 3000); // Retraso de 3 segundos
        }

        // Comando 'pwd'
        else if (input === 'pwd') {
            outputDiv.textContent += `due204@debian:~$ ${input}\n${window.location.href}\n`;
        }

        // Comando 'ls'
        else if (input === 'ls') {
            outputDiv.textContent += `due204@debian:~$ ${input}\nno hay nada para listar\n`;
        }

        // Comando 'whoami'
        else if (input === 'whoami') {
            outputDiv.textContent += `due204@debian:~$ ${input}\nWalter Corach\n`;
        }

        // Comando cd
        else if (input === 'cd') {
            outputDiv.textContent += `due204@debian:~$\n`;
        }

        // Enter
        else if (input === '') {
            outputDiv.textContent += `due204@debian:~$\n`;
        }

        // Comando 'date'
        else if (input === 'date') {
            const currentDate = new Date().toLocaleString(); // Obtiene la fecha y hora actual en formato local
            outputDiv.textContent += `due204@debian:~$ ${input}\n${currentDate}\n`;
        }

        // Otros comandos
        else if (commands[input]) {
            const filePath = commands[input];
            try {
                const response = await fetch(filePath);
                if (!response.ok) throw new Error(`Error al cargar ${filePath}`);
                const data = await response.text();
                outputDiv.textContent += `due204@debian:~$ ${input}\n${data}`;
            } catch (error) {
                outputDiv.textContent += `due204@debian:~$ ${input}\nError: ${error.message}\n`;
            }
        } else {
            outputDiv.textContent += `due204@debian:~$ ${input}\nbash: ${input}: orden no encontrada\n`;
        }

        commandInput.value = ''; // Limpia el input
        outputDiv.scrollTop = outputDiv.scrollHeight; // Desplaza hacia abajo la salida
    }
});
